import api from "../api";
import { getApiBaseUrl } from "../config/apiConfig";
import { processWysiwygContent } from "../utils/contentUtils";

// Real category IDs from your database (adjust these based on your notification categories)
export const NOTIFICATION_CATEGORY_IDS = {
  GENERAL: 1,
  SYSTEM: 2,
  ANNOUNCEMENT: 3,
  UPDATE: 4
};

// Get all notifications for client-side with pagination and filters
export async function getNotifications(params = {}) {
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

    const response = await api.get("/api/notification/client/find-all", {
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

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("❌ getNotifications error:", error);
    throw error;
  }
}

// Get notification by ID for detail page
export async function getNotificationById(id) {
  try {
    const response = await api.get(`/api/notification/client/detail/${id}`);

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    throw new Error("Notification not found");
  } catch (error) {
    console.error("❌ getNotificationById error:", error);
    throw error;
  }
}

// Get notification by slug for SEO-friendly URLs
export async function getNotificationBySlug(slug, language = "vi") {
  try {
    // Use client detail endpoint
    const response = await api.get(`/api/notification/client/detail/${slug}`);

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    throw new Error("Notification not found");
  } catch (error) {
    console.error("❌ getNotificationBySlug error with detail endpoint:", error);
    
    // No fallback needed for client endpoint - it only returns published content
    throw new Error("Notification not found");
  }
}

// Get notification categories for client-side
export async function getNotificationCategories() {
  try {
    const response = await api.get("/api/notification-category/client/find-all");
    
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
    console.error("❌ getNotificationCategories error:", error);
    return [];
  }
}

// Get featured/outstanding notifications
export async function getFeaturedNotifications(limit = 5) {
  try {
    const response = await api.get("/api/notification/client/find-all", {
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
    console.error("❌ getFeaturedNotifications error:", error);
    return [];
  }
}

// Get latest notifications
export async function getLatestNotifications(limit = 10) {
  try {
    const response = await api.get("/api/notification/client/find-all", {
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
    console.error("❌ getLatestNotifications error:", error);
    return [];
  }
}

// Get notifications by category ID
export async function getNotificationsByCategory(categoryId, params = {}) {
  try {
    const {
      pageIndex = 1,
      pageSize = 10,
      sortBy = "timePosted",
      sortDirection = "desc"
    } = params;

    const response = await api.get("/api/notification/client/find-all", {
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
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  } catch (error) {
    console.error("❌ getNotificationsByCategory error:", error);
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  }
}

// Get notifications by category slug
export async function getNotificationsByCategorySlug(categorySlug, params = {}) {
  try {
    const {
      pageIndex = 1,
      pageSize = 10,
      sortBy = "timePosted",
      sortDirection = "desc"
    } = params;

    const response = await api.get(`/api/notification/client/category/${categorySlug}`, {
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
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  } catch (error) {
    console.error("❌ getNotificationsByCategorySlug error:", error);
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  }
}

// Get related notifications (same category, excluding current notification)
export async function getRelatedNotifications(notificationId, categoryId, limit = 5) {
  try {
    const response = await api.get("/api/notification/client/find-all", {
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
      // Filter out current notification and limit results
      const items = (response.data.data.items || [])
        .filter(item => item.id !== notificationId)
        .slice(0, limit);
      
      return items;
    }

    return [];
  } catch (error) {
    console.error("❌ getRelatedNotifications error:", error);
    return [];
  }
}

// Search notifications with keyword parameter approach
export async function searchNotifications(searchTerm, params = {}) {
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
    
    const response = await api.get("/api/notification/client/search", {
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
    console.error("❌ searchNotifications error:", error);
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  }
}


// Get image URL from notification item
export function getNotificationImageUrl(notificationItem) {
  if (!notificationItem) return null;
  
  // Try different possible image fields
  const imageUrl = notificationItem.ImageUrl || notificationItem.imageUrl || notificationItem.image;
  
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

// Format notification data for client display
export function formatNotificationForDisplay(notificationItem, language = "vi") {
  if (!notificationItem) return null;

  const title = language === "en" ? notificationItem.titleEn : notificationItem.titleVi;
  const description = language === "en" ? notificationItem.descriptionEn : notificationItem.descriptionVi;
  let content = language === "en" ? notificationItem.contentEn : notificationItem.contentVi;
  const slug = language === "en" ? notificationItem.slugEn : notificationItem.slugVi;

  // Process WYSIWYG content to convert relative image paths to full URLs
  content = processWysiwygContent(content);

  // Process content to inject images from attachments (if any)
  content = processContentWithAttachments(content, notificationItem.attachments);

  // Debug logging để kiểm tra API response
  console.log("🔍 Debug notification item:", {
    id: notificationItem.id,
    title: notificationItem.titleVi,
    imageUrl: notificationItem.imageUrl,
    ImageUrl: notificationItem.ImageUrl,
    image: notificationItem.image,
    rawItem: notificationItem
  });

  const formattedResult = {
    ...notificationItem,
    title,
    description,
    content,
    slug,
    imageUrl: getNotificationImageUrl(notificationItem),
    formattedDate: new Date(notificationItem.timePosted).toLocaleDateString("vi-VN"),
    formattedTime: new Date(notificationItem.timePosted).toLocaleString("vi-VN"),
    // Add category info from API response
    categoryName: language === "en" ? notificationItem.notificationCategoryTitleEn : notificationItem.notificationCategoryTitleVi,
    categorySlug: language === "en" ? notificationItem.notificationCategorySlugEn : notificationItem.notificationCategorySlugVi,
  };

  console.log("🔍 Formatted result imageUrl:", formattedResult.imageUrl);
  
  return formattedResult;
}