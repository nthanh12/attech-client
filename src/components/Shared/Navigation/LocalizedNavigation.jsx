import React from 'react';
import { useI18n } from '../../../hooks/useI18n';
import LocalizedLink from '../LocalizedLink';
import LanguageSwitcher from '../LanguageSwitcher';

const LocalizedNavigation = ({ className = '', showLanguageSwitcher = true }) => {
  const { t } = useI18n();

  const navigationItems = [
    { routeKey: 'HOME', label: t('navigation.home') },
    { routeKey: 'PRODUCTS', label: t('navigation.products') },
    { routeKey: 'SERVICES', label: t('navigation.services') },
    { routeKey: 'NEWS', label: t('navigation.news') },
    { routeKey: 'CONTACT', label: t('navigation.contact') }
  ];

  return (
    <nav className={`localized-navigation ${className}`}>
      <div className="nav-items">
        {navigationItems.map((item) => (
          <LocalizedLink 
            key={item.routeKey}
            routeKey={item.routeKey}
            className="nav-link"
          >
            {item.label}
          </LocalizedLink>
        ))}
      </div>
      
      {showLanguageSwitcher && (
        <div className="nav-language">
          <LanguageSwitcher className="compact" />
        </div>
      )}
    </nav>
  );
};

export default LocalizedNavigation;