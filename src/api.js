import axios from "axios";
import { getApiBaseUrl } from "./config/apiConfig";

// Retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

// Helper function to wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 60000, // Tăng timeout lên 60s để test
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
      console.log('🔴 Network Error:', error.code, error.message, originalRequest.url);

      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

      if (originalRequest._retryCount <= MAX_RETRIES) {
        console.log(`🔄 Retry ${originalRequest._retryCount}/${MAX_RETRIES} for:`, originalRequest.url);
        await wait(RETRY_DELAY * originalRequest._retryCount);
        return api(originalRequest);
      } else {
        console.log('❌ Max retries reached for:', originalRequest.url);
      }
    }
    

    if (error.response?.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;
      
      
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
        }
      }
      
      // If refresh fails or no refresh token, redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user_data');
      window.location.href = '/dang-nhap';
      return Promise.reject(error);
    }
    
    // Handle backend error responses with proper format
    if (error.response?.data) {
      const errorData = error.response.data;
      
      // Log validation errors if available
      if (errorData.errors) {
      }
      
      if (errorData.status === 0) {
      }
    } else {
      
      // Add more specific network error handling
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error') || error.message.includes('ERR_CONNECTION_REFUSED')) {
      } else {
      }
    }
    
    return Promise.reject(error);
  }
);


export default api;