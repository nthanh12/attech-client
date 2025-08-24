import api from "../api";
import { getOptimizedFileUrl, getDownloadUrl, FileServingUtils } from './fileServingService';

// Upload document files to /api/documents/upload
export const uploadDocument = async (file, metadata = {}) => {
  console.log('📄 Document upload started for:', file.name || 'unnamed file');
  console.log('📋 File details:', {
    size: file.size,
    type: file.type,
    name: file.name || 'blob'
  });
  
  // Validate document file types
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint', 
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/csv'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} not supported for document upload. Use media upload instead.`);
  }
  
  const formData = new FormData();
  formData.append('file', file);
  
  // Add metadata if provided theo API spec
  if (metadata.title) formData.append('title', metadata.title);
  if (metadata.description) formData.append('description', metadata.description);
  if (metadata.author) formData.append('author', metadata.author);
  if (metadata.category) formData.append('category', metadata.category);
  if (metadata.categoryId) formData.append('categoryId', metadata.categoryId);
  if (metadata.tags) formData.append('tags', metadata.tags);
  
  try {
    console.log('📡 Sending document upload request to /api/documents/upload');
    
    const response = await api.post("/api/documents/upload", formData, {
      headers: { 
        'Content-Type': 'multipart/form-data'
      },
      timeout: 120000 // 2 minutes timeout for large documents
    });
    
    console.log('📨 Document upload response received:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data
    });
    
    // Handle AttechServer response format: {status: 1, data: {location: "url"}, code: 200, message: "Upload tài liệu thành công"}
    const responseData = response.data;
    
    if (responseData && responseData.status === 1 && responseData.data) {
      const data = responseData.data;
      if (data.location) {
        console.log('✅ Document upload successful, location:', data.location);
        return { 
          location: data.location,
          url: data.location,
          ...data 
        };
      }
    }
    
    // Fallback for other formats
    if (responseData && responseData.location) {
      console.log('✅ Document upload successful (fallback), location:', responseData.location);
      return responseData;
    }
    
    throw new Error('Invalid upload response format');
    
  } catch (error) {
    console.error('❌ Document upload error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    
    throw new Error(error.response?.data?.message || 'Document upload failed: ' + error.message);
  }
};

/**
 * Get documents list với pagination và filters theo API spec
 * @param {Object} params - {page, pageSize, keyword, category, author}
 * @returns {Promise<Object>} Response data với chuẩn format
 */
export const getDocuments = async (params = {}) => {
  try {
    const queryParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      keyword: params.keyword || undefined,
      category: params.category || undefined,
      author: params.author || undefined
    };
    
    console.log('📡 Fetching documents:', queryParams);
    const response = await api.get('/api/documents', { params: queryParams });
    
    console.log('📨 Documents response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Get documents error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch documents');
  }
};

// Backward compatibility
export const getDocumentLibrary = getDocuments;

// Get document list (compatible with existing code)
export const getDocumentFiles = async (filters = {}) => {
  return await getDocumentLibrary(filters);
};

// Download document
export const downloadDocument = async (documentId, filename) => {
  try {
    console.log('📡 Downloading document:', documentId, filename);
    
    const response = await api.get(`/api/documents/${documentId}/download`, {
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
};

// Delete document file
export const deleteDocumentFile = async (documentId) => {
  try {
    console.log('📡 Deleting document file:', documentId);
    const response = await api.delete(`/api/documents/${documentId}`);
    console.log('✅ Document file deleted successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Delete document file error:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete document file');
  }
};

/**
 * Get documents by entity theo API spec
 * @param {number} entityType - Entity type (1-6, 999)
 * @param {number} entityId - Entity ID
 * @param {Object} params - {page, pageSize}
 * @returns {Promise<Object>} Response data
 */
export const getDocumentsByEntity = async (entityType, entityId, params = {}) => {
  try {
    const queryParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 10
    };
    
    console.log('📡 Fetching documents by entity:', entityType, entityId);
    const response = await api.get(`/api/documents/by-entity/${entityType}/${entityId}`, {
      params: queryParams
    });
    
    console.log('✅ Documents by entity fetched successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Get documents by entity error:', error);
    throw new Error(error.response?.data?.message || 'Failed to get documents by entity');
  }
};

/**
 * Get document detail by ID
 * @param {number} documentId - Document ID
 * @returns {Promise<Object>} Document detail
 */
export const getDocumentById = async (documentId) => {
  try {
    console.log('📡 Fetching document by ID:', documentId);
    const response = await api.get(`/api/documents/${documentId}`);
    console.log('✅ Document detail fetched successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Get document by ID error:', error);
    throw new Error(error.response?.data?.message || 'Failed to get document detail');
  }
};

/**
 * Update document metadata theo API spec
 * @param {number} documentId - Document ID
 * @param {Object} metadata - {title, description, author, categoryId, tags, version}
 * @returns {Promise<Object>} Response data
 */
export const updateDocumentMetadata = async (documentId, metadata) => {
  try {
    console.log('📡 Updating document metadata:', documentId, metadata);
    const response = await api.put(`/api/documents/${documentId}/metadata`, metadata);
    console.log('✅ Document metadata updated successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Update document metadata error:', error);
    throw new Error(error.response?.data?.message || 'Failed to update document metadata');
  }
};

// Upload multiple documents
export const uploadMultipleDocuments = async (files, globalMetadata = {}) => {
  // Validate all files first
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint', 
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/csv'
  ];
  
  const results = [];
  
  // Upload each file individually since multi-upload endpoint doesn't exist
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    if (!allowedTypes.includes(file.type)) {
      results.push({
        success: false,
        error: `File ${file.name} has unsupported type: ${file.type}`,
        fileName: file.name
      });
      continue;
    }
    
    try {
      console.log(`📡 Uploading document ${i + 1}/${files.length}:`, file.name);
      const result = await uploadDocument(file, globalMetadata);
      results.push({
        success: true,
        data: result,
        fileName: file.name
      });
    } catch (error) {
      console.error(`Failed to upload ${file.name}:`, error);
      results.push({
        success: false,
        error: error.message,
        fileName: file.name
      });
    }
  }
  
  console.log('✅ Multiple document upload completed:', results);
  return {
    results,
    successCount: results.filter(r => r.success).length,
    failCount: results.filter(r => !r.success).length
  };
};

/**
 * Search documents theo API spec
 * @param {Object} params - {keyword, categoryId, author, page, pageSize}
 * @returns {Promise<Object>} Response data
 */
export const searchDocuments = async (params = {}) => {
  try {
    const queryParams = {
      keyword: params.keyword || params.query || '',
      categoryId: params.categoryId || params.category || undefined,
      author: params.author || undefined,
      page: params.page || 1,
      pageSize: params.pageSize || 10
    };
    
    console.log('📡 Searching documents:', queryParams);
    const response = await api.get('/api/documents/search', { params: queryParams });
    
    console.log('✅ Document search successful');
    return response.data;
  } catch (error) {
    console.error('❌ Search documents error:', error);
    throw new Error(error.response?.data?.message || 'Document search failed');
  }
};

// Get document URL with optimized serving
export const getDocumentUrl = (originalUrl) => {
  return getOptimizedFileUrl(originalUrl);
};

// Get download URL for documents
export const getDocumentDownloadUrl = (originalUrl, filename) => {
  return getDownloadUrl(originalUrl, filename);
};

// Document serving utilities
export const DocumentServingUtils = {
  view: FileServingUtils.document.getViewUrl,
  download: FileServingUtils.document.getDownloadUrl
};

/**
 * Bulk delete multiple documents
 * @param {Array<number>} documentIds - Array of document IDs
 * @returns {Promise<Object>} Response data
 */
export const bulkDeleteDocuments = async (documentIds) => {
  try {
    console.log('📡 Bulk deleting documents:', documentIds);
    const response = await api.post('/api/documents/bulk-delete', documentIds);
    console.log('✅ Documents bulk deleted successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Bulk delete documents error:', error);
    throw new Error(error.response?.data?.message || 'Failed to bulk delete documents');
  }
};

/**
 * Delete all documents by entity
 * @param {number} entityType - Entity type
 * @param {number} entityId - Entity ID
 * @returns {Promise<Object>} Response data
 */
export const deleteDocumentsByEntity = async (entityType, entityId) => {
  try {
    console.log('📡 Deleting documents by entity:', entityType, entityId);
    const response = await api.delete(`/api/documents/by-entity/${entityType}/${entityId}`);
    console.log('✅ Documents deleted by entity successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Delete documents by entity error:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete documents by entity');
  }
};

// Get file type display name
export const getDocumentTypeDisplayName = (mimeType) => {
  const typeMap = {
    'application/pdf': 'PDF',
    'application/msword': 'DOC',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
    'application/vnd.ms-excel': 'XLS',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
    'application/vnd.ms-powerpoint': 'PPT',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
    'text/plain': 'TXT',
    'text/csv': 'CSV'
  };
  
  return typeMap[mimeType] || 'DOC';
};

// Entity Types theo API spec
export const EntityType = {
  Post: 1,        // Bài viết
  Product: 2,     // Sản phẩm
  Service: 3,     // Dịch vụ
  User: 4,        // User avatar, etc.
  Media: 5,       // Media gallery
  Document: 6,    // Document library
  Temp: 999       // Upload tạm, chưa gán entity
};

// Document service object for easy importing
export const documentService = {
  // Document CRUD
  getDocuments: async (params = {}) => {
    try {
      const queryParams = {
        page: params.page || 1,
        pageSize: params.pageSize || 10,
        keyword: params.keyword || undefined,
        category: params.category || undefined,
        author: params.author || undefined,
        status: params.status || undefined,
        fileType: params.fileType || undefined,
        dateFrom: params.dateFrom || undefined,
        dateTo: params.dateTo || undefined,
        sortBy: params.sortBy || undefined,
        sortDirection: params.sortDirection || undefined,
      };
      
      console.log('📡 Fetching documents:', queryParams);
      const response = await api.get('/api/documents', { params: queryParams });
      
      console.log('📨 Documents response:', response.data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('❌ Get documents error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch documents'
      };
    }
  },

  createDocument: async (documentData) => {
    try {
      console.log('📡 Creating document:', documentData);
      const response = await api.post('/api/documents', documentData);
      
      console.log('✅ Document created successfully');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('❌ Create document error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create document'
      };
    }
  },

  updateDocument: async (documentId, documentData) => {
    try {
      console.log('📡 Updating document:', documentId, documentData);
      const response = await api.put(`/api/documents/${documentId}`, documentData);
      
      console.log('✅ Document updated successfully');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('❌ Update document error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update document'
      };
    }
  },

  deleteDocument: async (documentId) => {
    try {
      console.log('📡 Deleting document:', documentId);
      const response = await api.delete(`/api/documents/${documentId}`);
      
      console.log('✅ Document deleted successfully');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('❌ Delete document error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete document'
      };
    }
  },

  uploadDocument: async (file, options = {}) => {
    try {
      console.log('📄 Document upload started for:', file.name);
      
      const formData = new FormData();
      formData.append('file', file);
      
      // Add metadata if provided
      if (options.title) formData.append('title', options.title);
      if (options.description) formData.append('description', options.description);
      if (options.category) formData.append('category', options.category);
      if (options.tags) formData.append('tags', options.tags);
      
      const response = await api.post('/api/documents/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        timeout: 120000, // 2 minutes
        onUploadProgress: options.onUploadProgress
      });
      
      console.log('✅ Document upload successful');
      
      // Handle AttechServer response format
      const responseData = response.data;
      if (responseData && responseData.status === 1 && responseData.data) {
        return {
          success: true,
          fileUrl: responseData.data.location || responseData.data.fileUrl,
          originalFileName: file.name,
          fileType: file.name.split('.').pop().toLowerCase(),
          fileSize: file.size,
          ...responseData.data
        };
      }
      
      return {
        success: true,
        fileUrl: responseData.location || responseData.fileUrl,
        originalFileName: file.name,
        fileType: file.name.split('.').pop().toLowerCase(),
        fileSize: file.size,
        ...responseData
      };
    } catch (error) {
      console.error('❌ Document upload error:', error);
      throw new Error(error.response?.data?.message || 'Document upload failed');
    }
  },

  downloadDocument: async (documentId, filename) => {
    try {
      console.log('📡 Downloading document:', documentId, filename);
      
      const response = await api.get(`/api/documents/${documentId}/download`, {
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
  }
};