import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useLocation } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/en' || location.pathname === '/en/';

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