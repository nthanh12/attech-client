import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  fetchTranslationsForI18next,
  clearTranslationsCache,
} from "../services/languageContentService";
import { isAuthenticated } from "../services/authService";

// Import fallback language resources (in case API fails)
import viTranslation from "./locales/vi.json";
import enTranslation from "./locales/en.json";

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
    // Always use fallback first to prevent showing keys
    const fallback = language === "vi" ? viTranslation : enTranslation;

    // Return fallback immediately
    callback(null, fallback);

    // Then try to load from API if authenticated (async update)
    if (isAuthenticated()) {
      fetchTranslationsForI18next(language)
        .then((translations) => {
          // Only update if we actually got translations
          if (translations && Object.keys(translations).length > 0) {
            // Store timestamp to detect stale cache
            const cacheKey = `i18n_${language}_timestamp`;
            localStorage.setItem(cacheKey, Date.now().toString());

            // Update translations in background
            i18n.addResourceBundle(
              language,
              namespace,
              translations,
              true,
              true
            );
          }
        })
        .catch((error) => {});
    }
  }
}

// Register the backend
ApiBackend.type = "backend";

const resources = {
  vi: {
    translation: viTranslation, // Fallback
  },
  en: {
    translation: enTranslation, // Fallback
  },
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
    // Use fallback resources to prevent showing keys
    resources,

    // Default language
    lng: "vi", // Vietnamese as default
    fallbackLng: "vi",

    // Supported languages
    supportedLngs: ["vi", "en"],

    // Backend options
    backend: {
      // Backend will use our ApiBackend class
      loadPath: "/api/language-contents/{{lng}}/{{ns}}", // Template for backend
    },

    // Language detection options
    detection: {
      // Order of language detection methods
      order: ["localStorage", "navigator", "htmlTag"],

      // Cache user language
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    // Development options
    debug: false, // Disable debug để tránh spam logs

    // Namespace configuration
    defaultNS: "translation",
    ns: ["translation"],

    // Load immediately with fallback resources
    initImmediate: true,
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
    i18n.addResourceBundle(
      currentLang,
      "translation",
      translations,
      true,
      true
    );

    return true;
  } catch (error) {
    return false;
  }
};

// Function to check if translations need refresh based on admin updates
export const checkTranslationsVersion = async () => {
  try {
    const currentLang = i18n.language || "vi";
    const lastUpdate = localStorage.getItem(`i18n_${currentLang}_timestamp`);

    // Force clear if there's stale data or missing timestamp
    const isStale = !lastUpdate || Date.now() - parseInt(lastUpdate) > 3600000;

    if (isStale) {
      // Force clear all i18n cache
      clearTranslationsCache();
      await reloadTranslations();
    }
  } catch (error) {}
};

// Force clear function for immediate use
export const forceReloadTranslations = async () => {
  try {
    // Clear everything
    clearTranslationsCache();

    // Reload both languages
    await Promise.all([reloadTranslations("vi"), reloadTranslations("en")]);

    // Force page reload to ensure clean state
    window.location.reload();
  } catch (error) {
    // Fallback: just reload the page
    window.location.reload();
  }
};

// Function to clear translations cache (for admin use)
export const clearTranslationCache = clearTranslationsCache;

export default i18n;
