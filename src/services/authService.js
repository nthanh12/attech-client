import api from "../api";

// Enhanced Authentication Service with JWT handling
export const login = async (username, password) => {
  try {
    console.log("🔐 Attempting login...");
    const response = await api.post("/api/auth/login", {
      username,
      password
    });
    
    // Handle backend response format: {status: 1, data: {token: "..."}}
    if (response.data && response.data.status === 1 && response.data.data) {
      const { token } = response.data.data;
      
      if (token) {
        // Store token in localStorage
        localStorage.setItem('token', token);
        console.log("✅ Login successful, token stored");
        
        return {
          success: true,
          token: token,
          message: response.data.message || "Login successful"
        };
      }
    }
    
    throw new Error(response.data?.message || "Invalid login response");
    
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Login failed"
    };
  }
};

export const register = async (userData) => {
  try {
    console.log("📝 Attempting registration...");
    const response = await api.post("/api/auth/register", userData);
    
    // Handle backend response format
    if (response.data && response.data.status === 1) {
      console.log("✅ Registration successful");
      
      return {
        success: true,
        message: response.data.message || "Registration successful"
      };
    }
    
    throw new Error(response.data?.message || "Registration failed");
    
  } catch (error) {
    console.error("❌ Registration failed:", error.response?.data || error.message);
    
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Registration failed"
    };
  }
};

export const logout = () => {
  console.log("🚪 Logging out...");
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    // Simple token validation (check if not expired)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    return payload.exp > currentTime;
  } catch (error) {
    console.error("❌ Token validation error:", error);
    return false;
  }
};

export const getCurrentUser = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      username: payload.sub || payload.username,
      roles: payload.roles || [],
      exp: payload.exp
    };
  } catch (error) {
    console.error("❌ Error parsing token:", error);
    return null;
  }
};

export default {
  login,
  register,
  logout,
  getToken,
  isAuthenticated,
  getCurrentUser
}; 