import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import sanitizeHtml from "sanitize-html";
import { getNewsBySlug, getNewsCategories, getRelatedNews, formatNewsForDisplay } from "../../../services/clientNewsService";
import { useI18n } from "../../../hooks/useI18n";
import { getLanguageFromPath } from "../../../utils/routeHelpers";
import LocalizedLink from "../../../components/Shared/LocalizedLink";
import SearchBox from "../../../components/Shared/SearchBox";
import ErrorPage from "../../../components/Shared/ErrorPage";
import SEO from "../../../components/SEO/SEO";
import { useLocation } from "react-router-dom";
import "./NewsDetailPage.css";

const NewsDetailPage = () => {
  const { currentLanguage } = useI18n();
  const { t: tNews } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { category: categorySlug, slug: newsSlug } = useParams();
  const isEnglish = getLanguageFromPath(location.pathname) === "en";
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const handleSearch = useCallback((term) => {
    if (term.trim()) {
      // Navigate to news list page with search
      const url = currentLanguage === "vi" ? `/tin-tuc?search=${encodeURIComponent(term)}` : `/en/news?search=${encodeURIComponent(term)}`;
      navigate(url);
    }
  }, [navigate, currentLanguage]);

  const handleSelectSuggestion = useCallback((suggestion) => {
    // Navigate directly to the selected news article
    const category = categories.find(cat => cat.id === suggestion.newsCategoryId);
    const categorySlug = currentLanguage === "vi" ? category?.slugVi : category?.slugEn;
    
    if (categorySlug && suggestion.slug) {
      const url = currentLanguage === "vi" 
        ? `/tin-tuc/${categorySlug}/${suggestion.slug}`
        : `/en/news/${categorySlug}/${suggestion.slug}`;
      navigate(url);
    }
  }, [navigate, currentLanguage, categories]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load categories first
        const categoriesData = await getNewsCategories();
        setCategories(categoriesData);
        
        // Find category by slug
        const category = categoriesData.find(cat => 
          isEnglish ? cat.slugEn === categorySlug : cat.slugVi === categorySlug
        );
        
        if (!category) {
          setError("Category not found");
          return;
        }

        // Try to get news by slug
        try {
          const newsData = await getNewsBySlug(newsSlug, isEnglish ? "en" : "vi");
          setNewsItem(newsData);
          
          // Load related news
          const related = await getRelatedNews(newsData.id, newsData.newsCategoryId, 5);
          setRelatedNews(related);
          
          setError(null);
        } catch (slugError) {
          setError("Article not found");
        }

      } catch (err) {
        console.error("Error loading news detail:", err);
        setError("Error loading article");
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    loadData();
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
  const getCategoryName = () => {
    if (!newsItem?.newsCategoryId) return "";
    const category = categories.find(cat => cat.id === newsItem.newsCategoryId);
    return isEnglish ? category?.titleEn : category?.titleVi;
  };
  
  const getCategorySlug = () => {
    if (!newsItem?.newsCategoryId) return "";
    const category = categories.find(cat => cat.id === newsItem.newsCategoryId);
    return isEnglish ? category?.slugEn : category?.slugVi;
  };

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
      <ErrorPage
        title="Tin tức không tồn tại"
        message="Xin lỗi, tin tức bạn đang tìm kiếm không tồn tại hoặc đã bị xóa."
        suggestions={[
          "Kiểm tra lại đường link",
          "Tìm kiếm tin tức khác",
          "Quay lại trang danh sách tin tức"
        ]}
        type="news"
        backRoute="HOME"
        backText="Về trang chủ"
        listRoute="NEWS"
        listText="Xem tất cả tin tức"
      />
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
            {/* Search Box */}
            <div className="sidebar-search">
              <h3>Tìm kiếm tin tức</h3>
              <SearchBox
                value={searchTerm}
                onChange={handleSearchChange}
                onSearch={handleSearch}
                onSelectSuggestion={handleSelectSuggestion}
                placeholder={tNews("frontend.news.searchPlaceholder")}
                style={{ minWidth: "100%", fontSize: 14 }}
              />
            </div>
            
            <h3>{tNews("frontend.news.relatedNews")}</h3>
            <ul>
              {relatedNews.length > 0 ? (
                relatedNews.map((n) => {
                  const formattedItem = formatNewsForDisplay(n, currentLanguage);
                  const category = categories.find(cat => cat.id === n.newsCategoryId);
                  const categorySlug = currentLanguage === "vi" ? category?.slugVi : category?.slugEn;
                  
                  return (
                    <li key={n.id}>
                      <Link
                        to={
                          currentLanguage === "vi"
                            ? `/tin-tuc/${categorySlug}/${formattedItem.slug}`
                            : `/en/news/${categorySlug}/${formattedItem.slug}`
                        }
                        className={n.id === newsItem?.id ? "active" : ""}
                      >
                        {formattedItem.title}
                      </Link>
                    </li>
                  );
                })
              ) : (
                <li className="no-results">
                  {tNews("frontend.news.noRelatedNews")}
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
              {(() => {
                const formattedItem = formatNewsForDisplay(newsItem, currentLanguage);
                return formattedItem?.imageUrl && (
                  <div className="article-image">
                    <img
                      src={formattedItem.imageUrl}
                      alt={getTitle()}
                      title={getTitle()}
                      onError={(e) => {
                        e.target.src = '/images/default-news.jpg';
                      }}
                    />
                  </div>
                );
              })()}

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

          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(NewsDetailPage);
