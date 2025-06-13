import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import sanitizeHtml from "sanitize-html";
import { posts } from "../../../data/postHome";
import "./NewsDetailPage.css";

const NewsDetailPage = () => {
  const { id, slug } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [tableOfContents, setTableOfContents] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Tìm bài viết theo id và slug
  const newsItem = useMemo(() => posts.find((item) => item.id === parseInt(id) && item.slug === slug), [id, slug]);

  // Lọc bài viết cho sidebar theo tìm kiếm
  const filteredNews = useMemo(() => {
    return posts.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Lọc bài viết liên quan
  const relatedArticles = useMemo(() => {
    if (!newsItem) return [];
    return posts
      .filter(
        (item) =>
          item.id !== parseInt(id) &&
          (item.date.includes("2025") ||
            item.content.toLowerCase().includes(newsItem.title.toLowerCase()))
      )
      .slice(0, 3);
  }, [newsItem, id]);

  useEffect(() => {
    if (!newsItem) {
      setIsInitialized(true);
      return;
    }

    const generateTableOfContents = () => {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(newsItem.content, "text/html");
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
  }, [newsItem]);

  if (!isInitialized) {
    return (
      <div className="news-detail-page">
        <div className="loading">
          <div className="loading-spinner" />
          <p>Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="news-detail-page">
        <div className="not-found">
          <h2>Không tìm thấy bài viết!</h2>
          <p>Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link to="/news" className="back-to-news">
            Quay lại trang tin tức
          </Link>
        </div>
      </div>
    );
  }

  // Extract author info from content
  const authorMatch = newsItem.content.match(/Bài(?:\s+và)?(?:\s+ảnh)?:\s+([^–\n]+)/);
  const author = authorMatch ? authorMatch[1].trim() : "Ban biên tập";

  return (
    <div className="news-detail-page">
      <Helmet>
        <title>{newsItem.title} | ATTECH News</title>
        <meta
          name="description"
          content={sanitizeHtml(newsItem.content, { allowedTags: [] }).slice(0, 160)}
        />
        <meta property="og:title" content={newsItem.title} />
        <meta property="og:image" content={newsItem.image} />
        <meta property="og:type" content="article" />
        <meta name="author" content={author} />
        <meta name="publish_date" content={newsItem.date} />
      </Helmet>

      <aside className="news-sidebar">
        <h3>Danh mục bài viết</h3>
        <input
          type="text"
          placeholder="Tìm kiếm bài viết..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="news-sidebar-search"
          aria-label="Tìm kiếm bài viết"
        />
        <ul>
          {filteredNews.length > 0 ? (
            filteredNews.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/news/${item.id}/${item.slug}`}
                  className={item.slug === slug ? "active" : ""}
                >
                  {item.title}
                </Link>
              </li>
            ))
          ) : (
            <li className="no-results">
              Không tìm thấy bài viết phù hợp.
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

      <main className="news-detail-container">
        <nav className="news-breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <Link to="/news">Tin tức</Link>{" "}
          &gt; {newsItem.title}
        </nav>

        <div className="news-detail-top">
          <div className="news-detail-image">
            <img src={newsItem.image} alt={newsItem.title} loading="lazy" />
          </div>
          <div className="news-detail-header">
            <h1 className="news-detail-title">{newsItem.title}</h1>
            <span className="news-detail-date">Ngày đăng: {newsItem.date}</span>
          </div>
        </div>

        {tableOfContents.length > 0 && (
          <nav className="table-of-contents">
            <h3>Nội dung chính</h3>
            <ul>
              {tableOfContents.map((item) => (
                <li
                  key={item.id}
                  style={{ marginLeft: `${(item.level - 2) * 20}px` }}
                >
                  <a href={`#${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <article
          className="news-detail-content"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(newsItem.content, {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
              allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                img: ["src", "alt", "title", "class"],
              },
            }),
          }}
        />

        <div className="news-share">
          <h4>Chia sẻ bài viết:</h4>
          <div className="news-share-buttons">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button facebook"
            >
              Chia sẻ Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                window.location.href
              )}&text=${encodeURIComponent(newsItem.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button twitter"
            >
              Chia sẻ Twitter
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                window.location.href
              )}&title=${encodeURIComponent(newsItem.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button linkedin"
            >
              Chia sẻ LinkedIn
            </a>
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <section className="related-articles">
            <h2>Bài viết liên quan</h2>
            <div className="related-articles-list">
              {relatedArticles.map((item) => (
                <div key={item.id} className="related-article-item">
                  <Link to={`/news/${item.id}/${item.slug}`}>
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <h4>{item.title}</h4>
                    <span>{item.date}</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default React.memo(NewsDetailPage);
