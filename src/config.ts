// HealPrint Client Configuration
interface Config {
  USER_API_URL: string;
  CHAT_API_URL: string;
  API_URL: string;
  GOOGLE_CLIENT_ID: string;
  IS_DEVELOPMENT: boolean;
  IS_PRODUCTION: boolean;
}

// Environment validation - only validate when actually accessing the values
const validateEnvironment = () => {
  const requiredVars = ['VITE_USER_API_URL', 'VITE_CHAT_API_URL', 'VITE_GOOGLE_CLIENT_ID'];
  const missing = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    return false;
  }
  return true;
};

// Production fallback URLs
const getProductionFallback = (service: 'user' | 'chat') => {
  const baseUrl = 'https://healprint-server.onrender.com';
  return service === 'user' ? `${baseUrl}/user` : `${baseUrl}/chat`;
};

export const config: Config = {
  // Get User API URL - from environment variables
  get USER_API_URL() {
    const envUrl = import.meta.env.VITE_USER_API_URL;
    if (!envUrl) {
      if (this.IS_PRODUCTION) {
        return getProductionFallback('user');
      }
      validateEnvironment();
      throw new Error('VITE_USER_API_URL environment variable is required');
    }
    return envUrl;
  },

  // Get Chat API URL - from environment variables
  get CHAT_API_URL() {
    const envUrl = import.meta.env.VITE_CHAT_API_URL;
    if (!envUrl) {
      if (this.IS_PRODUCTION) {
        return getProductionFallback('chat');
      }
      validateEnvironment();
      throw new Error('VITE_CHAT_API_URL environment variable is required');
    }
    return envUrl;
  },

  // Legacy API_URL for backward compatibility (points to user service)
  get API_URL() {
    return this.USER_API_URL;
  },

  // Google OAuth Configuration
  get GOOGLE_CLIENT_ID() {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      validateEnvironment();
      throw new Error('VITE_GOOGLE_CLIENT_ID environment variable is required');
    }
    return clientId;
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
