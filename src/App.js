import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/content-formatting.css";
import LocalizedRoutes from "./routes/LocalizedRoutes";
import { AdminRoutes } from "./admin";
import UserDashboard from "./pages/User/UserDashboard";
import { useLocation } from "react-router-dom";
import ChatWidget from "./components/Shared/ChatWidget/ChatWidget";
import BackToTopButton from "./components/Shared/Navigation/BackToTopButton/BackToTopButton";
import LoadingOverlay from "./components/Shared/LoadingOverlay/LoadingOverlay";
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { I18nextProvider } from 'react-i18next';
import i18n, { checkTranslationsVersion } from './i18n';

const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Immediate scroll without delay for smoother experience
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  }, [location.pathname]);

  return children;
};

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isUserDashboard = location.pathname === "/trang-noi-bo" || location.pathname === "/en/internal";
  
  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/trang-noi-bo" element={<UserDashboard />} />
        <Route path="/en/internal" element={<UserDashboard />} />
        <Route path="*" element={<LocalizedRoutes />} />
      </Routes>
      {!isAdminRoute && !isUserDashboard && (
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
    // Check and refresh translations if needed
    checkTranslationsVersion();

    // Progressive loading strategy:
    // - Tối thiểu 800ms để tránh flash
    // - Tối đa 5s để tránh user chờ quá lâu nếu API lỗi
    const minLoadingTime = 800;
    const maxLoadingTime = 5000;

    const minTimer = setTimeout(() => {
      setIsLoading(false);
    }, minLoadingTime);

    const maxTimer = setTimeout(() => {
      setIsLoading(false);
    }, maxLoadingTime);

    // Safe cleanup function
    const cleanupLoadingElements = () => {
      try {
        // Remove by ID safely
        const elementsById = ['spinner'];
        elementsById.forEach(id => {
          const el = document.getElementById(id);
          if (el && el.parentNode) {
            el.parentNode.removeChild(el);
          }
        });

        // Remove by class selectors - safer approach
        const selectors = [
          '.spinner',
          '.loading-spinner', 
          '.spinner-border',
          '.admin-loading-spinner'
        ];

        selectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            try {
              // Don't remove React-managed components or LoadingOverlay
              if (!el.closest('.loading-overlay') && 
                  !el.closest('[data-reactroot]') && 
                  !el.closest('#root') &&
                  el.parentNode) {
                el.parentNode.removeChild(el);
              }
            } catch (err) {
              // Silently handle removal errors
            }
          });
        });
      } catch (err) {
      }
    };

    // Disabled cleanup to avoid interfering with React components
    // setTimeout(cleanupLoadingElements, 100);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <AuthProvider>
          <ThemeProvider>
            <LoadingOverlay isLoading={isLoading} />
            <ScrollToTop>
              <AppContent />
            </ScrollToTop>
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </I18nextProvider>
  );
};

export default App;
