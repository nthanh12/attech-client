import api from "../api";

export const getApiEndpoints = async () => {
  const response = await api.get("/api/api-endpoint/find-all");
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return response.data.data;
  }
  
  throw new Error("Invalid API endpoints response");
};

export const getApiEndpointById = async (id) => {
  const response = await api.get(`/api/api-endpoint/find-by-id/${id}`);
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return response.data.data;
  }
  
  throw new Error("Invalid API endpoint detail response");
};

export const createApiEndpoint = async (data) => {
  const response = await api.post("/api/api-endpoint/create", data);
  
  if (response.data && response.data.status === 1) {
    return response.data;
  }
  
  throw new Error("Failed to create API endpoint");
};

export const updateApiEndpoint = async (data) => {
  const response = await api.put("/api/api-endpoint/update", data);
  
  if (response.data && response.data.status === 1) {
    return response.data;
  }
  
  throw new Error("Failed to update API endpoint");
};

export const deleteApiEndpoint = async (id) => {
  const response = await api.delete(`/api/api-endpoint/delete/${id}`);
  
  if (response.data && response.data.status === 1) {
    return response.data;
  }
  
  throw new Error("Failed to delete API endpoint");
}; 