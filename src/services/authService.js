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

export const changePassword = async (passwordData) => {
  try {
    console.log("🔐 Attempting password change...");
    const response = await api.post("/api/auth/change-password", {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
      confirmPassword: passwordData.confirmPassword
    });

    console.log("📡 Change password response:", response.data);

    if (response.data.status === 1) {
      console.log("✅ Password changed successfully");
      
      return {
        success: true,
        message: response.data.message || "Đổi mật khẩu thành công"
      };
    }

    return {
      success: false,
      message: response.data.message || "Đổi mật khẩu thất bại"
    };

  } catch (error) {
    console.error("❌ Password change failed:", error.response?.data || error.message);
    
    // Handle different error cases
    if (error.response?.status === 400) {
      return {
        success: false,
        message: error.response.data?.message || "Thông tin không hợp lệ"
      };
    } else if (error.response?.status === 401) {
      return {
        success: false,
        message: "Mật khẩu hiện tại không đúng"
      };
    } else {
      return {
        success: false,
        message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi đổi mật khẩu"
      };
    }
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


 