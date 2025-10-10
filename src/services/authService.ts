import { config } from '../config';
import type { User, LoginCredentials, SignupData, AuthResponse, ApiError } from '@/types';

// Use the dedicated User/Auth API URL
const API_BASE_URL = config.USER_API_URL;

class AuthService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        credentials: 'include',  // Send and receive cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorText = await response.text();
        
        try {
          const error: ApiError = JSON.parse(errorText);
          throw new Error(error.detail || 'Login failed');
        } catch (parseError) {
          throw new Error(`Login failed: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async signup(userData: SignupData): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.detail || 'Signup failed');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async getUserProfile(userId: string, token: string): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/profile/${userId}`, {
        method: 'GET',
        credentials: 'include',  // Send cookies
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.detail || 'Failed to fetch user profile');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/me`, {
        method: 'GET',
        credentials: 'include',  // Send httpOnly cookie
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Not authenticated
          return null;
        }
        throw new Error('Failed to fetch current user');
      }

      return await response.json();
    } catch (error) {
      console.warn('getCurrentUser error:', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',  // Send cookie to be cleared
      });
    } catch (error) {
      console.warn('Logout error:', error);
    } finally {
      // Always clear localStorage
      this.removeToken();
    }
  }

  // Store token in localStorage
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Remove token from localStorage
  removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
