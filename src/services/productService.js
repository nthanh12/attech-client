import api from "../api";

// Product endpoints (AttechServer API)
export const fetchProducts = async (params = {}) => {
  try {
    console.log("🔍 Fetching products from backend: /api/product/find-all");
    const response = await api.get("/api/product/find-all", { params });
    
    // Handle AttechServer response format: {status: 1, data: {items: [], totalItems: 0}}
    if (response.data && response.data.status === 1 && response.data.data) {
      const productsData = response.data.data.items || [];
      console.log("✅ Product data loaded successfully", productsData);
      return productsData;
    }
    
    // Fallback: Handle direct array
    if (response.data && Array.isArray(response.data)) {
      console.log("✅ Product data loaded (direct array)", response.data);
      return response.data;
    }
    
    throw new Error("Invalid data format");
  } catch (error) {
    console.error("❌ Failed to fetch products from backend:", error.response?.status, error.message);
    console.log("⚠️ Using empty products array");
    return [];
  }
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/api/product/find-by-id/${id}`);
  return response.data;
};

export const fetchProductBySlug = async (slug) => {
  const response = await api.get(`/api/product/detail/${slug}`);
  return response.data;
};

export const fetchProductsByCategory = async (slug) => {
  const response = await api.get(`/api/product/category/${slug}`);
  return response.data;
};

export const createProduct = async (data) => {
  const response = await api.post("/api/product/create", data);
  return response.data;
};

export const updateProduct = async (data) => {
  const response = await api.put("/api/product/update", data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/api/product/delete/${id}`);
  return response.data;
};

export const updateProductStatus = async (data) => {
  const response = await api.put("/api/product/update-status", data);
  return response.data;
};

// Product Category endpoints (AttechServer API)
export const fetchProductCategories = async (params = {}) => {
  try {
    console.log("🔍 Fetching product categories from backend: /api/product-categories/find-all");
    const response = await api.get("/api/product-categories/find-all", { params });
    
    // Handle AttechServer response format: {status: 1, data: {items: [], totalItems: 0}}
    if (response.data && response.data.status === 1 && response.data.data) {
      const categoriesData = response.data.data.items || [];
      console.log("✅ Product categories loaded successfully", categoriesData);
      return categoriesData;
    }
    
    // Fallback: Handle direct array
    if (response.data && Array.isArray(response.data)) {
      console.log("✅ Product categories loaded (direct array)", response.data);
      return response.data;
    }
    
    throw new Error("Invalid data format");
  } catch (error) {
    console.error("❌ Failed to fetch product categories from backend:", error.response?.status, error.message);
    console.log("⚠️ Using empty categories array");
    return [];
  }
};

export const getProductCategoryById = async (id) => {
  const response = await api.get(`/api/product-categories/find-by-id/${id}`);
  return response.data;
};

export const getProductCategoryBySlug = async (slug) => {
  const response = await api.get(`/api/product-categories/detail/${slug}`);
  return response.data;
};

export const createProductCategory = async (data) => {
  const response = await api.post("/api/product-categories/create", data);
  return response.data;
};

export const updateProductCategory = async (data) => {
  const response = await api.put("/api/product-categories/update", data);
  return response.data;
};

export const deleteProductCategory = async (id) => {
  const response = await api.delete(`/api/product-categories/delete/${id}`);
  return response.data;
}; 