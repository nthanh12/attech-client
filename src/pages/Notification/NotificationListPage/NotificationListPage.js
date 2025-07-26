import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./NotificationListPage.css";
import { mockNotifications } from "../../../utils/mockNotifications";
import { useI18n } from "../../../hooks/useI18n";

const NotificationListPage = () => {
  const { category } = useParams();
  const { t } = useTranslation();
  const { currentLanguage } = useI18n();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 9;

  // Lọc dữ liệu theo category param
  let filteredItems = !category || category === "all-act"
    ? mockNotifications
    : mockNotifications.filter(item => {
        const categorySlug = currentLanguage === 'vi' 
          ? item.notificationCategorySlugVi 
          : item.notificationCategorySlugEn;
        return categorySlug === category;
      });

  // Lọc theo searchTerm
  if (searchTerm.trim() !== "") {
    const lower = searchTerm.toLowerCase();
    filteredItems = filteredItems.filter(item => {
      const title = currentLanguage === 'vi' ? item.titleVi : item.titleEn;
      const description = currentLanguage === 'vi' ? item.descriptionVi : item.descriptionEn;
      return (
        title.toLowerCase().includes(lower) ||
        description?.toLowerCase().includes(lower)
      );
    });
  }

  // Sắp xếp giảm dần theo timePosted (mới nhất lên đầu)
  const sortedItems = filteredItems.slice().sort((a, b) => new Date(b.timePosted) - new Date(a.timePosted));

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1); // Reset về trang 1 khi đổi category hoặc ngôn ngữ
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [category, currentLanguage]);

  const getCategoryTitle = () => {
    if (!category || category === "all-act") return t('frontend.notifications.allNotifications');
    const found = mockNotifications.find(item => {
      const categorySlug = currentLanguage === 'vi' 
        ? item.notificationCategorySlugVi 
        : item.notificationCategorySlugEn;
      return categorySlug === category;
    });
    if (found) {
      const categoryName = currentLanguage === 'vi' 
        ? found.notificationCategoryNameVi 
        : found.notificationCategoryNameEn;
      return categoryName;
    }
    return t('frontend.notifications.title');
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
      <div className="notification-list-root notification-list-page notificationlist-minimal">
        <div className="container">
          <div className="loading notificationlist-loading">
            <div className="loading-spinner" />
            <p>{t('frontend.notifications.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="notification-list-root notification-list-page notificationlist-minimal">
      <div className="container">
        <h1 className="page-title-minimal">{getCategoryTitle()}</h1>
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:18}}>
          <input
            type="text"
            placeholder={t('frontend.notifications.searchPlaceholder')}
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
        <div className="notificationlist-grid-minimal">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div className="notificationlist-card-minimal" key={item.id}>
                <Link to={currentLanguage === 'vi' 
                  ? `/thong-bao/${item.notificationCategorySlugVi}/${item.slugVi}`
                  : `/en/notifications/${item.notificationCategorySlugEn}/${item.slugEn}`
                } className="notificationlist-img-link-minimal">
                  <img src={item.image} alt={currentLanguage === 'vi' ? item.titleVi : item.titleEn} className="notificationlist-img-minimal" title={currentLanguage === 'vi' ? item.titleVi : item.titleEn}/>
                </Link>
                <div className="notificationlist-content-minimal">
                  <span className="notificationlist-date-minimal">{formatDate(item.timePosted)}</span>
                  <Link to={currentLanguage === 'vi' 
                    ? `/thong-bao/${item.notificationCategorySlugVi}/${item.slugVi}`
                    : `/en/notifications/${item.notificationCategorySlugEn}/${item.slugEn}`
                  } className="notificationlist-title-minimal clamp-2-lines" title={currentLanguage === 'vi' ? item.titleVi : item.titleEn}>
                    {currentLanguage === 'vi' ? item.titleVi : item.titleEn}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="notificationlist-empty">
              <p>{t('frontend.notifications.noNotificationsInCategory')}</p>
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <div className="pagination-notificationlist-minimal">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn-notificationlist-minimal"
            >
              ←
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`pagination-btn-notificationlist-minimal${currentPage === page + 1 ? " active" : ""}`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn-notificationlist-minimal"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationListPage;
