import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockNews } from '../../../utils/mockNews';
import { useLanguage } from '../../../contexts/LanguageContext';
import './NewsDetailPage.css';

const NewsDetailPage = () => {
  const { lang } = useLanguage();
  const { categorySlug, newsSlug } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        const item = mockNews.find(n => n.postCategorySlugVi === categorySlug && n.slugVi === newsSlug);
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
  }, [categorySlug, newsSlug, lang]);

  // Sidebar: Lọc tin cùng chuyên mục, tìm kiếm, tối đa 10 tin, luôn có tin đang xem
  const filteredNews = useMemo(() => {
    if (!newsItem) return [];
    let filtered = mockNews.filter(
      n => n.postCategorySlugVi === newsItem.postCategorySlugVi &&
        ((lang === 'vi' ? n.titleVi : n.titleEn).toLowerCase().includes(searchTerm.toLowerCase()) ||
         (lang === 'vi' ? n.contentVi : n.contentEn).toLowerCase().includes(searchTerm.toLowerCase()))
    );
    filtered = filtered.sort((a, b) => new Date(b.timePosted) - new Date(a.timePosted));
    let top10 = filtered.slice(0, 10);
    if (newsItem && !top10.some(n => n.id === newsItem.id)) {
      top10 = [newsItem, ...top10];
    }
    // Loại trùng
    const unique = [];
    const ids = new Set();
    for (const n of top10) {
      if (!ids.has(n.id)) {
        unique.push(n);
        ids.add(n.id);
      }
    }
    return unique;
  }, [newsItem, searchTerm, lang]);

  // Related news: tối đa 3 tin cùng chuyên mục, loại trừ tin đang xem
  const relatedNews = useMemo(() => {
    if (!newsItem) return [];
    return mockNews
      .filter(n => n.id !== newsItem.id && n.postCategorySlugVi === newsItem.postCategorySlugVi)
      .sort((a, b) => new Date(b.timePosted) - new Date(a.timePosted))
      .slice(0, 3);
  }, [newsItem]);

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
      <div className="news-detail-layout">
        {/* Sidebar */}
        <aside className="news-sidebar">
          <h3>{lang === 'vi' ? 'Tin cùng chuyên mục' : 'Related News'}</h3>
          <input
            type="text"
            placeholder={lang === 'vi' ? 'Tìm kiếm tin...' : 'Search news...'}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="news-sidebar-search"
            aria-label={lang === 'vi' ? 'Tìm kiếm tin' : 'Search news'}
          />
          <ul>
            {filteredNews.length > 0 ? (
              filteredNews.map(n => (
                <li key={n.id}>
                  <Link
                    to={lang === 'vi' ? `/tin-tuc/${n.postCategorySlugVi}/${n.slugVi}` : `/en/news/${n.postCategorySlugEn}/${n.slugEn}`}
                    className={n.id === newsItem.id ? 'active' : ''}
                  >
                    {lang === 'vi' ? n.titleVi : n.titleEn}
                  </Link>
                </li>
              ))
            ) : (
              <li className="no-results">
                {lang === 'vi' ? 'Không tìm thấy tin phù hợp.' : 'No news found.'}
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="clear-search">
                    {lang === 'vi' ? 'Xóa tìm kiếm' : 'Clear search'}
                  </button>
                )}
              </li>
            )}
          </ul>
        </aside>

        {/* Main content */}
        <div className="news-detail-container">
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

          {/* Related News */}
          {relatedNews.length > 0 && (
            <section className="related-news">
              <h2>{lang === 'vi' ? 'Tin tức liên quan' : 'Related News'}</h2>
              <div className="related-news-list">
                {relatedNews.map(n => (
                  <div className="related-news-item" key={n.id}>
                    <Link
                      to={lang === 'vi' ? `/tin-tuc/${n.postCategorySlugVi}/${n.slugVi}` : `/en/news/${n.postCategorySlugEn}/${n.slugEn}`}
                      className="related-news-link"
                    >
                      <div className="related-news-thumb">
                        <img src={n.image} alt={lang === 'vi' ? n.titleVi : n.titleEn} />
                      </div>
                      <div className="related-news-info">
                        <h4>{lang === 'vi' ? n.titleVi : n.titleEn}</h4>
                        <span className="related-news-date">{formatDate(n.timePosted)}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
