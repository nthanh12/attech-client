import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Public from "./routes/Public";
import Admin from "./routes/Admin";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ChatWidget from "./components/Shared/ChatWidget/ChatWidget";
import BackToTopButton from "./components/Shared/Navigation/BackToTopButton/BackToTopButton";
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

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
  console.log('Render AppContent', location.pathname);
  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<Public />} />
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
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <ScrollToTop>
            <AppContent />
          </ScrollToTop>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
