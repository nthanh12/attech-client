/**
 * Centralized API configuration
 * Handles base URL configuration for all API calls
 */

// Get base API URL from environment variables
export const getApiBaseUrl = () => {
  // Priority: Environment variable -> Development fallback
  return process.env.REACT_APP_API_URL || 'https://localhost:7276';
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