import api from "../api";

// User endpoints
export const createUser = async (data) => api.post("/api/user", data).then(res => res.data);
export const getUsers = async (params = {}) => api.get("/api/user", { params }).then(res => res.data);
export const getUserById = async (id) => api.get(`/api/user/${id}`).then(res => res.data);
export const updateUser = async (data) => api.put("/api/user", data).then(res => res.data);
export const deleteUser = async (id) => api.delete(`/api/user/${id}`).then(res => res.data);
export const addRoleToUser = async (userId, roleId) => api.post(`/api/user/${userId}/roles/${roleId}`).then(res => res.data); 