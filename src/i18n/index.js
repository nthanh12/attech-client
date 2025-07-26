import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import language resources
import viTranslation from './locales/vi.json';
import enTranslation from './locales/en.json';

const resources = {
  vi: {
    translation: viTranslation
  },
  en: {
    translation: enTranslation
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    
    // Default language
    lng: 'vi', // Vietnamese as default
    fallbackLng: 'vi',
    
    // Supported languages
    supportedLngs: ['vi', 'en'],
    
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
    debug: false, // Disable debug to prevent console spam
    
    // Namespace configuration
    defaultNS: 'translation',
    ns: ['translation']
  });

export default i18n;