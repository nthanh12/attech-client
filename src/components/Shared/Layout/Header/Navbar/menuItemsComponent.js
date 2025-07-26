import React from "react";
import NavItem from "./NavItem";
import { useI18n } from "../../../../../hooks/useI18n";

const MenuItems = ({ menuItems, isMobile, closeMobileMenu }) => {
  const { currentLanguage, i18n } = useI18n();
  
  // Force re-render when language changes by using language as key
  const languageKey = i18n.language || currentLanguage || 'vi';
  
  return menuItems.map((item, index) => (
    <NavItem
      key={`${item.pathVi}-${languageKey}`} // Include language in key to force re-render
      item={item}
      isMobile={isMobile}
      closeMobileMenu={closeMobileMenu}
      depthLevel={0}
    />
  ));
};

// Remove memo to ensure menu updates on language change
export default MenuItems;