/**
 * Global Search Service
 * Handles searching across News, Products, and Services
 */

import api from "../api";
import { getApiBaseUrl } from "../config/apiConfig";

/**
 * Search globally across all content types
 * @param {string} keyword - Search keyword (min 2 characters)
 * @param {number} limit - Max items per category (default: 5)
 * @returns {Promise} API response with search results
 */
export const searchGlobal = async (keyword, limit = 5) => {
  try {
    if (!keyword || keyword.trim().length < 2) {
      throw new Error("Từ khóa tìm kiếm phải có ít nhất 2 ký tự");
    }

    const encodedKeyword = encodeURIComponent(keyword.trim());
    const response = await api.get(
      `/api/search/global?keyword=${encodedKeyword}&limit=${limit}`
    );

    // API returns data wrapped in { status, data, code, message }
    const apiData = response.data.data || {};

    return {
      success: true,
      data: apiData,
      keyword,
      totalResults: apiData.totalResults || 0,
      searchTime: apiData.searchTime,
      results: apiData.results || [],
    };
  } catch (error) {return {
      success: false,
      error: error.message || "Có lỗi xảy ra khi tìm kiếm",
      data: null,
      results: [],
    };
  }
};

/**
 * Build URL for search result item based on type
 * @param {Object} item - Search result item
 * @param {string} language - Current language ('vi' or 'en')
 * @returns {string} Complete URL for the item
 */
export const buildSearchResultUrl = (item, language = "vi") => {
  const slug = language === "vi" ? item.slugVi : item.slugEn;

  switch (item.type) {
    case "news":
      return language === "vi"
        ? `/tin-tuc/${slug}.html`
        : `/en/news/${slug}.html`;

    case "notification":
      return language === "vi"
        ? `/thong-bao/${slug}.html`
        : `/en/notifications/${slug}.html`;

    case "product":
      return language === "vi"
        ? `/san-pham/${slug}.html`
        : `/en/products/${slug}.html`;

    case "service":
      return language === "vi"
        ? `/dich-vu/${slug}.html`
        : `/en/services/${slug}.html`;

    default:
      return "#";
  }
};

/**
 * Format search result item for display
 * @param {Object} item - Raw search result item
 * @param {string} language - Current language
 * @returns {Object} Formatted item for display
 */
export const formatSearchResultItem = (item, language = "vi") => {
  // Handle image URL - if relative path, prepend API base URL
  let imageUrl = item.imageUrl;
  if (imageUrl && imageUrl.startsWith("/")) {
    imageUrl = `${getApiBaseUrl()}${imageUrl}`;
  }

  return {
    id: item.id,
    title: language === "vi" ? item.titleVi : item.titleEn,
    description: language === "vi" ? item.descriptionVi : item.descriptionEn,
    imageUrl: imageUrl,
    type: item.type,
    url: buildSearchResultUrl(item, language),
    createdDate: item.createdDate,
  };
};

/**
 * Format search results for display
 * @param {Array} results - Raw search results array
 * @param {string} language - Current language
 * @returns {Array} Formatted results array
 */
export const formatSearchResults = (results, language = "vi") => {
  return results.map((category) => ({
    categoryName:
      language === "vi" ? category.categoryName : category.categoryNameEn,
    count: category.count,
    items: category.items.map((item) => formatSearchResultItem(item, language)),
  }));
};

export default {
  searchGlobal,
  buildSearchResultUrl,
  formatSearchResultItem,
  formatSearchResults,
};
