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
    console.log('Register request data:', userData);
    const response = await api.post("/api/auth/register", userData);

    console.log('Register response:', response.data);
    if (response.data.status === 1) {

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
    console.error('Register error:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    console.error('Validation errors:', error.response?.data?.errors);

    // Log each validation error for debugging
    if (error.response?.data?.errors) {
      Object.keys(error.response.data.errors).forEach(field => {
        console.error(`Validation error for ${field}:`, error.response.data.errors[field]);
      });
    }

    return {
      success: false,
      message: error.response?.data?.message || error.response?.data?.Message || error.message || "User registration failed",
      errors: error.response?.data?.errors
    };
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post("/api/auth/login", {
      username,
      password
    });


    if (response.data.status === 1 && response.data.data) {
      const { token, user } = response.data.data;
      
      // Store token
      localStorage.setItem('auth_token', token);
      
      
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
    
    return {
      success: false,
      message: error.response?.data?.Message || error.message || "Login failed"
    };
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await api.post("/api/auth/change-password", {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
      confirmPassword: passwordData.confirmPassword
    });


    if (response.data.status === 1) {
      
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
      return true;
    }

    throw new Error('Token refresh failed');

  } catch (error) {
    logout();
    return false;
  }
};


 