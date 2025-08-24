import api from "../api";
import { getApiBaseUrl } from "../config/apiConfig";

// Real category IDs from your database
export const CATEGORY_IDS = {
  COMPANY_ACTIVITIES: 2,        // "hoat-dong-cong-ty" / "company-activities"
  COMPANY_PARTY: 4,             // "dang-bo-cong-ty" / "company-party"  
  COMPANY_YOUTH_UNION: 5,       // "doan-thanh-nien-cong-ty" / "company-youth-union"
  COMPANY_UNION: 6,             // "cong-doan-cong-ty" / "company-union"
  AVIATION_NEWS: 7              // "tin-nganh-hang-khong" / "aviation-news"
};

// Category slug to ID mapping
export const CATEGORY_SLUG_TO_ID = {
  // Vietnamese slugs
  "hoat-dong-cong-ty": CATEGORY_IDS.COMPANY_ACTIVITIES,
  "dang-bo-cong-ty": CATEGORY_IDS.COMPANY_PARTY,
  "doan-thanh-nien-cong-ty": CATEGORY_IDS.COMPANY_YOUTH_UNION,
  "cong-doan-cong-ty": CATEGORY_IDS.COMPANY_UNION,
  "tin-nganh-hang-khong": CATEGORY_IDS.AVIATION_NEWS,
  
  // English slugs
  "company-activities": CATEGORY_IDS.COMPANY_ACTIVITIES,
  "company-party": CATEGORY_IDS.COMPANY_PARTY,
  "company-youth-union": CATEGORY_IDS.COMPANY_YOUTH_UNION,
  "company-union": CATEGORY_IDS.COMPANY_UNION,
  "aviation-news": CATEGORY_IDS.AVIATION_NEWS
};

// Get all news for client-side with pagination and filters
export async function getNews(params = {}) {
  try {
    const {
      pageIndex = 1,
      pageSize = 10,
      search = "",
      categoryId = "",
      sortBy = "timePosted",
      sortDirection = "desc"
    } = params;

    const queryParams = {
      pageIndex,
      pageSize,
      sortBy,
      sortDirection
    };

    // Add optional filters
    if (search) queryParams.search = search;
    if (categoryId) queryParams.categoryId = categoryId;
    // Status = 1 is automatically handled by client endpoint

    const response = await api.get("/api/news/client/find-all", {
      params: queryParams,
    });

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      const dataObj = response.data.data;
      return {
        items: dataObj.items || [],
        totalCount: dataObj.totalItems || 0,
        totalPages: Math.ceil((dataObj.totalItems || 0) / pageSize),
        currentPage: pageIndex,
        pageSize,
      };
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("❌ getNews error:", error);
    throw error;
  }
}

// Get news by ID for detail page
export async function getNewsById(id) {
  try {
    const response = await api.get(`/api/news/client/detail/${id}`);

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    throw new Error("News not found");
  } catch (error) {
    console.error("❌ getNewsById error:", error);
    throw error;
  }
}

// Get news by slug for SEO-friendly URLs (using new detail endpoint)
export async function getNewsBySlug(slug, language = "vi") {
  try {
    // Use client detail endpoint
    const response = await api.get(`/api/news/client/detail/${slug}`);

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    throw new Error("News not found");
  } catch (error) {
    console.error("❌ getNewsBySlug error with detail endpoint:", error);
    
    // No fallback needed for client endpoint - it only returns published content
    throw new Error("News not found");
  }
}

// Get news categories for client-side
export async function getNewsCategories() {
  try {
    const response = await api.get("/api/news-category/client/find-all");
    
    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data &&
      response.data.data.items
    ) {
      return response.data.data.items;
    }

    return [];
  } catch (error) {
    console.error("❌ getNewsCategories error:", error);
    return [];
  }
}

// Get featured/outstanding news
export async function getFeaturedNews(limit = 5) {
  try {
    const response = await api.get("/api/news/client/find-all", {
      params: {
        pageIndex: 1,
        pageSize: limit,
        isOutstanding: true,
        sortBy: "timePosted",
        sortDirection: "desc"
      }
    });

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data.items || [];
    }

    return [];
  } catch (error) {
    console.error("❌ getFeaturedNews error:", error);
    return [];
  }
}

// Get latest news
export async function getLatestNews(limit = 10) {
  try {
    const response = await api.get("/api/news/client/find-all", {
      params: {
        pageIndex: 1,
        pageSize: limit,
        sortBy: "timePosted",
        sortDirection: "desc"
      }
    });

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data.items || [];
    }

    return [];
  } catch (error) {
    console.error("❌ getLatestNews error:", error);
    return [];
  }
}

// Get news by category ID
export async function getNewsByCategory(categoryId, params = {}) {
  try {
    const {
      pageIndex = 1,
      pageSize = 10,
      sortBy = "timePosted",
      sortDirection = "desc"
    } = params;

    const response = await api.get("/api/news/client/find-all", {
      params: {
        pageIndex,
        pageSize,
        categoryId,
        sortBy,
        sortDirection
      }
    });

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      const dataObj = response.data.data;
      return {
        items: dataObj.items || [],
        totalCount: dataObj.totalItems || 0,
        totalPages: Math.ceil((dataObj.totalItems || 0) / pageSize),
        currentPage: pageIndex,
        pageSize,
      };
    }

    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  } catch (error) {
    console.error("❌ getNewsByCategory error:", error);
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  }
}

// Get news by category slug (using the new endpoint)
export async function getNewsByCategorySlug(categorySlug, params = {}) {
  try {
    const {
      pageIndex = 1,
      pageSize = 10,
      sortBy = "timePosted",
      sortDirection = "desc"
    } = params;

    const response = await api.get(`/api/news/client/category/${categorySlug}`, {
      params: {
        pageIndex,
        pageSize,
        sortBy,
        sortDirection
      }
    });

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      const dataObj = response.data.data;
      return {
        items: dataObj.items || [],
        totalCount: dataObj.totalItems || 0,
        totalPages: Math.ceil((dataObj.totalItems || 0) / pageSize),
        currentPage: pageIndex,
        pageSize,
      };
    }

    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  } catch (error) {
    console.error("❌ getNewsByCategorySlug error:", error);
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  }
}

// Get related news (same category, excluding current news)
export async function getRelatedNews(newsId, categoryId, limit = 5) {
  try {
    const response = await api.get("/api/news/client/find-all", {
      params: {
        pageIndex: 1,
        pageSize: limit + 1, // Get one extra to exclude current
        categoryId,
        sortBy: "timePosted",
        sortDirection: "desc"
      }
    });

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      // Filter out current news and limit results
      const items = (response.data.data.items || [])
        .filter(item => item.id !== newsId)
        .slice(0, limit);
      
      return items;
    }

    return [];
  } catch (error) {
    console.error("❌ getRelatedNews error:", error);
    return [];
  }
}

// Search news with permission parameter approach
export async function searchNews(searchTerm, params = {}) {
  try {
    const {
      pageIndex = 1,
      pageSize = 10,
      categoryId = "",
      sortBy = "timePosted", 
      sortDirection = "desc"
    } = params;

    const queryParams = {
      keyword: searchTerm, // Use keyword parameter for search
      pageIndex,
      pageSize,
      sortBy,
      sortDirection
    };

    if (categoryId) queryParams.categoryId = categoryId;
    
    const response = await api.get("/api/news/client/search", {
      params: queryParams
    });

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      const dataObj = response.data.data;
      return {
        items: dataObj.items || [],
        totalCount: dataObj.totalItems || 0,
        totalPages: Math.ceil((dataObj.totalItems || 0) / pageSize),
        currentPage: pageIndex,
        pageSize,
      };
    }

    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: pageIndex,
      pageSize,
    };
  } catch (error) {
    console.error("❌ searchNews error:", error);
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  }
}

// Get news from multiple activity categories (special page)
export async function getActivityNews(params = {}) {
  try {
    const {
      pageIndex = 1,
      pageSize = 10,
      search = "",
      sortBy = "timePosted",
      sortDirection = "desc"
    } = params;

    // Activity category IDs
    const activityCategories = [
      CATEGORY_IDS.COMPANY_ACTIVITIES,      // Hoạt động công ty
      CATEGORY_IDS.COMPANY_PARTY,           // Đảng bộ công ty  
      CATEGORY_IDS.COMPANY_YOUTH_UNION,     // Đoàn thanh niên công ty
      CATEGORY_IDS.COMPANY_UNION            // Công đoàn công ty
    ];

    const queryParams = {
      pageIndex,
      pageSize,
      sortBy,
      sortDirection,
      categoryIds: activityCategories.join(',') // Send as comma-separated string
    };

    // Add optional search
    if (search) queryParams.search = search;

    const response = await api.get("/api/news/client/find-all", {
      params: queryParams,
    });

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      const dataObj = response.data.data;
      return {
        items: dataObj.items || [],
        totalCount: dataObj.totalItems || dataObj.total || 0,
        totalPages: Math.ceil((dataObj.totalItems || dataObj.total || 0) / pageSize),
        currentPage: pageIndex,
        pageSize,
      };
    }

    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: pageIndex,
      pageSize,
    };
  } catch (error) {
    console.error("❌ getActivityNews error:", error);
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  }
}

// Get image URL from news item
export function getNewsImageUrl(newsItem) {
  if (!newsItem) return null;
  
  // Try different possible image fields
  const imageUrl = newsItem.ImageUrl || newsItem.imageUrl || newsItem.image;
  
  if (!imageUrl) return null;
  
  // If it's already a full URL, return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // If it's a relative path, add base URL
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${imageUrl}`;
}

// Process content to inject images from attachments
function processContentWithAttachments(content, attachments) {
  if (!content || !attachments?.images?.length) return content;

  let processedContent = content;
  const baseUrl = getApiBaseUrl();

  console.log("🔍 Processing content with attachments:", {
    contentLength: content.length,
    imagesCount: attachments.images.length,
    baseUrl
  });

  // Strategy: Replace all img tags that don't have proper src with images from attachments
  let imageIndex = 0;

  // Replace img tags without src or with empty src
  processedContent = processedContent.replace(/<img([^>]*?)(\s*\/?>)/gi, (match, attributes, closing) => {
    // Check if this img tag already has a valid src
    const hasSrc = /src\s*=\s*["'][^"'\s]+["']/i.test(match);
    
    console.log("🔍 Processing img tag:", {
      match,
      attributes,
      hasSrc,
      imageIndex
    });

    if (!hasSrc && imageIndex < attachments.images.length) {
      const image = attachments.images[imageIndex];
      const fullImageUrl = `${baseUrl}${image.url}`;
      
      // Add src attribute to the img tag
      const newImgTag = `<img${attributes} src="${fullImageUrl}"${closing}`;
      
      console.log("🔍 Replacing img tag:", {
        oldTag: match,
        newTag: newImgTag,
        imageUrl: fullImageUrl
      });
      
      imageIndex++;
      return newImgTag;
    }

    return match; // Return original if already has src or no more images
  });

  console.log("🔍 Content processing completed:", {
    processedLength: processedContent.length,
    imagesProcessed: imageIndex
  });

  return processedContent;
}

// Format news data for client display
export function formatNewsForDisplay(newsItem, language = "vi") {
  if (!newsItem) return null;

  const title = language === "en" ? newsItem.titleEn : newsItem.titleVi;
  const description = language === "en" ? newsItem.descriptionEn : newsItem.descriptionVi;
  let content = language === "en" ? newsItem.contentEn : newsItem.contentVi;
  const slug = language === "en" ? newsItem.slugEn : newsItem.slugVi;

  // Process content to inject images from attachments
  content = processContentWithAttachments(content, newsItem.attachments);

  return {
    ...newsItem,
    title,
    description,
    content,
    slug,
    imageUrl: getNewsImageUrl(newsItem),
    formattedDate: new Date(newsItem.timePosted).toLocaleDateString("vi-VN"),
    formattedTime: new Date(newsItem.timePosted).toLocaleString("vi-VN"),
  };
}