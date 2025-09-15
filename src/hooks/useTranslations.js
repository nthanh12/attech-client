import { useState, useEffect } from 'react';
import { loadAllTranslations, getTranslationByKey } from '../services/languageContentService';
import { useI18n } from './useI18n';

/**
 * Hook for accessing translations using new client API endpoints
 * Provides optimized loading with caching for better performance
 */
export const useTranslations = () => {
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentLanguage } = useI18n();

  // Load all translations on mount
  useEffect(() => {
    loadTranslations();
  }, []);

  const loadTranslations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await loadAllTranslations();
      setTranslations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get translation value by key for current language
  const getTranslation = (key) => {
    const translation = translations.find(t => t.contentKey === key);
    if (!translation) return key; // Return key as fallback

    return currentLanguage === 'vi' ? translation.valueVi : translation.valueEn;
  };

  // Get translation by key with async loading
  const getTranslationAsync = async (key) => {
    try {
      const translation = await getTranslationByKey(key);
      if (!translation) return key;

      return currentLanguage === 'vi' ? translation.valueVi : translation.valueEn;
    } catch (error) {
      return key;
    }
  };

  // Find translations by category or pattern
  const findTranslations = (pattern) => {
    return translations.filter(t =>
      t.contentKey.includes(pattern) ||
      (t.categoryName && t.categoryName.includes(pattern))
    );
  };

  // Get all unique categories
  const getCategories = () => {
    const categories = [...new Set(translations.map(t => t.categoryName))];
    return categories.filter(Boolean);
  };

  // Refresh translations (clear cache and reload)
  const refreshTranslations = async () => {
    await loadTranslations();
  };

  return {
    translations,
    loading,
    error,
    getTranslation,
    getTranslationAsync,
    findTranslations,
    getCategories,
    refreshTranslations,
    totalCount: translations.length
  };
};

export default useTranslations;