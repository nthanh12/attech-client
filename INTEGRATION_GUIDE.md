# AttechServer API + i18n Integration Guide

## 🎯 Overview

This guide shows how to integrate the i18n system with AttechServer API responses that already have Vi/En fields.

## 📊 API Response Structure

AttechServer API returns data with Vietnamese and English fields:

```json
{
  "status": 1,
  "data": {
    "items": [
      {
        "id": 1,
        "titleVi": "15 năm ATTECH và hành trình làm chủ kỹ thuật hàng không",
        "titleEn": "15 years of ATTECH and the journey to master aviation technology",
        "slugVi": "15-nam-attech-va-hanh-trinh-lam-chu-ky-thuat-hang-khong",
        "slugEn": "15-years-attech-journey-master-aviation-technology",
        "descriptionVi": "Mô tả bằng tiếng Việt...",
        "descriptionEn": "Description in English...",
        "contentVi": "<p>Nội dung HTML tiếng Việt...</p>",
        "contentEn": "<p>HTML content in English...</p>",
        "timePosted": "2024-01-15T10:30:00Z",
        "status": 1,
        "featured": true,
        "postCategoryId": 1
      }
    ],
    "totalItems": 100
  },
  "code": 200,
  "message": "Ok"
}
```

## 🚀 Basic Usage

### 1. Using Custom Hook

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

### 2. Using Localized Components

```jsx
import { LocalizedTitle, LocalizedDescription, LocalizedContent } from '../components/Shared/LocalizedContent';

const NewsCard = ({ newsItem }) => {
  return (
    <div className="news-card">
      <LocalizedTitle item={newsItem} level={2} />
      <LocalizedDescription item={newsItem} truncate={200} />
      <LocalizedContent item={newsItem} maxLength={300} />
    </div>
  );
};
```

## 🔧 Available Helper Functions

### Content Helpers
```jsx
const { title, description, name, content, summary, slug } = useI18n();

// These automatically choose Vi or En based on current language
title(newsItem)        // Returns titleVi or titleEn
description(newsItem)  // Returns descriptionVi or descriptionEn
name(categoryItem)     // Returns nameVi or nameEn
content(newsItem)      // Returns contentVi or contentEn
summary(newsItem)      // Returns summaryVi or summaryEn
slug(newsItem)         // Returns slugVi or slugEn
```

### Formatting Helpers
```jsx
const { formatLocalizedDate, getCategoryName, truncateText } = useI18n();

formatLocalizedDate(newsItem.timePosted)      // Formats date in current locale
getCategoryName(categoryId, categoriesArray)  // Gets category name in current language
truncateText(text, 150)                      // Truncates with language-aware ellipsis
```

## 📱 Components Examples

### News List Component

```jsx
import React, { useState, useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';
import { LocalizedTitle, LocalizedDescription } from '../components/Shared/LocalizedContent';
import { fetchNewsWithFallback } from '../services/newsService';

const NewsList = () => {
  const { t, formatLocalizedDate } = useI18n();
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNewsWithFallback().then(setNews);
  }, []);

  return (
    <div>
      <h1>{t('frontend.news.title')}</h1>
      {news.map(newsItem => (
        <article key={newsItem.id} className="news-item">
          <LocalizedTitle item={newsItem} level={3} />
          <div className="meta">
            <span>{t('frontend.news.publishedOn')}: {formatLocalizedDate(newsItem.timePosted)}</span>
          </div>
          <LocalizedDescription item={newsItem} truncate={200} />
          <button>{t('frontend.news.readMore')}</button>
        </article>
      ))}
    </div>
  );
};
```

### Product Card Component

```jsx
import React from 'react';
import { useI18n } from '../hooks/useI18n';
import { LocalizedTitle, LocalizedDescription } from '../components/Shared/LocalizedContent';

const ProductCard = ({ product, categories }) => {
  const { t, getCategoryName } = useI18n();

  return (
    <div className="product-card">
      <img src={product.image} alt={title(product)} />
      <div className="content">
        <LocalizedTitle item={product} level={4} />
        <p className="category">
          {t('frontend.products.category')}: {getCategoryName(product.categoryId, categories)}
        </p>
        <LocalizedDescription item={product} truncate={150} />
        <div className="price">{product.price}</div>
        <button>{t('frontend.products.viewDetails')}</button>
      </div>
    </div>
  );
};
```

### Admin Form Component

```jsx
import React, { useState } from 'react';
import { useI18n } from '../hooks/useI18n';

const NewsForm = ({ newsItem, onSave }) => {
  const { t, currentLanguage } = useI18n();
  const [formData, setFormData] = useState(newsItem || {});

  return (
    <form>
      <div className="form-group">
        <label>{t('admin.news.fields.titleVi')} *</label>
        <input
          type="text"
          value={formData.titleVi || ''}
          onChange={(e) => setFormData({...formData, titleVi: e.target.value})}
          required
        />
      </div>
      
      <div className="form-group">
        <label>{t('admin.news.fields.titleEn')} *</label>
        <input
          type="text"
          value={formData.titleEn || ''}
          onChange={(e) => setFormData({...formData, titleEn: e.target.value})}
          required
        />
      </div>

      {/* Preview current language */}
      <div className="preview">
        <h4>{t('common.preview')} ({currentLanguage.toUpperCase()})</h4>
        <h3>{currentLanguage === 'vi' ? formData.titleVi : formData.titleEn}</h3>
      </div>

      <button type="submit">{t('common.save')}</button>
    </form>
  );
};
```

## 🌐 SEO Integration

```jsx
import React from 'react';
import { useI18n } from '../hooks/useI18n';
import SEO from '../components/SEO/SEO';

const NewsDetailPage = ({ newsItem }) => {
  const { title, description, currentLanguage } = useI18n();

  return (
    <>
      <SEO 
        title={title(newsItem)}
        description={description(newsItem)}
        url={`/news/${currentLanguage === 'vi' ? newsItem.slugVi : newsItem.slugEn}`}
        lang={currentLanguage}
        image={newsItem.image}
      />
      
      {/* Page content */}
      <article>
        <h1>{title(newsItem)}</h1>
        <div dangerouslySetInnerHTML={{ 
          __html: currentLanguage === 'vi' ? newsItem.contentVi : newsItem.contentEn 
        }} />
      </article>
    </>
  );
};
```

## 🔄 Language Switching

### In Header/Navigation

```jsx
import React from 'react';
import { useI18n } from '../hooks/useI18n';
import LanguageSwitcher from '../components/Shared/LanguageSwitcher';

const Header = () => {
  const { t } = useI18n();

  return (
    <header>
      <nav>
        <a href="/">{t('navigation.home')}</a>
        <a href="/news">{t('navigation.news')}</a>
        <a href="/products">{t('navigation.products')}</a>
        <a href="/services">{t('navigation.services')}</a>
        <a href="/contact">{t('navigation.contact')}</a>
      </nav>
      
      <LanguageSwitcher className="compact" />
    </header>
  );
};
```

### Programmatic Language Change

```jsx
import React from 'react';
import { useI18n } from '../hooks/useI18n';

const LanguageSettings = () => {
  const { currentLanguage, changeLanguage } = useI18n();

  const handleLanguageChange = (newLang) => {
    changeLanguage(newLang);
    // Optionally reload page content
    window.location.reload();
  };

  return (
    <div>
      <p>Current: {currentLanguage}</p>
      <button onClick={() => handleLanguageChange('vi')}>Tiếng Việt</button>
      <button onClick={() => handleLanguageChange('en')}>English</button>
    </div>
  );
};
```

## 📊 Data Processing

### Processing API Response

```jsx
import { useI18n } from '../hooks/useI18n';

const useLocalizedNews = () => {
  const { currentLanguage } = useI18n();
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const response = await fetchNewsWithFallback();
    
    // Optional: Add computed fields for easier access
    const processedNews = response.map(item => ({
      ...item,
      currentTitle: currentLanguage === 'vi' ? item.titleVi : item.titleEn,
      currentDescription: currentLanguage === 'vi' ? item.descriptionVi : item.descriptionEn,
      currentSlug: currentLanguage === 'vi' ? item.slugVi : item.slugEn
    }));
    
    setNews(processedNews);
  };

  useEffect(() => {
    fetchNews();
  }, [currentLanguage]); // Refetch when language changes

  return { news, refetch: fetchNews };
};
```

## 🎯 Best Practices

### 1. Consistent Field Naming
Always use the AttechServer convention:
- `titleVi` / `titleEn`
- `descriptionVi` / `descriptionEn`
- `contentVi` / `contentEn`
- `nameVi` / `nameEn`
- `slugVi` / `slugEn`

### 2. Fallback Strategy
The helper functions automatically fall back to the other language if the current one is empty:
```jsx
// If titleEn is empty, it will show titleVi even when language is 'en'
title(newsItem)
```

### 3. URL Structure
Use language-specific slugs for SEO:
```jsx
const newsUrl = currentLanguage === 'vi' 
  ? `/tin-tuc/${newsItem.slugVi}` 
  : `/news/${newsItem.slugEn}`;
```

### 4. Form Handling
Always save both Vi and En fields in admin forms:
```jsx
const handleSave = (formData) => {
  const newsData = {
    titleVi: formData.titleVi,
    titleEn: formData.titleEn,
    descriptionVi: formData.descriptionVi,
    descriptionEn: formData.descriptionEn,
    // ... other fields
  };
  
  await createNews(newsData);
};
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install react-i18next i18next i18next-browser-languagedetector
   ```

2. **Import i18n in your App.js**:
   ```jsx
   import './i18n'; // This initializes i18n
   ```

3. **Use in components**:
   ```jsx
   import { useI18n } from '../hooks/useI18n';
   import { LocalizedTitle } from '../components/Shared/LocalizedContent';
   ```

4. **Test with real data**:
   - Check `src/components/Examples/NewsCardExample.jsx` for a working example
   - Use your browser dev tools to see how content changes with language switching

## 🐛 Troubleshooting

- **Content not updating**: Ensure components re-render when language changes
- **Empty content**: Check if both Vi and En fields exist in API response
- **Performance**: Use `React.memo` for components that render large lists
- **SEO**: Make sure to update meta tags when language changes

See the example components in `src/components/Examples/` for complete working implementations.