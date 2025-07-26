import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LocalizedRoutes from "./routes/LocalizedRoutes";
import Admin from "./routes/Admin";
import { useLocation } from "react-router-dom";
import ChatWidget from "./components/Shared/ChatWidget/ChatWidget";
import BackToTopButton from "./components/Shared/Navigation/BackToTopButton/BackToTopButton";
import LoadingOverlay from "./components/Shared/LoadingOverlay/LoadingOverlay";
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children;
};

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<LocalizedRoutes />} />
      </Routes>
      {!isAdminRoute && (
        <>
          <ChatWidget />
          <BackToTopButton scrollThreshold={300} size={40} />
        </>
      )}
    </>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Aggressive cleanup function
    const cleanupLoadingElements = () => {
      // Remove by ID
      const elementsById = ['spinner'];
      elementsById.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });

      // Remove by class selectors - more aggressive
      const selectors = [
        '.spinner',
        '.loading-spinner', 
        '.spinner-border',
        '.admin-loading-spinner',
        '[class*="spinner"]',
        '[class*="loading"]',
        '[id*="spinner"]',
        '[id*="loading"]'
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          // Don't remove our LoadingOverlay
          if (!el.closest('.loading-overlay')) {
            el.remove();
          }
        });
      });
    };

    // Multiple cleanup attempts
    cleanupLoadingElements();
    setTimeout(cleanupLoadingElements, 50);
    setTimeout(cleanupLoadingElements, 100);
    setTimeout(cleanupLoadingElements, 200);

    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <ThemeProvider>
          <LoadingOverlay isLoading={isLoading} />
          <ScrollToTop>
            <AppContent />
          </ScrollToTop>
        </ThemeProvider>
      </Router>
    </I18nextProvider>
  );
};

export default App;
