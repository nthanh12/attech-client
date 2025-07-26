import i18n from '../i18n';

/**
 * Route configurations for both languages
 */
export const ROUTES = {
  // Home
  HOME: {
    vi: '/',
    en: '/en'
  },
  
  // Products
  PRODUCTS: {
    vi: '/san-pham',
    en: '/en/products'
  },
  PRODUCT_CATEGORY: {
    vi: '/san-pham/:category',
    en: '/en/products/:category'
  },
  PRODUCT_DETAIL: {
    vi: '/san-pham/:category/:slug',
    en: '/en/products/:category/:slug'
  },
  
  // Services
  SERVICES: {
    vi: '/dich-vu',
    en: '/en/services'
  },
  SERVICE_DETAIL: {
    vi: '/dich-vu/:slug',
    en: '/en/services/:slug'
  },
  
  // News
  NEWS: {
    vi: '/tin-tuc',
    en: '/en/news'
  },
  NEWS_LIST: {
    vi: '/tin-tuc/tat-ca',
    en: '/en/news/all'
  },
  NEWS_CATEGORY: {
    vi: '/tin-tuc/:category',
    en: '/en/news/:category'
  },
  NEWS_DETAIL: {
    vi: '/tin-tuc/:category/:slug',
    en: '/en/news/:category/:slug'
  },
  
  // Notifications
  NOTIFICATIONS: {
    vi: '/thong-bao',
    en: '/en/notifications'
  },
  NOTIFICATION_CATEGORY: {
    vi: '/thong-bao/:category',
    en: '/en/notifications/:category'
  },
  NOTIFICATION_DETAIL: {
    vi: '/thong-bao/:category/:slug',
    en: '/en/notifications/:category/:slug'
  },
  
  // Company Info
  COMPANY: {
    vi: '/thong-tin-cong-ty',
    en: '/en/company'
  },
  COMPANY_FINANCE: {
    vi: '/thong-tin-cong-ty/thong-tin-tai-chinh',
    en: '/en/company/finance'
  },
  COMPANY_HISTORY: {
    vi: '/thong-tin-cong-ty/lich-su',
    en: '/en/company/history'
  },
  COMPANY_STRUCTURE: {
    vi: '/thong-tin-cong-ty/co-cau-to-chuc',
    en: '/en/company/structure'
  },
  COMPANY_LEADERSHIP: {
    vi: '/thong-tin-cong-ty/ban-lanh-dao',
    en: '/en/company/leadership'
  },
  COMPANY_BUSINESS: {
    vi: '/thong-tin-cong-ty/nganh-nghe-kinh-doanh',
    en: '/en/company/business'
  },
  COMPANY_ISO: {
    vi: '/thong-tin-cong-ty/he-thong-chung-chi-iso',
    en: '/en/company/iso'
  },
  COMPANY_GALLERY: {
    vi: '/thong-tin-cong-ty/thu-vien-cong-ty',
    en: '/en/company/gallery'
  },
  COMPANY_GALLERY_DETAIL: {
    vi: '/thong-tin-cong-ty/thu-vien-cong-ty/:albumId',
    en: '/en/company/gallery/:albumId'
  },
  
  // Contact
  CONTACT: {
    vi: '/lien-he',
    en: '/en/contact'
  },
  
  // Auth
  LOGIN: {
    vi: '/dang-nhap',
    en: '/en/login'
  }
};

/**
 * Get route for current language
 * @param {string} routeKey - Route key from ROUTES object
 * @param {Object} params - Route parameters to replace
 * @param {string} lang - Language (optional, uses current language)
 * @returns {string} Localized route
 */
export const getLocalizedRoute = (routeKey, params = {}, lang = null) => {
  const currentLang = lang || i18n.language || 'vi';
  const route = ROUTES[routeKey];
  
  if (!route) {
    console.warn(`Route key "${routeKey}" not found`);
    return '/';
  }
  
  let path = route[currentLang] || route.vi;
  
  // Replace parameters
  Object.keys(params).forEach(key => {
    path = path.replace(`:${key}`, params[key]);
  });
  
  return path;
};

/**
 * Get route for specific language (for language switching)
 * @param {string} routeKey - Route key from ROUTES object
 * @param {Object} params - Route parameters
 * @param {string} targetLang - Target language
 * @returns {string} Route in target language
 */
export const getRouteForLanguage = (routeKey, params = {}, targetLang) => {
  return getLocalizedRoute(routeKey, params, targetLang);
};

/**
 * Build news detail URL
 * @param {Object} newsItem - News item with slugVi, slugEn
 * @param {Object} category - Category with slugVi, slugEn
 * @param {string} lang - Language
 * @returns {string} News detail URL
 */
export const buildNewsDetailUrl = (newsItem, category, lang = null) => {
  const currentLang = lang || i18n.language || 'vi';
  const newsSlug = currentLang === 'vi' ? newsItem.slugVi : newsItem.slugEn;
  const categorySlug = currentLang === 'vi' ? category.slugVi : category.slugEn;
  
  return getLocalizedRoute('NEWS_DETAIL', {
    category: categorySlug,
    slug: newsSlug
  }, currentLang);
};

/**
 * Build product detail URL
 * @param {Object} product - Product item with slugVi, slugEn
 * @param {Object} category - Category with slugVi, slugEn
 * @param {string} lang - Language
 * @returns {string} Product detail URL
 */
export const buildProductDetailUrl = (product, category, lang = null) => {
  const currentLang = lang || i18n.language || 'vi';
  const productSlug = currentLang === 'vi' ? product.slugVi : product.slugEn;
  const categorySlug = currentLang === 'vi' ? category.slugVi : category.slugEn;
  
  return getLocalizedRoute('PRODUCT_DETAIL', {
    category: categorySlug,
    slug: productSlug
  }, currentLang);
};

/**
 * Build service detail URL
 * @param {Object} service - Service item with slugVi, slugEn
 * @param {string} lang - Language
 * @returns {string} Service detail URL
 */
export const buildServiceDetailUrl = (service, lang = null) => {
  const currentLang = lang || i18n.language || 'vi';
  const serviceSlug = currentLang === 'vi' ? service.slugVi : service.slugEn;
  
  return getLocalizedRoute('SERVICE_DETAIL', {
    slug: serviceSlug
  }, currentLang);
};

/**
 * Get current route key from pathname
 * @param {string} pathname - Current pathname
 * @returns {string|null} Route key or null if not found
 */
export const getCurrentRouteKey = (pathname) => {
  // Remove language prefix for English routes
  const cleanPath = pathname.replace(/^\/en/, '') || '/';
  
  // Find matching route
  for (const [key, routes] of Object.entries(ROUTES)) {
    const viRoute = routes.vi.replace(/:[\w]+/g, '[^/]+');
    const enRoute = routes.en.replace(/^\/en/, '').replace(/:[\w]+/g, '[^/]+');
    
    const viRegex = new RegExp(`^${viRoute}$`);
    const enRegex = new RegExp(`^${enRoute}$`);
    
    if (viRegex.test(cleanPath) || enRegex.test(cleanPath)) {
      return key;
    }
  }
  
  return null;
};

/**
 * Check if current path is English
 * @param {string} pathname - Current pathname
 * @returns {boolean} True if English path
 */
export const isEnglishPath = (pathname) => {
  return pathname.startsWith('/en');
};

/**
 * Get language from pathname
 * @param {string} pathname - Current pathname
 * @returns {string} Language code
 */
export const getLanguageFromPath = (pathname) => {
  return isEnglishPath(pathname) ? 'en' : 'vi';
};

/**
 * Switch current URL to another language
 * @param {string} currentPath - Current pathname
 * @param {string} targetLang - Target language
 * @returns {string} URL in target language
 */
export const switchLanguageUrl = (currentPath, targetLang) => {
  const currentRouteKey = getCurrentRouteKey(currentPath);
  
  if (!currentRouteKey) {
    // Handle specific known mappings
    const pathMappings = {
      '/san-pham': targetLang === 'en' ? '/en/products' : '/san-pham',
      '/en/products': targetLang === 'vi' ? '/san-pham' : '/en/products',
      '/dich-vu': targetLang === 'en' ? '/en/services' : '/dich-vu',
      '/en/services': targetLang === 'vi' ? '/dich-vu' : '/en/services',
      '/tin-tuc': targetLang === 'en' ? '/en/news' : '/tin-tuc',
      '/en/news': targetLang === 'vi' ? '/tin-tuc' : '/en/news',
      '/lien-he': targetLang === 'en' ? '/en/contact' : '/lien-he',
      '/en/contact': targetLang === 'vi' ? '/lien-he' : '/en/contact',
      '/thong-tin-cong-ty': targetLang === 'en' ? '/en/company' : '/thong-tin-cong-ty',
      '/en/company': targetLang === 'vi' ? '/thong-tin-cong-ty' : '/en/company'
    };
    
    if (pathMappings[currentPath]) {
      return pathMappings[currentPath];
    }
    
    // Fallback: just add/remove /en prefix
    if (targetLang === 'en') {
      return currentPath.startsWith('/en') ? currentPath : `/en${currentPath === '/' ? '' : currentPath}`;
    } else {
      return currentPath.replace(/^\/en/, '') || '/';
    }
  }
  
  // Extract parameters from current path (this is simplified)
  // In a real app, you'd want more sophisticated parameter extraction
  const params = {};
  
  return getLocalizedRoute(currentRouteKey, params, targetLang);
};