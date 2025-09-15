import api from "../api";

/**
 * Client Document Service - For public pages
 * API: /api/client/documents
 */

const clientDocumentService = {
  /**
   * Get documents for public pages
   */
  getDocuments: async (params = {}) => {
    try {
      const queryParams = {
        pageNumber: params.page || 1,
        pageSize: params.pageSize || 20,
        keyword: params.keyword || "",
        status: 1, // Only published documents for public
        categoryId: params.categoryId,
        isOutstanding: params.isOutstanding,
        sortBy: params.sortBy || 'timePosted',
        sortDirection: params.sortDirection || 'desc'
      };

      // Remove undefined/empty params
      Object.keys(queryParams).forEach(key => {
        if (queryParams[key] === undefined || queryParams[key] === '') {
          delete queryParams[key];
        }
      });const response = await api.get('/api/client/documents', { params: queryParams });if (response.data && response.data.status === 1 && response.data.data) {
        return {
          success: true,
          data: response.data.data
        };
      }
      
      return {
        success: false,
        message: 'Invalid response format',
        data: { items: [], totalItems: 0 }
      };
    } catch (error) {return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch documents',
        data: { items: [], totalItems: 0 }
      };
    }
  },

  /**
   * Get document by slug for public pages
   */
  getDocumentBySlug: async (slug) => {
    try {const response = await api.get(`/api/client/documents/${slug}`);
      
      if (response.data && response.data.status === 1) {
        return {
          success: true,
          data: response.data.data
        };
      }
      
      return {
        success: false,
        message: 'Document not found'
      };
    } catch (error) {return {
        success: false,
        message: error.response?.data?.message || 'Failed to get document'
      };
    }
  }
};

export default clientDocumentService;