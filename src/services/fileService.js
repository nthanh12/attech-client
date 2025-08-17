import api from '../api';

/**
 * FILES MODULE - TỔNG HỢP FILE MANAGEMENT SERVICE
 * Đây là service tổng hợp cho tất cả 3 modules: Media, Documents, Files
 * Theo API Documentation được cung cấp
 */

// API endpoints
const MEDIA_API = '/api/media';
const DOCUMENTS_API = '/api/documents';
const FILES_API = '/api/files';

// Entity Types theo API specification
export const EntityType = {
  Post: 1,        // Bài viết
  Product: 2,     // Sản phẩm
  Service: 3,     // Dịch vụ
  User: 4,        // User avatar, etc.
  Media: 5,       // Media gallery
  Document: 6,    // Document library
  Temp: 999       // Upload tạm, chưa gán entity
};

// File Types
export const FileType = {
  Images: 'images',
  Documents: 'documents',
  Videos: 'videos',
  Audio: 'audio'
};

// Relation Types
export const RelationType = {
  Primary: 'primary',
  Gallery: 'gallery',
  Attachment: 'attachment',
  Thumbnail: 'thumbnail',
  Content: 'content'
};

// ====================
// MEDIA MODULE APIs
// ====================

/**
 * GET /api/media/gallery?page=1&pageSize=10&keyword=search&sort=createdDate-desc
 */
export const getMediaGallery = async (params = {}) => {
  try {
    const queryParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      keyword: params.keyword,
      sort: params.sort
    };
    
    const response = await api.get(`${MEDIA_API}/gallery`, { params: queryParams });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching media gallery:', error);
    throw error;
  }
};

/**
 * GET /api/media/images?page=1&pageSize=10
 */
export const getMediaImages = async (params = {}) => {
  try {
    const queryParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 10
    };
    
    const response = await api.get(`${MEDIA_API}/images`, { params: queryParams });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching media images:', error);
    throw error;
  }
};

/**
 * GET /api/media/videos?page=1&pageSize=10
 */
export const getMediaVideos = async (params = {}) => {
  try {
    const queryParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 10
    };
    
    const response = await api.get(`${MEDIA_API}/videos`, { params: queryParams });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching media videos:', error);
    throw error;
  }
};

/**
 * GET /api/media/by-entity/{entityType}/{entityId}?page=1&pageSize=10
 */
export const getMediaByEntity = async (entityType, entityId, params = {}) => {
  try {
    const queryParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 10
    };
    
    const response = await api.get(`${MEDIA_API}/by-entity/${entityType}/${entityId}`, { params: queryParams });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching media by entity:', error);
    throw error;
  }
};

/**
 * GET /api/media/{id}
 */
export const getMediaById = async (id) => {
  try {
    const response = await api.get(`${MEDIA_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching media by ID:', error);
    throw error;
  }
};

/**
 * POST /api/media/upload
 */
export const uploadMedia = async (file, metadata = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    Object.keys(metadata).forEach(key => {
      if (metadata[key] !== null && metadata[key] !== undefined) {
        formData.append(key, metadata[key]);
      }
    });
    
    const response = await api.post(`${MEDIA_API}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
};

/**
 * PUT /api/media/{id}/metadata
 */
export const updateMediaMetadata = async (id, metadata) => {
  try {
    const response = await api.put(`${MEDIA_API}/${id}/metadata`, metadata);
    return response.data;
  } catch (error) {
    console.error('Error updating media metadata:', error);
    throw error;
  }
};

/**
 * DELETE /api/media/{id}
 */
export const deleteMedia = async (id) => {
  try {
    const response = await api.delete(`${MEDIA_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting media:', error);
    throw error;
  }
};

/**
 * POST /api/media/bulk-delete
 */
export const bulkDeleteMedia = async (mediaIds) => {
  try {
    const response = await api.post(`${MEDIA_API}/bulk-delete`, mediaIds);
    return response.data;
  } catch (error) {
    console.error('Error bulk deleting media:', error);
    throw error;
  }
};

/**
 * POST /api/media/bulk-update
 */
export const bulkUpdateMedia = async (updateData) => {
  try {
    const response = await api.post(`${MEDIA_API}/bulk-update`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error bulk updating media:', error);
    throw error;
  }
};

// ====================
// DOCUMENTS MODULE APIs
// ====================

/**
 * GET /api/documents?page=1&pageSize=10&keyword=search&category=1&author=user
 */
export const getDocuments = async (params = {}) => {
  try {
    const queryParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      keyword: params.keyword,
      category: params.category,
      author: params.author
    };
    
    const response = await api.get(DOCUMENTS_API, { params: queryParams });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

/**
 * GET /api/documents/search?keyword=test&categoryId=1&page=1&pageSize=10
 */
export const searchDocuments = async (params = {}) => {
  try {
    const queryParams = {
      keyword: params.keyword || '',
      categoryId: params.categoryId,
      author: params.author,
      page: params.page || 1,
      pageSize: params.pageSize || 10
    };
    
    const response = await api.get(`${DOCUMENTS_API}/search`, { params: queryParams });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error searching documents:', error);
    throw error;
  }
};

/**
 * GET /api/documents/by-entity/{entityType}/{entityId}?page=1&pageSize=10
 */
export const getDocumentsByEntity = async (entityType, entityId, params = {}) => {
  try {
    const queryParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 10
    };
    
    const response = await api.get(`${DOCUMENTS_API}/by-entity/${entityType}/${entityId}`, { params: queryParams });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching documents by entity:', error);
    throw error;
  }
};

/**
 * GET /api/documents/{id}
 */
export const getDocumentById = async (id) => {
  try {
    const response = await api.get(`${DOCUMENTS_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching document by ID:', error);
    throw error;
  }
};

/**
 * GET /api/documents/{id}/download
 */
export const downloadDocument = async (id, filename) => {
  try {
    const response = await api.get(`${DOCUMENTS_API}/${id}/download`, {
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
    
    return { success: true };
  } catch (error) {
    console.error('Error downloading document:', error);
    throw error;
  }
};

/**
 * POST /api/documents/upload
 */
export const uploadDocument = async (file, metadata = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    if (metadata.title) formData.append('title', metadata.title);
    if (metadata.description) formData.append('description', metadata.description);
    if (metadata.author) formData.append('author', metadata.author);
    if (metadata.categoryId) formData.append('categoryId', metadata.categoryId);
    if (metadata.tags) formData.append('tags', metadata.tags);
    
    const response = await api.post(`${DOCUMENTS_API}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

/**
 * PUT /api/documents/{id}/metadata
 */
export const updateDocumentMetadata = async (id, metadata) => {
  try {
    const response = await api.put(`${DOCUMENTS_API}/${id}/metadata`, metadata);
    return response.data;
  } catch (error) {
    console.error('Error updating document metadata:', error);
    throw error;
  }
};

/**
 * DELETE /api/documents/{id}
 */
export const deleteDocument = async (id) => {
  try {
    const response = await api.delete(`${DOCUMENTS_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

/**
 * POST /api/documents/bulk-delete
 */
export const bulkDeleteDocuments = async (documentIds) => {
  try {
    const response = await api.post(`${DOCUMENTS_API}/bulk-delete`, documentIds);
    return response.data;
  } catch (error) {
    console.error('Error bulk deleting documents:', error);
    throw error;
  }
};

/**
 * DELETE /api/documents/by-entity/{entityType}/{entityId}
 */
export const deleteDocumentsByEntity = async (entityType, entityId) => {
  try {
    const response = await api.delete(`${DOCUMENTS_API}/by-entity/${entityType}/${entityId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting documents by entity:', error);
    throw error;
  }
};

// ====================
// FILES MODULE APIs (ADVANCED)
// ====================

/**
 * GET /api/files?page=1&pageSize=10&fileType=images&entityType=1&createdBy=1&fromDate=2024-01-01&toDate=2024-12-31
 */
export const getAllFiles = async (params = {}) => {
  try {
    const queryParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      fileType: params.fileType,
      entityType: params.entityType,
      createdBy: params.createdBy,
      fromDate: params.fromDate,
      toDate: params.toDate
    };
    
    const response = await api.get(FILES_API, { params: queryParams });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching all files:', error);
    throw error;
  }
};

/**
 * GET /api/files/search?keyword=test&tags=document&author=user&categoryId=1&page=1&pageSize=10
 */
export const searchFiles = async (params = {}) => {
  try {
    const queryParams = {
      keyword: params.keyword || '',
      tags: params.tags,
      author: params.author,
      categoryId: params.categoryId,
      page: params.page || 1,
      pageSize: params.pageSize || 10
    };
    
    const response = await api.get(`${FILES_API}/search`, { params: queryParams });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error searching files:', error);
    throw error;
  }
};

/**
 * GET /api/files/by-type/{fileType}?page=1&pageSize=10
 */
export const getFilesByType = async (fileType, params = {}) => {
  try {
    const queryParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 10
    };
    
    const response = await api.get(`${FILES_API}/by-type/${fileType}`, { params: queryParams });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching files by type:', error);
    throw error;
  }
};

/**
 * GET /api/files/by-entity-type/{entityType}?page=1&pageSize=10
 */
export const getFilesByEntityType = async (entityType, params = {}) => {
  try {
    const queryParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 10
    };
    
    const response = await api.get(`${FILES_API}/by-entity-type/${entityType}`, { params: queryParams });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching files by entity type:', error);
    throw error;
  }
};

/**
 * GET /api/files/entity/{entityType}/{entityId}?page=1&pageSize=10
 */
export const getFilesByEntity = async (entityType, entityId, params = {}) => {
  try {
    const queryParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 10
    };
    
    const response = await api.get(`${FILES_API}/entity/${entityType}/${entityId}`, { params: queryParams });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching files by entity:', error);
    throw error;
  }
};

/**
 * GET /api/files/{id}
 */
export const getFileById = async (id) => {
  try {
    const response = await api.get(`${FILES_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file by ID:', error);
    throw error;
  }
};

/**
 * GET /api/files/orphaned?page=1&pageSize=10
 */
export const getOrphanedFiles = async (params = {}) => {
  try {
    const queryParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 10
    };
    
    const response = await api.get(`${FILES_API}/orphaned`, { params: queryParams });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching orphaned files:', error);
    throw error;
  }
};

/**
 * GET /api/files/duplicates?page=1&pageSize=10
 */
export const getDuplicateFiles = async (params = {}) => {
  try {
    const queryParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 10
    };
    
    const response = await api.get(`${FILES_API}/duplicates`, { params: queryParams });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching duplicate files:', error);
    throw error;
  }
};

/**
 * GET /api/files/storage-stats
 */
export const getStorageStats = async () => {
  try {
    const response = await api.get(`${FILES_API}/storage-stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching storage stats:', error);
    throw error;
  }
};

/**
 * GET /api/files/{id}/relations
 */
export const getFileRelations = async (id) => {
  try {
    const response = await api.get(`${FILES_API}/${id}/relations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file relations:', error);
    throw error;
  }
};

/**
 * GET /api/files/{id}/usage-stats
 */
export const getFileUsageStats = async (id) => {
  try {
    const response = await api.get(`${FILES_API}/${id}/usage-stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file usage stats:', error);
    throw error;
  }
};

/**
 * POST /api/files/upload-standalone
 */
export const uploadStandaloneFile = async (file, metadata = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    Object.keys(metadata).forEach(key => {
      if (metadata[key] !== null && metadata[key] !== undefined) {
        formData.append(key, metadata[key]);
      }
    });
    
    const response = await api.post(`${FILES_API}/upload-standalone`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading standalone file:', error);
    throw error;
  }
};

/**
 * POST /api/files/upload-with-entity
 */
export const uploadFileWithEntity = async (file, entityType, entityId, relationType, isPrimary = false, metadata = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('entityType', entityType);
    formData.append('entityId', entityId);
    formData.append('relationType', relationType);
    formData.append('isPrimary', isPrimary);
    
    Object.keys(metadata).forEach(key => {
      if (metadata[key] !== null && metadata[key] !== undefined) {
        formData.append(key, metadata[key]);
      }
    });
    
    const response = await api.post(`${FILES_API}/upload-with-entity`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading file with entity:', error);
    throw error;
  }
};

/**
 * POST /api/files/reuse
 */
export const reuseFile = async (fileId, entityType, entityId, relationType, isPrimary = false) => {
  try {
    const response = await api.post(`${FILES_API}/reuse`, {
      fileId,
      entityType,
      entityId,
      relationType,
      isPrimary
    });
    
    return response.data;
  } catch (error) {
    console.error('Error reusing file:', error);
    throw error;
  }
};

/**
 * POST /api/files/relations
 */
export const createFileRelation = async (fileId, entityType, entityId, relationType, isPrimary = false) => {
  try {
    const response = await api.post(`${FILES_API}/relations`, {
      fileId,
      entityType,
      entityId,
      relationType,
      isPrimary
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating file relation:', error);
    throw error;
  }
};

/**
 * POST /api/files/bulk-delete
 */
export const bulkDeleteFiles = async (fileIds) => {
  try {
    const response = await api.post(`${FILES_API}/bulk-delete`, fileIds);
    return response.data;
  } catch (error) {
    console.error('Error bulk deleting files:', error);
    throw error;
  }
};

/**
 * POST /api/files/bulk-update
 */
export const bulkUpdateFiles = async (updateData) => {
  try {
    const response = await api.post(`${FILES_API}/bulk-update`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error bulk updating files:', error);
    throw error;
  }
};

/**
 * POST /api/files/cleanup?olderThanDays=30
 */
export const cleanupOldFiles = async (olderThanDays = 30) => {
  try {
    const response = await api.post(`${FILES_API}/cleanup`, null, {
      params: { olderThanDays }
    });
    return response.data;
  } catch (error) {
    console.error('Error cleaning up old files:', error);
    throw error;
  }
};

/**
 * PUT /api/files/{id}/metadata
 */
export const updateFileMetadata = async (id, metadata) => {
  try {
    const response = await api.put(`${FILES_API}/${id}/metadata`, metadata);
    return response.data;
  } catch (error) {
    console.error('Error updating file metadata:', error);
    throw error;
  }
};

/**
 * PUT /api/files/relations/{relationId}
 */
export const updateFileRelation = async (relationId, relationType, isPrimary) => {
  try {
    const response = await api.put(`${FILES_API}/relations/${relationId}`, {
      relationType,
      isPrimary
    });
    
    return response.data;
  } catch (error) {
    console.error('Error updating file relation:', error);
    throw error;
  }
};

/**
 * DELETE /api/files/{id}
 */
export const deleteFile = async (id) => {
  try {
    const response = await api.delete(`${FILES_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

/**
 * DELETE /api/files/relations/{relationId}
 */
export const deleteFileRelation = async (relationId) => {
  try {
    const response = await api.delete(`${FILES_API}/relations/${relationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting file relation:', error);
    throw error;
  }
};

// ====================
// HELPER FUNCTIONS
// ====================

/**
 * Handle API response format standardization
 * Convert different response formats to consistent format
 */
const handleApiResponse = (response) => {
  const data = response.data;
  
  // Format theo API spec: {success: true, data: {items, totalRecords, totalPages, currentPage, pageSize}}
  if (data.success !== undefined) {
    return data;
  }
  
  // Format cũ: {status: 1, data: {...}}
  if (data.Status === 1 && data.Data) {
    return {
      success: true,
      data: {
        items: data.Data.items || data.Data,
        totalRecords: data.Data.totalRecords || data.Data.total || 0,
        totalPages: data.Data.totalPages || Math.ceil((data.Data.totalRecords || data.Data.total || 0) / 10),
        currentPage: data.Data.currentPage || data.Data.page || 1,
        pageSize: data.Data.pageSize || 10
      }
    };
  }
  
  // Direct data format
  return {
    success: true,
    data: {
      items: data.items || data,
      totalRecords: data.totalRecords || data.total || 0,
      totalPages: data.totalPages || Math.ceil((data.totalRecords || data.total || 0) / 10),
      currentPage: data.currentPage || data.page || 1,
      pageSize: data.pageSize || 10
    }
  };
};

/**
 * Format file size display
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get file type display name
 */
export const getFileTypeDisplayName = (fileType) => {
  const typeMap = {
    'images': 'Hình ảnh',
    'documents': 'Tài liệu',
    'videos': 'Video',
    'audio': 'Âm thanh'
  };
  
  return typeMap[fileType] || 'Khác';
};

/**
 * Get entity type display name
 */
export const getEntityTypeDisplayName = (entityType) => {
  const typeMap = {
    [EntityType.Post]: 'Bài viết',
    [EntityType.Product]: 'Sản phẩm',
    [EntityType.Service]: 'Dịch vụ',
    [EntityType.User]: 'Người dùng',
    [EntityType.Media]: 'Media',
    [EntityType.Document]: 'Tài liệu',
    [EntityType.Temp]: 'Tạm thời'
  };
  
  return typeMap[entityType] || 'Không xác định';
};

/**
 * Validate file type for specific modules
 */
export const validateFileType = (file, module = 'all') => {
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const videoTypes = ['video/mp4', 'video/webm', 'video/avi'];
  const audioTypes = ['audio/mp3', 'audio/wav', 'audio/ogg'];
  const documentTypes = [
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
  
  const allMediaTypes = [...imageTypes, ...videoTypes, ...audioTypes];
  
  switch (module) {
    case 'media':
      return allMediaTypes.includes(file.type);
    case 'documents':
      return documentTypes.includes(file.type);
    case 'images':
      return imageTypes.includes(file.type);
    case 'videos':
      return videoTypes.includes(file.type);
    case 'audio':
      return audioTypes.includes(file.type);
    default:
      return [...allMediaTypes, ...documentTypes].includes(file.type);
  }
};

// Default export for convenience
const fileService = {
  // Entity Types
  EntityType,
  FileType,
  RelationType,
  
  // Media APIs
  getMediaGallery,
  getMediaImages,
  getMediaVideos,
  getMediaByEntity,
  getMediaById,
  uploadMedia,
  updateMediaMetadata,
  deleteMedia,
  bulkDeleteMedia,
  bulkUpdateMedia,
  
  // Documents APIs
  getDocuments,
  searchDocuments,
  getDocumentsByEntity,
  getDocumentById,
  downloadDocument,
  uploadDocument,
  updateDocumentMetadata,
  deleteDocument,
  bulkDeleteDocuments,
  deleteDocumentsByEntity,
  
  // Files APIs
  getAllFiles,
  searchFiles,
  getFilesByType,
  getFilesByEntityType,
  getFilesByEntity,
  getFileById,
  getOrphanedFiles,
  getDuplicateFiles,
  getStorageStats,
  getFileRelations,
  getFileUsageStats,
  uploadStandaloneFile,
  uploadFileWithEntity,
  reuseFile,
  createFileRelation,
  bulkDeleteFiles,
  bulkUpdateFiles,
  cleanupOldFiles,
  updateFileMetadata,
  updateFileRelation,
  deleteFile,
  deleteFileRelation,
  
  // Helper functions
  formatFileSize,
  getFileTypeDisplayName,
  getEntityTypeDisplayName,
  validateFileType
};

export default fileService;