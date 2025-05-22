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

export default api;
