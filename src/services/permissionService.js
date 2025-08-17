import api from "../api";

export const getPermissions = async () => {
  const response = await api.get("/api/permission/list");
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return { data: response.data.data };
  }
  
  throw new Error("Invalid permissions response");
};

export const getCurrentUserPermissions = async () => {
  const response = await api.get("/api/permission/current-user");
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return response.data.data;
  }
  
  throw new Error("Invalid current user permissions response");
};

export const checkPermission = async (data) => {
  const response = await api.post("/api/permission/check", data);
  
  if (response.data && response.data.status === 1) {
    return response.data;
  }
  
  throw new Error("Permission check failed");
};

export const getPermissionTree = async () => {
  const response = await api.get("/api/permission/tree");
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return response.data.data;
  }
  
  throw new Error("Invalid permission tree response");
};

export const getPermissionById = async (id) => {
  const response = await api.get(`/api/permission/${id}`);
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return response.data.data;
  }
  
  throw new Error("Invalid permission detail response");
};

export const getApiEndpoints = async () => {
  const response = await api.get("/api/permission/api-endpoints");
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return response.data.data;
  }
  
  throw new Error("Invalid API endpoints response");
};

export const getApiEndpointById = async (id) => {
  const response = await api.get(`/api/permission/api-endpoints/${id}`);
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return response.data.data;
  }
  
  throw new Error("Invalid API endpoint detail response");
};

export const createApiEndpoint = async (data) => {
  const response = await api.post("/api/permission/api-endpoint", data);
  
  if (response.data && response.data.status === 1) {
    return response.data;
  }
  
  throw new Error("Failed to create API endpoint");
};

export const updateApiEndpoint = async (data) => {
  const response = await api.put("/api/permission/api-endpoint", data);
  
  if (response.data && response.data.status === 1) {
    return response.data;
  }
  
  throw new Error("Failed to update API endpoint");
}; 