import api from "../api";

export const getMenus = async () => {
  const response = await api.get("/api/menu/find-all");
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return response.data.data;
  }
  
  throw new Error("Invalid menus response");
};

export const getMenuTree = async (language = 'vi') => {
  const response = await api.get(`/api/menu/tree?language=${language}`);
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return response.data.data;
  }
  
  throw new Error("Invalid menu tree response");
};

// API mới cho frontend với cấu trúc flat array (KHUYÊN DÙNG)
export const getMenuHierarchy = async (language = 'vi') => {
  const response = await api.get(`/api/menu/frontend?language=${language}`);
  
  // Check response format: { status: 1, data: [...], code: 200, message: "Ok" }
  if (response.data && response.data.status === 1 && response.data.data) {
    // API returns flat array with structure:
    // {
    //   id, key, labelVi, labelEn, pathVi, pathEn,
    //   level, order, parentId, isActive, isExternal, target, menuType
    // }
    return response.data.data;
  }
  
  throw new Error("Invalid menu hierarchy response");
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