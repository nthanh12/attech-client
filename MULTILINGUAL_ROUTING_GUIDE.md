# Multilingual Routing Guide

## 🎯 Overview

Hệ thống routing đa ngôn ngữ cho phép:
- **URL khác nhau** cho tiếng Việt và tiếng Anh
- **Tự động sync** ngôn ngữ với URL
- **Language switching** với URL redirect
- **Smart components** tự chọn đúng URL

## 🗺️ URL Structure

### Vietnamese URLs (Default)
```
/                           → Trang chủ
/san-pham                   → Sản phẩm
/san-pham/thiet-bi          → Danh mục sản phẩm
/san-pham/thiet-bi/sp-1     → Chi tiết sản phẩm
/dich-vu                    → Dịch vụ
/tin-tuc                    → Tin tức
/tin-tuc/cong-nghe/bai-1    → Chi tiết tin tức
/lien-he                    → Liên hệ
```

### English URLs (with /en prefix)
```
/en                         → Home
/en/products                → Products
/en/products/equipment      → Product category
/en/products/equipment/pr-1 → Product detail
/en/services                → Services
/en/news                    → News
/en/news/technology/art-1   → News detail
/en/contact                 → Contact
```

## 🚀 Basic Usage

### 1. Using LocalizedLink Component

```jsx
import LocalizedLink from '../components/Shared/LocalizedLink';

// Automatic URL based on current language
<LocalizedLink routeKey="PRODUCTS">
  {t('navigation.products')}
</LocalizedLink>

// With parameters
<LocalizedLink routeKey="PRODUCT_DETAIL" params={{category: 'thiet-bi', slug: 'sp-1'}}>
  View Product
</LocalizedLink>

// News with content
<LocalizedLink newsItem={newsItem} category={category}>
  Read News
</LocalizedLink>
```

### 2. Using Routing Hook

```jsx
import { useLocalizedRouting } from '../hooks/useLocalizedRouting';

const MyComponent = () => {
  const { navigateToRoute, navigateToNews, switchLanguage } = useLocalizedRouting();
  
  return (
    <div>
      <button onClick={() => navigateToRoute('PRODUCTS')}>
        Go to Products
      </button>
      
      <button onClick={() => navigateToNews(newsItem, category)}>
        Read News
      </button>
      
      <button onClick={() => switchLanguage('en')}>
        Switch to English
      </button>
    </div>
  );
};
```

## 🔧 Route Configuration

### Route Keys (from routeHelpers.js)
```javascript
export const ROUTES = {
  HOME: { vi: '/', en: '/en' },
  PRODUCTS: { vi: '/san-pham', en: '/en/products' },
  PRODUCT_DETAIL: { vi: '/san-pham/:category/:slug', en: '/en/products/:category/:slug' },
  NEWS: { vi: '/tin-tuc', en: '/en/news' },
  NEWS_DETAIL: { vi: '/tin-tuc/:category/:slug', en: '/en/news/:category/:slug' },
  // ... more routes
};
```

### Helper Functions
```javascript
import { getLocalizedRoute, buildNewsDetailUrl } from '../utils/routeHelpers';

// Get route for current language
const productUrl = getLocalizedRoute('PRODUCTS');

// Build content URLs
const newsUrl = buildNewsDetailUrl(newsItem, category);
const productUrl = buildProductDetailUrl(product, category);
```

## 📱 Components Integration

### 1. Navigation Menu

```jsx
import { useI18n } from '../hooks/useI18n';
import LocalizedLink from '../components/Shared/LocalizedLink';

const Navigation = () => {
  const { t } = useI18n();
  
  return (
    <nav>
      <LocalizedLink routeKey="HOME">{t('navigation.home')}</LocalizedLink>
      <LocalizedLink routeKey="PRODUCTS">{t('navigation.products')}</LocalizedLink>
      <LocalizedLink routeKey="SERVICES">{t('navigation.services')}</LocalizedLink>
      <LocalizedLink routeKey="NEWS">{t('navigation.news')}</LocalizedLink>
      <LocalizedLink routeKey="CONTACT">{t('navigation.contact')}</LocalizedLink>
    </nav>
  );
};
```

### 2. News List Component

```jsx
import { useI18n } from '../hooks/useI18n';
import { LocalizedTitle, LocalizedDescription } from '../components/Shared/LocalizedContent';
import LocalizedLink from '../components/Shared/LocalizedLink';

const NewsList = ({ news, categories }) => {
  const { t, formatLocalizedDate } = useI18n();
  
  return (
    <div>
      {news.map(newsItem => {
        const category = categories.find(c => c.id === newsItem.postCategoryId);
        
        return (
          <article key={newsItem.id}>
            <LocalizedTitle item={newsItem} level={3} />
            <LocalizedDescription item={newsItem} truncate={200} />
            <div className="meta">
              {formatLocalizedDate(newsItem.timePosted)}
            </div>
            <LocalizedLink newsItem={newsItem} category={category}>
              {t('frontend.news.readMore')}
            </LocalizedLink>
          </article>
        );
      })}
    </div>
  );
};
```

### 3. Product Card

```jsx
const ProductCard = ({ product, category }) => {
  const { t, title, description } = useI18n();
  
  return (
    <div className="product-card">
      <h4>{title(product)}</h4>
      <p>{description(product)}</p>
      <LocalizedLink product={product} category={category} className="btn btn-primary">
        {t('frontend.products.viewDetails')}
      </LocalizedLink>
    </div>
  );
};
```

## 🔄 Language Switching

### 1. Enhanced LanguageSwitcher

```jsx
import LanguageSwitcher from '../components/Shared/LanguageSwitcher';

// Automatic URL switching
<LanguageSwitcher />

// Or just language change without URL
<LanguageSwitcher useRouting={false} />
```

### 2. Programmatic Language Switch

```jsx
import { useLocalizedRouting } from '../hooks/useLocalizedRouting';

const LanguageSettings = () => {
  const { switchLanguage, currentLanguage } = useLocalizedRouting();
  
  const handleLanguageChange = (newLang) => {
    switchLanguage(newLang); // This changes URL + language
  };
  
  return (
    <div>
      <button onClick={() => handleLanguageChange('vi')}>Tiếng Việt</button>
      <button onClick={() => handleLanguageChange('en')}>English</button>
    </div>
  );
};
```

## 🎛️ Advanced Features

### 1. URL Synchronization

Automatically syncs i18n language with URL:

```jsx
// In LocalizedRoutes.js
useEffect(() => {
  const langFromPath = getLanguageFromPath(location.pathname);
  changeLanguage(langFromPath);
}, [location.pathname]);
```

### 2. SEO-friendly URLs

Content-based URLs using slugVi/slugEn:

```jsx
// Vietnamese: /tin-tuc/cong-nghe/15-nam-attech-va-hanh-trinh
// English: /en/news/technology/15-years-attech-journey
```

### 3. Fallback Handling

```jsx
const { hasLanguageEquivalent, getUrlForLanguage } = useLocalizedRouting();

// Check if current page has equivalent in other language
if (hasLanguageEquivalent()) {
  const englishUrl = getUrlForLanguage('en');
  // Show language switcher
} else {
  // Hide or disable language switcher
}
```

## 🛠️ Setup Instructions

### 1. Replace Routes

```jsx
// Replace Public.js with LocalizedRoutes.js
import LocalizedRoutes from '../routes/LocalizedRoutes';

const App = () => {
  return (
    <Router>
      <LocalizedRoutes />
    </Router>
  );
};
```

### 2. Update Navigation

```jsx
// Replace regular Links with LocalizedLink
import LocalizedLink from '../components/Shared/LocalizedLink';

// Old
<Link to="/san-pham">Sản phẩm</Link>

// New
<LocalizedLink routeKey="PRODUCTS">{t('navigation.products')}</LocalizedLink>
```

### 3. Update Content Links

```jsx
// Old
<Link to={`/tin-tuc/${newsItem.slugVi}`}>Read More</Link>

// New
<LocalizedLink newsItem={newsItem} category={category}>
  {t('frontend.news.readMore')}
</LocalizedLink>
```

## 📊 Route Testing

### Test URLs in both languages:

**Vietnamese:**
- http://localhost:3000/
- http://localhost:3000/san-pham
- http://localhost:3000/tin-tuc
- http://localhost:3000/lien-he

**English:**
- http://localhost:3000/en
- http://localhost:3000/en/products
- http://localhost:3000/en/news
- http://localhost:3000/en/contact

### Language Switching Test:
1. Go to `/san-pham` (Vietnamese)
2. Click language switcher → English
3. Should redirect to `/en/products`
4. Content should be in English

## 🐛 Troubleshooting

### URL not changing on language switch
- Check if route has equivalent in ROUTES object
- Use `hasLanguageEquivalent()` to debug
- Ensure LocalizedRoutes is used instead of Public routes

### Content not updating
- Verify components use `useI18n()` hook
- Check if API data has both Vi and En fields
- Use LocalizedContent components

### 404 errors
- Check route patterns in LocalizedRoutes.js
- Ensure all routes have both Vi and En versions
- Verify slug format matches API data

## 🎯 Best Practices

1. **Always use LocalizedLink** instead of regular Link
2. **Use route keys** instead of hardcoded URLs
3. **Test both languages** for every route
4. **Provide fallbacks** for content without translations
5. **Keep URLs SEO-friendly** with meaningful slugs

## 📁 File Structure

```
src/
├── utils/
│   └── routeHelpers.js          # Route configuration & helpers
├── hooks/
│   └── useLocalizedRouting.js   # Routing hook
├── routes/
│   └── LocalizedRoutes.js       # Main routing component
└── components/
    └── Shared/
        ├── LocalizedLink/       # Smart link component
        ├── LanguageSwitcher/    # Enhanced language switcher
        └── LocalizedContent/    # Content components
```

## 🚀 Ready to Use

Hệ thống routing đa ngôn ngữ đã sẵn sàng! 
- ✅ URL khác nhau cho Vi/En
- ✅ Language switching với URL redirect  
- ✅ Smart components tự chọn đúng URL
- ✅ SEO-friendly URLs với slug
- ✅ Fallback handling

Xem `src/components/Examples/RoutingExample.jsx` để test tất cả tính năng! 🌐