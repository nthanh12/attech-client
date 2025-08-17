import React, { useState } from 'react';
import api from '../api';
import { getApiUrl } from '../config/apiConfig';

/**
 * Translation Service - Sử dụng free translation API
 * Có thể dùng cho tất cả components cần translate
 */

/**
 * Dịch text từ tiếng Việt sang tiếng Anh
 * @param {string} text - Text cần dịch
 * @param {string} sourceLanguage - Ngôn ngữ nguồn (mặc định: 'vi')
 * @param {string} targetLanguage - Ngôn ngữ đích (mặc định: 'en')
 * @returns {Promise<string>} - Text đã dịch hoặc text gốc nếu fail
 */
export const translateText = async (text, sourceLanguage = 'vi', targetLanguage = 'en') => {
  if (!text || !text.trim()) {
    return '';
  }

  try {
    console.log(`🔄 Translating: "${text}" from ${sourceLanguage} to ${targetLanguage}`);
    
    // Gọi API translate từ backend
    const response = await fetch(getApiUrl('/api/Translate'), {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text.trim(),
        source: sourceLanguage,
        target: targetLanguage
      })
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();

    const translatedText = data?.translatedText || data?.data?.translatedText || text;
    console.log(`✅ Translation result: "${translatedText}"`);
    
    return translatedText;
  } catch (error) {
    console.warn('⚠️ Translation failed:', error.message);
    
    // Fallback to original text
    return text;
  }
};

/**
 * Dịch tiếng Việt sang tiếng Anh (shortcut)
 * @param {string} vietnameseText - Text tiếng Việt
 * @returns {Promise<string>} - Text tiếng Anh
 */
export const translateViToEn = async (vietnameseText) => {
  return await translateText(vietnameseText, 'vi', 'en');
};

/**
 * Dịch tiếng Anh sang tiếng Việt (shortcut)
 * @param {string} englishText - Text tiếng Anh
 * @returns {Promise<string>} - Text tiếng Việt
 */
export const translateEnToVi = async (englishText) => {
  return await translateText(englishText, 'en', 'vi');
};

/**
 * Dịch object có nhiều fields cùng lúc
 * @param {Object} data - Object chứa các field cần dịch
 * @param {Array} fields - Array các field name cần dịch
 * @param {string} sourceLanguage - Ngôn ngữ nguồn
 * @param {string} targetLanguage - Ngôn ngữ đích
 * @returns {Promise<Object>} - Object với các field đã dịch
 */
export const translateMultipleFields = async (data, fields, sourceLanguage = 'vi', targetLanguage = 'en') => {
  const result = { ...data };
  
  for (const field of fields) {
    if (data[field]) {
      result[field] = await translateText(data[field], sourceLanguage, targetLanguage);
    }
  }
  
  return result;
};

/**
 * Hook để dùng trong React components
 * @returns {Object} - Object chứa các translation functions và state
 */
export const useTranslation = () => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState(null);

  const translate = async (text, sourceLanguage = 'vi', targetLanguage = 'en') => {
    setIsTranslating(true);
    setTranslationError(null);
    
    try {
      const result = await translateText(text, sourceLanguage, targetLanguage);
      return result;
    } catch (error) {
      setTranslationError(error.message);
      return text;
    } finally {
      setIsTranslating(false);
    }
  };

  return {
    translate,
    translateViToEn: (text) => translate(text, 'vi', 'en'),
    translateEnToVi: (text) => translate(text, 'en', 'vi'),
    isTranslating,
    translationError
  };
};

export default {
  translateText,
  translateViToEn,
  translateEnToVi,
  translateMultipleFields,
  useTranslation
};