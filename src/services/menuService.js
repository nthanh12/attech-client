import api from "../api";

export const getMenus = async () => api.get("/api/menu/find-all").then(res => res.data);
export const getMenuTree = async () => api.get("/api/menu/tree").then(res => res.data);
export const getMenuById = async (id) => api.get(`/api/menu/find-by-id/${id}`).then(res => res.data);
export const createMenu = async (data) => api.post("/api/menu/create", data).then(res => res.data); 