// HealPrint Client Configuration
export const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8002',
  // Fallback to localhost:8002 if environment variable is not set
  DEFAULT_API_URL: 'http://localhost:8002'
};

// Get the actual API URL
export const getApiUrl = () => {
  return config.API_BASE_URL || config.DEFAULT_API_URL;
};
