import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import NavItem from "./NavItem";
import menuItems from "./menuItems";
import useIsMobile from "./useIsMobile";
import { useLanguage } from "../../../../../contexts/LanguageContext";
import { useTheme } from "../../../../../contexts/ThemeContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile(768);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const { language, switchLanguage, translate } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // Nếu không phải trang chủ, luôn set scrolled = true
    if (!isHomePage) {
      setScrolled(true);
      return;
    }

    // Chỉ thêm event listener scroll ở trang chủ
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Set initial scroll state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  useEffect(() => {
    // Lock scroll body when mobile menu is open
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  const handleSearchClick = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleSearchBlur = () => {
    // Chỉ đóng search khi input trống
    const searchInput = document.querySelector(".search-input");
    if (!searchInput?.value) {
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      {/* Phần trên - Logo và tên công ty */}
      <div className="navbar-top">
        <div className="navbar-container">
          <div className="navbar-left">
            <Link to="/" className="logo" onClick={closeMobileMenu}>
              <img
                src="/assets/images/header/attech-bo-cuc-dau-trang-chu.png"
                alt="ATTECH Logo"
              />
            </Link>
          </div>
          <div className="navbar-right">
            {/* Search button/input */}
            <div className={`search-container${isSearchOpen ? " open" : ""}`}>
              <button
                className="search-button"
                onClick={handleSearchClick}
                aria-label={translate("search")}
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
            {/* Dark mode toggle */}
            <button
              className="theme-toggle"
              onClick={toggleDarkMode}
              aria-label={translate(isDarkMode ? "lightMode" : "darkMode")}
              title={translate(isDarkMode ? "lightMode" : "darkMode")}
            >
              <i
                className={`fa fa-solid ${
                  isDarkMode ? "fa fa-moon" : "fa fa-sun"
                }`}
              ></i>
            </button>
            {/* Language switcher */}
            <div className="language-switcher">
              <button
                className={`lang-btn ${language === "vi" ? "active" : ""}`}
                onClick={() => switchLanguage("vi")}
                title="Tiếng Việt"
              >
                <img
                  src={require("../../../../../assets/img/flags/vi.png")}
                  alt=""
                />
              </button>
              <button
                className={`lang-btn ${language === "en" ? "active" : ""}`}
                onClick={() => switchLanguage("en")}
                title="English"
              >
                <img
                  src={require("../../../../../assets/img/flags/eng.png")}
                  alt=""
                />
              </button>
            </div>

            {/* Login button */}
            <Link
              to="/login"
              className="login-btn"
              title={translate("login")}
              aria-label={translate("login")}
            >
              <i className="fa fa-solid fa-user"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Phần dưới - Menu navigation */}
      <div className="navbar-menu-wrapper">
        <div className="navbar-container">
          <button
            className="navbar-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="main-menu"
          >
            &#9776;
          </button>
          <ul className={`nav-menu${mobileOpen ? " open" : ""}`} id="main-menu">
            {menuItems.map((item, index) => (
              <NavItem
                key={item.path || index}
                item={item}
                isMobile={isMobile}
                closeMobileMenu={closeMobileMenu}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
