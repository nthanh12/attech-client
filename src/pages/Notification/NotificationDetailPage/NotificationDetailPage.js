import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import sanitizeHtml from "sanitize-html";
import "./NotificationDetailPage.css";
import { mockNotifications } from "../../../utils/mockNotifications";
import SEO from "../../../components/SEO/SEO";
import { useI18n } from "../../../hooks/useI18n";

const NotificationDetailPage = () => {
  const { category, slug } = useParams();
  const { t } = useTranslation();
  const { currentLanguage } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");
  const [tableOfContents, setTableOfContents] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Lấy thông báo từ mockNotifications theo category và slug
  const notificationItem = useMemo(() => {
    if (currentLanguage === 'vi') {
      return mockNotifications.find(
        (item) => item.notificationCategorySlugVi === category && item.slugVi === slug
      );
    } else {
      return mockNotifications.find(
        (item) => item.notificationCategorySlugEn === category && item.slugEn === slug
      );
    }
  }, [category, slug, currentLanguage]);

  // Lọc thông báo cùng chuyên mục cho sidebar
  const filteredNotifications = useMemo(() => {
    if (!notificationItem) return [];
    const categorySlug = currentLanguage === 'vi' 
      ? notificationItem.notificationCategorySlugVi 
      : notificationItem.notificationCategorySlugEn;
    const titleField = currentLanguage === 'vi' ? 'titleVi' : 'titleEn';
    const contentField = currentLanguage === 'vi' ? 'contentVi' : 'contentEn';
    
    let filtered = mockNotifications.filter(
      (item) => {
        const itemCategorySlug = currentLanguage === 'vi' 
          ? item.notificationCategorySlugVi 
          : item.notificationCategorySlugEn;
        return itemCategorySlug === categorySlug &&
          (item[titleField].toLowerCase().includes(searchTerm.toLowerCase()) ||
           item[contentField].toLowerCase().includes(searchTerm.toLowerCase()));
      }
    );
    filtered = filtered.sort((a, b) => new Date(b.timePosted) - new Date(a.timePosted));
    let top10 = filtered.slice(0, 10);
    if (notificationItem && !top10.some((item) => item.id === notificationItem.id)) {
      top10 = [notificationItem, ...top10];
    }
    // Loại trùng
    const unique = [];
    const ids = new Set();
    for (const item of top10) {
      if (!ids.has(item.id)) {
        unique.push(item);
        ids.add(item.id);
      }
    }
    return unique;
  }, [searchTerm, notificationItem]);

  // Lọc thông báo liên quan
  const relatedNotifications = useMemo(() => {
    if (!notificationItem) return [];
    return mockNotifications
      .filter(
        (item) => {
          const itemCategorySlug = currentLanguage === 'vi' 
            ? item.notificationCategorySlugVi 
            : item.notificationCategorySlugEn;
          return item.id !== notificationItem.id && itemCategorySlug === category;
        }
      )
      .slice(0, 3);
  }, [notificationItem, category, currentLanguage]);

  useEffect(() => {
    if (!notificationItem) {
      setIsInitialized(true);
      return;
    }

    const generateTableOfContents = () => {
      try {
        const parser = new DOMParser();
        const content = currentLanguage === 'vi' ? notificationItem.contentVi : notificationItem.contentEn;
        const doc = parser.parseFromString(content, "text/html");
        const headings = Array.from(doc.querySelectorAll("h2, h3, h4"));
        return headings.map((heading, index) => ({
          id: `section-${index}`,
          text: heading.textContent,
          level: parseInt(heading.tagName.charAt(1)),
        }));
      } catch (error) {
        console.error("Error parsing content:", error);
        return [];
      }
    };

    setTableOfContents(generateTableOfContents());
    setIsInitialized(true);
  }, [notificationItem, currentLanguage]);

  // Lazy loading for images
  useEffect(() => {
    const images = document.querySelectorAll('.notification-detail-page .article-content img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));

    return () => {
      images.forEach(img => imageObserver.unobserve(img));
    };
  }, [notificationItem]);

  // Helper functions to get localized content
  const getTitle = () => currentLanguage === 'vi' ? notificationItem?.titleVi : notificationItem?.titleEn;
  const getDescription = () => currentLanguage === 'vi' ? notificationItem?.descriptionVi : notificationItem?.descriptionEn;
  const getContent = () => currentLanguage === 'vi' ? notificationItem?.contentVi : notificationItem?.contentEn;
  const getCategoryName = () => currentLanguage === 'vi' ? notificationItem?.notificationCategoryNameVi : notificationItem?.notificationCategoryNameEn;
  const getCategorySlug = () => currentLanguage === 'vi' ? notificationItem?.notificationCategorySlugVi : notificationItem?.notificationCategorySlugEn;
  const getSlug = () => currentLanguage === 'vi' ? notificationItem?.slugVi : notificationItem?.slugEn;
  const getItemTitle = (item) => currentLanguage === 'vi' ? item.titleVi : item.titleEn;
  const getItemSlug = (item) => currentLanguage === 'vi' ? item.slugVi : item.slugEn;
  const getItemCategorySlug = (item) => currentLanguage === 'vi' ? item.notificationCategorySlugVi : item.notificationCategorySlugEn;

  if (!isInitialized) {
    return (
      <div className="notification-detail-page">
        <div className="loading">
          <div className="loading-spinner" />
          <p>{t('frontend.notifications.loading')}</p>
        </div>
      </div>
    );
  }

  if (!notificationItem) {
    return (
      <div className="notification-detail-page">
        <div className="not-found">
          <h2>{t('frontend.notifications.notificationNotFound')}</h2>
          <p>{t('frontend.notifications.notificationNotExist')}</p>
          <Link to={currentLanguage === 'vi' ? '/thong-bao' : '/en/notifications'} className="back-to-notifications">
            {t('frontend.notifications.backToNotifications')}
          </Link>
        </div>
      </div>
    );
  }

  // Extract author info from content (nếu có)
  const author = "Ban Giám đốc";

  return (
    <>
      <SEO 
        title={`${getTitle()} - ATTECH`}
        description={getDescription() || getTitle()}
        url={currentLanguage === 'vi' ? `/thong-bao/${category}/${slug}` : `/en/notifications/${category}/${slug}`}
      />
      <div className="notification-detail-page">
          {/* Sidebar */}
          <aside className="notification-sidebar">
          <h3>{t('frontend.notifications.sameCategory')}</h3>
          <input
            type="text"
            placeholder={t('frontend.notifications.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="notification-sidebar-search"
            aria-label={t('frontend.notifications.searchNotifications')}
          />
          <ul>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((item) => (
                <li key={item.id}>
                  <Link
                    to={currentLanguage === 'vi' 
                      ? `/thong-bao/${getItemCategorySlug(item)}/${getItemSlug(item)}`
                      : `/en/notifications/${getItemCategorySlug(item)}/${getItemSlug(item)}`
                    }
                    className={item.id === notificationItem.id ? "active" : ""}
                  >
                    {getItemTitle(item)}
                  </Link>
                </li>
              ))
            ) : (
              <li className="no-results">
                {t('frontend.notifications.noNotificationsFound')}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="clear-search"
                  >
                    {t('frontend.notifications.clearSearch')}
                  </button>
                )}
              </li>
            )}
          </ul>
        </aside>

        {/* Main content */}
        <div className="notification-detail-container">
          {/* Breadcrumb */}
          <nav className="breadcrumb-nav">
            <Link to={currentLanguage === 'vi' ? '/' : '/en'}>{t('navigation.home')}</Link> &gt;{' '}
            <Link to={currentLanguage === 'vi' ? '/thong-bao' : '/en/notifications'}>{t('frontend.notifications.title')}</Link> &gt;{' '}
            <Link to={currentLanguage === 'vi' 
              ? `/thong-bao/${getCategorySlug()}`
              : `/en/notifications/${getCategorySlug()}`
            }>{getCategoryName()}</Link> &gt;{' '}
            <span>{getTitle()}</span>
          </nav>

          {/* Article Header */}
          <article className="notification-article">
            <header className="article-header">
              <h1 className="article-title">{getTitle()}</h1>
              <div className="article-meta">
                <span className="article-date">
                  <i className="bi bi-calendar"></i>
                  {notificationItem.timePosted ? new Date(notificationItem.timePosted).toLocaleDateString(currentLanguage === 'vi' ? 'vi-VN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                </span>
                <span className="article-category">
                  <i className="bi bi-tag"></i>
                  <Link to={currentLanguage === 'vi' 
                    ? `/thong-bao/${getCategorySlug()}`
                    : `/en/notifications/${getCategorySlug()}`
                  }>{getCategoryName()}</Link>
                </span>
              </div>
            </header>

            {/* Article Image */}
            {notificationItem.image && (
              <div className="article-image">
                <img
                  src={notificationItem.image}
                  alt={getTitle()}
                  title={getTitle()}
                />
              </div>
            )}

            {/* Article Description */}
            {getDescription() && (
              <div className="article-description">
                <p>{getDescription()}</p>
              </div>
            )}

            {/* Article Content */}
            <div className="article-content">
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(getContent(), {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
                    allowedAttributes: {
                      ...sanitizeHtml.defaults.allowedAttributes,
                      img: ["src", "alt", "title", "class", "loading"],
                      a: ["href", "target", "rel"],
                    },
                  }),
                }}
              />
            </div>

            {/* Article Footer */}
            <footer className="article-footer">
              <div className="article-tags">
                <span className="tag-label">{t('frontend.notifications.category')}:</span>
                <Link to={currentLanguage === 'vi' 
                  ? `/thong-bao/${getCategorySlug()}`
                  : `/en/notifications/${getCategorySlug()}`
                } className="tag">
                  {getCategoryName()}
                </Link>
              </div>
              <div className="article-navigation">
                <Link to={currentLanguage === 'vi' ? '/thong-bao' : '/en/notifications'} className="back-link">
                  <i className="bi bi-arrow-left"></i>
                  {t('frontend.notifications.backToNotificationsList')}
                </Link>
              </div>
            </footer>
          </article>

          {/* Related Notifications */}
          {relatedNotifications.length > 0 && (
            <section className="related-notifications">
              <h2>{t('frontend.notifications.relatedNotifications')}</h2>
              <div className="related-notifications-list">
                {relatedNotifications.map((item) => (
                  <div className="related-notifications-item" key={item.id}>
                    <Link
                      to={currentLanguage === 'vi' 
                        ? `/thong-bao/${getItemCategorySlug(item)}/${getItemSlug(item)}`
                        : `/en/notifications/${getItemCategorySlug(item)}/${getItemSlug(item)}`
                      }
                      className="related-notifications-link"
                    >
                      <div className="related-notifications-thumb">
                        <img src={item.image} alt={getItemTitle(item)} />
                      </div>
                      <div className="related-notifications-info">
                        <h4>{getItemTitle(item)}</h4>
                        <span className="related-notifications-date">{item.timePosted ? new Date(item.timePosted).toLocaleDateString(currentLanguage === 'vi' ? 'vi-VN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(NotificationDetailPage);
