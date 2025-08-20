import api from "../api";
import { getApiBaseUrl } from "../config/apiConfig";

// Real category IDs from your database (adjust these based on your product categories)
export const PRODUCT_CATEGORY_IDS = {
  SOFTWARE: 1,
  HARDWARE: 2,
  SERVICE: 3,
  SOLUTION: 4,
  CONSULTING: 5
};

// Category slug to ID mapping
export const PRODUCT_CATEGORY_SLUG_TO_ID = {
  // Vietnamese slugs
  "phan-mem": PRODUCT_CATEGORY_IDS.SOFTWARE,
  "phan-cung": PRODUCT_CATEGORY_IDS.HARDWARE,
  "dich-vu": PRODUCT_CATEGORY_IDS.SERVICE,
  "giai-phap": PRODUCT_CATEGORY_IDS.SOLUTION,
  "tu-van": PRODUCT_CATEGORY_IDS.CONSULTING,
  
  // English slugs
  "software": PRODUCT_CATEGORY_IDS.SOFTWARE,
  "hardware": PRODUCT_CATEGORY_IDS.HARDWARE,
  "service": PRODUCT_CATEGORY_IDS.SERVICE,
  "solution": PRODUCT_CATEGORY_IDS.SOLUTION,
  "consulting": PRODUCT_CATEGORY_IDS.CONSULTING
};

// Get all products for client-side with pagination and filters
export async function getProducts(params = {}) {
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

    const response = await api.get("/api/product/client/find-all", {
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
    console.error("❌ getProducts error:", error);
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: pageIndex,
      pageSize,
    };
  }
}

// Get product by ID for detail page
export async function getProductById(id) {
  try {
    const response = await api.get(`/api/product/client/detail/${id}`);

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    throw new Error("Product not found");
  } catch (error) {
    console.error("❌ getProductById error:", error);
    throw error;
  }
}

// Get product by slug for SEO-friendly URLs
export async function getProductBySlug(slug, language = "vi") {
  try {
    // Use client detail endpoint
    const response = await api.get(`/api/product/client/detail/${slug}`);

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    throw new Error("Product not found");
  } catch (error) {
    console.error("❌ getProductBySlug error with detail endpoint:", error);
    
    // No fallback needed for client endpoint - it only returns published content
    throw error;
  }
}

// Get featured/outstanding products
export async function getFeaturedProducts(limit = 6) {
  try {
    const response = await api.get("/api/product/client/find-all", {
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
    console.error("❌ getFeaturedProducts error:", error);
    return [];
  }
}

// Get latest products
export async function getLatestProducts(limit = 10) {
  try {
    const response = await api.get("/api/product/client/find-all", {
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
    console.error("❌ getLatestProducts error:", error);
    return [];
  }
}

// Get related products
export async function getRelatedProducts(productId, categoryId, limit = 4) {
  try {
    const response = await api.get("/api/product/client/related", {
      params: { productId, categoryId, limit }
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
    console.error("❌ getRelatedProducts error:", error);
    return [];
  }
}

// Get products by category ID
export async function getProductsByCategory(categoryId, params = {}) {
  try {
    const {
      pageIndex = 1,
      pageSize = 10,
      search = "",
      sortBy = "timePosted",
      sortDirection = "desc"
    } = params;

    const queryParams = {
      categoryId,
      pageIndex,
      pageSize,
      sortBy,
      sortDirection
    };

    if (search) queryParams.search = search;

    const response = await api.get("/api/product/client/find-all", {
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
    console.error("❌ getProductsByCategory error:", error);
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  }
}

// Get products by category slug
export async function getProductsByCategorySlug(categorySlug, params = {}) {
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

    if (search) queryParams.search = search;

    const response = await api.get(`/api/product/client/category/${categorySlug}`, {
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
    console.error("❌ getProductsByCategorySlug error:", error);
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  }
}

// Search products
export async function searchProducts(searchTerm, params = {}) {
  try {
    const {
      pageIndex = 1,
      pageSize = 10,
      categoryId = "",
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

    if (categoryId) queryParams.categoryId = categoryId;

    const response = await api.get("/api/product/client/find-all", {
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
    console.error("❌ searchProducts error:", error);
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  }
}

// Get product categories
export async function getProductCategories() {
  try {
    const response = await api.get("/api/product/client/categories");

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("❌ getProductCategories error:", error);
    return [];
  }
}

// Get product statistics
export async function getProductStats() {
  try {
    const response = await api.get("/api/product/client/stats");

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    return {
      totalProducts: 0,
      totalCategories: 0,
      featuredProducts: 0
    };
  } catch (error) {
    console.error("❌ getProductStats error:", error);
    return {
      totalProducts: 0,
      totalCategories: 0,
      featuredProducts: 0
    };
  }
}

// Get products for sitemap
export async function getProductsForSitemap() {
  try {
    const response = await api.get("/api/product/client/sitemap");

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("❌ getProductsForSitemap error:", error);
    return [];
  }
}

// Get product breadcrumbs
export async function getProductBreadcrumbs(productId) {
  try {
    const response = await api.get(`/api/product/client/breadcrumbs/${productId}`);

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("❌ getProductBreadcrumbs error:", error);
    return [];
  }
}

// Get product tags
export async function getProductTags() {
  try {
    const response = await api.get("/api/product/client/tags");

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("❌ getProductTags error:", error);
    return [];
  }
}

// Get products by tag
export async function getProductsByTag(tag, params = {}) {
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

    const response = await api.get("/api/product/client/by-tag", {
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
    console.error("❌ getProductsByTag error:", error);
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: params.pageIndex || 1,
      pageSize: params.pageSize || 10,
    };
  }
}


// Get product image URL helper
export function getProductImageUrl(productItem) {
  if (!productItem) return null;
  
  // Try different possible image fields
  const imageUrl = productItem.ImageUrl || productItem.imageUrl || productItem.image;
  
  if (!imageUrl) return null;
  
  // If it's already a full URL, return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // If it's a relative path, add base URL
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${imageUrl}`;
}

// Format product data for client display
export function formatProductForDisplay(productItem, language = "vi") {
  if (!productItem) return null;
  
  const isVietnamese = language === "vi";
  
  return {
    ...productItem,
    displayTitle: isVietnamese ? (productItem.titleVi || productItem.titleEn) : (productItem.titleEn || productItem.titleVi),
    displayDescription: isVietnamese ? (productItem.descriptionVi || productItem.descriptionEn) : (productItem.descriptionEn || productItem.descriptionVi),
    displayContent: isVietnamese ? (productItem.contentVi || productItem.contentEn) : (productItem.contentEn || productItem.contentVi),
    displaySlug: isVietnamese ? (productItem.slugVi || productItem.slugEn) : (productItem.slugEn || productItem.slugVi),
    displayCategoryTitle: isVietnamese ? (productItem.productCategoryTitleVi || productItem.productCategoryTitleEn) : (productItem.productCategoryTitleEn || productItem.productCategoryTitleVi),
    displayCategorySlug: isVietnamese ? (productItem.productCategorySlugVi || productItem.productCategorySlugEn) : (productItem.productCategorySlugEn || productItem.productCategorySlugVi),
    imageUrl: getProductImageUrl(productItem),
    formattedDate: productItem.timePosted ? new Date(productItem.timePosted).toLocaleDateString(isVietnamese ? 'vi-VN' : 'en-US') : "",
    language: language
  };
}
