import React from 'react';
import { useI18n } from '../../hooks/useI18n';
import { useLocalizedRouting } from '../../hooks/useLocalizedRouting';
import LocalizedLink from '../Shared/LocalizedLink';
import LanguageSwitcher from '../Shared/LanguageSwitcher';

const RoutingExample = () => {
  const { t, currentLanguage } = useI18n();
  const { 
    navigateToRoute, 
    navigateToNews, 
    navigateToProduct,
    getCurrentRoute,
    getUrlForLanguage,
    hasLanguageEquivalent 
  } = useLocalizedRouting();

  const currentRoute = getCurrentRoute();

  // Sample data for examples
  const sampleNewsItem = {
    id: 1,
    titleVi: "15 năm ATTECH và hành trình làm chủ kỹ thuật hàng không",
    titleEn: "15 years of ATTECH and the journey to master aviation technology",
    slugVi: "15-nam-attech-va-hanh-trinh-lam-chu-ky-thuat-hang-khong",
    slugEn: "15-years-attech-journey-master-aviation-technology"
  };

  const sampleCategory = {
    id: 1,
    nameVi: "Tin tức công nghệ",
    nameEn: "Technology News",
    slugVi: "tin-tuc-cong-nghe",
    slugEn: "technology-news"
  };

  const sampleProduct = {
    id: 1,
    nameVi: "Thiết bị dẫn đường",
    nameEn: "Navigation Equipment",
    slugVi: "thiet-bi-dan-duong",
    slugEn: "navigation-equipment"
  };

  const sampleProductCategory = {
    id: 1,
    nameVi: "Thiết bị hàng không",
    nameEn: "Aviation Equipment",
    slugVi: "thiet-bi-hang-khong",
    slugEn: "aviation-equipment"
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Multilingual Routing Example</h1>
        <LanguageSwitcher />
      </div>

      {/* Current Route Info */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Current Route Information</h3>
        <div style={{ fontSize: '14px', fontFamily: 'monospace' }}>
          <p><strong>Language:</strong> {currentRoute.language}</p>
          <p><strong>Pathname:</strong> {currentRoute.pathname}</p>
          <p><strong>Route Key:</strong> {currentRoute.routeKey || 'Unknown'}</p>
          <p><strong>Is English:</strong> {currentRoute.isEnglish ? 'Yes' : 'No'}</p>
          <p><strong>Has Language Equivalent:</strong> {hasLanguageEquivalent() ? 'Yes' : 'No'}</p>
          <p><strong>URL in Other Language:</strong> {getUrlForLanguage(currentLanguage === 'vi' ? 'en' : 'vi')}</p>
        </div>
      </div>

      {/* Navigation with LocalizedLink */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Navigation with LocalizedLink</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <LocalizedLink routeKey="HOME" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            {t('navigation.home')}
          </LocalizedLink>
          <LocalizedLink routeKey="PRODUCTS" style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            {t('navigation.products')}
          </LocalizedLink>
          <LocalizedLink routeKey="SERVICES" style={{ padding: '8px 15px', backgroundColor: '#17a2b8', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            {t('navigation.services')}
          </LocalizedLink>
          <LocalizedLink routeKey="NEWS" style={{ padding: '8px 15px', backgroundColor: '#ffc107', color: 'black', textDecoration: 'none', borderRadius: '4px' }}>
            {t('navigation.news')}
          </LocalizedLink>
          <LocalizedLink routeKey="CONTACT" style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            {t('navigation.contact')}
          </LocalizedLink>
        </div>
      </div>

      {/* Programmatic Navigation */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Programmatic Navigation</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => navigateToRoute('HOME')}
            className="btn btn-outline-primary"
          >
            Go Home (Programmatic)
          </button>
          <button 
            onClick={() => navigateToRoute('PRODUCTS')}
            className="btn btn-outline-success"
          >
            Go Products
          </button>
          <button 
            onClick={() => navigateToRoute('NEWS_LIST')}
            className="btn btn-outline-warning"
          >
            Go News List
          </button>
        </div>
      </div>

      {/* Content-Based Navigation */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Content-Based Navigation</h3>
        
        {/* News Example */}
        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h4>Sample News Item</h4>
          <h5>{currentLanguage === 'vi' ? sampleNewsItem.titleVi : sampleNewsItem.titleEn}</h5>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <LocalizedLink 
              newsItem={sampleNewsItem} 
              category={sampleCategory}
              style={{ padding: '6px 12px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '14px' }}
            >
              View with LocalizedLink
            </LocalizedLink>
            <button 
              onClick={() => navigateToNews(sampleNewsItem, sampleCategory)}
              className="btn btn-sm btn-outline-primary"
            >
              Navigate Programmatically
            </button>
          </div>
        </div>

        {/* Product Example */}
        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h4>Sample Product</h4>
          <h5>{currentLanguage === 'vi' ? sampleProduct.nameVi : sampleProduct.nameEn}</h5>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <LocalizedLink 
              product={sampleProduct} 
              category={sampleProductCategory}
              style={{ padding: '6px 12px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '14px' }}
            >
              View Product
            </LocalizedLink>
            <button 
              onClick={() => navigateToProduct(sampleProduct, sampleProductCategory)}
              className="btn btn-sm btn-outline-success"
            >
              Navigate to Product
            </button>
          </div>
        </div>
      </div>

      {/* URL Examples */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Generated URLs</h3>
        <div style={{ fontSize: '14px', fontFamily: 'monospace', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
          <p><strong>Current Language URLs:</strong></p>
          <ul>
            <li>Home: <code>{currentLanguage === 'vi' ? '/' : '/en'}</code></li>
            <li>Products: <code>{currentLanguage === 'vi' ? '/san-pham' : '/en/products'}</code></li>
            <li>News: <code>{currentLanguage === 'vi' ? '/tin-tuc' : '/en/news'}</code></li>
            <li>Contact: <code>{currentLanguage === 'vi' ? '/lien-he' : '/en/contact'}</code></li>
          </ul>
          
          <p><strong>Sample Content URLs:</strong></p>
          <ul>
            <li>
              News Detail: <code>
                {currentLanguage === 'vi' 
                  ? `/tin-tuc/${sampleCategory.slugVi}/${sampleNewsItem.slugVi}`
                  : `/en/news/${sampleCategory.slugEn}/${sampleNewsItem.slugEn}`
                }
              </code>
            </li>
            <li>
              Product Detail: <code>
                {currentLanguage === 'vi' 
                  ? `/san-pham/${sampleProductCategory.slugVi}/${sampleProduct.slugVi}`
                  : `/en/products/${sampleProductCategory.slugEn}/${sampleProduct.slugEn}`
                }
              </code>
            </li>
          </ul>
        </div>
      </div>

      {/* Language Switching Demo */}
      <div style={{ padding: '15px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
        <h3>Language Switching</h3>
        <p>The LanguageSwitcher component above automatically:</p>
        <ul>
          <li>Changes the UI language</li>
          <li>Redirects to the equivalent page in the new language</li>
          <li>Maintains the current page context</li>
        </ul>
        <p><strong>Try switching languages to see the URL change!</strong></p>
      </div>
    </div>
  );
};

export default RoutingExample;