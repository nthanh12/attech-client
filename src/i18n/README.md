# Internationalization (i18n) Setup

## 📋 Overview

This project uses `react-i18next` for internationalization, supporting Vietnamese (vi) and English (en) languages. The system includes:

- **Language detection** from localStorage/browser preferences
- **Dynamic language switching** 
- **Localized content helpers** for multi-language API content
- **Translation files** in JSON format
- **Custom hooks** for easy usage

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

### 2. Basic Usage in Components

```jsx
import { useTranslation } from 'react-i18next';
// OR use our custom hook
import { useI18n } from '../hooks/useI18n';

const MyComponent = () => {
  const { t } = useTranslation();
  // OR
  const { t, save, cancel, loading } = useI18n();
  
  return (
    <div>
      <h1>{t('navigation.home')}</h1>
      <button>{save()}</button>
      <button>{cancel()}</button>
    </div>
  );
};
```

### 3. Language Switcher

```jsx
import LanguageSwitcher from '../components/Shared/LanguageSwitcher';

<LanguageSwitcher />
<LanguageSwitcher className="compact" showLabels={false} />
```

## 🔧 API Integration

### Handling Multi-language Content

For API responses with `titleVi/titleEn`, `descriptionVi/descriptionEn`, etc:

```jsx
import { useI18n } from '../hooks/useI18n';

const NewsComponent = ({ newsItem }) => {
  const { title, description, formatLocalizedDate } = useI18n();
  
  return (
    <div>
      <h2>{title(newsItem)}</h2>
      <p>{description(newsItem)}</p>
      <small>{formatLocalizedDate(newsItem.timePosted)}</small>
    </div>
  );
};
```

### Available Helper Functions

```jsx
const {
  // Content helpers
  title,           // Gets titleVi or titleEn based on current language
  description,     // Gets descriptionVi or descriptionEn
  name,           // Gets nameVi or nameEn
  content,        // Gets contentVi or contentEn
  summary,        // Gets summaryVi or summaryEn
  slug,           // Gets slugVi or slugEn
  
  // Formatting
  formatLocalizedDate,
  getCategoryName,
  truncateText,
  
  // Language info
  currentLanguage,  // 'vi' or 'en'
  isVietnamese,    // boolean
  isEnglish,       // boolean
  
  // Common shortcuts
  loading,         // t('common.loading')
  save,           // t('common.save')
  cancel,         // t('common.cancel')
  edit,           // t('common.edit')
  delete,         // t('common.delete')
  
} = useI18n();
```

## 📁 File Structure

```
src/
├── i18n/
│   ├── index.js              # i18n configuration
│   └── locales/
│       ├── vi.json           # Vietnamese translations
│       └── en.json           # English translations
├── hooks/
│   └── useI18n.js           # Custom i18n hook
├── utils/
│   └── i18nHelpers.js       # Helper functions
└── components/
    └── Shared/
        └── LanguageSwitcher/ # Language switcher component
```

## 🌐 Adding New Translations

### 1. Add to JSON files

**vi.json:**
```json
{
  "myFeature": {
    "title": "Tiêu đề của tôi",
    "description": "Mô tả bằng tiếng Việt"
  }
}
```

**en.json:**
```json
{
  "myFeature": {
    "title": "My Title", 
    "description": "Description in English"
  }
}
```

### 2. Use in components

```jsx
const { t } = useI18n();

return (
  <div>
    <h1>{t('myFeature.title')}</h1>
    <p>{t('myFeature.description')}</p>
  </div>
);
```

## 🎯 Best Practices

### 1. Namespace Organization

Group related translations:

```json
{
  "admin": {
    "news": {
      "title": "News Management",
      "fields": {
        "title": "Title",
        "content": "Content"
      },
      "actions": {
        "create": "Create",
        "update": "Update"
      }
    }
  }
}
```

### 2. Interpolation

For dynamic values:

```json
{
  "welcome": "Welcome, {{name}}!",
  "itemCount": "You have {{count}} items"
}
```

```jsx
{t('welcome', { name: 'John' })}
{t('itemCount', { count: 5 })}
```

### 3. Pluralization

```json
{
  "item": "item",
  "item_plural": "items"
}
```

```jsx
{t('item', { count: 1 })}  // "item"
{t('item', { count: 5 })}  // "items"
```

### 4. Conditional Content

```jsx
const { isVietnamese, t } = useI18n();

return (
  <div>
    {isVietnamese ? (
      <span>Nội dung đặc biệt cho tiếng Việt</span>
    ) : (
      <span>Special content for English</span>
    )}
    
    <p>{t('common.description')}</p>
  </div>
);
```

## 🔄 Language Switching

### Programmatic switching

```jsx
const { changeLanguage } = useI18n();

const handleLanguageChange = (lang) => {
  changeLanguage(lang);
};
```

### Detecting language changes

```jsx
import { useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';

const MyComponent = () => {
  const { currentLanguage } = useI18n();
  
  useEffect(() => {
    // React to language changes
    console.log('Language changed to:', currentLanguage);
  }, [currentLanguage]);
};
```

## 🛠️ Advanced Features

### 1. Date/Time Formatting

```jsx
const { formatLocalizedDate } = useI18n();

// Basic formatting
formatLocalizedDate(new Date())

// Custom options
formatLocalizedDate(date, {
  weekday: 'long',
  year: 'numeric', 
  month: 'short',
  day: 'numeric'
})
```

### 2. Content Fallbacks

The helpers automatically handle fallbacks:

```jsx
// If titleEn is empty but titleVi exists, it will show titleVi
// even when language is 'en'
title(newsItem)
```

### 3. Category Names

```jsx
const { getCategoryName } = useI18n();

// Works with category ID, category object, or category array
getCategoryName(categoryId, categoriesArray)
getCategoryName(categoryObject)
```

## 🐛 Troubleshooting

### Translation not found

```jsx
// Add fallback
{t('some.key', 'Default text if key not found')}

// Check console for missing keys in development
// Set debug: true in i18n config
```

### Language not persisting

- Check localStorage for 'i18nextLng' key
- Verify language detection order in config
- Check browser language settings

### Content not updating

- Ensure components re-render on language change
- Use the custom `useI18n` hook for automatic updates
- Check if translation keys match exactly

## 📱 Example Usage

See `src/components/Examples/I18nExample.jsx` for a complete working example demonstrating all features.

## 🚀 Production Considerations

1. **Bundle size**: Only include languages you need
2. **Loading**: Consider lazy loading translation files
3. **Caching**: Translation files are cached by default
4. **SEO**: Use proper lang attributes and meta tags
5. **Performance**: Use translation namespaces for large apps

## 🔗 Resources

- [react-i18next documentation](https://react.i18next.com/)
- [i18next documentation](https://www.i18next.com/)
- [Language detection](https://github.com/i18next/i18next-browser-languageDetector)