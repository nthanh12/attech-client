import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

// JWT token utilities
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

const isTokenExpired = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};

// Available permissions in the system - map API permissions to frontend constants
const PERMISSIONS = {
  // Public permissions
  VIEW_PUBLIC_NEWS: 'view_news',
  
  // Employee permissions  
  VIEW_NEWS_TABLE: 'view_news',
  ACCESS_INTERNAL_DOCS: 'menu_view', // For any authenticated user with menu access
  ACCESS_LIBRARY: 'menu_view', // For any authenticated user with menu access
  
  // Content management - need any of the related permissions
  MANAGE_ARTICLES: 'edit_news', // Can manage if can edit
  EDIT_ARTICLES: 'edit_news', 
  CREATE_ARTICLES: 'create_news',
  DELETE_ARTICLES: 'delete_news',
  
  // Admin permissions
  MANAGE_USERS: 'menu_user_manager', // More specific permission
  MANAGE_ROLES: 'menu_role_manager', // Role management permission
  MANAGE_PERMISSIONS: 'menu_permission_manager', // Permission management  
  MANAGE_SYSTEM: 'menu_view',
  SEO_MANAGEMENT: 'menu_view', // Admin with menu access can manage SEO
  LANGUAGE_MANAGEMENT: 'menu_view', // Admin with menu access can manage language
  FILE_MANAGEMENT: 'file_upload',
  
  // Other system permissions
  MANAGE_CATEGORIES: 'menu_view', // Admin with menu access can manage categories
  MANAGE_SERVICES: 'view_services',
  MANAGE_PRODUCTS: 'view_products', 
  MANAGE_NOTIFICATIONS: 'view_notifications',
  VIEW_ANALYTICS: 'menu_view'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      // Check if token is expired
      if (isTokenExpired(token)) {
        localStorage.removeItem('auth_token');
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // Step 1: Validate token with server to get fresh user data
        const response = await api.get('/api/auth/me');
        
        if (response.data.status === 1 && response.data.data) {
          const user = response.data.data;
          const userData = {
            id: user.id,
            name: user.fullName || user.username,
            email: user.email,
            username: user.username,
            phone: user.phone,
            permissions: user.permissions || [],
            userType: user.userType,
            userLevel: user.userLevel || 
              (user.userType === 'superadmin' ? 'system' : 
               user.userType === 'admin' ? 'manager' : 
               user.userType === 'editor' ? 'staff' : 'staff'), // Map all userType variations to userLevel
            roleNames: user.roleNames || [],
            roles: user.roles || [],
            status: user.status,
            lastLogin: user.lastLogin
          };
          setUser(userData);
        } else {
          throw new Error('Invalid server response');
        }
      } catch (error) {
        // If error is 403 (permission denied), keep user logged in with stored user data
        if (error.response?.status === 403) {
          // Try to get user data from localStorage first
          const storedUserData = localStorage.getItem('user_data');
          if (storedUserData) {
            try {
              const user = JSON.parse(storedUserData);
              const userData = {
                id: user.id,
                name: user.fullName || user.username,
                email: user.email,
                username: user.username,
                permissions: user.permissions || [],
                userType: user.userType,
                userLevel: user.userLevel || (user.userType === 'editor' ? 'staff' : 'staff'),
                status: user.status
              };
              setUser(userData);
              return;
            } catch (e) {
              // Failed to parse stored user data
            }
          }
          
          // Fallback to JWT
          const decoded = decodeJWT(token);
          
          if (decoded && decoded.exp > Date.now() / 1000) {
            const userData = {
              id: decoded.sub,
              name: decoded.name || decoded.username,
              email: decoded.email,
              username: decoded.username || decoded.name,
              permissions: decoded.permissions || [],
              userType: decoded.user_type || 'editor',
              userLevel: decoded.user_level || (decoded.user_type === 'editor' ? 'staff' : 'staff'),
              status: 'active'
            };
            setUser(userData);
          } else {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            setUser(null);
          }
        } else {
          // For other errors, try JWT fallback
          const decoded = decodeJWT(token);
          
          if (decoded && decoded.exp > Date.now() / 1000) {
            const userData = {
              id: decoded.sub,
              name: decoded.name || decoded.username,
              email: decoded.email,
              username: decoded.username || decoded.name,
              permissions: decoded.permissions || [],
              userType: decoded.user_type || 'admin',
              userLevel: decoded.user_level || 'manager',
              status: 'active'
            };
            setUser(userData);
          } else {
            localStorage.removeItem('auth_token');
            setUser(null);
          }
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      
      // Try real API call first
      try {
        const response = await api.post('/api/auth/login', {
          username: credentials.username,
          password: credentials.password
        });
        
        // Handle API response format: { status: 1, data: { success: true, token: "...", user: {...} } }
        if (response.data.status === 1 && response.data.data && response.data.data.success && response.data.data.token) {
          const { token, user } = response.data.data;
          
          // Store token and user data from backend
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_data', JSON.stringify(user));
          
          // Use user data from API response instead of decoding JWT
          const userData = {
            id: user.id,
            name: user.fullName || user.username,
            email: user.email,
            username: user.username,
            phone: user.phone,
            permissions: user.permissions || [],
            userType: user.userType,
            userLevel: user.userLevel || 
              (user.userType === 'superadmin' ? 'system' : 
               user.userType === 'admin' ? 'manager' : 
               user.userType === 'editor' ? 'staff' : 'staff'), // Map all userType variations to userLevel
            roleNames: user.roleNames || [],
            roles: user.roles || [],
            status: user.status,
            lastLogin: user.lastLogin
          };
          
          setUser(userData);
          return { success: true, user: userData };
        } else {
          throw new Error(response.data.message || 'Login failed');
        }
      } catch (apiError) {
        // Check if it's a network error
        if (apiError.code === 'ERR_NETWORK' || apiError.message.includes('Network Error') || apiError.message.includes('ERR_CONNECTION_REFUSED')) {
          throw new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.');
        }
        
        // Check if it's a server error (5xx)
        if (apiError.response?.status >= 500) {
          throw new Error('Máy chủ đang gặp sự cố. Vui lòng thử lại sau.');
        }
        
        // Check if it's an authentication error (401)
        if (apiError.response?.status === 401) {
          throw new Error('Tài khoản không tồn tại hoặc sai mật khẩu');
        }
        
        // For other API errors, show the error message
        if (apiError.response?.data?.message || apiError.response?.data?.Message) {
          const errorMsg = apiError.response.data.message || apiError.response.data.Message;
          throw new Error(errorMsg);
        }
        
        // No fallback - just throw the error
        throw apiError;
      }
      
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const hasPermission = (permission) => {
    if (!user || !user.permissions) {
      return false;
    }
    
    const userPerms = user.permissions;
    
    // Basic permission check
    if (userPerms.includes(permission)) {
      return true;
    }
    
    // Enhanced permission logic for flexible access
    switch (permission) {
      // Content management permissions
      case 'edit_news':
        return userPerms.includes('edit_news') || userPerms.includes('create_news') || userPerms.includes('delete_news') || userPerms.includes('menu_news_manager');
      
      case 'view_news':
        return userPerms.includes('view_news') || userPerms.includes('edit_news') || userPerms.includes('menu_news_manager');
      
      // Notification management permissions
      case 'view_notifications':
        return userPerms.includes('view_notifications') || userPerms.includes('edit_notification') || userPerms.includes('menu_notification_manager');
      
      case 'menu_notification_manager':
        return userPerms.includes('menu_notification_manager') || userPerms.includes('view_notifications') || userPerms.includes('edit_notification') || userPerms.includes('create_notification');
      
      // User management permissions  
      case 'menu_user_manager':
        return userPerms.includes('menu_user_manager') || userPerms.includes('view_users') || userPerms.includes('edit_user') || userPerms.includes('create_user');
      
      case 'view_users':
        return userPerms.includes('view_users') || userPerms.includes('menu_user_manager') || userPerms.includes('edit_user');
      
      // Role management permissions
      case 'menu_role_manager':
        return userPerms.includes('menu_role_manager') || userPerms.includes('view_roles') || userPerms.includes('edit_role') || userPerms.includes('create_role') || userPerms.includes('menu_view');
      
      case 'view_roles':
        return userPerms.includes('view_roles') || userPerms.includes('menu_role_manager') || userPerms.includes('edit_role') || userPerms.includes('menu_view');
      
      // Permission management permissions  
      case 'menu_permission_manager':
        return userPerms.includes('menu_permission_manager') || userPerms.includes('menu_role_manager') || userPerms.includes('view_permissions') || userPerms.includes('edit_permission') || userPerms.includes('create_permission') || userPerms.includes('menu_view');
      
      case 'view_permissions':
        return userPerms.includes('view_permissions') || userPerms.includes('menu_permission_manager') || userPerms.includes('edit_permission') || userPerms.includes('menu_view');
      
      // Album management permissions
      case 'view_albums':
        return userPerms.includes('view_albums') || userPerms.includes('edit_albums') || userPerms.includes('menu_album_manager') || userPerms.includes('menu_view');
      
      case 'edit_albums':
        return userPerms.includes('edit_albums') || userPerms.includes('create_albums') || userPerms.includes('delete_albums') || userPerms.includes('menu_album_manager');
      
      // Menu access - admin với menu_view có thể truy cập hầu hết
      case 'menu_view':
        return userPerms.includes('menu_view') || userPerms.includes('menu_user_manager') || userPerms.includes('menu_role_manager') || userPerms.includes('menu_news_manager');
      
      default:
        return false;
    }
  };

  const hasAnyPermission = (permissions) => {
    return permissions.some(permission => hasPermission(permission));
  };

  const getUserPermissions = () => {
    return user?.permissions || [];
  };

  const isAuthenticated = () => {
    const authenticated = !!user;
    return authenticated;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    hasAnyPermission,
    getUserPermissions,
    isAuthenticated,
    PERMISSIONS,
    decodeJWT,
    isTokenExpired
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { PERMISSIONS };