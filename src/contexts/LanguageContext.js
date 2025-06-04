import React, { createContext, useState, useContext, useEffect } from 'react';

// Định nghĩa các bản dịch
const translations = {
  vi: {
    login: 'Đăng nhập',
    darkMode: 'Chế độ tối',
    lightMode: 'Chế độ sáng',
    search: 'Tìm kiếm...',
    // Thêm các bản dịch khác ở đây
  },
  en: {
    login: 'Login',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    search: 'Search...',
    // Thêm các bản dịch khác ở đây
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Lấy ngôn ngữ từ localStorage hoặc mặc định là 'vi'
    return localStorage.getItem('language') || 'vi';
  });

  useEffect(() => {
    // Lưu ngôn ngữ vào localStorage khi thay đổi
    localStorage.setItem('language', language);
    // Thêm class vào body để style theo ngôn ngữ nếu cần
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const translate = (key) => {
    return translations[language][key] || key;
  };

  const switchLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 