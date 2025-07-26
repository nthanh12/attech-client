import api from "../api";

export const getPermissions = async () => api.get("/api/permission/list").then(res => res.data);
export const getCurrentUserPermissions = async () => api.get("/api/permission/current-user").then(res => res.data);
export const checkPermission = async (data) => api.post("/api/permission/check", data).then(res => res.data);
export const getPermissionTree = async () => api.get("/api/permission/tree").then(res => res.data);
export const getPermissionById = async (id) => api.get(`/api/permission/${id}`).then(res => res.data);
export const getApiEndpoints = async () => api.get("/api/permission/api-endpoints").then(res => res.data);
export const getApiEndpointById = async (id) => api.get(`/api/permission/api-endpoints/${id}`).then(res => res.data);
export const createApiEndpoint = async (data) => api.post("/api/permission/api-endpoint", data).then(res => res.data);
export const updateApiEndpoint = async (data) => api.put("/api/permission/api-endpoint", data).then(res => res.data); 