import api from "../api";

export const getAllRoles = async (params = {}) => {
  const response = await api.get("/api/role/find-all", { params });
  
  if (
    response.data &&
    response.data.status === 1 &&
    response.data.data &&
    response.data.data.items
  ) {
    return {
      data: {
        items: response.data.data.items,
        totalItems: response.data.data.totalItems || response.data.data.items.length
      }
    };
  }
  
  throw new Error("Invalid roles response");
};

// Alias for backward compatibility
export const getRoles = getAllRoles;

export const getRoleById = async (id) => {
  const response = await api.get(`/api/role/find-by-id/${id}`);
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return response.data.data;
  }
  
  throw new Error("Invalid role detail response");
};

export const createRole = async (data) => {
  const response = await api.post("/api/role/create", data);
  
  if (response.data && response.data.status === 1) {
    return response.data;
  }
  
  throw new Error("Failed to create role");
};

export const updateRole = async (id, data) => {
  const requestData = {
    id: id,
    ...data
  };
  
  const response = await api.put("/api/role/update", requestData);
  
  if (response.data && response.data.status === 1) {
    return response.data;
  }
  
  throw new Error("Failed to update role");
};

export const deleteRole = async (id) => {
  const response = await api.delete(`/api/role/delete/${id}`);
  
  if (response.data && response.data.status === 1) {
    return response.data;
  }
  
  throw new Error("Failed to delete role");
};

// Additional role management functions
export const getActiveRoles = async () => {
  const response = await api.get("/api/role", {
    params: { status: 1 },
  });
  
  if (
    response.data &&
    response.data.status === 1 &&
    response.data.data &&
    response.data.data.items
  ) {
    return response.data.data.items;
  }
  
  throw new Error("Invalid active roles response");
};

export const updateRoleStatus = async (id, status) => {
  const response = await api.put(`/api/role/update-status/${id}`, { status });
  
  if (response.data && response.data.status === 1) {
    return response.data;
  }
  
  throw new Error("Failed to update role status");
};

export const getRolesByUserType = async (userType) => {
  const response = await api.get(`/api/role/find-by-user-type/${userType}`);
  
  if (response.data && response.data.status === 1 && response.data.data) {
    return response.data.data;
  }
  
  throw new Error("Invalid user type roles response");
};

export const assignPermissionsToRole = async (roleId, permissions) => {
  const response = await api.post(`/api/role/assign-permissions/${roleId}`, {
    permissions,
  });
  
  if (response.data && response.data.status === 1) {
    return response.data;
  }
  
  throw new Error("Failed to assign permissions");
};

export const getRolePermissions = async (roleId) => {
  const response = await api.get(`/api/role/permissions/${roleId}`);
  return response.data;
};
