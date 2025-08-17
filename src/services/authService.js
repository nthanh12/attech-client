import api from '../api';

/**
 * Đăng ký user mới (Admin only)
 * @param {Object} userData - User data
 * @param {string} userData.username - Tên đăng nhập
 * @param {string} userData.password - Mật khẩu
 * @param {string} userData.fullName - Tên đầy đủ
 * @param {string} userData.email - Email (optional)
 * @param {string} userData.phone - Số điện thoại (optional)
 * @param {number} userData.userType - Loại user: 1=system, 2=manager, 3=staff
 * @param {number} userData.status - Trạng thái: 1=active, 0=inactive
 * @param {Array} userData.roleIds - Danh sách role IDs
 * @returns {Promise<Object>} Response data
 */
export const register = async (userData) => {
  try {
    console.log("👤 Attempting user registration...");
    const response = await api.post("/api/auth/register", userData);
    
    console.log("📡 Register response:", response.data);
    
    if (response.data.status === 1) {
      console.log("✅ User registration successful");
      
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || "User registration successful"
      };
    }
    
    return {
      success: false,
      message: response.data.message || "User registration failed"
    };
    
  } catch (error) {
    console.error("❌ User registration failed:", error.response?.data || error.message);
    console.error("🔍 Full error response:", error.response);
    console.error("🔍 Request data sent:", userData);
    
    return {
      success: false,
      message: error.response?.data?.Message || error.message || "User registration failed"
    };
  }
};

export const login = async (username, password) => {
  try {
    console.log("🔐 Attempting login...");
    const response = await api.post("/api/auth/login", {
      username,
      password
    });

    console.log("📡 Login response:", response.data);

    if (response.data.status === 1 && response.data.data) {
      const { token, user } = response.data.data;
      
      // Store token
      localStorage.setItem('auth_token', token);
      
      console.log("✅ Login successful, token stored");
      
      return {
        success: true,
        user: user,
        message: response.data.message || "Login successful"
      };
    }

    // If status is not 1, it's a failed login
    return {
      success: false,
      message: response.data.message || "Login failed"
    };

  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    
    return {
      success: false,
      message: error.response?.data?.Message || error.message || "Login failed"
    };
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    console.log("🔐 Attempting password change...");
    const response = await api.post("/api/auth/change-password", {
      currentPassword,
      newPassword
    });

    console.log("📡 Change password response:", response.data);

    if (response.data.status === 1) {
      console.log("✅ Password changed successfully");
      
      return {
        success: true,
        message: response.data.message || "Password changed successfully"
      };
    }

    return {
      success: false,
      message: response.data.message || "Password change failed"
    };

  } catch (error) {
    console.error("❌ Password change failed:", error.response?.data || error.message);
    
    return {
      success: false,
      message: error.response?.data?.Message || error.message || "Password change failed"
    };
  }
};

export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refreshToken');
  console.log("🚪 Logged out, tokens cleared");
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('auth_token');
  return !!token;
};

export const getToken = () => {
  return localStorage.getItem('auth_token');
};

export const refreshToken = async () => {
  try {
    const currentToken = localStorage.getItem('auth_token');
    
    if (!currentToken) {
      throw new Error('No token available');
    }

    const response = await api.post('/api/auth/refresh-token', {
      token: currentToken
    });

    if (response.data.status === 1 && response.data.data) {
      const { token } = response.data.data;
      localStorage.setItem('auth_token', token);
      console.log("✅ Token refreshed successfully");
      return true;
    }

    throw new Error('Token refresh failed');

  } catch (error) {
    console.error("❌ Token refresh failed:", error);
    logout();
    return false;
  }
};

// Mock user data for development
export const getMockUser = () => {
  return {
    id: 1,
    username: 'admin',
    name: 'Administrator',
    email: 'admin@attech.com',
    role: 'admin',
    permissions: [
      'menu_view',
      'view_news',
      'create_news',
      'edit_news',
      'delete_news',
      'view_products',
      'create_products',
      'edit_products',
      'delete_products',
      'view_services',
      'create_services',
      'edit_services',
      'delete_services',
      'view_notifications',
      'create_notifications',
      'edit_notifications',
      'delete_notifications',
      'manage_users',
      'manage_roles',
      'manage_permissions',
      'system_settings',
      'file_upload',
      'seo_management',
      'language_management'
    ],
    lastLogin: '2024-01-15T10:30:00Z',
    status: 'active'
  };
};

 