import React, { useEffect } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const { setLang } = useLanguage();
  const isHomePage = location.pathname === '/' || location.pathname === '/en' || location.pathname === '/en/';

  useEffect(() => {
    if (location.pathname.startsWith('/en')) {
      setLang('en');
    } else {
      setLang('vi');
    }
  }, [location, setLang]);

  return (
    <div className="main-layout">
      <Header />
      <main className={`main-content${isHomePage ? ' is-home' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 