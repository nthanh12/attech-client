import api from "../api";

// Dịch vụ
export const getServices = async (params = {}) => {
  const response = await api.get("/services", { params });
  return response.data;
};

export const getServiceById = async (id) => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};

export const createService = async (data) => {
  const response = await api.post("/services", data);
  return response.data;
};

export const updateService = async (id, data) => {
  const response = await api.put(`/services/${id}`, data);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};

// Danh mục dịch vụ
export const getServiceCategories = async () => {
  const response = await api.get("/service-category/find-all");
  return response.data.data?.items || [];
};

export const getServiceCategoryById = async (id) => {
  const response = await api.get(`/service-category/${id}`);
  return response.data;
};

export const createServiceCategory = async (data) => {
  const response = await api.post("/service-category", data);
  return response.data;
};

export const updateServiceCategory = async (id, data) => {
  const response = await api.put(`/service-category/${id}`, data);
  return response.data;
};

export const deleteServiceCategory = async (id) => {
  const response = await api.delete(`/service-category/${id}`);
  return response.data;
}; 