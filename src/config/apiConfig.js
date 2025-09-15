/**
 * Centralized API configuration
 * Handles base URL configuration for all API calls
 */

// No longer need config.json - using environment variables only

// Get base API URL - prioritize environment variables
export const getApiBaseUrl = () => {
  // First, try environment variables
  const envProtocol = process.env.REACT_APP_API_PROTOCOL;
  const envHost = process.env.REACT_APP_API_HOST;
  const envPort = process.env.REACT_APP_API_PORT;
  
  if (envHost) {
    const protocol = envProtocol || 'http';
    const port = envPort ? `:${envPort}` : '';
    return `${protocol}://${envHost}${port}`;
  }
  
  // No environment variables setthrow new Error('API configuration required. Please set REACT_APP_API_HOST environment variable');
};

// Get full API URL with path
export const getApiUrl = (path = '') => {
  const baseUrl = getApiBaseUrl();
  
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${cleanPath}`;
};

// Export constants for common usage
export const API_BASE_URL = getApiBaseUrl();

// Default export for backward compatibility
export default {
  baseUrl: getApiBaseUrl(),
  getUrl: getApiUrl,
  API_BASE_URL
};