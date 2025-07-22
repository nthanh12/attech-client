import axios from "axios";
import { mockNews } from "../utils/mockNews";
import { mockNewsCategories } from "../utils/mockNewsCategories";

export async function fetchNewsWithFallback() {
  try {
    const response = await axios.get("/api/news");
    if (!response.data || !Array.isArray(response.data)) throw new Error("No data");
    return response.data;
  } catch (error) {
    return mockNews;
  }
}

export async function fetchNewsCategoriesWithFallback() {
  try {
    const response = await axios.get("/api/news-categories");
    if (!response.data || !Array.isArray(response.data)) throw new Error("No data");
    return response.data;
  } catch (error) {
    return mockNewsCategories;
  }
} 