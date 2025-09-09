/**
 * URL utilities for handling different URL formats
 */

/**
 * Build detail URL with .html extension
 * @param {string} type - Content type (news, product, service, notification)
 * @param {string} slug - Content slug
 * @param {string} language - Language code (vi/en)
 * @returns {string} Detail URL with .html extension
 */
export const buildDetailUrl = (type, slug, language = 'vi') => {
  const routes = {
    news: { vi: '/tin-tuc', en: '/en/news' },
    product: { vi: '/san-pham', en: '/en/products' },
    service: { vi: '/dich-vu', en: '/en/services' },
    notification: { vi: '/thong-bao', en: '/en/notifications' }
  };
  
  const base = routes[type]?.[language] || routes[type].vi;
  return `${base}/${slug}.html`;
};

/**
 * Process menu URL - add .html for detail items only
 * @param {Object} menuItem - Menu item from API
 * @param {string} language - Language code (vi/en)
 * @returns {string} Processed URL
 */
export const getMenuUrl = (menuItem, language = 'vi') => {
  const basePath = language === 'en' ? menuItem.urlEn : menuItem.url;
  
  // Only add .html for detail items (level 2 with menuType 'item')
  if (menuItem.level === 2 && menuItem.menuType === 'item') {
    // Check if it's a detail item that needs .html
    const needsHtml = [
      '/san-pham/',
      '/dich-vu/',
      '/tin-tuc/',
      '/thong-bao/'
    ].some(prefix => basePath.startsWith(prefix));
    
    if (needsHtml && !basePath.endsWith('.html')) {
      return basePath + '.html';
    }
  }
  
  return basePath;
};

/**
 * Check if URL needs .html extension
 * @param {string} path - URL path
 * @returns {boolean} True if needs .html
 */
export const needsHtmlExtension = (path) => {
  // Patterns that need .html (detail pages only, not category pages)
  const detailPatterns = [
    /^\/san-pham\/[^\/]+$/,      // /san-pham/slug (not /san-pham/category/slug)
    /^\/dich-vu\/[^\/]+$/,       // /dich-vu/slug
    /^\/tin-tuc\/[^\/]+$/,       // /tin-tuc/slug  
    /^\/thong-bao\/[^\/]+$/,     // /thong-bao/slug
    /^\/en\/products\/[^\/]+$/,   // /en/products/slug
    /^\/en\/services\/[^\/]+$/,   // /en/services/slug
    /^\/en\/news\/[^\/]+$/,       // /en/news/slug
    /^\/en\/notifications\/[^\/]+$/ // /en/notifications/slug
  ];
  
  return detailPatterns.some(pattern => pattern.test(path));
};

/**
 * Add .html extension if needed
 * @param {string} path - URL path
 * @returns {string} URL with .html if needed
 */
export const addHtmlIfNeeded = (path) => {
  if (needsHtmlExtension(path) && !path.endsWith('.html')) {
    return path + '.html';
  }
  return path;
};