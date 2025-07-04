import React, { useEffect, useState, useCallback, memo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import "./Navbar.mobile.css";
import NavItem from "./NavItem";
import menuItems from "./menuItems";
import useIsMobile from "./useIsMobile";
import { useLanguage } from "../../../../../contexts/LanguageContext";
import { useTheme } from "../../../../../contexts/ThemeContext";
import { useClickOutside } from "../../../../../hooks/useClickOutside";

const SCROLL_THRESHOLD = 50;
const MOBILE_BREAKPOINT = 768;
const ANIMATION_DURATION = 300; // matches CSS animation duration

// Memoized menu items component
const MenuItems = memo(({ items, isMobile, closeMobileMenu }) => {
  return items.map((item, index) => (
    <NavItem
      key={item.path || index}
      item={item}
      isMobile={isMobile}
      closeMobileMenu={closeMobileMenu}
    />
  ));
});

// Custom hook for search functionality
const useSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = useCallback(() => {
    setIsSearchOpen(prev => !prev);
  }, []);

  const handleSearchBlur = useCallback(() => {
    const searchInput = document.querySelector(".search-input");
    if (!searchInput?.value) {
      setIsSearchOpen(false);
    }
  }, []);

  return { isSearchOpen, handleSearchClick, handleSearchBlur };
};

const NavbarTop = memo(({ 
  closeMobileMenu, 
  isSearchOpen, 
  handleSearchClick, 
  handleSearchBlur, 
  isDarkMode, 
  toggleDarkMode, 
  language, 
  handleLanguageSwitch, 
  translate,
  isMobile,
  mobileOpen,
  toggleMobileMenu,
  menuItems
}) => {
  const mobileMenuRef = useRef(null);

  // Handle body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  }, [mobileOpen]);

  // Handle click outside
  useClickOutside(mobileMenuRef, () => {
    if (mobileOpen) {
      closeMobileMenu();
    }
  });

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileOpen, closeMobileMenu]);

  return (
    <div className="navbar-top">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link 
            to="/" 
            className="logo" 
            onClick={closeMobileMenu}
            aria-label="Home"
          >
            <img
              src="/assets/images/header/attech-bo-cuc-dau-trang-chu.png"
              alt="ATTECH Logo"
              loading="eager"
            />
          </Link>
        </div>
        <div className="navbar-right">
          <button
            className="navbar-toggle"
            onClick={toggleMobileMenu}
            aria-label={translate("toggleMenu")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span className="hamburger-icon"></span>
          </button>

          {/* Desktop Controls */}
          <div className="desktop-controls">
            <div className={`search-container${isSearchOpen ? " open" : ""}`}>
              <button
                className="search-button"
                onClick={handleSearchClick}
                aria-label={translate("search")}
                aria-expanded={isSearchOpen}
              >
                <i className="fa fa-search"></i>
              </button>
              {isSearchOpen && (
                <input
                  type="text"
                  className="search-input"
                  placeholder={translate("search")}
                  aria-label={translate("search")}
                  onBlur={handleSearchBlur}
                  autoFocus
                />
              )}
            </div>
            {/*
            <button
              className="theme-toggle"
              onClick={toggleDarkMode}
              aria-label={translate(isDarkMode ? "lightMode" : "darkMode")}
              title={translate(isDarkMode ? "lightMode" : "darkMode")}
            >
              <i className={`fa fa-solid ${isDarkMode ? "fa fa-moon" : "fa fa-sun"}`}></i>
            </button>
            */}
            <div className="language-switcher">
              <button
                className={`lang-btn ${language === "vi" ? "active" : ""}`}
                onClick={handleLanguageSwitch("vi")}
                title="Tiếng Việt"
                aria-pressed={language === "vi"}
              >
                <img
                  src={require("../../../../../assets/img/flags/vi.png")}
                  alt="Tiếng Việt"
                />
              </button>
              <button
                className={`lang-btn ${language === "en" ? "active" : ""}`}
                onClick={handleLanguageSwitch("en")}
                title="English"
                aria-pressed={language === "en"}
              >
                <img
                  src={require("../../../../../assets/img/flags/eng.png")}
                  alt="English"
                />
              </button>
            </div>
            <Link
              to="/login"
              className="login-btn"
              title={translate("login")}
              aria-label={translate("login")}
            >
              <i className="fa fa-solid fa-user"></i>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`mobile-menu${mobileOpen ? " open" : ""}`}
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label={translate("mobileMenu")}
          >
            <div className="mobile-menu-header">
              <Link 
                to="/" 
                className="logo" 
                onClick={closeMobileMenu}
                aria-label="Home"
              >
                <img
                  src="/assets/images/header/attech-bo-cuc-dau-trang-chu.png"
                  alt="ATTECH Logo"
                />
              </Link>
              <button 
                className="close-menu"
                onClick={closeMobileMenu}
                aria-label={translate("closeMenu")}
              >
                &times;
              </button>
            </div>
            <div className="mobile-menu-content">
              <nav>
                <ul className="mobile-nav-items" role="menu">
                  <MenuItems 
                    items={menuItems} 
                    isMobile={true} 
                    closeMobileMenu={closeMobileMenu} 
                  />
                </ul>
              </nav>
              <div className="mobile-menu-footer">
                <div className="mobile-search">
                  <input
                    type="text"
                    placeholder={translate("search")}
                    aria-label={translate("search")}
                  />
                </div>
                <div className="mobile-actions">
                  <div className="language-switcher">
                    <button
                      className={`lang-btn ${language === "vi" ? "active" : ""}`}
                      onClick={handleLanguageSwitch("vi")}
                      title="Tiếng Việt"
                      aria-pressed={language === "vi"}
                    >
                      <img
                        src={require("../../../../../assets/img/flags/vi.png")}
                        alt="Tiếng Việt"
                      />
                    </button>
                    <button
                      className={`lang-btn ${language === "en" ? "active" : ""}`}
                      onClick={handleLanguageSwitch("en")}
                      title="English"
                      aria-pressed={language === "en"}
                    >
                      <img
                        src={require("../../../../../assets/img/flags/eng.png")}
                        alt="English"
                      />
                    </button>
                  </div>
                  {/*<button
                    className="theme-toggle"
                    onClick={toggleDarkMode}
                    aria-label={translate(isDarkMode ? "lightMode" : "darkMode")}
                    title={translate(isDarkMode ? "lightMode" : "darkMode")}
                  >
                    <i className={`fa fa-solid ${isDarkMode ? "fa fa-moon" : "fa fa-sun"}`}></i>
                  </button>*/}
                  <Link
                    to="/login"
                    className="login-btn"
                    title={translate("login")}
                    aria-label={translate("login")}
                    onClick={closeMobileMenu}
                  >
                    <i className="fa fa-solid fa-user"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Backdrop */}
          <div 
            className={`mobile-menu-backdrop${mobileOpen ? " open" : ""}`}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
});

const NavbarBottom = memo(({ mobileOpen, toggleMobileMenu, menuItems, isMobile, closeMobileMenu, translate }) => (
  <div className="navbar-menu-wrapper">
    <div className="navbar-container">
      <button
        className="navbar-toggle"
        onClick={toggleMobileMenu}
        aria-label={translate("toggleMenu")}
        aria-expanded={mobileOpen}
        aria-controls="main-menu"
      >
        &#9776;
      </button>
      <ul 
        className={`nav-menu${mobileOpen ? " open" : ""}`} 
        id="main-menu"
        role="menubar"
      >
        <MenuItems 
          items={menuItems} 
          isMobile={isMobile} 
          closeMobileMenu={closeMobileMenu} 
        />
      </ul>
    </div>
  </div>
));

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const { language, switchLanguage, translate } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { isSearchOpen, handleSearchClick, handleSearchBlur } = useSearch();

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  const handleLanguageSwitch = useCallback((lang) => {
    return () => switchLanguage(lang);
  }, [switchLanguage]);

  return (
    <nav 
      className={`navbar${scrolled ? " scrolled" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <NavbarTop
        closeMobileMenu={closeMobileMenu}
        isSearchOpen={isSearchOpen}
        handleSearchClick={handleSearchClick}
        handleSearchBlur={handleSearchBlur}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        language={language}
        handleLanguageSwitch={handleLanguageSwitch}
        translate={translate}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        toggleMobileMenu={toggleMobileMenu}
        menuItems={menuItems}
      />
      {!isMobile && (
        <NavbarBottom
          mobileOpen={mobileOpen}
          toggleMobileMenu={toggleMobileMenu}
          menuItems={menuItems}
          isMobile={isMobile}
          closeMobileMenu={closeMobileMenu}
          translate={translate}
        />
      )}
    </nav>
  );
};

export default memo(Navbar);
