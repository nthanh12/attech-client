import React, { useState, useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../../../../hooks/useI18n";
import { getMenuChildren, getMenuLabel, getMenuPath, hasChildren as hasChildrenUtil } from "../../../../../utils/menuUtils";

const NavItem = ({ item, allMenuItems, isMobile, closeMobileMenu, depthLevel = 0 }) => {
  const { currentLanguage, i18n } = useI18n();
  
  // Check if we're using flat array format or hierarchical format
  const isFlat = allMenuItems !== null;
  
  const hasChildren = isFlat 
    ? hasChildrenUtil(allMenuItems, item.id)
    : item.submenu && item.submenu.length > 0;
    
  const children = isFlat 
    ? getMenuChildren(allMenuItems, item.id)
    : item.submenu || [];
  
  const [isOpen, setIsOpen] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const linkRef = useRef(null);
  const toggleRef = useRef(null);
  
  // Force re-render when language changes
  useEffect(() => {
    setForceUpdate(prev => prev + 1);
  }, [currentLanguage, i18n.language]);

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

  // Force re-render on language change by using i18n.language directly
  const currentLang = i18n.language || currentLanguage || 'vi';
  
  const label = isFlat 
    ? getMenuLabel(item, currentLang)
    : (currentLang === "vi" ? item.titleVi : item.titleEn);
    
  const path = isFlat 
    ? getMenuPath(item, currentLang)
    : (currentLang === "vi" ? item.url : item.urlEn);
    
  // Handle external links for flat format
  const isExternal = isFlat ? item.isExternal : false;
  const target = isFlat ? item.target || "_self" : "_self";
  

  return (
    <li
      className={`nav-item${hasChildren ? " has-children" : ""}${isOpen ? " open" : ""}`}
      role="menuitem"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="nav-link-container">
        {label && (
          <>
            {isExternal ? (
              <a
                href={path}
                target={target}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
                className="nav-link"
                onClick={handleLinkClick}
                ref={linkRef}
                aria-haspopup={hasChildren ? "true" : "false"}
                aria-expanded={hasChildren ? isOpen : undefined}
              >
                {label}
              </a>
            ) : (
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
          </>
        )}
        {hasChildren && (isMobile || depthLevel === 0) && (
          <button
            className="submenu-toggle"
            onClick={handleToggleSubmenu}
            ref={toggleRef}
            aria-expanded={isOpen}
            aria-label={isOpen ? (currentLang === 'vi' ? "Đóng menu con" : "Close submenu") : (currentLang === 'vi' ? "Mở menu con" : "Open submenu")}
          >
            <span className="dropdown-icon"></span>
          </button>
        )}
      </div>
      {hasChildren && (
        <ul className={`dropdown-menu${isOpen ? " open" : ""}`}>
          {children.map((child, idx) => (
            <NavItem
              key={child.key || child.url || idx}
              item={child}
              allMenuItems={allMenuItems} // Pass through for nested items
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

// Remove memo to ensure component re-renders on language change
export default NavItem;