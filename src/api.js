import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7276/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// News Category APIs
export const getNewsCategories = async () => {
  const response = await api.get("/news-category/find-all");
  return response.data.data.items || [];
};

export const createNewsCategory = async (category) => {
  const response = await api.post("/news-category/create", category);
  return response.data.data || response.data;
};

export const updateNewsCategory = async (category) => {
  const response = await api.put("/news-category/update", category);
  return response.data;
};

export const deleteNewsCategory = async (id) => {
  const response = await api.delete(`/news-category/delete/${id}`);
  return response.data;
};

export const updateNewsCategoryStatus = async ({ id, status }) => {
  const response = await api.put("/news-category/update-status", {
    id,
    status,
  });
  return response.data;
};

// Product Category APIs
export const getProductCategories = async () => {
  const response = await api.get("/product-category/find-all");
  return response.data.data.items || [];
};

export const createProductCategory = async (category) => {
  const response = await api.post("/product-category/create", category);
  return response.data.data || response.data;
};

export const updateProductCategory = async (category) => {
  const response = await api.put("/product-category/update", category);
  return response.data;
};

export const deleteProductCategory = async (id) => {
  const response = await api.delete(`/product-category/delete/${id}`);
  return response.data;
};

export const updateProductCategoryStatus = async ({ id, status }) => {
  const response = await api.put("/product-category/update-status", {
    id,
    status,
  });
  return response.data;
};

// Notification Category APIs
export const getNotificationCategories = async () => {
  const response = await api.get("/notification-category/find-all");
  return response.data.data.items || [];
};

export const createNotificationCategory = async (category) => {
  const response = await api.post("/notification-category/create", category);
  return response.data.data || response.data;
};

export const updateNotificationCategory = async (category) => {
  const response = await api.put("/notification-category/update", category);
  return response.data;
};

export const deleteNotificationCategory = async (id) => {
  const response = await api.delete(`/notification-category/delete/${id}`);
  return response.data;
};

export const updateNotificationCategoryStatus = async ({ id, status }) => {
  const response = await api.put("/notification-category/update-status", {
    id,
    status,
  });
  return response.data;
};

// Product APIs
export const getProducts = async () => {
  const response = await api.get("/product/find-all");
  return response.data.data.items || [];
};

export const createProduct = async (category) => {
  const response = await api.post("/product/create", category);
  return response.data.data || response.data;
};

export const updateProduct = async (category) => {
  const response = await api.put("/product/update", category);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/product/delete/${id}`);
  return response.data;
};

export const updateProductStatus = async ({ id, status }) => {
  const response = await api.put("/product/update-status", {
    id,
    status,
  });
  return response.data;
};

// News APIs
export const getNews = async () => {
  const response = await api.get("/news/find-all");
  return response.data.data.items || response.data.data || [];
};

export const createNews = async (news) => {
  const response = await api.post("/news/create", news);
  return response.data.data || response.data;
};

export const updateNews = async (news) => {
  const response = await api.put("/news/update", news);
  return response.data;
};

export const deleteNews = async (id) => {
  const response = await api.delete(`/news/delete/${id}`);
  return response.data;
};

export const updateNewsStatus = async ({ id, status }) => {
  const response = await api.put("/news/update-status", {
    id,
    status,
  });
  return response.data;
};

// Notification APIs
export const getNotifications = async () => {
  const response = await api.get("/notification/find-all");
  return response.data.data.items || response.data.data || [];
};

export const createNotification = async (notification) => {
  const response = await api.post("/notification/create", notification);
  return response.data.data || response.data;
};

export const updateNotification = async (notification) => {
  const response = await api.put("/notification/update", notification);
  return response.data;
};

export const deleteNotification = async (id) => {
  const response = await api.delete(`/notification/delete/${id}`);
  return response.data;
};

export const updateNotificationStatus = async ({ id, status }) => {
  const response = await api.put("/notification/update-status", {
    id,
    status,
  });
  return response.data;
};

// Upload APIs
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post("/upload/image", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Service Category APIs
export const getServiceCategories = async () => {
  const response = await api.get("/service-category/find-all");
  return response.data.data.items || [];
};

export const createServiceCategory = async (category) => {
  const response = await api.post("/service-category/create", category);
  return response.data.data || response.data;
};

export const updateServiceCategory = async (category) => {
  const response = await api.put("/service-category/update", category);
  return response.data;
};

export const deleteServiceCategory = async (id) => {
  const response = await api.delete(`/service-category/delete/${id}`);
  return response.data;
};

export const updateServiceCategoryStatus = async ({ id, status }) => {
  const response = await api.put("/service-category/update-status", {
    id,
    status,
  });
  return response.data;
};

// Service APIs
export const getServices = async () => {
  const response = await api.get("/service/find-all");
  return response.data.data.items || response.data.data || [];
};

export const createService = async (service) => {
  const response = await api.post("/service/create", service);
  return response.data.data || response.data;
};

export const updateService = async (service) => {
  const response = await api.put("/service/update", service);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await api.delete(`/service/delete/${id}`);
  return response.data;
};

export const updateServiceStatus = async ({ id, status }) => {
  const response = await api.put("/service/update-status", {
    id,
    status,
  });
  return response.data;
};

export default api;
