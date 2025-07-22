import api from "../api";

// Thông báo
export const getNotifications = async (params = {}) => {
  const response = await api.get("/notifications", { params });
  return response.data;
};

export const getNotificationById = async (id) => {
  const response = await api.get(`/notifications/${id}`);
  return response.data;
};

export const createNotification = async (data) => {
  const response = await api.post("/notifications", data);
  return response.data;
};

export const updateNotification = async (id, data) => {
  const response = await api.put(`/notifications/${id}`, data);
  return response.data;
};

export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};

// Danh mục thông báo
export const getNotificationCategories = async () => {
  const response = await api.get("/notification-categories");
  return response.data;
};

export const getNotificationCategoryById = async (id) => {
  const response = await api.get(`/notification-categories/${id}`);
  return response.data;
};

export const createNotificationCategory = async (data) => {
  const response = await api.post("/notification-categories", data);
  return response.data;
};

export const updateNotificationCategory = async (id, data) => {
  const response = await api.put(`/notification-categories/${id}`, data);
  return response.data;
};

export const deleteNotificationCategory = async (id) => {
  const response = await api.delete(`/notification-categories/${id}`);
  return response.data;
}; 