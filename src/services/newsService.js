import api from "../api";
import { mockNews } from "../utils/mockNews";
import { mockNewsCategories } from "../utils/mockNewsCategories";

// Tin tức
export async function fetchNewsWithFallback() {
  try {
    const response = await api.get("/news");
    if (!response.data || !Array.isArray(response.data)) throw new Error("No data");
    return response.data;
  } catch (error) {
    console.error("fetchNewsWithFallback error:", error);
    return mockNews;
  }
}

export async function fetchNewsCategoriesWithFallback() {
  try {
    const response = await api.get("/news-categories");
    if (!response.data || !Array.isArray(response.data)) throw new Error("No data");
    return response.data;
  } catch (error) {
    console.error("fetchNewsCategoriesWithFallback error:", error);
    return mockNewsCategories;
  }
}

// CRUD cho news
export const getNews = async (params = {}) => {
  const response = await api.get("/news", { params });
  return response.data;
};

export const getNewsById = async (id) => {
  const response = await api.get(`/news/${id}`);
  return response.data;
};

export const createNews = async (data) => {
  const response = await api.post("/news", data);
  return response.data;
};

export const updateNews = async (id, data) => {
  const response = await api.put(`/news/${id}`, data);
  return response.data;
};

export const deleteNews = async (id) => {
  const response = await api.delete(`/news/${id}`);
  return response.data;
};

// CRUD cho danh mục news
export const getNewsCategories = async () => {
  const response = await api.get("/news-categories");
  return response.data;
};

export const getNewsCategoryById = async (id) => {
  const response = await api.get(`/news-categories/${id}`);
  return response.data;
};

export const createNewsCategory = async (data) => {
  const response = await api.post("/news-categories", data);
  return response.data;
};

export const updateNewsCategory = async (id, data) => {
  const response = await api.put(`/news-categories/${id}`, data);
  return response.data;
};

export const deleteNewsCategory = async (id) => {
  const response = await api.delete(`/news-categories/${id}`);
  return response.data;
}; 