import React from 'react';
import { useI18n } from '../../hooks/useI18n';
import LanguageSwitcher from '../Shared/LanguageSwitcher';

const I18nExample = () => {
  const { 
    t, 
    title, 
    description, 
    formatLocalizedDate, 
    currentLanguage,
    isVietnamese,
    loading,
    success,
    save,
    cancel
  } = useI18n();

  // Example data with multi-language content
  const sampleNews = {
    titleVi: "Tin tức công nghệ mới nhất",
    titleEn: "Latest Technology News",
    descriptionVi: "Khám phá những xu hướng công nghệ mới nhất và cách chúng thay đổi thế giới.",
    descriptionEn: "Discover the latest technology trends and how they're changing the world.",
    timePosted: "2024-01-15T10:30:00Z"
  };

  const sampleCategory = {
    nameVi: "Công nghệ",
    nameEn: "Technology"
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>{t('common.language')} Demo</h1>
        <LanguageSwitcher />
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>{t('frontend.news.title')}</h2>
        <p><strong>{t('common.language')}:</strong> {currentLanguage} ({isVietnamese ? 'Tiếng Việt' : 'English'})</p>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Sample News Item</h3>
        <h4>{title(sampleNews)}</h4>
        <p>{description(sampleNews)}</p>
        <p><small>{t('frontend.news.publishedOn')}: {formatLocalizedDate(sampleNews.timePosted)}</small></p>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Common UI Elements</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="btn btn-primary">{save()}</button>
          <button className="btn btn-secondary">{cancel()}</button>
          <button className="btn btn-success">{success()}</button>
          <button className="btn btn-info" disabled>{loading()}</button>
        </div>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Navigation Menu</h3>
        <nav style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <a href="#" style={{ textDecoration: 'none' }}>{t('navigation.home')}</a>
          <a href="#" style={{ textDecoration: 'none' }}>{t('navigation.about')}</a>
          <a href="#" style={{ textDecoration: 'none' }}>{t('navigation.services')}</a>
          <a href="#" style={{ textDecoration: 'none' }}>{t('navigation.products')}</a>
          <a href="#" style={{ textDecoration: 'none' }}>{t('navigation.news')}</a>
          <a href="#" style={{ textDecoration: 'none' }}>{t('navigation.contact')}</a>
        </nav>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Admin Interface</h3>
        <h4>{t('admin.news.title')}</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="btn btn-success">{t('admin.news.add')}</button>
          <button className="btn btn-warning">{t('admin.news.edit')}</button>
          <button className="btn btn-danger">{t('admin.news.delete')}</button>
        </div>
        <p style={{ marginTop: '10px' }}>
          <strong>{t('admin.news.fields.category')}:</strong> {title(sampleCategory)}
        </p>
      </div>

      <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
        <h3>Debug Info</h3>
        <pre style={{ fontSize: '12px', margin: 0 }}>
{`Current Language: ${currentLanguage}
Is Vietnamese: ${isVietnamese}
Sample Title: ${title(sampleNews)}
Sample Description: ${description(sampleNews)}
Formatted Date: ${formatLocalizedDate(sampleNews.timePosted)}`}
        </pre>
      </div>
    </div>
  );
};

export default I18nExample;