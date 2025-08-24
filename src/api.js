import axios from "axios";
import { getApiBaseUrl } from "./config/apiConfig";

// Retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

// Helper function to wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: process.env.NODE_ENV === 'production' ? 30000 : 15000, // Increased timeout to 15s dev, 30s prod
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor để log requests và thêm token
api.interceptors.request.use(
  (config) => {
    // Add JWT token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor để log responses và handle authentication
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const requestId = Math.random().toString(36).substr(2, 9);
    const originalRequest = error.config;
    
    // Handle timeout and network errors with retry logic
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout') || error.code === 'ERR_NETWORK') {
      
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      
      if (originalRequest._retryCount <= MAX_RETRIES) {
        console.warn(`🔄 Retrying request (${originalRequest._retryCount}/${MAX_RETRIES}) after timeout/network error: ${error.message}`);
        
        await wait(RETRY_DELAY * originalRequest._retryCount);
        return api(originalRequest);
      } else {
        console.error(`❌ Request failed after ${MAX_RETRIES} retries: ${error.message}`);
      }
    }
    
    if (error.response?.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;
      
      console.warn('🔒 Received 401 on:', originalRequest.url);
      console.warn('🔍 Full request URL:', (originalRequest.baseURL || '') + (originalRequest.url || ''));
      
      // Special handling for specific endpoints that may have UserLevel restrictions
      const fullUrl = (originalRequest.baseURL || '') + (originalRequest.url || '');
      
      if (fullUrl && (
        fullUrl.includes('/api/news') ||
        fullUrl.includes('/api/products') ||
        fullUrl.includes('/api/services') ||
        fullUrl.includes('/api/notifications') ||
        fullUrl.includes('/api/notification-category') ||
        fullUrl.includes('/api/dashboard')
      )) {
        console.warn('⚠️ 401 on content endpoint - may be UserLevel restricted, not authentication issue');
        console.warn('⚠️ NOT redirecting to login, letting component handle the error');
        return Promise.reject(error);
      }
      
      console.warn('🔒 Attempting token refresh...');
      
      // Check if we have refresh token
      const refreshToken = localStorage.getItem('refreshToken');
      const accessToken = localStorage.getItem('auth_token');
      
      if (refreshToken && accessToken) {
        try {
          const refreshResponse = await axios.post(`${api.defaults.baseURL}/api/auth/refresh-token`, {
            accessToken,
            refreshToken
          });
          
          if (refreshResponse.data && refreshResponse.data.status === 1 && refreshResponse.data.data) {
            const { token } = refreshResponse.data.data;
            localStorage.setItem('auth_token', token);
            
            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error('❌ Token refresh failed:', refreshError);
        }
      }
      
      // If refresh fails or no refresh token, redirect to login
      console.error('❌ Authentication failed, redirecting to login');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user_data');
      window.location.href = '/dang-nhap';
      return Promise.reject(error);
    }
    
    // Handle backend error responses with proper format
    if (error.response?.data) {
      const errorData = error.response.data;
      console.error(`❌ API Response Error: ${error.response?.status} ${error.config?.url}`, errorData);
      
      // Log validation errors if available
      if (errorData.errors) {
        console.error('❌ Validation Errors:', errorData.errors);
      }
      
      if (errorData.status === 0) {
        console.error(`❌ Backend Error: ${errorData.Message} (Code: ${errorData.Code})`);
      }
    } else {
      console.error(`❌ Network Error: ${error.message}`);
      
      // Add more specific network error handling
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        console.error('⏰ Request timeout - Backend is taking too long to respond');
        console.error('💡 Suggestions: Check backend performance, database connections, or increase timeout');
      } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error') || error.message.includes('ERR_CONNECTION_REFUSED')) {
        console.error('❌ Connection refused - Backend server may be down or unreachable');
        console.error('💡 Suggestions: Verify backend is running, check URL and port');
      } else {
        console.error('💡 Unknown network error - Check network connection and backend status');
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;