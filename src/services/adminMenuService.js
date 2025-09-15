import api from "../api";

// Get all menus for admin management (using tree structure)
export const getMenuList = async () => {
  const response = await api.get("/api/menu/tree?language=vi");
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return response.data.data;
  }
  
  throw new Error("Failed to fetch menu list");
};

// Create new menu
export const createMenu = async (menuData) => {try {
    const response = await api.post("/api/menu/create", menuData);if (response.data && response.data.status === 1) {
      return response.data;
    }
    
    throw new Error("Failed to create menu");
  } catch (error) {throw error;
  }
};

// Update existing menu
export const updateMenu = async (id, menuData) => {try {
    const response = await api.put(`/api/menu/update/${id}`, menuData);if (response.data && response.data.status === 1) {
      return response.data;
    }
    
    throw new Error("Failed to update menu");
  } catch (error) {throw error;
  }
};

// Delete menu
export const deleteMenu = async (id) => {
  const response = await api.delete(`/api/menu/delete/${id}`);
  
  if (response.data && response.data.status === 1) {
    return response.data;
  }
  
  throw new Error("Failed to delete menu");
};

// Reorder menus
export const reorderMenus = async (menuIds) => {
  const response = await api.put("/api/menu/reorder", menuIds);
  
  if (response.data && response.data.status === 1) {
    return response.data;
  }
  
  throw new Error("Failed to reorder menus");
};

// Sync categories to menus
export const syncCategoriesToMenus = async () => {
  const response = await api.post("/api/menu/sync-categories");
  
  if (response.data && response.data.status === 1) {
    return response.data;
  }
  
  throw new Error("Failed to sync categories");
};

export default {
  getMenuList,
  createMenu,
  updateMenu,
  deleteMenu,
  reorderMenus,
  syncCategoriesToMenus
};