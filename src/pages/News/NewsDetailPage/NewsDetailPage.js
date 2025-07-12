import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockNews } from '../../../utils/mockNews';
import { useLanguage } from '../../../contexts/LanguageContext';
import './NewsDetailPage.css';

const NewsDetailPage = () => {
  const { lang } = useLanguage();
  const { id, slug } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        const item = mockNews.find(n => n.id === parseInt(id));
        if (item) {
          setNewsItem(item);
        } else {
          setError(lang === 'vi' ? 'Không tìm thấy bài viết' : 'Article not found');
        }
      } catch (err) {
        setError(lang === 'vi' ? 'Có lỗi xảy ra khi tải bài viết' : 'Error loading article');
      } finally {
        setLoading(false);
      }
    };
    fetchNewsDetail();
  }, [id, slug, lang]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="news-detail-page">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>{lang === 'vi' ? 'Đang tải bài viết...' : 'Loading article...'}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="news-detail-page">
        <div className="container">
          <div className="error">
            <h2>{lang === 'vi' ? 'Không tìm thấy bài viết' : 'Article not found'}</h2>
            <p>{error || (lang === 'vi' ? 'Bài viết không tồn tại hoặc đã bị xóa.' : 'Article does not exist or has been deleted.')}</p>
            <Link to={lang === 'vi' ? '/tin-tuc' : '/en/news'} className="back-to-news">
              {lang === 'vi' ? 'Quay lại trang tin tức' : 'Back to news'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb-nav">
          <Link to={lang === 'vi' ? '/' : '/en'}>{lang === 'vi' ? 'Trang chủ' : 'Home'}</Link> &gt;{' '}
          <Link to={lang === 'vi' ? '/tin-tuc' : '/en/news'}>{lang === 'vi' ? 'Tin tức' : 'News'}</Link> &gt;{' '}
          <Link to={lang === 'vi' ? `/tin-tuc/${newsItem.postCategorySlugVi}` : `/en/news/${newsItem.postCategorySlugEn}`}>
            {lang === 'vi' ? newsItem.postCategoryNameVi : newsItem.postCategoryNameEn}
          </Link> &gt;{' '}
          <span>{lang === 'vi' ? newsItem.titleVi : newsItem.titleEn}</span>
        </nav>

        {/* Article Header */}
        <article className="news-article">
          <header className="article-header">
            <h1 className="article-title">{lang === 'vi' ? newsItem.titleVi : newsItem.titleEn}</h1>
            <div className="article-meta">
              <span className="article-date">
                <i className="bi bi-calendar"></i>
                {formatDate(newsItem.timePosted)}
              </span>
              <span className="article-category">
                <i className="bi bi-tag"></i>
                <Link to={lang === 'vi' ? `/tin-tuc/${newsItem.postCategorySlugVi}` : `/en/news/${newsItem.postCategorySlugEn}`}>
                  {lang === 'vi' ? newsItem.postCategoryNameVi : newsItem.postCategoryNameEn}
                </Link>
              </span>
            </div>
          </header>

          {/* Article Image */}
          {newsItem.image && (
            <div className="article-image">
              <img 
                src={newsItem.image} 
                alt={lang === 'vi' ? newsItem.titleVi : newsItem.titleEn}
                title={lang === 'vi' ? newsItem.titleVi : newsItem.titleEn}
              />
            </div>
          )}

          {/* Article Description */}
          {newsItem.descriptionVi && (
            <div className="article-description">
              <p>{lang === 'vi' ? newsItem.descriptionVi : newsItem.descriptionEn}</p>
            </div>
          )}

          {/* Article Content */}
          <div className="article-content">
            <div dangerouslySetInnerHTML={{ __html: lang === 'vi' ? newsItem.contentVi : newsItem.contentEn }} />
          </div>

          {/* Article Footer */}
          <footer className="article-footer">
            <div className="article-tags">
              <span className="tag-label">Tags:</span>
              <Link to={lang === 'vi' ? `/tin-tuc/${newsItem.postCategorySlugVi}` : `/en/news/${newsItem.postCategorySlugEn}`} className="tag">
                {lang === 'vi' ? newsItem.postCategoryNameVi : newsItem.postCategoryNameEn}
              </Link>
            </div>
            <div className="article-navigation">
              <Link to={lang === 'vi' ? '/tin-tuc' : '/en/news'} className="back-link">
                <i className="bi bi-arrow-left"></i>
                {lang === 'vi' ? 'Quay lại danh sách tin tức' : 'Back to news list'}
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default NewsDetailPage;
