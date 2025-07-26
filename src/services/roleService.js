import api from "../api";

export const getRoles = async () => api.get("/api/role/find-all").then(res => res.data);
export const getRoleById = async (id) => api.get(`/api/role/find-by-id/${id}`).then(res => res.data);
export const createRole = async (data) => api.post("/api/role/create", data).then(res => res.data);
export const updateRole = async (data) => api.put("/api/role/update", data).then(res => res.data);
export const deleteRole = async (id) => api.delete(`/api/role/delete/${id}`).then(res => res.data); 