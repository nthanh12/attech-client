import React, { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

const getInitialLang = () => {
  return /^\/en(\/|$)/.test(window.location.pathname) ? "en" : "vi";
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(getInitialLang());

  useEffect(() => {
    const handlePopState = () => {
      setLang(getInitialLang());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext); 