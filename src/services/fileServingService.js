// File Serving Service - Sử dụng endpoint C từ hình ảnh
import api from "../api";
import { getApiBaseUrl } from "../config/apiConfig";

// 🎯 Endpoint C: File Serving với cấu trúc ngày tháng
const FILE_SERVING_BASE = '/api/upload/file';

/**
 * Lấy URL file với cấu trúc ngày tháng
 * @param {string} subFolder - Thư mục con (news, media, documents)
 * @param {string} fileName - Tên file
 * @param {Object} dateStructure - Cấu trúc ngày {year, month, day}
 * @returns {string} URL đầy đủ
 */
export const getFileUrlWithDate = (subFolder, fileName, dateStructure = null) => {
  if (dateStructure && dateStructure.year && dateStructure.month && dateStructure.day) {
    return `${FILE_SERVING_BASE}/${subFolder}/${dateStructure.year}/${dateStructure.month}/${dateStructure.day}/${fileName}`;
  }
  return `${FILE_SERVING_BASE}/${subFolder}/${fileName}`;
};

/**
 * Lấy URL file News với cấu trúc ngày tháng
 * @param {string} fileName - Tên file
 * @param {Date} date - Ngày tạo news
 * @returns {string} URL đầy đủ
 */
export const getNewsFileUrl = (fileName, date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return getFileUrlWithDate('news', fileName, { year, month, day });
};

/**
 * Lấy URL file Media với cấu trúc ngày tháng
 * @param {string} fileName - Tên file
 * @param {Date} date - Ngày upload
 * @returns {string} URL đầy đủ
 */
export const getMediaFileUrl = (fileName, date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return getFileUrlWithDate('media', fileName, { year, month, day });
};

/**
 * Lấy URL file Document với cấu trúc ngày tháng
 * @param {string} fileName - Tên file
 * @param {Date} date - Ngày upload
 * @returns {string} URL đầy đủ
 */
export const getDocumentFileUrl = (fileName, date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return getFileUrlWithDate('documents', fileName, { year, month, day });
};

/**
 * Lấy URL file từ path đầy đủ (fallback)
 * @param {string} filePath - Path file từ backend
 * @returns {string} URL đầy đủ
 */
export const getFileUrlFromPath = (filePath) => {
  if (!filePath) return '';
  
  // Nếu đã là URL đầy đủ
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return filePath;
  }
  
  // Nếu là path tương đối, thêm base URL
  if (filePath.startsWith('/')) {
    return `${window.location.origin}${filePath}`;
  }
  
  // Nếu là path không có /, thêm /api/upload/file/
  return `${window.location.origin}/api/upload/file/${filePath}`;
};

/**
 * Tạo URL tạm thời cho file (sử dụng endpoint C)
 * @param {string} fileName - Tên file
 * @param {string} subFolder - Thư mục con
 * @returns {string} URL tạm thời
 */
export const createTempFileUrl = (fileName, subFolder = 'temp') => {
  return `${FILE_SERVING_BASE}/${subFolder}/${fileName}`;
};

// Get optimized file URL based on file path structure
export const getOptimizedFileUrl = (filePath) => {
  if (!filePath) return null;
  
  // Remove leading slash if present
  const cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
  
  // Check if it's already an absolute URL
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath;
  }
  
  // Use backend URL directly
  const backendUrl = getApiBaseUrl();
  const url = `${backendUrl}/${cleanPath}`;return url;
};

// Get file URL with fallback options
export const getFileUrlWithFallback = (originalPath) => {
  if (!originalPath) return null;
  
  const optimizedUrl = getOptimizedFileUrl(originalPath);
  
  return {
    primary: optimizedUrl,
    fallback: optimizedUrl // Same URL for fallback
  };
};

// Create image URL with specific dimensions (if backend supports it)
export const getImageUrl = (filePath, options = {}) => {
  const baseUrl = getOptimizedFileUrl(filePath);
  if (!baseUrl) return null;
  
  // Add query parameters for image optimization
  const params = new URLSearchParams();
  
  if (options.width) params.append('w', options.width);
  if (options.height) params.append('h', options.height);
  if (options.quality) params.append('q', options.quality);
  if (options.format) params.append('f', options.format);
  
  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
};

// Create thumbnail URL
export const getThumbnailUrl = (filePath, size = 150) => {
  return getImageUrl(filePath, { 
    width: size, 
    height: size, 
    quality: 80 
  });
};

// Get video streaming URL with support for range requests
export const getVideoStreamUrl = (filePath) => {
  return getOptimizedFileUrl(filePath);
};

// Get download URL for documents
export const getDownloadUrl = (filePath, filename = null) => {
  const baseUrl = getOptimizedFileUrl(filePath);
  if (!baseUrl) return null;
  
  // Add download parameter
  const params = new URLSearchParams();
  params.append('download', 'true');
  if (filename) params.append('filename', filename);
  
  return `${baseUrl}?${params.toString()}`;
};

// Preload image for better UX
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Check if file URL is accessible
export const checkFileAccessibility = async (fileUrl) => {
  try {
    const response = await fetch(fileUrl, { method: 'HEAD' });
    return response.ok;
  } catch (error) {return false;
  }
};

// Get file metadata from serving endpoint
export const getFileMetadata = async (filePath) => {
  try {
    const fileUrl = getOptimizedFileUrl(filePath);
    const response = await fetch(fileUrl, { method: 'HEAD' });
    
    if (!response.ok) {
      throw new Error(`File not accessible: ${response.status}`);
    }
    
    return {
      size: parseInt(response.headers.get('content-length') || '0'),
      type: response.headers.get('content-type'),
      lastModified: response.headers.get('last-modified'),
      etag: response.headers.get('etag'),
      cacheControl: response.headers.get('cache-control')
    };
  } catch (error) {throw error;
  }
};

// File type detection from URL
export const getFileTypeFromUrl = (url) => {
  const extension = url.split('.').pop()?.toLowerCase();
  
  const typeMap = {
    // Images
    'jpg': 'image', 'jpeg': 'image', 'png': 'image', 'gif': 'image', 
    'webp': 'image', 'svg': 'image', 'bmp': 'image', 'ico': 'image',
    
    // Videos
    'mp4': 'video', 'webm': 'video', 'avi': 'video', 'mov': 'video',
    'wmv': 'video', 'flv': 'video', 'mkv': 'video',
    
    // Audio
    'mp3': 'audio', 'wav': 'audio', 'ogg': 'audio', 'm4a': 'audio',
    'aac': 'audio', 'flac': 'audio', 'wma': 'audio',
    
    // Documents
    'pdf': 'document', 'doc': 'document', 'docx': 'document',
    'xls': 'document', 'xlsx': 'document', 'ppt': 'document', 'pptx': 'document',
    'txt': 'document', 'csv': 'document', 'rtf': 'document'
  };
  
  return typeMap[extension] || 'file';
};

// Convert legacy file paths to new structure
export const migrateLegacyPath = (oldPath) => {
  if (!oldPath) return null;
  
  // If it's already in new format, return as is
  if (oldPath.includes('/api/upload/')) {
    return oldPath;
  }
  
  // Convert old absolute paths
  if (oldPath.startsWith('http://') || oldPath.startsWith('https://')) {
    const url = new URL(oldPath);
    return getOptimizedFileUrl(url.pathname);
  }
  
  // Convert relative paths
  return getOptimizedFileUrl(oldPath);
};

// Batch preload multiple files
export const batchPreloadImages = async (urls) => {
  const promises = urls.map(url => preloadImage(url).catch(() => null));
  return Promise.allSettled(promises);
};

// Generate responsive image srcset
export const generateResponsiveSrcSet = (filePath, sizes = [480, 768, 1024, 1920]) => {
  if (!filePath) return '';
  
  return sizes
    .map(size => `${getImageUrl(filePath, { width: size })} ${size}w`)
    .join(', ');
};

// File serving utilities for different contexts
export const FileServingUtils = {
  // For image galleries
  gallery: {
    getThumbnail: (path) => getThumbnailUrl(path, 200),
    getPreview: (path) => getImageUrl(path, { width: 800, quality: 85 }),
    getFullSize: (path) => getOptimizedFileUrl(path)
  },
  
  // For content images (in articles, etc.)
  content: {
    getResponsive: (path) => ({
      src: getImageUrl(path, { width: 800 }),
      srcSet: generateResponsiveSrcSet(path),
      sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px'
    })
  },
  
  // For video content
  video: {
    getStreamUrl: (path) => getVideoStreamUrl(path),
    getPoster: (path) => getImageUrl(path, { format: 'jpg' }) // If backend generates poster
  },
  
  // For document downloads
  document: {
    getViewUrl: (path) => getOptimizedFileUrl(path),
    getDownloadUrl: (path, filename) => getDownloadUrl(path, filename)
  }
};