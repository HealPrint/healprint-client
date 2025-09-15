// HealPrint Client Configuration
export const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001',
  // Fallback to local user-service if environment variable is not set
  DEFAULT_API_URL: 'http://localhost:8001'
};

// Get the actual API URL
export const getApiUrl = () => {
  const url = config.API_BASE_URL || config.DEFAULT_API_URL;
  console.log('🔧 Config - VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
  console.log('🔧 Config - Final API URL:', url);
  return url;
};
