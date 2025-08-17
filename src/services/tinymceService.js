/**
 * TinyMCE Service - Handle temp upload and content processing
 * Matches AttechServer TinyMCE temp → permanent file flow
 */
import api from '../api';
import { getApiBaseUrl } from '../config/apiConfig';

// Base URL từ environment
const API_BASE_URL = getApiBaseUrl();

// Note: ProcessTinyMceContent không cần FE gọi riêng
// Backend tự động process content khi save entity qua ProcessTinyMceContentAsync()

/**
 * Upload image to temp directory for TinyMCE preview
 * @param {File} file - Image file to upload
 * @returns {Promise<{tempUrl: string}>} - Temp URL for preview
 */
export const uploadTempImage = async (file) => {
  console.log('🖼️ TinyMCE temp upload:', file.name);
  
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await api.post('/api/tinymce/upload', formData, {
      headers: { 
        'Content-Type': 'multipart/form-data' 
      },
      timeout: 60000 // 1 minute timeout
    });
    
    if (response.data?.status === 1 && response.data?.data?.tempUrl) {
      const tempUrl = response.data.data.tempUrl;
      console.log('✅ TinyMCE temp upload success:', tempUrl);
      return { tempUrl };
    } else {
      throw new Error(response.data?.message || 'Invalid response format');
    }
  } catch (error) {
    console.error('❌ TinyMCE temp upload failed:', error);
    throw new Error(`Temp upload failed: ${error.response?.data?.message || error.response?.data?.Message || error.message}`);
  }
};

/**
 * Extract temp URLs from HTML content
 * @param {string} content - HTML content with temp URLs
 * @returns {string[]} - Array of temp URLs
 */
export const extractTempUrls = (content) => {
  if (!content) return [];
  
  // Match /uploads/temp/ URLs in HTML content
  const tempUrlRegex = /\/uploads\/temp\/[^"\s)]+/g;
  const matches = content.match(tempUrlRegex) || [];
  
  console.log('🔍 Found temp URLs in content:', matches);
  return matches;
};

/**
 * Cleanup temp files after successful submission or modal close
 * @param {string} content - HTML content with temp URLs
 */
export const cleanupTinyMceTemp = async (content) => {
  const tempUrls = extractTempUrls(content);
  
  if (tempUrls.length === 0) {
    console.log('🧹 No temp files to cleanup');
    return;
  }
  
  console.log('🧹 Cleaning up temp files:', tempUrls);
  
  try {
    // Send cleanup request to backend
    await api.post('/api/tinymce/cleanup', {
      tempUrls: tempUrls
    });
    
    console.log('✅ Temp files cleanup successful');
  } catch (error) {
    console.warn('⚠️ Temp files cleanup failed (non-critical):', error);
    // Non-critical error, don't throw
  }
};

/**
 * Validate TinyMCE content before submission
 * @param {string} content - HTML content
 * @returns {Object} - Validation result
 */
export const validateTinyMceContent = (content) => {
  if (!content) {
    return { isValid: true, warnings: [], tempUrls: [] };
  }
  
  const tempUrls = extractTempUrls(content);
  const warnings = [];
  
  // Check for large number of temp files
  if (tempUrls.length > 20) {
    warnings.push(`Có ${tempUrls.length} ảnh temp, có thể ảnh hưởng đến hiệu suất`);
  }
  
  // Check for mixed temp and permanent URLs
  const permanentUrls = content.match(/\/uploads\/images\/[^"\s)]+/g) || [];
  if (tempUrls.length > 0 && permanentUrls.length > 0) {
    warnings.push('Nội dung có cả ảnh temp và ảnh đã upload');
  }
  
  return {
    isValid: true,
    warnings,
    tempUrls,
    permanentUrls,
    totalImages: tempUrls.length + permanentUrls.length
  };
};

export default {
  uploadTempImage,
  extractTempUrls,
  cleanupTinyMceTemp,
  validateTinyMceContent
};