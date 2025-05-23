import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import NavItem from "./NavItem";
import menuItems from "./menuItems";
import useIsMobile from "./useIsMobile";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile(768);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

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

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      {/* Phần trên - Logo và tên công ty */}
      <div className="navbar-top">
        <div className="navbar-container">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <img
              src="/assets/images/header/attech-bo-cuc-dau-trang-chu.png"
              alt="ATTECH Logo"
            />
          </Link>
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
