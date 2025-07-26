import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from './useI18n';
import { 
  getLocalizedRoute, 
  getRouteForLanguage, 
  buildNewsDetailUrl,
  buildProductDetailUrl,
  buildServiceDetailUrl,
  getCurrentRouteKey,
  isEnglishPath,
  getLanguageFromPath,
  switchLanguageUrl
} from '../utils/routeHelpers';

/**
 * Hook for localized routing
 */
export const useLocalizedRouting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLanguage, changeLanguage } = useI18n();
  
  /**
   * Navigate to localized route
   * @param {string} routeKey - Route key from ROUTES object
   * @param {Object} params - Route parameters
   * @param {Object} options - Navigation options
   */
  const navigateToRoute = (routeKey, params = {}, options = {}) => {
    const path = getLocalizedRoute(routeKey, params, currentLanguage);
    navigate(path, options);
  };
  
  /**
   * Navigate to news detail
   * @param {Object} newsItem - News item with slugVi, slugEn
   * @param {Object} category - Category with slugVi, slugEn
   */
  const navigateToNews = (newsItem, category) => {
    const path = buildNewsDetailUrl(newsItem, category, currentLanguage);
    navigate(path);
  };
  
  /**
   * Navigate to product detail
   * @param {Object} product - Product item with slugVi, slugEn
   * @param {Object} category - Category with slugVi, slugEn
   */
  const navigateToProduct = (product, category) => {
    const path = buildProductDetailUrl(product, category, currentLanguage);
    navigate(path);
  };
  
  /**
   * Navigate to service detail
   * @param {Object} service - Service item with slugVi, slugEn
   */
  const navigateToService = (service) => {
    const path = buildServiceDetailUrl(service, currentLanguage);
    navigate(path);
  };
  
  /**
   * Switch language and redirect to equivalent page
   * @param {string} targetLang - Target language
   */
  const switchLanguage = (targetLang) => {
    const newPath = switchLanguageUrl(location.pathname, targetLang);
    
    // Change i18n language
    changeLanguage(targetLang);
    
    // Navigate to new path
    navigate(newPath, { replace: true });
  };
  
  /**
   * Get URL for current page in another language
   * @param {string} targetLang - Target language
   * @returns {string} URL in target language
   */
  const getUrlForLanguage = (targetLang) => {
    return switchLanguageUrl(location.pathname, targetLang);
  };
  
  /**
   * Get current route information
   */
  const getCurrentRoute = () => {
    const routeKey = getCurrentRouteKey(location.pathname);
    const langFromPath = getLanguageFromPath(location.pathname);
    const isEnglish = isEnglishPath(location.pathname);
    
    return {
      routeKey,
      language: langFromPath,
      isEnglish,
      pathname: location.pathname
    };
  };
  
  /**
   * Check if current route has equivalent in other language
   * @returns {boolean}
   */
  const hasLanguageEquivalent = () => {
    const routeKey = getCurrentRouteKey(location.pathname);
    return !!routeKey;
  };
  
  return {
    // Navigation functions
    navigateToRoute,
    navigateToNews,
    navigateToProduct,
    navigateToService,
    
    // Language switching
    switchLanguage,
    getUrlForLanguage,
    
    // Route information
    getCurrentRoute,
    hasLanguageEquivalent,
    
    // Shortcuts for common routes
    goHome: () => navigateToRoute('HOME'),
    goProducts: () => navigateToRoute('PRODUCTS'),
    goServices: () => navigateToRoute('SERVICES'),
    goNews: () => navigateToRoute('NEWS'),
    goContact: () => navigateToRoute('CONTACT'),
    
    // Current route info
    currentLanguage,
    isEnglishPath: isEnglishPath(location.pathname),
    pathname: location.pathname
  };
};

export default useLocalizedRouting;