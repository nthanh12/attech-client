import api from '../api';

/**
 * Service for internal document management (read-only for users)
 * Similar to admin document service but only for viewing
 */

/**
 * Get all published internal documents
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search query
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise<Object>} Response data
 */
export const getInternalDocuments = async (params = {}) => {
  try {
    console.log("📂 Fetching all published internal documents...", params);
    
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('keyword', params.search);
    if (params.page) queryParams.append('pageNumber', params.page);
    if (params.limit) queryParams.append('pageSize', params.limit);
    
    const response = await api.get(`/api/internal-documents/find-all-published?${queryParams.toString()}`);
    
    console.log("📡 Internal documents response:", response.data);
    
    if (response.data.status === 1) {
      return {
        success: true,
        data: response.data.data,
        total: response.data.data.totalItems || response.data.data.total || 0,
        documents: response.data.data.items || []
      };
    }
    
    return {
      success: false,
      message: response.data.message || "Failed to fetch documents"
    };
    
  } catch (error) {
    console.error("❌ Failed to fetch internal documents:", error.response?.data || error.message);
    
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to fetch documents"
    };
  }
};

/**
 * Get internal documents by category
 * @param {string} category - Category value (e.g., 'to-chuc-bo-may')
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search query
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise<Object>} Response data
 */
export const getInternalDocumentsByCategory = async (category, params = {}) => {
  try {
    console.log("📂 Fetching internal documents by category:", category, params);
    
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('keyword', params.search);
    if (params.page) queryParams.append('pageNumber', params.page);
    if (params.limit) queryParams.append('pageSize', params.limit);
    
    const response = await api.get(`/api/internal-documents/find-by-category/${category}?${queryParams.toString()}`);
    
    console.log("📡 Internal documents by category response:", response.data);
    
    if (response.data.status === 1) {
      return {
        success: true,
        data: response.data.data,
        total: response.data.data.totalItems || response.data.data.total || 0,
        documents: response.data.data.items || []
      };
    }
    
    return {
      success: false,
      message: response.data.message || "Failed to fetch documents"
    };
    
  } catch (error) {
    console.error("❌ Failed to fetch internal documents by category:", error.response?.data || error.message);
    
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to fetch documents"
    };
  }
};

/**
 * Get published document by ID
 * @param {number} id - Document ID
 * @returns {Promise<Object>} Response data
 */
export const getInternalDocumentById = async (id) => {
  try {
    console.log(`📄 Fetching published internal document ${id}...`);
    
    const response = await api.get(`/api/internal-documents/find-published-by-id/${id}`);
    
    console.log("📡 Internal document response:", response.data);
    
    if (response.data.status === 1) {
      return {
        success: true,
        data: response.data.data
      };
    }
    
    return {
      success: false,
      message: response.data.message || "Document not found"
    };
    
  } catch (error) {
    console.error("❌ Failed to fetch internal document:", error.response?.data || error.message);
    
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to fetch document"
    };
  }
};

/**
 * Download document
 * @param {number} id - Document ID
 * @param {string} filename - Original filename
 * @returns {Promise<Object>} Response data
 */
export const downloadInternalDocument = async (id, filename) => {
  try {
    console.log(`⬇️ Downloading internal document ${id}...`);
    
    const response = await api.get(`/api/internal-documents/download/${id}`, {
      responseType: 'blob'
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `document-${id}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    console.log("✅ Document downloaded successfully");
    
    return {
      success: true,
      message: "Document downloaded successfully"
    };
    
  } catch (error) {
    console.error("❌ Failed to download document:", error.response?.data || error.message);
    
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to download document"
    };
  }
};

/**
 * Get document view URL (for preview)
 * @param {number} id - Document ID
 * @returns {string} View URL
 */
export const getInternalDocumentViewUrl = (id) => {
  return `${api.defaults.baseURL}/api/internal-documents/view/${id}`;
};

/**
 * Get categories list
 * @returns {Promise<Object>} Response data
 */
export const getInternalDocumentCategories = async () => {
  try {
    console.log("📋 Fetching internal document categories...");
    
    const response = await api.get('/api/internal-documents/categories');
    
    console.log("📡 Categories response:", response.data);
    
    if (response.data.status === 1) {
      return {
        success: true,
        data: response.data.data || []
      };
    }
    
    return {
      success: false,
      message: response.data.message || "Failed to fetch categories"
    };
    
  } catch (error) {
    console.error("❌ Failed to fetch categories:", error.response?.data || error.message);
    
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to fetch categories"
    };
  }
};

/**
 * Get document statistics
 * @returns {Promise<Object>} Response data
 */
export const getInternalDocumentStats = async () => {
  try {
    console.log("📊 Fetching internal document statistics...");
    
    const response = await api.get('/api/internal-documents/stats');
    
    console.log("📡 Stats response:", response.data);
    
    if (response.data.status === 1) {
      return {
        success: true,
        data: response.data.data
      };
    }
    
    return {
      success: false,
      message: response.data.message || "Failed to fetch statistics"
    };
    
  } catch (error) {
    console.error("❌ Failed to fetch statistics:", error.response?.data || error.message);
    
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to fetch statistics"
    };
  }
};