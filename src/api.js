import axios from "axios";
import { mockNews } from './utils/mockNews';
import { mockNotifications } from './utils/mockNotifications';
import { mockProducts } from './utils/mockProducts';
import { mockServices } from './utils/mockServices';
import { mockRoutes } from './utils/mockRoutes';

const api = axios.create({
  baseURL: "https://localhost:7276/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// News Category APIs
export const getNewsCategories = async () => {
  try {
    // TODO: Replace with real API call
    // const response = await fetch('/api/news-categories');
    // return await response.json();
    
    // Mock data for now
    const mockCategories = [
      { id: 1, name: "Công đoàn", slug: "union" },
      { id: 2, name: "Đảng bộ", slug: "party" },
      { id: 3, name: "Hoạt động", slug: "activities" },
      { id: 4, name: "Thể thao", slug: "sport" },
      { id: 5, name: "Khoa học", slug: "science" },
      { id: 6, name: "Công nghệ", slug: "technology" },
      { id: 7, name: "Giáo dục", slug: "education" },
      { id: 8, name: "Y tế", slug: "health" }
    ];
    
    return { data: mockCategories, success: true };
  } catch (error) {
    console.error('Error fetching news categories:', error);
    return { data: [], success: false, error: error.message };
  }
};

export const createNewsCategory = async (categoryData) => {
  try {
    // TODO: Replace with real API call
    // const response = await fetch('/api/news-categories', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(categoryData)
    // });
    // return await response.json();
    
    // Mock response
    return { 
      data: { ...categoryData, id: Date.now() }, 
      success: true,
      message: 'Category created successfully'
    };
  } catch (error) {
    console.error('Error creating news category:', error);
    return { success: false, error: error.message };
  }
};

export const updateNewsCategory = async (id, categoryData) => {
  try {
    // TODO: Replace with real API call
    // const response = await fetch(`/api/news-categories/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(categoryData)
    // });
    // return await response.json();
    
    // Mock response
    return { 
      data: { ...categoryData, id }, 
      success: true,
      message: 'Category updated successfully'
    };
  } catch (error) {
    console.error('Error updating news category:', error);
    return { success: false, error: error.message };
  }
};

export const deleteNewsCategory = async (id) => {
  try {
    // TODO: Replace with real API call
    // const response = await fetch(`/api/news-categories/${id}`, {
    //   method: 'DELETE'
    // });
    // return await response.json();
    
    // Mock response
    return { 
      success: true,
      message: 'Category deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting news category:', error);
    return { success: false, error: error.message };
  }
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

// Notifications API
export const getNotifications = async (params = {}) => {
  try {
    // TODO: Replace with real API call
    // const queryString = new URLSearchParams(params).toString();
    // const response = await fetch(`/api/notifications?${queryString}`);
    // return await response.json();
    
    // Import mock data
    // const { mockNotifications } = await import('../utils/mockNotifications.js');
    
    // Filter by type if provided
    let filteredNotifications = mockNotifications;
    if (params.type) {
      filteredNotifications = mockNotifications.filter(notification => notification.type === params.type);
    }

    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);

    return {
      data: paginatedNotifications,
      pagination: {
        page,
        limit,
        total: filteredNotifications.length,
        totalPages: Math.ceil(filteredNotifications.length / limit)
      },
      success: true
    };
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return { data: [], success: false, error: error.message };
  }
};

export const getNotificationById = async (id) => {
  try {
    // TODO: Replace with real API call
    // const response = await fetch(`/api/notifications/${id}`);
    // return await response.json();
    
    // Import mock data
    // const { mockNotifications } = await import('../utils/mockNotifications.js');
    const notification = mockNotifications.find(n => n.id === parseInt(id));
    
    if (notification) {
      return { data: notification, success: true };
    } else {
      return { data: null, success: false, error: 'Notification not found' };
    }
  } catch (error) {
    console.error('Error fetching notification:', error);
    return { data: null, success: false, error: error.message };
  }
};

// Products API
export const getProducts = async (params = {}) => {
  try {
    // TODO: Replace with real API call
    // const queryString = new URLSearchParams(params).toString();
    // const response = await fetch(`/api/products?${queryString}`);
    // return await response.json();
    
    // Import mock data
    // const { mockProducts } = await import('../utils/mockProducts.js');
    
    // Filter by category if provided
    let filteredProducts = mockProducts;
    if (params.category) {
      filteredProducts = mockProducts.filter(product => product.category === params.category);
    }

    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit)
      },
      success: true
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: [], success: false, error: error.message };
  }
};

export const getProductById = async (id) => {
  try {
    // TODO: Replace with real API call
    // const response = await fetch(`/api/products/${id}`);
    // return await response.json();
    
    // Import mock data
    // const { mockProducts } = await import('../utils/mockProducts.js');
    const product = mockProducts.find(p => p.id === parseInt(id));
    
    if (product) {
      return { data: product, success: true };
    } else {
      return { data: null, success: false, error: 'Product not found' };
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    return { data: null, success: false, error: error.message };
  }
};

export const getProductBySlug = async (slug) => {
  try {
    // TODO: Replace with real API call
    // const response = await fetch(`/api/products/slug/${slug}`);
    // return await response.json();
    
    // Import mock data
    // const { mockProducts } = await import('../utils/mockProducts.js');
    const product = mockProducts.find(p => p.slug === slug);
    
    if (product) {
      return { data: product, success: true };
    } else {
      return { data: null, success: false, error: 'Product not found' };
    }
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return { data: null, success: false, error: error.message };
  }
};

// Services API
export const getServices = async (params = {}) => {
  try {
    // TODO: Replace with real API call
    // const queryString = new URLSearchParams(params).toString();
    // const response = await fetch(`/api/services?${queryString}`);
    // return await response.json();
    
    // Import mock data
    // const { mockServices } = await import('../utils/mockServices.js');
    
    // Filter by category if provided
    let filteredServices = mockServices;
    if (params.category) {
      filteredServices = mockServices.filter(service => service.category === params.category);
    }

    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedServices = filteredServices.slice(startIndex, endIndex);

    return {
      data: paginatedServices,
      pagination: {
        page,
        limit,
        total: filteredServices.length,
        totalPages: Math.ceil(filteredServices.length / limit)
      },
      success: true
    };
  } catch (error) {
    console.error('Error fetching services:', error);
    return { data: [], success: false, error: error.message };
  }
};

export const getServiceById = async (id) => {
  try {
    // TODO: Replace with real API call
    // const response = await fetch(`/api/services/${id}`);
    // return await response.json();
    
    // Import mock data
    // const { mockServices } = await import('../utils/mockServices.js');
    const service = mockServices.find(s => s.id === parseInt(id));
    
    if (service) {
      return { data: service, success: true };
    } else {
      return { data: null, success: false, error: 'Service not found' };
    }
  } catch (error) {
    console.error('Error fetching service:', error);
    return { data: null, success: false, error: error.message };
  }
};

export const getServiceBySlug = async (slug) => {
  try {
    // TODO: Replace with real API call
    // const response = await fetch(`/api/services/slug/${slug}`);
    // return await response.json();
    
    // Import mock data
    // const { mockServices } = await import('../utils/mockServices.js');
    const service = mockServices.find(s => s.slug === slug);
    
    if (service) {
      return { data: service, success: true };
    } else {
      return { data: null, success: false, error: 'Service not found' };
    }
  } catch (error) {
    console.error('Error fetching service by slug:', error);
    return { data: null, success: false, error: error.message };
  }
};

// News APIs
export const getNews = async (params = {}) => {
  try {
    // TODO: Replace with real API call
    // const queryString = new URLSearchParams(params).toString();
    // const response = await fetch(`/api/news?${queryString}`);
    // return await response.json();
    
    // Filter by category if provided
    let filteredNews = mockNews;
    if (params.category) {
      filteredNews = mockNews.filter(news => news.postCategorySlug === params.category);
    }

    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedNews = filteredNews.slice(startIndex, endIndex);

    return {
      data: paginatedNews,
      pagination: {
        page,
        limit,
        total: filteredNews.length,
        totalPages: Math.ceil(filteredNews.length / limit)
      },
      success: true
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return { data: [], success: false, error: error.message };
  }
};

export const getNewsById = async (id) => {
  try {
    // TODO: Replace with real API call
    // const response = await fetch(`/api/news/${id}`);
    // return await response.json();
    
    const newsItem = mockNews.find(n => n.id === parseInt(id));
    
    if (newsItem) {
      return { data: newsItem, success: true };
    } else {
      return { data: null, success: false, error: 'News not found' };
    }
  } catch (error) {
    console.error('Error fetching news by id:', error);
    return { data: null, success: false, error: error.message };
  }
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

// Route APIs - Hiện tại dùng mock data, sau này thay bằng API thật
// import { mockRoutes } from '../utils/mockRoutes'; // This line is removed as per the edit hint

export const getRoutes = async () => {
  // TODO: Thay bằng API call thật
  // const response = await api.get("/routes/find-all");
  // return response.data.data.items || [];
  
  // Mock data cho development
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRoutes);
    }, 500);
  });
};

export const createRoute = async (route) => {
  // TODO: Thay bằng API call thật
  // const response = await api.post("/routes/create", route);
  // return response.data.data || response.data;
  
  // Mock response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: Date.now(), ...route });
    }, 500);
  });
};

export const updateRoute = async (route) => {
  // TODO: Thay bằng API call thật
  // const response = await api.put("/routes/update", route);
  // return response.data;
  
  // Mock response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(route);
    }, 500);
  });
};

export const deleteRoute = async (id) => {
  // TODO: Thay bằng API call thật
  // const response = await api.delete(`/routes/delete/${id}`);
  // return response.data;
  
  // Mock response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

export const getRoutesByRole = async (roleId) => {
  // TODO: Thay bằng API call thật
  // const response = await api.get(`/routes/find-by-role/${roleId}`);
  // return response.data.data.items || [];
  
  // Mock response - filter routes based on role
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredRoutes = mockRoutes.filter(route => !route.protected);
      resolve(filteredRoutes);
    }, 500);
  });
};

// --- Notification CRUD ---
export const createNotification = async (data) => {
  // Thêm vào mock (chỉ trả về, không lưu thật)
  return { data: { ...data, id: Date.now() }, success: true };
};
export const updateNotification = async (id, data) => {
  return { data: { ...data, id }, success: true };
};
export const deleteNotification = async (id) => {
  return { success: true };
};

// --- Product CRUD ---
export const createProduct = async (data) => {
  return { data: { ...data, id: Date.now() }, success: true };
};
export const updateProduct = async (id, data) => {
  return { data: { ...data, id }, success: true };
};
export const deleteProduct = async (id) => {
  return { success: true };
};

// --- Service CRUD ---
export const createService = async (data) => {
  return { data: { ...data, id: Date.now() }, success: true };
};
export const updateService = async (id, data) => {
  return { data: { ...data, id }, success: true };
};
export const deleteService = async (id) => {
  return { success: true };
};

export default api;