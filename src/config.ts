// HealPrint Client Configuration
export const config = {
  // API URL - Use Render service for both development and production
  API_BASE_URL: 'https://healprint-server-auth.onrender.com',
  
  // Get API URL - always use the Render service
  get API_URL() {
    // Use environment variable if set, otherwise use the default Render URL
    const envUrl = import.meta.env.VITE_API_BASE_URL;
    
    if (envUrl) {
      return envUrl;
    }
    
    return this.API_BASE_URL;
  }
};

// Get the actual API URL
export const getApiUrl = () => {
  const url = config.API_URL;
  console.log('🔧 Config - Environment:', import.meta.env.MODE);
  console.log('🔧 Config - VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
  console.log('🔧 Config - Final API URL:', url);
  return url;
};
