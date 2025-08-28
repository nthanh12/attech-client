import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { fetchTranslationsForI18next } from '../services/languageContentService';
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
      console.log(`🔒 User not authenticated, using fallback translations for ${language}`);
      const fallback = language === 'vi' ? viTranslation : enTranslation;
      callback(null, fallback);
      return;
    }

    // If authenticated, try to load from API
    fetchTranslationsForI18next(language)
      .then(translations => {
        console.log(`✅ Loaded ${language} translations from API:`, Object.keys(translations).length, 'keys');
        callback(null, translations);
      })
      .catch(error => {
        console.error('❌ Failed to load translations from API, using fallback:', error);
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
    const currentLang = language || i18n.language;
    const translations = await fetchTranslationsForI18next(currentLang);
    
    // Update i18n with new translations
    i18n.addResourceBundle(currentLang, 'translation', translations, true, true);
    
    console.log(`✅ Reloaded ${currentLang} translations from API`);
    return true;
  } catch (error) {
    console.error('Failed to reload translations:', error);
    return false;
  }
};

export default i18n;