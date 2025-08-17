import api from "../api";

export const getMenus = async () => {
  const response = await api.get("/api/menu/find-all");
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return response.data.data;
  }
  
  throw new Error("Invalid menus response");
};

export const getMenuTree = async () => {
  const response = await api.get("/api/menu/tree");
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return response.data.data;
  }
  
  throw new Error("Invalid menu tree response");
};

export const getMenuById = async (id) => {
  const response = await api.get(`/api/menu/find-by-id/${id}`);
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return response.data.data;
  }
  
  throw new Error("Invalid menu detail response");
};

export const createMenu = async (data) => {
  const response = await api.post("/api/menu/create", data);
  
  if (response.data && response.data.status === 1) {
    return response.data;
  }
  
  throw new Error("Failed to create menu");
}; 