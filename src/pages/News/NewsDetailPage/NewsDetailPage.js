import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import sanitizeHtml from "sanitize-html";
import { mockNews } from "../../../utils/mockNews";
import { useI18n } from "../../../hooks/useI18n";
import { getLanguageFromPath } from "../../../utils/routeHelpers";
import LocalizedLink from "../../../components/Shared/LocalizedLink";
import SEO from "../../../components/SEO/SEO";
import { useLocation } from "react-router-dom";
import "./NewsDetailPage.css";

const NewsDetailPage = () => {
  const { currentLanguage } = useI18n();
  const { t: tNews } = useTranslation();
  const location = useLocation();
  const { category: categorySlug, slug: newsSlug } = useParams();
  const isEnglish = getLanguageFromPath(location.pathname) === "en";
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        // Find news item by matching correct language slug
        const item = mockNews.find((n) => {
          const categoryMatch = isEnglish
            ? n.postCategorySlugEn === categorySlug
            : n.postCategorySlugVi === categorySlug;
          const slugMatch = isEnglish
            ? n.slugEn === newsSlug
            : n.slugVi === newsSlug;
          return categoryMatch && slugMatch;
        });

        if (item) {
          setNewsItem(item);
          setError(null);
        } else {
          setError("Article not found");
        }
      } catch (err) {
        setError("Error loading article");
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };
    fetchNewsDetail();
  }, [categorySlug, newsSlug, isEnglish]);

  // Generate Table of Contents from content headings
  useEffect(() => {
    if (!newsItem) {
      setIsInitialized(true);
      return;
    }

    const generateTableOfContents = () => {
      try {
        const parser = new DOMParser();
        const content = isEnglish ? newsItem.contentEn : newsItem.contentVi;
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

    generateTableOfContents(); // Table of contents generation for future use
    setIsInitialized(true);
  }, [newsItem, isEnglish]);

  // Lazy loading for images
  useEffect(() => {
    const images = document.querySelectorAll(
      '.news-detail-page .article-content img[loading="lazy"]'
    );

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));

    return () => {
      images.forEach((img) => imageObserver.unobserve(img));
    };
  }, [newsItem]);

  // Sidebar: Lọc tin cùng chuyên mục, tìm kiếm, tối đa 10 tin, luôn có tin đang xem
  const filteredNews = useMemo(() => {
    if (!newsItem) return [];
    const categorySlugField = isEnglish
      ? "postCategorySlugEn"
      : "postCategorySlugVi";
    const targetCategorySlug = isEnglish
      ? newsItem.postCategorySlugEn
      : newsItem.postCategorySlugVi;

    let filtered = mockNews.filter(
      (n) =>
        n[categorySlugField] === targetCategorySlug &&
        ((isEnglish ? n.titleEn : n.titleVi)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          (isEnglish ? n.contentEn : n.contentVi)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
    );
    filtered = filtered.sort(
      (a, b) => new Date(b.timePosted) - new Date(a.timePosted)
    );
    let top10 = filtered.slice(0, 10);
    if (newsItem && !top10.some((n) => n.id === newsItem.id)) {
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
  }, [newsItem, searchTerm, isEnglish]);

  // Related news: tối đa 3 tin cùng chuyên mục, loại trừ tin đang xem
  const relatedNews = useMemo(() => {
    if (!newsItem) return [];
    const categorySlugField = isEnglish
      ? "postCategorySlugEn"
      : "postCategorySlugVi";
    const targetCategorySlug = isEnglish
      ? newsItem.postCategorySlugEn
      : newsItem.postCategorySlugVi;

    return mockNews
      .filter(
        (n) =>
          n.id !== newsItem.id && n[categorySlugField] === targetCategorySlug
      )
      .sort((a, b) => new Date(b.timePosted) - new Date(a.timePosted))
      .slice(0, 3);
  }, [newsItem, isEnglish]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      currentLanguage === "vi" ? "vi-VN" : "en-GB",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  // Helper functions to get localized content
  const getTitle = () => (isEnglish ? newsItem?.titleEn : newsItem?.titleVi);
  const getDescription = () =>
    isEnglish ? newsItem?.descriptionEn : newsItem?.descriptionVi;
  const getContent = () =>
    isEnglish ? newsItem?.contentEn : newsItem?.contentVi;
  const getCategoryName = () =>
    isEnglish ? newsItem?.postCategorytitleEn : newsItem?.postCategorytitleVi;
  const getCategorySlug = () =>
    isEnglish ? newsItem?.postCategorySlugEn : newsItem?.postCategorySlugVi;

  if (!isInitialized || loading) {
    return (
      <div className="news-detail-page">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>{tNews("frontend.news.loading")}</p>
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
            <h2>{tNews("frontend.news.articleNotFound")}</h2>
            <p>{error || tNews("frontend.news.articleNotExist")}</p>
            <LocalizedLink routeKey="NEWS" className="back-to-news">
              {tNews("frontend.news.backToNews")}
            </LocalizedLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${getTitle()} - ATTECH`}
        description={getDescription() || getTitle()}
        url={
          currentLanguage === "vi"
            ? `/tin-tuc/${categorySlug}/${newsSlug}`
            : `/en/news/${categorySlug}/${newsSlug}`
        }
      />
      <div className="news-detail-page">
        <div className="news-detail-layout">
          {/* Sidebar */}
          <aside className="news-sidebar">
            <h3>{tNews("frontend.news.relatedNews")}</h3>
            <input
              type="text"
              placeholder={tNews("frontend.news.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="news-sidebar-search"
              aria-label={tNews("frontend.news.searchNews")}
            />
            <ul>
              {filteredNews.length > 0 ? (
                filteredNews.map((n) => (
                  <li key={n.id}>
                    <Link
                      to={
                        currentLanguage === "vi"
                          ? `/tin-tuc/${n.postCategorySlugVi}/${n.slugVi}`
                          : `/en/news/${n.postCategorySlugEn}/${n.slugEn}`
                      }
                      className={n.id === newsItem.id ? "active" : ""}
                    >
                      {currentLanguage === "vi" ? n.titleVi : n.titleEn}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="no-results">
                  {tNews("frontend.news.noNewsFound")}
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="clear-search"
                    >
                      {tNews("frontend.news.clearSearch")}
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
              <LocalizedLink routeKey="HOME">
                {tNews("navigation.home")}
              </LocalizedLink>{" "}
              &gt;{" "}
              <LocalizedLink routeKey="NEWS">
                {tNews("navigation.news")}
              </LocalizedLink>{" "}
              &gt;{" "}
              <LocalizedLink
                to={
                  currentLanguage === "vi"
                    ? `/tin-tuc/${getCategorySlug()}`
                    : `/en/news/${getCategorySlug()}`
                }
              >
                {getCategoryName()}
              </LocalizedLink>{" "}
              &gt; <span>{getTitle()}</span>
            </nav>

            {/* Article Header */}
            <article className="news-article">
              <header className="article-header">
                <h1 className="article-title">{getTitle()}</h1>
                <div className="article-meta">
                  <span className="article-date">
                    <i className="bi bi-calendar"></i>
                    {formatDate(newsItem.timePosted)}
                  </span>
                  <span className="article-category">
                    <i className="bi bi-tag"></i>
                    <LocalizedLink
                      to={
                        currentLanguage === "vi"
                          ? `/tin-tuc/${getCategorySlug()}`
                          : `/en/news/${getCategorySlug()}`
                      }
                    >
                      {getCategoryName()}
                    </LocalizedLink>
                  </span>
                </div>
              </header>

              {/* Article Image */}
              {newsItem.image && (
                <div className="article-image">
                  <img
                    src={newsItem.image}
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
                      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                        "img",
                        "figure",
                        "figcaption",
                      ]),
                      allowedAttributes: {
                        ...sanitizeHtml.defaults.allowedAttributes,
                        img: [
                          "src",
                          "alt",
                          "title",
                          "class",
                          "width",
                          "height",
                          "loading",
                        ],
                        figure: ["class"],
                        figcaption: ["class"],
                        div: ["style", "class"],
                        p: ["style", "class"],
                        span: ["style", "class"],
                        table: ["style", "class", "border", "width"],
                        tr: ["style", "class"],
                        td: ["style", "class"],
                        th: ["style", "class"],
                        a: ["href", "target", "rel"],
                      },
                      allowedStyles: {
                        "*": {
                          color: [
                            /^\#(0x)?[0-9a-f]+$/i,
                            /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,
                          ],
                          "text-align": [
                            /^left$/,
                            /^right$/,
                            /^center$/,
                            /^justify$/,
                          ],
                          "font-size": [/^\d+(?:px|em|%)$/],
                          "font-weight": [
                            /^(?:normal|bold|bolder|lighter|[1-9]00)$/,
                          ],
                          "background-color": [
                            /^\#(0x)?[0-9a-f]+$/i,
                            /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,
                          ],
                          margin: [/^\d+(?:px|em|%)$/],
                          padding: [/^\d+(?:px|em|%)$/],
                          width: [/^\d+(?:px|em|%)$/],
                          height: [/^\d+(?:px|em|%)$/],
                        },
                      },
                    }),
                  }}
                />
              </div>

              {/* Article Footer */}
              <footer className="article-footer">
                <div className="article-tags">
                  <span className="tag-label">
                    {tNews("frontend.news.category")}:
                  </span>
                  <LocalizedLink
                    to={
                      currentLanguage === "vi"
                        ? `/tin-tuc/${getCategorySlug()}`
                        : `/en/news/${getCategorySlug()}`
                    }
                    className="tag"
                  >
                    {getCategoryName()}
                  </LocalizedLink>
                </div>
                <div className="article-navigation">
                  <LocalizedLink routeKey="NEWS" className="back-link">
                    <i className="bi bi-arrow-left"></i>
                    {tNews("frontend.news.backToNewsList")}
                  </LocalizedLink>
                </div>
              </footer>
            </article>

            {/* Related News */}
            {relatedNews.length > 0 && (
              <section className="related-news">
                <h2>{tNews("frontend.news.relatedNews")}</h2>
                <div className="related-news-list">
                  {relatedNews.map((n) => (
                    <div className="related-news-item" key={n.id}>
                      <Link
                        to={
                          currentLanguage === "vi"
                            ? `/tin-tuc/${n.postCategorySlugVi}/${n.slugVi}`
                            : `/en/news/${n.postCategorySlugEn}/${n.slugEn}`
                        }
                        className="related-news-link"
                      >
                        <div className="related-news-thumb">
                          <img
                            src={n.image}
                            alt={
                              currentLanguage === "vi" ? n.titleVi : n.titleEn
                            }
                          />
                        </div>
                        <div className="related-news-info">
                          <h4>
                            {currentLanguage === "vi" ? n.titleVi : n.titleEn}
                          </h4>
                          <span className="related-news-date">
                            {formatDate(n.timePosted)}
                          </span>
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
    </>
  );
};

export default React.memo(NewsDetailPage);
