import React from "react";
import NavItem from "./NavItem";
import { useI18n } from "../../../../../hooks/useI18n";
import { getRootMenus, getMenuChildren, buildMenuTree } from "../../../../../utils/menuUtils";

const MenuItems = ({ menuItems, isMobile, closeMobileMenu }) => {
  const { currentLanguage, i18n } = useI18n();
  
  // Force re-render when language changes by using language as key
  const languageKey = i18n.language || currentLanguage || 'vi';
  
  // Check if menuItems is flat array (has level property) or hierarchical (has submenu property)
  const isFlat = menuItems.length > 0 && menuItems[0].hasOwnProperty('level');
  
  let processedMenuItems;
  
  if (isFlat) {
    // Use flat array format - get only root menus (level 0)
    processedMenuItems = getRootMenus(menuItems);
  } else {
    // Use hierarchical format (fallback)
    processedMenuItems = menuItems;
  }
  
  return processedMenuItems.map((item, index) => (
    <NavItem
      key={`${item.url || item.path}-${languageKey}`}
      item={item}
      allMenuItems={isFlat ? menuItems : null} // Pass all menu items for flat format
      isMobile={isMobile}
      closeMobileMenu={closeMobileMenu}
      depthLevel={0}
    />
  ));
};

// Remove memo to ensure menu updates on language change
export default MenuItems;