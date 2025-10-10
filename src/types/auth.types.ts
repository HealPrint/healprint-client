/**
 * Authentication and User Types
 */

export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  country?: string;
  created_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  age?: number;
  country?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface AuthContextType {
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

