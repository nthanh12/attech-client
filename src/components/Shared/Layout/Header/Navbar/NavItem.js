import React, { useState, useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../../../contexts/LanguageContext";

const NavItem = ({ item, isMobile, closeMobileMenu, depthLevel = 0 }) => {
  const { lang } = useLanguage();
  const hasChildren = item.submenu && item.submenu.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const linkRef = useRef(null);
  const toggleRef = useRef(null);

  const handleLinkClick = (e) => {
    if (isMobile) {
      closeMobileMenu();
      // Không chặn event, luôn redirect khi click Link trên mobile
    }
  };

  const handleToggleSubmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleTouchStart = (e) => {
    if (isMobile && hasChildren) {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    const toggle = toggleRef.current;

    if (isMobile && hasChildren) {
      toggle?.addEventListener("touchstart", handleToggleSubmenu, { passive: false });
    }

    return () => {
      toggle?.removeEventListener("touchstart", handleToggleSubmenu, { passive: false });
    };
  }, [isMobile, hasChildren]);

  const handleMouseEnter = () => {
    if (!isMobile && hasChildren) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && hasChildren) {
      setIsOpen(false);
    }
  };

  const label = lang === "vi" ? item.labelVi : item.labelEn;
  const path = lang === "vi" ? item.pathVi : item.pathEn;

  return (
    <li
      className={`nav-item${hasChildren ? " has-children" : ""}${isOpen ? " open" : ""}`}
      role="menuitem"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="nav-link-container">
        {label && (
          <Link
            to={path}
            className="nav-link"
            onClick={handleLinkClick}
            ref={linkRef}
            aria-haspopup={hasChildren ? "true" : "false"}
            aria-expanded={hasChildren ? isOpen : undefined}
          >
            {label}
          </Link>
        )}
        {hasChildren && (isMobile || depthLevel === 0) && (
          <button
            className="submenu-toggle"
            onClick={handleToggleSubmenu}
            ref={toggleRef}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Đóng menu con" : "Mở menu con"}
          >
            <span className="dropdown-icon"></span>
          </button>
        )}
      </div>
      {hasChildren && (
        <ul className={`dropdown-menu${isOpen ? " open" : ""}`}>
          {item.submenu.map((child, idx) => (
            <NavItem
              key={child.key || child.pathVi || idx}
              item={child}
              isMobile={isMobile}
              closeMobileMenu={closeMobileMenu}
              depthLevel={depthLevel + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default memo(NavItem);