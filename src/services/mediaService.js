import api from "../api";
import { getOptimizedFileUrl, getThumbnailUrl, getImageUrl, FileServingUtils } from './fileServingService';

/**
 * Upload media file dengan metadata
 * @param {File} file - File yang akan diupload
 * @param {Object} metadata - Metadata tambahan (optional)
 * @returns {Promise<Object>} Response data
 */
export const uploadMedia = async (file, metadata = {}) => {// Validate media file types sesuai API spec
  const allowedTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/webm', 'video/avi',
    'audio/mp3', 'audio/wav', 'audio/ogg'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} not supported for media upload.`);
  }
  
  const formData = new FormData();
  formData.append('file', file);
  
  // Thêm metadata nếu có
  if (metadata && Object.keys(metadata).length > 0) {
    formData.append('metadata', JSON.stringify(metadata));
  }
  
  try {const response = await api.post("/api/media/upload", formData, {
      headers: { 
        'Content-Type': 'multipart/form-data'
      },
      timeout: 60000 // 60 second timeout for media files
    });// Handle API response format: {statusCode: 200, message: "Upload media thành công", data: {location: "url"}}
    const responseData = response.data;
    
    if (responseData && responseData.statusCode === 200 && responseData.data) {
      const data = responseData.data;
      if (data.location) {return { 
          location: data.location,
          url: data.location,
          ...data 
        };
      }
    }
    
    // Fallback cho format cũ
    if (responseData && responseData.status === 1 && responseData.data?.location) {
      // Media upload successful (legacy format)
      return {
        location: responseData.data.location,
        url: responseData.data.location,
        ...responseData.data
      };
    }
    
    throw new Error('Invalid upload response format');
    
  } catch (error) {throw new Error(error.response?.data?.message || 'Media upload failed: ' + error.message);
  }
};

/**
 * Lấy danh sách media gallery với pagination và filter
 * @param {Object} params - Query parameters
 * @param {number} params.pageSize - Số item/trang (1-100, mặc định: 20, -1: lấy tất cả)
 * @param {number} params.pageNumber - Số trang (từ 1, mặc định: 1)
 * @param {string} params.keyword - Tìm kiếm theo tên file, title, description
 * @param {string[]} params.sort - Sắp xếp ["createdDate-desc", "fileName-asc"]
 * @param {string} type - Loại media: 'all', 'images', 'videos', 'audio'
 * @returns {Promise<Object>} MediaResponse với pagination
 */
export const getMediaGallery = async (params = {}, type = 'all') => {
  try {
    const endpoints = {
      'all': '/api/media/gallery',
      'images': '/api/media/images', 
      'videos': '/api/media/videos'
    };
    
    const endpoint = endpoints[type] || endpoints['all'];const response = await api.get(endpoint, { params });return response.data;
  } catch (error) {// Return empty structure when API is not available (BE not ready)
    return {
      status: 1,
      data: {
        items: [],
        totalItems: 0,
        totalPages: 0,
        currentPage: params.page || 1,
        pageSize: params.pageSize || 10
      },
      message: "Media gallery API endpoint not implemented in backend yet"
    };
  }
};

/**
 * Lấy danh sách media files (compatible với existing code)
 * @param {number} entityType - Entity type (0-6)
 * @param {number} entityId - Entity ID
 * @param {Object} params - Query parameters untuk pagination
 * @returns {Promise<Object>} Response data
 */
export const getMediaFiles = async (entityType = null, entityId = null, params = {}) => {
  try {
    let url = "/api/media/gallery";
    if (entityType !== null && entityId !== null) {
      url = `/api/media/by-entity/${entityType}/${entityId}`;
    }const response = await api.get(url, { params });
    return response.data;
  } catch (error) {// Return empty structure when API is not available (BE not ready)
    return {
      status: 1,
      data: {
        items: [],
        totalItems: 0
      },
      message: "Media files API endpoint not implemented in backend yet"
    };
  }
};

/**
 * Lấy chi tiết media theo ID
 * @param {number} mediaId - Media ID
 * @returns {Promise<Object>} FileUploadDto
 */
export const getMediaById = async (mediaId) => {
  try {const response = await api.get(`/api/media/${mediaId}`);return response.data;
  } catch (error) {throw new Error(error.response?.data?.message || 'Failed to get media detail');
  }
};

/**
 * Xóa media file theo ID
 * @param {number} mediaId - Media ID
 * @returns {Promise<Object>} Response data
 */
export const deleteMediaFile = async (mediaId) => {
  try {const response = await api.delete(`/api/media/${mediaId}`);return response.data;
  } catch (error) {throw new Error(error.response?.data?.message || 'Failed to delete media file');
  }
};

/**
 * Xóa tất cả media theo entity
 * @param {number} entityType - Entity type (0-6)
 * @param {number} entityId - Entity ID
 * @returns {Promise<Object>} Response data
 */
export const deleteMediaByEntity = async (entityType, entityId) => {
  try {const response = await api.delete(`/api/media/by-entity/${entityType}/${entityId}`);return response.data;
  } catch (error) {throw new Error(error.response?.data?.message || 'Failed to delete media by entity');
  }
};

/**
 * Cập nhật metadata media theo API spec
 * @param {number} mediaId - Media ID
 * @param {Object} metadata - {title, description, tags, author}
 * @returns {Promise<Object>} Response data
 */
export const updateMediaMetadata = async (mediaId, metadata) => {
  try {const response = await api.put(`/api/media/${mediaId}/metadata`, metadata);return response.data;
  } catch (error) {throw new Error(error.response?.data?.message || 'Failed to update media metadata');
  }
};

/**
 * Upload multiple media files
 * @param {FileList|Array} files - Array of files to upload
 * @param {Object} commonMetadata - Common metadata for all files
 * @returns {Promise<Array>} Array of upload results
 */
export const uploadMultipleMedia = async (files, commonMetadata = {}) => {
  const allowedTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/webm', 'video/avi',
    'audio/mp3', 'audio/wav', 'audio/ogg'
  ];
  
  const results = [];
  
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
    
    try {const result = await uploadMedia(file, commonMetadata);
      results.push({
        success: true,
        data: result,
        fileName: file.name
      });
    } catch (error) {results.push({
        success: false,
        error: error.message,
        fileName: file.name
      });
    }
  }return results;
};

// Get media URL with optimized serving
export const getMediaUrl = (originalUrl) => {
  return getOptimizedFileUrl(originalUrl);
};

// Get thumbnail URL for media
export const getMediaThumbnail = (originalUrl, size = 150) => {
  return getThumbnailUrl(originalUrl, size);
};

// Get responsive image URLs
export const getResponsiveMediaUrl = (originalUrl, options = {}) => {
  return getImageUrl(originalUrl, options);
};

// Constants theo API specification
export const EntityType = {
  Post: 1,        // Bài viết
  Product: 2,     // Sản phẩm
  Service: 3,     // Dịch vụ
  User: 4,        // User avatar, etc.
  Media: 5,       // Media gallery
  Document: 6,    // Document library
  Temp: 999       // Upload tạm, chưa gán entity
};

export const SecurityLevel = {
  Public: 1,
  RegisteredUsers: 2,
  Members: 3,
  Admins: 4,
  SuperAdmins: 5
};

export const MediaStatus = {
  Inactive: 0,
  Active: 1
};

// Helper functions
export const createMetadata = ({
  entityType = EntityType.Temp,
  entityId = null,
  title = '',
  description = '',
  tags = '',
  version = '1.0',
  author = '',
  expiryDate = null,
  securityLevel = SecurityLevel.Public,
  titleVi = '',
  titleEn = '',
  descriptionVi = '',
  descriptionEn = '',
  slugVi = '',
  slugEn = '',
  contentVi = '',
  contentEn = '',
  timePosted = null,
  status = MediaStatus.Active,
  categoryId = null,
  imageUrl = ''
} = {}) => {
  return {
    entityType,
    entityId,
    title,
    description,
    tags,
    version,
    author,
    expiryDate,
    securityLevel,
    titleVi,
    titleEn,
    descriptionVi,
    descriptionEn,
    slugVi,
    slugEn,
    contentVi,
    contentEn,
    timePosted,
    status,
    categoryId,
    imageUrl
  };
};

/**
 * Bulk delete multiple media files
 * @param {Array<number>} mediaIds - Array of media IDs
 * @returns {Promise<Object>} Response data
 */
export const bulkDeleteMedia = async (mediaIds) => {
  try {const response = await api.post('/api/media/bulk-delete', mediaIds);return response.data;
  } catch (error) {throw new Error(error.response?.data?.message || 'Failed to bulk delete media files');
  }
};

/**
 * Bulk update multiple media files metadata
 * @param {Object} updateData - {ids: [1,2,3], metadata: {...}}
 * @returns {Promise<Object>} Response data
 */
export const bulkUpdateMedia = async (updateData) => {
  try {const response = await api.post('/api/media/bulk-update', updateData);return response.data;
  } catch (error) {throw new Error(error.response?.data?.message || 'Failed to bulk update media metadata');
  }
};

// Media serving utilities
export const MediaServingUtils = {
  gallery: FileServingUtils?.gallery,
  content: FileServingUtils?.content
};