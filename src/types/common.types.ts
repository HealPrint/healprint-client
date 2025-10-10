/**
 * Common Types and Utilities
 */

export interface ApiError {
  detail: string;
}

export interface Config {
  USER_API_URL: string;
  CHAT_API_URL: string;
  API_URL: string;
  IS_DEVELOPMENT: boolean;
  IS_PRODUCTION: boolean;
}

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export interface HealthProfile {
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  medicalConditions?: string[];
  allergies?: string[];
  medications?: string[];
  lifestyle?: {
    exercise?: string;
    diet?: string;
    sleep?: string;
    stress?: string;
  };
}

