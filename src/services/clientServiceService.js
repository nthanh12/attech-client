import api from "../api";
import { getApiBaseUrl } from "../config/apiConfig";

// Service does not use categories per requirements

// Get all services for client-side with pagination and filters
export async function getServices(params = {}) {
  try {
    const {
      pageIndex = 1,
      pageSize = 10,
      search = "",
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
    // Status = 1 is automatically handled by client endpoint

    const response = await api.get("/api/service/client/find-all", {
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
    console.error("❌ getServices error:", error);
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: pageIndex,
      pageSize,
    };
  }
}

// Get service by ID for detail page
export async function getServiceById(id) {
  try {
    const response = await api.get(`/api/service/client/detail/${id}`);

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    throw new Error("Service not found");
  } catch (error) {
    console.error("❌ getServiceById error:", error);
    throw error;
  }
}

// Get service by slug for SEO-friendly URLs
export async function getServiceBySlug(slug, language = "vi") {
  try {
    // Use client detail endpoint
    const response = await api.get(`/api/service/client/detail/${slug}`);

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    throw new Error("Service not found");
  } catch (error) {
    console.error("❌ getServiceBySlug error with detail endpoint:", error);
    
    // No fallback needed for client endpoint - it only returns published content
    throw error;
  }
}

// Get featured/outstanding services
export async function getFeaturedServices(limit = 6) {
  try {
    const response = await api.get("/api/service/client/find-all", {
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
    console.error("❌ getFeaturedServices error:", error);
    return [];
  }
}

// Get latest services
export async function getLatestServices(limit = 10) {
  try {
    const response = await api.get("/api/service/client/find-all", {
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
    console.error("❌ getLatestServices error:", error);
    return [];
  }
}

// Get related services
export async function getRelatedServices(serviceId, limit = 4) {
  try {
    const response = await api.get("/api/service/client/related", {
      params: { serviceId, limit }
    });

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("❌ getRelatedServices error:", error);
    return [];
  }
}


// Search services
export async function searchServices(searchTerm, params = {}) {
  try {
    const {
      pageIndex = 1,
      pageSize = 10,
      sortBy = "timePosted",
      sortDirection = "desc"
    } = params;

    const queryParams = {
      search: searchTerm,
      pageIndex,
      pageSize,
      sortBy,
      sortDirection
    };

    const response = await api.get("/api/service/client/find-all", {
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
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  } catch (error) {
    console.error("❌ searchServices error:", error);
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  }
}


// Get service statistics
export async function getServiceStats() {
  try {
    const response = await api.get("/api/service/client/stats");

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    return {
      totalServices: 0,
      totalCategories: 0,
      featuredServices: 0
    };
  } catch (error) {
    console.error("❌ getServiceStats error:", error);
    return {
      totalServices: 0,
      totalCategories: 0,
      featuredServices: 0
    };
  }
}

// Get services for sitemap
export async function getServicesForSitemap() {
  try {
    const response = await api.get("/api/service/client/sitemap");

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("❌ getServicesForSitemap error:", error);
    return [];
  }
}

// Get service breadcrumbs
export async function getServiceBreadcrumbs(serviceId) {
  try {
    const response = await api.get(`/api/service/client/breadcrumbs/${serviceId}`);

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("❌ getServiceBreadcrumbs error:", error);
    return [];
  }
}

// Get service tags
export async function getServiceTags() {
  try {
    const response = await api.get("/api/service/client/tags");

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("❌ getServiceTags error:", error);
    return [];
  }
}

// Get services by tag
export async function getServicesByTag(tag, params = {}) {
  try {
    const {
      pageIndex = 1,
      pageSize = 10,
      sortBy = "timePosted",
      sortDirection = "desc"
    } = params;

    const queryParams = {
      tag,
      pageIndex,
      pageSize,
      sortBy,
      sortDirection
    };

    const response = await api.get("/api/service/client/by-tag", {
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
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  } catch (error) {
    console.error("❌ getServicesByTag error:", error);
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  }
}

// Get service pricing
export async function getServicePricing(serviceId) {
  try {
    const response = await api.get(`/api/service/client/pricing/${serviceId}`);

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    console.error("❌ getServicePricing error:", error);
    return null;
  }
}

// Get service testimonials
export async function getServiceTestimonials(serviceId, limit = 5) {
  try {
    const response = await api.get(`/api/service/client/testimonials/${serviceId}`, {
      params: { limit }
    });

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("❌ getServiceTestimonials error:", error);
    return [];
  }
}

// Get service FAQ
export async function getServiceFAQ(serviceId) {
  try {
    const response = await api.get(`/api/service/client/faq/${serviceId}`);

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("❌ getServiceFAQ error:", error);
    return [];
  }
}


// Get service image URL helper
export function getServiceImageUrl(serviceItem) {
  if (!serviceItem) return null;
  
  // Try different possible image fields
  const imageUrl = serviceItem.ImageUrl || serviceItem.imageUrl || serviceItem.image;
  
  if (!imageUrl) return null;
  
  // If it's already a full URL, return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // If it's a relative path, add base URL
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${imageUrl}`;
}

// Format service data for client display
export function formatServiceForDisplay(serviceItem, language = "vi") {
  if (!serviceItem) return null;
  
  const isVietnamese = language === "vi";
  
  return {
    ...serviceItem,
    displayTitle: isVietnamese ? (serviceItem.titleVi || serviceItem.titleEn) : (serviceItem.titleEn || serviceItem.titleVi),
    displayDescription: isVietnamese ? (serviceItem.descriptionVi || serviceItem.descriptionEn) : (serviceItem.descriptionEn || serviceItem.descriptionVi),
    displayContent: isVietnamese ? (serviceItem.contentVi || serviceItem.contentEn) : (serviceItem.contentEn || serviceItem.contentVi),
    displaySlug: isVietnamese ? (serviceItem.slugVi || serviceItem.slugEn) : (serviceItem.slugEn || serviceItem.slugVi),
    imageUrl: getServiceImageUrl(serviceItem),
    formattedDate: serviceItem.timePosted ? new Date(serviceItem.timePosted).toLocaleDateString(isVietnamese ? 'vi-VN' : 'en-US') : "",
    language: language
  };
}
