import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User, LoginCredentials, SignupData } from '../services/authService';
import { googleAuthService } from '../services/googleAuthService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  googleLogin: () => Promise<void>;
  handleGoogleAuthSuccess: (userData: any) => void;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

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
    setIsLoading(true);
    clearError();
    
    try {
      // Initialize Google Auth if not already done
      await googleAuthService.initializeGoogleAuth();
      
      // Use popup-based authentication
      const userData = await googleAuthService.promptOneTap();
      handleGoogleAuthSuccess(userData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Google login failed';
      setError(errorMessage);
      console.error('Google login error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuthSuccess = (userData: any) => {
    // Store the JWT token
    authService.setToken(userData.access_token);
    
    // Set user data
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
          // Extract user ID from token (MongoDB ObjectId format)
          const userId = token.replace('token_', '');
          
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
            // This allows the user to retry later if the API comes back online
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
