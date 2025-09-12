import api from '../api';
import { getApiBaseUrl } from '../config/apiConfig';

/**
 * Document Service - API calls for document management
 * ✅ Sử dụng backend APIs cho documents:
 * - GET /api/news/documents - Lấy danh sách documents  
 * - POST /api/news/create-document - Tạo document
 * - PUT /api/news/update-document/{id} - Update document
 * - DELETE /api/news/delete/{id} - Xóa document
 * - GET /api/news/documents/{id} - Lấy detail document
 */

const documentService = {
  /**
   * Fetch all documents
   */
  fetchDocuments: async (params = {}) => {
    try {
      const queryParams = {
        pageNumber: params.page || params.pageNumber || 1,
        pageSize: params.pageSize || 10,
        keyword: params.keyword || "",
        status: params.status,
        dateFrom: params.dateFrom,
        dateTo: params.dateTo,
        isOutstanding: params.isOutstanding
      };

      // Remove undefined/empty params
      Object.keys(queryParams).forEach(key => {
        if (queryParams[key] === undefined || queryParams[key] === '') {
          delete queryParams[key];
        }
      });

      // Add sorting if provided
      if (params.sortBy) {
        queryParams.sortBy = params.sortBy;
        queryParams.sortDirection = params.sortDirection || 'desc';
      }

      console.log('📡 Fetching documents:', queryParams);
      const response = await api.get('/api/news/documents', { params: queryParams });
      
      console.log('📨 Documents response:', response.data);

      // Handle API response format
      if (response.data && response.data.status === 1 && response.data.data) {
        const dataObj = response.data.data;
        return {
          success: true,
          data: {
            items: dataObj.items || [],
            totalItems: dataObj.totalItems || 0,
            totalPages: Math.ceil((dataObj.totalItems || 0) / (params.pageSize || 10)),
            currentPage: dataObj.page || (params.page || 1),
            pageSize: dataObj.pageSize || (params.pageSize || 10)
          }
        };
      }
      
      return {
        success: false,
        message: 'Invalid response format'
      };
    } catch (error) {
      console.error('❌ Get documents error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch documents'
      };
    }
  },

  /**
   * Get document by ID
   */
  getDocumentById: async (documentId) => {
    try {
      console.log('📡 Fetching document by ID:', documentId);
      const response = await api.get(`/api/news/documents/${documentId}`);
      
      console.log('✅ Document detail fetched successfully');
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
    } catch (error) {
      console.error('❌ Get document by ID error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get document detail'
      };
    }
  },

  /**
   * Create new document
   */
  createDocument: async (documentData) => {
    try {
      console.log('🚀 DocumentService.createDocument called with:', documentData);
      
      const payload = {
        titleVi: documentData.titleVi,
        titleEn: documentData.titleEn || '',
        descriptionVi: documentData.descriptionVi || '',
        descriptionEn: documentData.descriptionEn || '',
        attachmentIds: documentData.attachmentIds || [],
        featuredImageId: documentData.featuredImageId || null,
        newsCategoryId: documentData.newsCategoryId || 1,
        timePosted: documentData.timePosted || new Date().toISOString(),
        status: documentData.status || 1
      };
      
      console.log('📡 Making API call to /api/news/create-document with payload:', payload);
      
      const response = await api.post('/api/news/create-document', payload);
      
      console.log('✅ API response received:', response);
      
      return {
        success: true,
        data: response.data,
        message: 'Tạo tài liệu thành công'
      };
    } catch (error) {
      console.error('❌ Error creating document:', error);
      console.error('❌ Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      
      const errorMessage = error.response?.data?.message || error.response?.data?.Message || error.message || 'Lỗi tạo tài liệu';
      
      return {
        success: false,
        message: errorMessage,
        data: null,
        statusCode: error.response?.status,
        errorDetails: error.response?.data
      };
    }
  },

  /**
   * Update document
   */
  updateDocument: async (documentId, documentData) => {
    try {
      console.log('🔧 DocumentService.updateDocument called with:', { documentId, documentData });
      
      const payload = {
        titleVi: documentData.titleVi,
        titleEn: documentData.titleEn || '',
        descriptionVi: documentData.descriptionVi || '',
        descriptionEn: documentData.descriptionEn || '',
        attachmentIds: documentData.attachmentIds || [],
        featuredImageId: documentData.featuredImageId || null,
        newsCategoryId: documentData.newsCategoryId || 1,
        timePosted: documentData.timePosted || new Date().toISOString(),
        status: documentData.status || 1
      };
      
      console.log('📡 Making API call to /api/news/update-document/' + documentId + ' with payload:', payload);
      
      const response = await api.put(`/api/news/update-document/${documentId}`, payload);
      
      console.log('✅ Update API response received:', response);
      
      return {
        success: true,
        data: response.data,
        message: 'Cập nhật tài liệu thành công'
      };
    } catch (error) {
      console.error('❌ Error updating document:', error);
      console.error('❌ Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      
      return {
        success: false,
        message: error.response?.data?.message || error.response?.data?.Message || 'Lỗi cập nhật tài liệu',
        data: null,
        statusCode: error.response?.status,
        errorDetails: error.response?.data
      };
    }
  },

  /**
   * Delete document
   */
  deleteDocument: async (documentId) => {
    try {
      console.log('📡 Deleting document:', documentId);
      const response = await api.delete(`/api/news/delete/${documentId}`);
      
      console.log('✅ Document deleted successfully');
      return {
        success: true,
        data: response.data,
        message: 'Xóa tài liệu thành công'
      };
    } catch (error) {
      console.error('❌ Delete document error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete document'
      };
    }
  },

  /**
   * Bulk delete documents
   */
  bulkDeleteDocuments: async (ids) => {
    try {
      await api.post('/api/documents/bulk-delete', { ids });
      return {
        success: true,
        message: `Xóa ${ids.length} tài liệu thành công`
      };
    } catch (error) {
      console.error('Error bulk deleting documents:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi xóa tài liệu'
      };
    }
  },

  /**
   * Download document
   */
  downloadDocument: async (documentId, filename) => {
    try {
      console.log('📡 Downloading document:', documentId, filename);
      
      const response = await api.get(`/api/attachments/download/${documentId}`, {
        responseType: 'blob'
      });
      
      // Create download link
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log('✅ Document downloaded successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Download document error:', error);
      throw new Error(error.response?.data?.message || 'Failed to download document');
    }
  },

  /**
   * Get attachments for document
   */
  getDocumentAttachments: async (documentId) => {
    try {
      const response = await api.get(`/api/attachments/entity/News/${documentId}`);
      return {
        success: true,
        data: response.data.data || []
      };
    } catch (error) {
      console.error('Error fetching document attachments:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi tải file tài liệu',
        data: []
      };
    }
  },

  /**
   * Helper: Get attachment URL
   */
  getAttachmentUrl: (attachmentId) => {
    const baseUrl = getApiBaseUrl();
    return `${baseUrl}/api/attachments/${attachmentId}`;
  },

  /**
   * Helper: Generate document slug from Vietnamese text
   */
  generateSlug: (title) => {
    if (!title) return '';
    return title
      .toLowerCase()
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
      .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
      .replace(/[ìíịỉĩ]/g, 'i')
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
      .replace(/[ùúụủũưừứựửữ]/g, 'u')
      .replace(/[ỳýỵỷỹ]/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  },

  /**
   * Search documents
   */
  searchDocuments: async (query, options = {}) => {
    try {
      const params = new URLSearchParams({
        keyword: query,
        pageNumber: options.page || 1,
        pageSize: options.limit || 10,
        status: options.status !== undefined ? options.status : 1
      }).toString();

      const response = await api.get(`/api/news/documents?${params}`);
      
      if (response.data && response.data.status === 1 && response.data.data) {
        const dataObj = response.data.data;
        return {
          success: true,
          data: dataObj.items || [],
          total: dataObj.totalItems || 0
        };
      }
      
      return {
        success: false,
        message: 'Invalid search response',
        data: [],
        total: 0
      };
    } catch (error) {
      console.error('Error searching documents:', error);
      return {
        success: false,
        message: 'Lỗi tìm kiếm tài liệu',
        data: [],
        total: 0
      };
    }
  }
};

export default documentService;