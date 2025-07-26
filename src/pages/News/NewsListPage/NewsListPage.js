import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { mockNewsCategories } from "../../../utils/mockNewsCategories";
import { mockNews } from "../../../utils/mockNews";
import { useI18n } from "../../../hooks/useI18n";
import LocalizedLink from "../../../components/Shared/LocalizedLink";
import "./NewsListPage.css";

const NewsListPage = () => {
  const { currentLanguage } = useI18n();
  const { t } = useTranslation();
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 9;

  // Tìm category hiện tại
  const currentCategory = mockNewsCategories.find(cat => (currentLanguage === "vi" ? cat.slugVi : cat.slugEn) === category);

  // Lọc tin tức theo category
  const childSlugs = [
    "hoat-dong-cong-ty",
    "dang-bo-cong-ty",
    "doan-thanh-nien-cong-ty",
    "cong-doan-cong-ty"
  ];
  let filteredItems = category 
    ? (category === "tin-hoat-dong"
        ? mockNews.filter(news => childSlugs.includes(news.postCategorySlugVi))
        : mockNews.filter(news => (currentLanguage === "vi" ? news.postCategorySlugVi : news.postCategorySlugEn) === category)
      )
    : mockNews;
  // Lọc theo searchTerm
  if (searchTerm.trim() !== "") {
    const lower = searchTerm.toLowerCase();
    filteredItems = filteredItems.filter(item => {
      const title = currentLanguage === "vi" ? item.titleVi : item.titleEn;
      const desc = currentLanguage === "vi" ? item.descriptionVi : item.descriptionEn;
      return title.toLowerCase().includes(lower) || desc.toLowerCase().includes(lower);
    });
  }

  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1); // Reset về trang 1 khi đổi category hoặc currentLanguage
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [category, currentLanguage]);

  if (category && !currentCategory) {
    return (
      <div className="news-list-page newslist-minimal">
        <div className="container">
          <div className="not-found newslist-empty">
            <h2>{t('frontend.news.categoryNotFound')}</h2>
            <p>{t('frontend.news.categoryNotExist', {category})}</p>
            <LocalizedLink routeKey="NEWS" className="back-to-news">
              {t('frontend.news.backToNews')}
            </LocalizedLink>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryTitle = () => {
    if (!category) return t('frontend.news.allNews');
    return currentCategory ? (currentLanguage === "vi" ? currentCategory.nameVi : currentCategory.nameEn) : t('frontend.news.title');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth()+1).toString().padStart(2, "0")}/${d.getFullYear()}`;
  };

  if (loading) {
    return (
      <div className="news-list-page newslist-minimal">
        <div className="container">
          <div className="loading newslist-loading">
            <div className="loading-spinner" />
            <p>{t('frontend.news.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-list-root news-list-page newslist-minimal">
      <div className="container">
        <h1 className="page-title-minimal">{getCategoryTitle()}</h1>
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:18}}>
          <input
            type="text"
            placeholder={t('frontend.news.searchPlaceholder')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              padding: '7px 14px',
              borderRadius: 20,
              border: '1.5px solid #e0e7ef',
              fontSize: 15,
              minWidth: 220,
              outline: 'none',
              boxShadow: '0 1px 4px rgba(37,99,235,0.04)',
              transition: 'border 0.18s',
              color: '#1a237e'
            }}
          />
        </div>
        <div className="newslist-grid-minimal">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div className="newslist-card-minimal" key={item.id}>
                <LocalizedLink 
                  to={currentLanguage === 'vi' ? `/tin-tuc/${item.postCategorySlugVi}/${item.slugVi}` : `/en/news/${item.postCategorySlugEn}/${item.slugEn}`} 
                  className="newslist-img-link-minimal"
                >
                  <img src={item.image} alt={currentLanguage === "vi" ? item.titleVi : item.titleEn} className="newslist-img-minimal" title={currentLanguage === "vi" ? item.titleVi : item.titleEn}/>
                </LocalizedLink>
                <div className="newslist-content-minimal">
                  <span className="newslist-date-minimal">{formatDate(item.timePosted)}</span>
                  <LocalizedLink 
                    to={currentLanguage === 'vi' ? `/tin-tuc/${item.postCategorySlugVi}/${item.slugVi}` : `/en/news/${item.postCategorySlugEn}/${item.slugEn}`} 
                    className="newslist-title-minimal clamp-2-lines" 
                    title={currentLanguage === "vi" ? item.titleVi : item.titleEn}
                  >
                    {currentLanguage === "vi" ? item.titleVi : item.titleEn}
                  </LocalizedLink>
                </div>
              </div>
            ))
          ) : (
            <div className="newslist-empty">
              <p>{t('frontend.news.noNewsInCategory')}</p>
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <div className="pagination-newslist-minimal">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn-minimal"
            >
              ←
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`pagination-btn-minimal${currentPage === page + 1 ? " active" : ""}`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn-minimal"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsListPage;
