import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavItem = ({ item, isMobile, closeMobileMenu }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.submenu && item.submenu.length > 0;

  const handleClick = (e) => {
    if (hasChildren && isMobile) {
      e.preventDefault();
      setOpen((prev) => !prev);
    } else if (!hasChildren) {
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
      <Link
        to={item.path}
        className="nav-link"
        onClick={handleClick}
      >
        {item.label}
        {hasChildren && <span className="dropdown-icon"></span>}
      </Link>
      {hasChildren && (
        <ul className="dropdown-menu">
          {item.submenu.map((child, idx) => (
            <NavItem
              key={child.path || idx}
              item={child}
              isMobile={isMobile}
              closeMobileMenu={closeMobileMenu}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default NavItem;
