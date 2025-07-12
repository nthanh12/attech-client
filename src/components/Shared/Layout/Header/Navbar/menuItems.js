import React from "react";
import NavItem from "./NavItem";

const MenuItems = ({ menuItems, isMobile, closeMobileMenu }) => {
  return menuItems.map((item, index) => (
    <NavItem
      key={item.pathVi}
      item={item}
      isMobile={isMobile}
      closeMobileMenu={closeMobileMenu}
      depthLevel={0}
    />
  ));
};

export default React.memo(MenuItems);