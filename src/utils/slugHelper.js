/**
 * Utility functions for slug generation and validation
 * Similar to SlugHelper in C# backend
 */

/**
 * Generate a URL-friendly slug from a title
 * @param {string} title - The title to convert to slug
 * @returns {string} - The generated slug
 */
export const generateSlug = (title) => {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .trim()
    // Replace Vietnamese characters
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    // Replace special characters with hyphens
    .replace(/[^a-z0-9\s-]/g, '')
    // Replace spaces and multiple hyphens with single hyphen
    .replace(/[\s-]+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '');
};

/**
 * Generate a unique slug by appending a random string if slug already exists
 * @param {string} title - The title to convert to slug
 * @param {Array} existingSlugs - Array of existing slugs to check against
 * @returns {string} - The unique slug
 */
export const generateUniqueSlug = (title, existingSlugs = []) => {
  const baseSlug = generateSlug(title);
  
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }
  
  // Generate a random 4-character string
  const randomString = Math.random().toString(36).substring(2, 6);
  return `${baseSlug}-${randomString}`;
};

/**
 * Validate if a slug is valid
 * @param {string} slug - The slug to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidSlug = (slug) => {
  if (!slug) return false;
  
  // Check if slug contains only valid characters
  const validSlugRegex = /^[a-z0-9-]+$/;
  return validSlugRegex.test(slug);
};

/**
 * Normalize a slug (remove extra hyphens, convert to lowercase)
 * @param {string} slug - The slug to normalize
 * @returns {string} - The normalized slug
 */
export const normalizeSlug = (slug) => {
  if (!slug) return '';
  
  return slug
    .toLowerCase()
    .trim()
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Extract title from slug (reverse operation)
 * @param {string} slug - The slug to convert back to title
 * @returns {string} - The title (capitalized)
 */
export const slugToTitle = (slug) => {
  if (!slug) return '';
  
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}; 