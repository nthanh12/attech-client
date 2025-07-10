import React, { useState, useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";

const NavItem = ({ item, isMobile, closeMobileMenu, depthLevel = 0 }) => {
  const key = `menu-${item.path || Math.random()}`; // Đảm bảo key duy nhất
  const hasChildren = item.submenu && item.submenu.length > 0;
  const [isOpen, setIsOpen] = useState(false); // Trạng thái riêng cho mỗi NavItem
  const linkRef = useRef(null);
  const toggleRef = useRef(null);

  const handleLinkClick = (e) => {
    if (isMobile && hasChildren && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    } else {
      closeMobileMenu();
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

  // Gắn sự kiện touchstart với passive: false
  useEffect(() => {
    const link = linkRef.current;
    const toggle = toggleRef.current;

    if (isMobile && hasChildren) {
      link?.addEventListener("touchstart", handleLinkClick, { passive: false });
      toggle?.addEventListener("touchstart", handleToggleSubmenu, { passive: false });
    }

    return () => {
      link?.removeEventListener("touchstart", handleLinkClick, { passive: false });
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

  return (
    <li
      className={`nav-item${hasChildren ? " has-children" : ""}${isOpen ? " open" : ""}`}
      role="menuitem"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="nav-link-container">
        <Link
          to={item.path}
          className="nav-link"
          onClick={isMobile ? handleLinkClick : undefined}
          ref={linkRef}
          aria-haspopup={hasChildren ? "true" : "false"}
          aria-expanded={hasChildren ? isOpen : undefined}
        >
          {item.label}
        </Link>
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
              key={child.path || `child-${idx}`}
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