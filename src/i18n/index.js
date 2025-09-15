import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { fetchTranslationsForI18next, clearTranslationsCache } from '../services/languageContentService';
import { isAuthenticated } from '../services/authService';

// Import fallback language resources (in case API fails)
import viTranslation from './locales/vi.json';
import enTranslation from './locales/en.json';

// API Backend để load translations từ database
class ApiBackend {
  constructor(services, options = {}) {
    this.init(services, options);
  }

  init(services, options = {}) {
    this.services = services;
    this.options = options;
  }

  read(language, namespace, callback) {
    // Check if user is authenticated first
    if (!isAuthenticated()) {
      const fallback = language === 'vi' ? viTranslation : enTranslation;
      callback(null, fallback);
      return;
    }

    // If authenticated, try to load from API with cache busting
    fetchTranslationsForI18next(language)
      .then(translations => {
        // Store timestamp to detect stale cache
        const cacheKey = `i18n_${language}_timestamp`;
        localStorage.setItem(cacheKey, Date.now().toString());
        callback(null, translations);
      })
      .catch(error => {
        console.warn(`Failed to load ${language} translations from API:`, error);
        // Use fallback JSON files
        const fallback = language === 'vi' ? viTranslation : enTranslation;
        callback(null, fallback);
      });
  }
}

// Register the backend
ApiBackend.type = 'backend';

const resources = {
  vi: {
    translation: viTranslation  // Fallback
  },
  en: {
    translation: enTranslation  // Fallback
  }
};

i18n
  // Use API backend to load translations
  .use(ApiBackend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Remove static resources since we use API backend
    // resources,
    
    // Default language
    lng: 'vi', // Vietnamese as default
    fallbackLng: 'vi',
    
    // Supported languages
    supportedLngs: ['vi', 'en'],
    
    // Backend options
    backend: {
      // Backend will use our ApiBackend class
      loadPath: '/api/language-contents/{{lng}}/{{ns}}'  // Template for backend
    },
    
    // Language detection options
    detection: {
      // Order of language detection methods
      order: ['localStorage', 'navigator', 'htmlTag'],
      
      // Cache user language
      caches: ['localStorage']
    },
    
    interpolation: {
      escapeValue: false // React already does escaping
    },
    
    // Development options
    debug: true, // Enable debug để thấy logs
    
    // Namespace configuration
    defaultNS: 'translation',
    ns: ['translation'],
    
    // Important: Disable resource loading từ resources property
    initImmediate: false  // Wait for backend to load
  });

// Function to reload translations from API (call after admin changes)
export const reloadTranslations = async (language = null) => {
  try {
    // Clear cache to force fresh data load
    clearTranslationsCache();

    const currentLang = language || i18n.language;

    // Clear localStorage cache timestamps
    localStorage.removeItem(`i18n_${currentLang}_timestamp`);

    const translations = await fetchTranslationsForI18next(currentLang);

    // Update i18n with new translations
    i18n.addResourceBundle(currentLang, 'translation', translations, true, true);

    return true;
  } catch (error) {
    console.error('Failed to reload translations:', error);
    return false;
  }
};

// Function to check if translations need refresh based on admin updates
export const checkTranslationsVersion = async () => {
  try {
    const currentLang = i18n.language || 'vi';
    const lastUpdate = localStorage.getItem(`i18n_${currentLang}_timestamp`);

    // Force clear if there's stale data or missing timestamp
    const isStale = !lastUpdate || (Date.now() - parseInt(lastUpdate)) > 3600000;

    if (isStale) {
      // Force clear all i18n cache
      clearTranslationsCache();
      console.log('🔄 Clearing stale i18n cache and reloading translations...');
      await reloadTranslations();
    }
  } catch (error) {
    console.error('Failed to check translations version:', error);
  }
};

// Force clear function for immediate use
export const forceReloadTranslations = async () => {
  try {
    console.log('🔄 Force reloading all translations...');

    // Clear everything
    clearTranslationsCache();

    // Reload both languages
    await Promise.all([
      reloadTranslations('vi'),
      reloadTranslations('en')
    ]);

    // Force page reload to ensure clean state
    window.location.reload();
  } catch (error) {
    console.error('Failed to force reload translations:', error);
    // Fallback: just reload the page
    window.location.reload();
  }
};

// Function to clear translations cache (for admin use)
export const clearTranslationCache = clearTranslationsCache;

export default i18n;