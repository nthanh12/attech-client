import api from "../api";

export const getApiEndpoints = async () => api.get("/api/api-endpoint/find-all").then(res => res.data);
export const getApiEndpointById = async (id) => api.get(`/api/api-endpoint/find-by-id/${id}`).then(res => res.data);
export const createApiEndpoint = async (data) => api.post("/api/api-endpoint/create", data).then(res => res.data);
export const updateApiEndpoint = async (data) => api.put("/api/api-endpoint/update", data).then(res => res.data);
export const deleteApiEndpoint = async (id) => api.delete(`/api/api-endpoint/delete/${id}`).then(res => res.data); 