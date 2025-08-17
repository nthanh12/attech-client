/**
 * Slug Utilities - Tự động tạo slug từ title
 */
import { useState } from 'react';

/**
 * Chuyển đổi text thành slug
 * @param {string} text - Text cần chuyển thành slug
 * @returns {string} - Slug được tạo
 */
export const generateSlug = (text) => {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .toLowerCase()
    .trim()
    // Thay thế các ký tự tiếng Việt
    .replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a')
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e')
    .replace(/í|ì|ỉ|ĩ|ị/g, 'i')
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o')
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u')
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y')
    .replace(/đ/g, 'd')
    // Thay thế các ký tự đặc biệt bằng dấu gạch ngang
    .replace(/[^a-z0-9\s-]/g, '')
    // Thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/\s+/g, '-')
    // Loại bỏ dấu gạch ngang thừa
    .replace(/-+/g, '-')
    // Loại bỏ dấu gạch ngang ở đầu và cuối
    .replace(/^-|-$/g, '');
};

/**
 * Tạo slug unique bằng cách thêm số
 * @param {string} baseSlug - Slug gốc
 * @param {Array} existingSlugs - Array các slug đã tồn tại
 * @returns {string} - Slug unique
 */
export const generateUniqueSlug = (baseSlug, existingSlugs = []) => {
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 1;
  let uniqueSlug = `${baseSlug}-${counter}`;
  
  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }
  
  return uniqueSlug;
};

/**
 * Validate slug format
 * @param {string} slug - Slug cần validate
 * @returns {boolean} - True nếu slug hợp lệ
 */
export const isValidSlug = (slug) => {
  if (!slug || typeof slug !== 'string') {
    return false;
  }
  
  // Slug chỉ chứa chữ thường, số và dấu gạch ngang
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
};

/**
 * Tạo slug suggestions từ title
 * @param {string} title - Title gốc
 * @param {number} maxSuggestions - Số lượng suggestions tối đa
 * @returns {Array} - Array các slug suggestions
 */
export const generateSlugSuggestions = (title, maxSuggestions = 3) => {
  if (!title) return [];
  
  const baseSlug = generateSlug(title);
  const suggestions = [baseSlug];
  
  // Tạo variations
  const words = title.toLowerCase().split(' ').filter(word => word.length > 2);
  
  if (words.length > 1) {
    // Lấy từ đầu và cuối
    const firstLast = `${words[0]}-${words[words.length - 1]}`;
    if (firstLast !== baseSlug) {
      suggestions.push(generateSlug(firstLast));
    }
    
    // Lấy 2-3 từ đầu
    if (words.length >= 3) {
      const firstTwo = words.slice(0, 2).join('-');
      suggestions.push(generateSlug(firstTwo));
    }
  }
  
  return suggestions.slice(0, maxSuggestions);
};

/**
 * Hook để sử dụng slug generation trong React components
 * @returns {Object} - Object chứa các slug functions
 */
export const useSlugGeneration = () => {
  const [slugHistory, setSlugHistory] = useState([]);
  
  const generateFromTitle = (title, existingSlugs = []) => {
    const baseSlug = generateSlug(title);
    const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);
    
    // Lưu vào history
    setSlugHistory(prev => [...new Set([...prev, uniqueSlug])]);
    
    return uniqueSlug;
  };
  
  const clearHistory = () => {
    setSlugHistory([]);
  };
  
  return {
    generateFromTitle,
    generateSlug,
    generateUniqueSlug,
    isValidSlug,
    generateSlugSuggestions,
    slugHistory,
    clearHistory
  };
};

export default {
  generateSlug,
  generateUniqueSlug,
  isValidSlug,
  generateSlugSuggestions,
  useSlugGeneration
};