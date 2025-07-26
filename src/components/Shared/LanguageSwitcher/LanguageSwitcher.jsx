import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedRouting } from '../../../hooks/useLocalizedRouting';
import './LanguageSwitcher.css';

const LanguageSwitcher = ({ className = '', showLabels = true, useRouting = true }) => {
  const { i18n, t } = useTranslation();
  const { switchLanguage: switchLanguageWithRouting, hasLanguageEquivalent } = useLocalizedRouting();

  const changeLanguage = (lng) => {
    if (useRouting && hasLanguageEquivalent()) {
      // Switch language with URL change
      switchLanguageWithRouting(lng);
    } else {
      // Just change language without URL change
      i18n.changeLanguage(lng);
    }
  };

  const languages = [
    {
      code: 'vi',
      name: t('common.vietnamese'),
      flag: '🇻🇳',
      nativeName: 'Tiếng Việt'
    },
    {
      code: 'en',
      name: t('common.english'),
      flag: '🇺🇸',
      nativeName: 'English'
    }
  ];

  return (
    <div className={`language-switcher ${className}`}>
      {showLabels && (
        <span className="language-label">{t('common.language')}:</span>
      )}
      <div className="language-options">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`language-btn ${i18n.language === lang.code ? 'active' : ''}`}
            onClick={() => changeLanguage(lang.code)}
            title={lang.nativeName}
          >
            <span className="flag">{lang.flag}</span>
            {showLabels && <span className="name">{lang.nativeName}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;