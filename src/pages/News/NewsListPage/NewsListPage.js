import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { mockNewsCategories } from "../../../utils/mockNewsCategories";
import { mockNews } from "../../../utils/mockNews";
import { useLanguage } from "../../../contexts/LanguageContext";
import "./NewsListPage.css";

const NewsListPage = () => {
  const { lang } = useLanguage();
  const { category } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Tìm category hiện tại
  const currentCategory = mockNewsCategories.find(cat => (lang === "vi" ? cat.slugVi : cat.slugEn) === category);

  // Lọc tin tức theo category
  const filteredItems = category 
    ? mockNews.filter(news => (lang === "vi" ? news.postCategorySlugVi : news.postCategorySlugEn) === category)
    : mockNews;

  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [category, lang]);

  if (category && !currentCategory) {
    return (
      <div className="news-list-page">
        <div className="container">
          <div className="not-found">
            <h2>{lang === "vi" ? "Không tìm thấy danh mục này!" : "Category not found!"}</h2>
            <p>{lang === "vi" ? `Danh mục "${category}" không tồn tại hoặc đã bị xóa.` : `Category "${category}" does not exist or has been deleted.`}</p>
            <Link to={lang === "vi" ? "/tin-tuc" : "/en/news"} className="back-to-news">
              {lang === "vi" ? "Quay lại trang tin tức" : "Back to news"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryTitle = () => {
    if (!category) return lang === "vi" ? "Tất cả tin tức" : "All News";
    return currentCategory ? (lang === "vi" ? currentCategory.nameVi : currentCategory.nameEn) : (lang === "vi" ? "Tin tức" : "News");
  };

  const getCategoryPath = () => {
    if (!category) return lang === "vi" ? "Tất cả tin tức" : "All News";
    return currentCategory ? (lang === "vi" ? currentCategory.nameVi : currentCategory.nameEn) : (lang === "vi" ? "Tin tức" : "News");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(lang === "vi" ? 'vi-VN' : 'en-GB');
  };

  if (loading) {
    return (
      <div className="news-list-page">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner" />
            <p>{lang === "vi" ? "Đang tải tin tức..." : "Loading news..."}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-list-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb-nav">
          <Link to={lang === "vi" ? "/" : "/en"}>{lang === "vi" ? "Trang chủ" : "Home"}</Link> &gt;{" "}
          <Link to={lang === "vi" ? "/tin-tuc" : "/en/news"}>{lang === "vi" ? "Tin tức" : "News"}</Link> &gt; {getCategoryPath()}
        </nav>

        {/* Page Title */}
        <h1 className="page-title">{getCategoryTitle()}</h1>

        {/* News Grid */}
        <div className="news-grid">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div className="news-item" key={item.id}>
                <div className="news-image">
                  <img src={item.image} alt={lang === "vi" ? item.titleVi : item.titleEn} title={lang === "vi" ? item.titleVi : item.titleEn} />
                </div>
                <div className="news-content">
                  <span className="news-date">{formatDate(item.timePosted)}</span>
                  <h3>
                    <Link
                      to={
                        lang === "vi"
                          ? `/tin-tuc/${item.postCategorySlugVi}`
                          : `/en/news/${item.postCategorySlugEn}`
                      }
                      title={lang === "vi" ? item.titleVi : item.titleEn}
                    >
                      {lang === "vi" ? item.titleVi : item.titleEn}
                    </Link>
                  </h3>
                  <p className="news-summary">{lang === "vi" ? item.descriptionVi : item.descriptionEn}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>{lang === "vi" ? "Chưa có tin tức nào trong danh mục này." : "No news in this category yet."}</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {lang === "vi" ? "Trước" : "Prev"}
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={currentPage === page + 1 ? "active" : ""}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {lang === "vi" ? "Sau" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsListPage;
