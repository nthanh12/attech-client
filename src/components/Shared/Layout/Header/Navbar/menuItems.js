import React from "react";
import NavItem from "./NavItem";
import menuItems from "./menuItem";

const MenuItems = ({ isMobile, closeMobileMenu }) => {
  return menuItems.map((item, index) => (
    <NavItem
      key={item.path || `menu-item-${index}`}
      item={item}
      isMobile={isMobile}
      closeMobileMenu={closeMobileMenu}
      depthLevel={0}
    />
  ));
};

export default React.memo(MenuItems);