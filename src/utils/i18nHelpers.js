import i18n from "../i18n";

/**
 * Get content in current language from AttechServer API format
 * API already provides fields like: titleVi, titleEn, descriptionVi, descriptionEn, etc.
 * @param {Object} item - Item containing multi-language content
 * @param {string} field - Field name (without language suffix)
 * @returns {string} Content in current language or fallback
 */
export const getLocalizedContent = (item, field) => {
  if (!item) return "";

  const currentLang = i18n.language || "vi";

  // AttechServer API format: fieldVi, fieldEn
  const viField = `${field}Vi`;
  const enField = `${field}En`;

  // Get content in current language
  if (currentLang === "vi") {
    // Try Vietnamese first, fallback to English
    const viContent = item[viField];
    if (viContent && viContent.trim()) {
      return viContent;
    }

    const enContent = item[enField];
    if (enContent && enContent.trim()) {
      return enContent;
    }
  } else {
    // Try English first, fallback to Vietnamese
    const enContent = item[enField];
    if (enContent && enContent.trim()) {
      return enContent;
    }

    const viContent = item[viField];
    if (viContent && viContent.trim()) {
      return viContent;
    }
  }

  // Final fallback - try base field name
  return item[field] || "";
};

/**
 * Get title in current language
 * @param {Object} item - Item with titleVi/titleEn
 * @returns {string} Title in current language
 */
export const getLocalizedTitle = (item) => {
  return getLocalizedContent(item, "title");
};

/**
 * Get description in current language
 * @param {Object} item - Item with descriptionVi/descriptionEn
 * @returns {string} Description in current language
 */
export const getLocalizedDescription = (item) => {
  return getLocalizedContent(item, "description");
};

/**
 * Get name in current language
 * @param {Object} item - Item with titleVi/titleEn
 * @returns {string} Name in current language
 */
export const getLocalizedName = (item) => {
  return getLocalizedContent(item, "name");
};

/**
 * Get content in current language
 * @param {Object} item - Item with contentVi/contentEn
 * @returns {string} Content in current language
 */
export const getLocalizedContentText = (item) => {
  return getLocalizedContent(item, "content");
};

/**
 * Get summary in current language
 * @param {Object} item - Item with summaryVi/summaryEn
 * @returns {string} Summary in current language
 */
export const getLocalizedSummary = (item) => {
  return getLocalizedContent(item, "summary");
};

/**
 * Format date according to current locale
 * @param {string|Date} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
export const formatLocalizedDate = (date, options = {}) => {
  if (!date) return "";

  const currentLang = i18n.language || "vi";
  const locale = currentLang === "vi" ? "vi-VN" : "en-US";

  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
  } catch (error) {
    console.error("Error formatting date:", error);
    return date.toString();
  }
};

/**
 * Get category display name in current language
 * @param {Object} category - Category object
 * @param {Array} categories - All categories array
 * @returns {string} Category name in current language
 */
export const getCategoryName = (category, categories = []) => {
  if (!category) return "";

  // If category is an ID, find the category object
  if (typeof category === "number" || typeof category === "string") {
    const categoryObj = categories.find((c) => c.id === parseInt(category));
    if (categoryObj) {
      return getLocalizedName(categoryObj);
    }
    return category.toString();
  }

  // If category is an object
  return getLocalizedName(category);
};

/**
 * Truncate text with language-aware ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;

  const currentLang = i18n.language || "vi";
  const ellipsis = currentLang === "vi" ? "..." : "...";

  return text.substring(0, maxLength - ellipsis.length) + ellipsis;
};

/**
 * Get language-specific slug
 * @param {Object} item - Item with slugVi/slugEn
 * @returns {string} Slug in current language
 */
export const getLocalizedSlug = (item) => {
  if (!item) return "";

  const currentLang = i18n.language || "vi";
  const slugField = currentLang === "vi" ? "slugVi" : "slugEn";

  return item[slugField] || item.slug || "";
};
