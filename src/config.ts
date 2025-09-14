// HealPrint Client Configuration
export const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://healprint-server-1.onrender.com',
  // Fallback to deployed service if environment variable is not set
  DEFAULT_API_URL: 'https://healprint-server-1.onrender.com'
};

// Get the actual API URL
export const getApiUrl = () => {
  return config.API_BASE_URL || config.DEFAULT_API_URL;
};
