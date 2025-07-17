import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import sanitizeHtml from "sanitize-html";
import "./NotificationDetailPage.css";
import { mockNotifications } from "../../../utils/mockNotifications";

const NotificationDetailPage = () => {
  const { category, slug } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [tableOfContents, setTableOfContents] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Lấy thông báo từ mockNotifications theo category và slug
  const notificationItem = useMemo(() =>
    mockNotifications.find(
      (item) => item.notificationCategorySlugVi === category && item.slugVi === slug
    ),
    [category, slug]
  );

  // Lọc thông báo cùng chuyên mục cho sidebar
  const filteredNotifications = useMemo(() => {
    if (!notificationItem) return [];
    let filtered = mockNotifications.filter(
      (item) =>
        item.notificationCategorySlugVi === notificationItem.notificationCategorySlugVi &&
        (item.titleVi.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.contentVi.toLowerCase().includes(searchTerm.toLowerCase()))
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
        (item) =>
          item.id !== notificationItem.id &&
          item.notificationCategorySlugVi === category
      )
      .slice(0, 3);
  }, [notificationItem, category]);

  useEffect(() => {
    if (!notificationItem) {
      setIsInitialized(true);
      return;
    }

    const generateTableOfContents = () => {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(notificationItem.contentVi, "text/html");
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
  }, [notificationItem]);

  if (!isInitialized) {
    return (
      <div className="notification-detail-page">
        <div className="loading">
          <div className="loading-spinner" />
          <p>Đang tải thông báo...</p>
        </div>
      </div>
    );
  }

  if (!notificationItem) {
    return (
      <div className="notification-detail-page">
        <div className="not-found">
          <h2>Không tìm thấy thông báo!</h2>
          <p>Thông báo bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link to="/thong-bao" className="back-to-notifications">
            Quay lại trang thông báo
          </Link>
        </div>
      </div>
    );
  }

  // Extract author info from content (nếu có)
  const author = "Ban Giám đốc";

  return (
    <div className="news-detail-page">
      <div className="news-detail-layout">
        {/* Sidebar */}
        <aside className="news-sidebar">
          <h3>Thông báo cùng chuyên mục</h3>
          <input
            type="text"
            placeholder="Tìm kiếm thông báo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="news-sidebar-search"
            aria-label="Tìm kiếm thông báo"
          />
          <ul>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/thong-bao/${item.notificationCategorySlugVi}/${item.slugVi}`}
                    className={item.id === notificationItem.id ? "active" : ""}
                  >
                    {item.titleVi}
                  </Link>
                </li>
              ))
            ) : (
              <li className="no-results">
                Không tìm thấy thông báo phù hợp.
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="clear-search"
                  >
                    Xóa tìm kiếm
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
            <Link to="/">Trang chủ</Link> &gt;{' '}
            <Link to="/thong-bao">Thông báo</Link> &gt;{' '}
            <Link to={`/thong-bao/${notificationItem.notificationCategorySlugVi}`}>{notificationItem.notificationCategoryNameVi}</Link> &gt;{' '}
            <span>{notificationItem.titleVi}</span>
          </nav>

          {/* Article Header */}
          <article className="news-article">
            <header className="article-header">
              <h1 className="article-title">{notificationItem.titleVi}</h1>
              <div className="article-meta">
                <span className="article-date">
                  <i className="bi bi-calendar"></i>
                  {notificationItem.timePosted ? new Date(notificationItem.timePosted).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                </span>
                <span className="article-category">
                  <i className="bi bi-tag"></i>
                  <Link to={`/thong-bao/${notificationItem.notificationCategorySlugVi}`}>{notificationItem.notificationCategoryNameVi}</Link>
                </span>
              </div>
            </header>

            {/* Article Image */}
            {notificationItem.image && (
              <div className="article-image">
                <img
                  src={notificationItem.image}
                  alt={notificationItem.titleVi}
                  title={notificationItem.titleVi}
                />
              </div>
            )}

            {/* Article Description */}
            {notificationItem.descriptionVi && (
              <div className="article-description">
                <p>{notificationItem.descriptionVi}</p>
              </div>
            )}

            {/* Article Content */}
            <div className="article-content">
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(notificationItem.contentVi, {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
                    allowedAttributes: {
                      ...sanitizeHtml.defaults.allowedAttributes,
                      img: ["src", "alt", "title", "class"],
                    },
                  }),
                }}
              />
            </div>

            {/* Article Footer */}
            <footer className="article-footer">
              <div className="article-tags">
                <span className="tag-label">Chuyên mục:</span>
                <Link to={`/thong-bao/${notificationItem.notificationCategorySlugVi}`} className="tag">
                  {notificationItem.notificationCategoryNameVi}
                </Link>
              </div>
              <div className="article-navigation">
                <Link to="/thong-bao" className="back-link">
                  <i className="bi bi-arrow-left"></i>
                  Quay lại danh sách thông báo
                </Link>
              </div>
            </footer>
          </article>

          {/* Related Notifications */}
          {relatedNotifications.length > 0 && (
            <section className="related-news">
              <h2>Thông báo liên quan</h2>
              <div className="related-news-list">
                {relatedNotifications.map((item) => (
                  <div className="related-news-item" key={item.id}>
                    <Link
                      to={`/thong-bao/${item.notificationCategorySlugVi}/${item.slugVi}`}
                      className="related-news-link"
                    >
                      <div className="related-news-thumb">
                        <img src={item.image} alt={item.titleVi} />
                      </div>
                      <div className="related-news-info">
                        <h4>{item.titleVi}</h4>
                        <span className="related-news-date">{item.timePosted ? new Date(item.timePosted).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
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

export default React.memo(NotificationDetailPage);
