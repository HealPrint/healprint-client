// HealPrint Client Configuration
import type { Config } from '@/types';

// Primary service URLs (can be overridden by env)
const USER_API_URL = 'https://healprint-server-auth.onrender.com';
const CHAT_API_URL = 'https://healprint-server-chat.onrender.com';

export const config: Config = {
  // Get User API URL - from environment variables
  get USER_API_URL() {
    const envUrl = import.meta.env.VITE_USER_API_URL;
    return envUrl || USER_API_URL;
  },

  // Get Chat API URL - from environment variables
  get CHAT_API_URL() {
    const envUrl = import.meta.env.VITE_CHAT_API_URL;
    return envUrl || CHAT_API_URL;
  },

  // Legacy API_URL for backward compatibility (points to user service)
  get API_URL() {
    return this.USER_API_URL;
  },

  // Environment detection
  get IS_DEVELOPMENT() {
    return import.meta.env.MODE === 'development';
  },

  get IS_PRODUCTION() {
    return import.meta.env.MODE === 'production';
  }
};

// Get the actual API URL
export const getApiUrl = () => {
  const url = config.API_URL;
  return url;
};
