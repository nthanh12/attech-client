import React, { useState } from "react";
import { Link } from "react-router-dom";

const getStoredOpenState = (key) => sessionStorage.getItem(key) === "true";
const setStoredOpenState = (key, value, isMobile) => {
  if (isMobile) {
    sessionStorage.setItem(key, value);
  }
};

const NavItem = ({ item, isMobile, closeMobileMenu, depthLevel = 0 }) => {
  const key = `menu-${item.path}`;
  const [open, setOpen] = useState(() => isMobile ? getStoredOpenState(key) : false);
  const hasChildren = item.submenu && item.submenu.length > 0;

  const handleLinkClick = () => {
    closeMobileMenu();
  };

  const handleToggleSubmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextOpen = !open;
    setOpen(nextOpen);
    setStoredOpenState(key, nextOpen, isMobile);

    if (!nextOpen && depthLevel > 0) {
      closeMobileMenu();
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile && hasChildren) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && hasChildren) {
      setOpen(false);
    }
  };

  return (
    <li
      className={`nav-item${hasChildren ? " has-children" : ""}${open ? " open" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="nav-link-container">
        <Link
          to={item.path}
          className="nav-link"
          onClick={handleLinkClick}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button 
            className="submenu-toggle"
            onClick={handleToggleSubmenu}
            aria-expanded={open}
            aria-label={open ? "Close submenu" : "Open submenu"}
          >
            <span className="dropdown-icon"></span>
          </button>
        )}
      </div>
      {hasChildren && (
        <ul className="dropdown-menu fade-slide-in">
          {item.submenu.map((child, idx) => (
            <NavItem
              key={child.path || idx}
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

export default NavItem;
