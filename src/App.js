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
    // Nhanh chóng ẩn loading cho trang public
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Chỉ loading 500ms

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
              console.debug('Element removal error:', err);
            }
          });
        });
      } catch (err) {
        console.debug('Cleanup error:', err);
      }
    };

    // Disabled cleanup to avoid interfering with React components
    // setTimeout(cleanupLoadingElements, 100);

    return () => {
      clearTimeout(timer);
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
