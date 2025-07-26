import api from "../api";
import { mockNews } from "../utils/mockNews";
import { mockNewsCategories } from "../utils/mockNewsCategories";

// Tin tức với correct backend endpoint
export async function fetchNewsWithFallback() {
  try {
    console.log("🔍 Fetching news from backend: GET /api/news/find-all");
    const response = await api.get("/api/news/find-all");
    
    // Handle new backend response format: {status: 1, data: {items: [], totalItems: 0}}
    if (response.data && response.data.status === 1 && response.data.data) {
      const newsData = response.data.data.items || [];
      console.log("✅ News data loaded successfully", newsData);
      return newsData;
    }
    
    // Fallback: Handle direct array
    if (response.data && Array.isArray(response.data)) {
      console.log("✅ News data loaded (direct array)", response.data);
      return response.data;
    }
    
    throw new Error("Invalid data format");
    
  } catch (error) {
    console.error("❌ Failed to fetch news from backend:", error.response?.status, error.message);
    console.log("⚠️ Using mock news data");
    return mockNews;
  }
}

export async function fetchNewsCategoriesWithFallback() {
  try {
    console.log("🔍 Fetching news categories from backend: GET /api/news-categories/find-all");
    const response = await api.get("/api/news-categories/find-all");
    
    // Handle new backend response format: {status: 1, data: {items: [], totalItems: 0}}
    if (response.data && response.data.status === 1 && response.data.data) {
      const categoriesData = response.data.data.items || [];
      console.log("✅ News categories loaded successfully", categoriesData);
      return categoriesData;
    }
    
    // Fallback: Handle direct array
    if (response.data && Array.isArray(response.data)) {
      console.log("✅ News categories loaded (direct array)", response.data);
      return response.data;
    }
    
    throw new Error("Invalid data format");
    
  } catch (error) {
    console.error("❌ Failed to fetch news categories from backend:", error.response?.status, error.message);
    console.log("⚠️ Using mock news categories data");
    return mockNewsCategories;
  }
}

// CRUD cho news - Using correct backend endpoints
export const getNews = async (params = {}) => {
  const response = await api.get("/api/news/find-all", { params });
  return response.data;
};

export const getNewsById = async (id) => {
  const response = await api.get(`/api/news/find-by-id/${id}`);
  return response.data;
};

export const getNewsBySlug = async (slug) => {
  const response = await api.get(`/api/news/detail/${slug}`);
  return response.data;
};

export const createNews = async (data) => {
  const response = await api.post("/api/news/create", data);
  return response.data;
};

export const updateNews = async (data) => {
  const response = await api.put("/api/news/update", data);
  return response.data;
};

export const deleteNews = async (id) => {
  const response = await api.delete(`/api/news/delete/${id}`);
  return response.data;
};

export const updateNewsStatus = async (id, status) => {
  const response = await api.put("/api/news/update-post-status", { id, status });
  return response.data;
};

// CRUD cho danh mục news - Using correct backend endpoints
export const getNewsCategories = async () => {
  const response = await api.get("/api/news-categories/find-all");
  return response.data;
};

export const getNewsCategoryById = async (id) => {
  const response = await api.get(`/api/news-categories/find-by-id/${id}`);
  return response.data;
};

export const createNewsCategory = async (data) => {
  const response = await api.post("/api/news-categories/create", data);
  return response.data;
};

export const updateNewsCategory = async (data) => {
  const response = await api.put("/api/news-categories/update", data);
  return response.data;
};

export const deleteNewsCategory = async (id) => {
  const response = await api.delete(`/api/news-categories/delete/${id}`);
  return response.data;
}; 