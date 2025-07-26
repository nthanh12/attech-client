import api from "../api";

// Service endpoints (AttechServer API)
export const fetchServices = async (params = {}) => {
  try {
    console.log("🔍 Fetching services from backend: /api/service/find-all");
    const response = await api.get("/api/service/find-all", { params });
    
    // Handle AttechServer response format: {status: 1, data: {items: [], totalItems: 0}}
    if (response.data && response.data.status === 1 && response.data.data) {
      const servicesData = response.data.data.items || [];
      console.log("✅ Service data loaded successfully", servicesData);
      return servicesData;
    }
    
    // Fallback: Handle direct array
    if (response.data && Array.isArray(response.data)) {
      console.log("✅ Service data loaded (direct array)", response.data);
      return response.data;
    }
    
    throw new Error("Invalid data format");
  } catch (error) {
    console.error("❌ Failed to fetch services from backend:", error.response?.status, error.message);
    console.log("⚠️ Using empty services array");
    return [];
  }
};

export const fetchServiceById = async (id) => {
  const response = await api.get(`/api/service/find-by-id/${id}`);
  return response.data;
};

export const fetchServiceBySlug = async (slug) => {
  const response = await api.get(`/api/service/detail/${slug}`);
  return response.data;
};

export const createService = async (data) => {
  const response = await api.post("/api/service/create", data);
  return response.data;
};

export const updateService = async (data) => {
  const response = await api.put("/api/service/update", data);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await api.delete(`/api/service/delete/${id}`);
  return response.data;
}; 