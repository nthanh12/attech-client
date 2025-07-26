import api from "../api";

// Notification endpoints (AttechServer API)
export const fetchNotifications = async (params = {}) => {
  try {
    console.log("🔍 Fetching notifications from backend: /api/notification/find-all");
    const response = await api.get("/api/notification/find-all", { params });
    
    // Handle AttechServer response format: {status: 1, data: {items: [], totalItems: 0}}
    if (response.data && response.data.status === 1 && response.data.data) {
      const notificationsData = response.data.data.items || [];
      console.log("✅ Notification data loaded successfully", notificationsData);
      return notificationsData;
    }
    
    // Fallback: Handle direct array
    if (response.data && Array.isArray(response.data)) {
      console.log("✅ Notification data loaded (direct array)", response.data);
      return response.data;
    }
    
    throw new Error("Invalid data format");
  } catch (error) {
    console.error("❌ Failed to fetch notifications from backend:", error.response?.status, error.message);
    console.log("⚠️ Using empty notifications array");
    return [];
  }
};

export const fetchNotificationsByCategory = async (slug) => {
  const response = await api.get(`/api/notification/category/${slug}`);
  return response.data;
};

// Notification Category endpoints (AttechServer API)
export const fetchNotificationCategories = async (params = {}) => {
  try {
    console.log("🔍 Fetching notification categories from backend: /api/notification-categories/find-all");
    const response = await api.get("/api/notification-categories/find-all", { params });
    
    // Handle AttechServer response format: {status: 1, data: {items: [], totalItems: 0}}
    if (response.data && response.data.status === 1 && response.data.data) {
      const categoriesData = response.data.data.items || [];
      console.log("✅ Notification categories loaded successfully", categoriesData);
      return categoriesData;
    }
    
    // Fallback: Handle direct array
    if (response.data && Array.isArray(response.data)) {
      console.log("✅ Notification categories loaded (direct array)", response.data);
      return response.data;
    }
    
    throw new Error("Invalid data format");
  } catch (error) {
    console.error("❌ Failed to fetch notification categories from backend:", error.response?.status, error.message);
    console.log("⚠️ Using empty categories array");
    return [];
  }
};

export const getNotificationCategoryById = async (id) => {
  const response = await api.get(`/api/notification-categories/find-by-id/${id}`);
  return response.data;
};

export const getNotificationCategoryBySlug = async (slug) => {
  const response = await api.get(`/api/notification-categories/detail/${slug}`);
  return response.data;
};

export const createNotificationCategory = async (data) => {
  const response = await api.post("/api/notification-categories/create", data);
  return response.data;
};

export const updateNotificationCategory = async (data) => {
  const response = await api.put("/api/notification-categories/update", data);
  return response.data;
};

export const deleteNotificationCategory = async (id) => {
  const response = await api.delete(`/api/notification-categories/delete/${id}`);
  return response.data;
}; 