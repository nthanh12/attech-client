import api from "../api";

// Sản phẩm
export const getProducts = async (params = {}) => {
  const response = await api.get("/products", { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (data) => {
  const response = await api.post("/products", data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Danh mục sản phẩm
export const getProductCategories = async () => {
  const response = await api.get("/product-category/find-all");
  return response.data.data?.items || [];
};

export const getProductCategoryById = async (id) => {
  const response = await api.get(`/product-category/${id}`);
  return response.data;
};

export const createProductCategory = async (data) => {
  const response = await api.post("/product-category", data);
  return response.data;
};

export const updateProductCategory = async (id, data) => {
  const response = await api.put(`/product-category/${id}`, data);
  return response.data;
};

export const deleteProductCategory = async (id) => {
  const response = await api.delete(`/product-category/${id}`);
  return response.data;
}; 