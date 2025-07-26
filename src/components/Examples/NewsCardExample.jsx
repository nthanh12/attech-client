import React from 'react';
import { useI18n } from '../../hooks/useI18n';
import { LocalizedTitle, LocalizedDescription, LocalizedContent } from '../Shared/LocalizedContent';
import LanguageSwitcher from '../Shared/LanguageSwitcher';

const NewsCardExample = () => {
  const { t, formatLocalizedDate, currentLanguage } = useI18n();

  // Example news item from AttechServer API format (from mockNews.js)
  const sampleNewsItem = {
    id: 1,
    titleVi: "15 năm ATTECH và hành trình làm chủ kỹ thuật hàng không",
    titleEn: "15 years of ATTECH and the journey to master aviation technology",
    slugVi: "15-nam-attech-va-hanh-trinh-lam-chu-ky-thuat-hang-khong",
    slugEn: "15-years-attech-journey-master-aviation-technology",
    descriptionVi: "15 năm xây dựng và phát triển theo mô hình Công ty TNHH, Công ty Kỹ thuật Quản lý bay (ATTECH) từ một đơn vị dịch vụ kỹ thuật hàng không đã vươn mình trở thành thương hiệu khoa học công nghệ (KHCN) hàng đầu...",
    descriptionEn: "15 years of building and developing under the Limited Liability Company model, Air Traffic Management Technical Company (ATTECH) has grown from an aviation technical service unit to become a leading science and technology brand...",
    contentVi: "<p>Nội dung đầy đủ bằng tiếng Việt...</p>",
    contentEn: "<p>Full content in English...</p>",
    timePosted: "2024-01-15T10:30:00Z",
    image: "https://example.com/news-image.jpg",
    status: 1,
    featured: true,
    postCategoryId: 1
  };

  const sampleCategory = {
    id: 1,
    nameVi: "Tin tức công nghệ",
    nameEn: "Technology News"
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header with language switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>News Card Example - AttechServer API</h1>
        <LanguageSwitcher />
      </div>

      {/* Language info */}
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <small>Current language: <strong>{currentLanguage}</strong></small>
      </div>

      {/* News Card */}
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '30px' }}>
        {/* Title using LocalizedTitle component */}
        <LocalizedTitle 
          item={sampleNewsItem} 
          level={2}
          style={{ color: '#333', marginBottom: '10px' }}
        />

        {/* Category and date */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', fontSize: '14px', color: '#666' }}>
          <span>
            <strong>{t('frontend.news.category')}:</strong> {currentLanguage === 'vi' ? sampleCategory.nameVi : sampleCategory.nameEn}
          </span>
          <span>
            <strong>{t('frontend.news.publishedOn')}:</strong> {formatLocalizedDate(sampleNewsItem.timePosted)}
          </span>
        </div>

        {/* Description using LocalizedDescription component */}
        <LocalizedDescription 
          item={sampleNewsItem}
          truncate={200}
          style={{ marginBottom: '15px', lineHeight: '1.6' }}
        />

        {/* Content preview using LocalizedContent component */}
        <LocalizedContent 
          item={sampleNewsItem}
          maxLength={100}
          style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '4px',
            marginBottom: '15px'
          }}
        />

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-primary">
            {t('frontend.news.readMore')}
          </button>
          <button className="btn btn-outline-secondary">
            {t('common.view')}
          </button>
        </div>
      </div>

      {/* Debug info */}
      <div style={{ padding: '15px', backgroundColor: '#e9ecef', borderRadius: '4px', fontSize: '12px' }}>
        <h4>Debug Info:</h4>
        <pre style={{ margin: 0, fontSize: '11px' }}>
{`Current Language: ${currentLanguage}
Title (Vi): ${sampleNewsItem.titleVi}
Title (En): ${sampleNewsItem.titleEn}
Description (Vi): ${sampleNewsItem.descriptionVi.substring(0, 100)}...
Description (En): ${sampleNewsItem.descriptionEn.substring(0, 100)}...`}
        </pre>
      </div>

      {/* Multiple news items example */}
      <div style={{ marginTop: '30px' }}>
        <h3>Multiple News Items</h3>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ 
            border: '1px solid #eee', 
            borderRadius: '4px', 
            padding: '15px', 
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <LocalizedTitle 
                item={{
                  titleVi: `Tin tức ${i} - Tiêu đề tiếng Việt`,
                  titleEn: `News ${i} - English title`
                }}
                level={4}
                style={{ margin: 0, marginBottom: '5px' }}
              />
              <LocalizedDescription 
                item={{
                  descriptionVi: `Mô tả ngắn cho tin tức ${i} bằng tiếng Việt`,
                  descriptionEn: `Short description for news ${i} in English`
                }}
                style={{ margin: 0, fontSize: '14px', color: '#666' }}
              />
            </div>
            <button className="btn btn-sm btn-outline-primary">
              {t('frontend.news.readMore')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCardExample;