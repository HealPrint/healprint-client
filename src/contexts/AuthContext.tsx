import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import { googleAuthService } from '../services/googleAuthService';
import type { User, LoginCredentials, SignupData, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const isAuthenticated = !!user;

  const clearError = () => setError(null);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    clearError();
    
    try {
      const authResponse = await authService.login(credentials);
      authService.setToken(authResponse.access_token);
      
      // Extract user ID from token (MongoDB ObjectId format)
      const userId = authResponse.access_token.replace('token_', '');
      
      // Fetch user profile
      const userProfile = await authService.getUserProfile(userId, authResponse.access_token);
      setUser(userProfile);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      console.error('Login error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      setIsLoading(true);
      clearError();
      
      const newUser = await authService.signup(userData);
      
      // Auto-login after successful signup
      await login({
        email: userData.email,
        password: userData.password,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
    clearError();
    
    try {
      // Initiate backend-managed OAuth flow (will redirect user to Google)
      await googleAuthService.initiateGoogleLogin();
      // Note: User will be redirected, so code after this won't execute
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Google login failed';
      setError(errorMessage);
      console.error('Google login error:', err);
      throw err;
    }
  };

  const handleGoogleAuthSuccess = (userData: any) => {
    // Store the JWT token
    authService.setToken(userData.access_token);
    
    // Set user data directly from the response (no need to fetch profile again)
    setUser({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      age: userData.age,
      country: userData.country,
      created_at: userData.created_at
    });
  };

  const logout = () => {
    authService.removeToken();
    setUser(null);
    clearError();
  };

  // Check for existing token on app load (runs in background)
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = authService.getToken();
        if (token) {
          // Try to decode JWT token to get user ID
          try {
            // JWT tokens have 3 parts separated by dots
            if (token.includes('.')) {
              // It's a JWT token - decode the payload
              const payload = JSON.parse(atob(token.split('.')[1]));
              const userId = payload.sub; // 'sub' is the standard claim for user ID
              
              // Add timeout to prevent hanging
              const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Auth check timeout')), 5000)
              );
              
              const profilePromise = authService.getUserProfile(userId, token);
              
              try {
                const userProfile = await Promise.race([profilePromise, timeoutPromise]) as User;
                setUser(userProfile);
              } catch (timeoutError) {
                console.warn('Auth check timed out, proceeding without authentication');
                // Don't remove token on timeout, just proceed without setting user
              }
            } else {
              // Old token format "token_{userId}"
              const userId = token.replace('token_', '');
              const userProfile = await authService.getUserProfile(userId, token);
              setUser(userProfile);
            }
          } catch (decodeError) {
            console.warn('Failed to decode token:', decodeError);
            authService.removeToken();
          }
        }
      } catch (err) {
        console.warn('Auth check failed:', err);
        // Token is invalid, remove it
        authService.removeToken();
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    // Run auth check in background immediately
    checkAuthStatus();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    googleLogin,
    handleGoogleAuthSuccess,
    logout,
    error,
    clearError,
  };

  // Always render children immediately - no loading screen
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
