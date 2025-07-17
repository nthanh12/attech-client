import React, { useState } from "react";
import { Link } from "react-router-dom";
import ViewAllButton from "../../../../components/ViewAllButton/ViewAllButton";
import "./NotificationSection.css";

const NotificationSection = ({ title, notifications, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = notifications.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Lấy slug category từ notification đầu tiên (nếu có)
  const categorySlug = currentNotifications[0]?.notificationCategorySlugVi || type;

  return (
    <div className="notification-section">
      <div className="section-tittle-flex">
        <h3>{title}</h3>
        {/* Sửa đường dẫn sang /thong-bao/[categorySlug] */}
        <ViewAllButton to={`/thong-bao/${categorySlug}`} />
      </div>

      <div className="notification-grid">
        {currentNotifications.map((notification) => (
          <article key={notification.id}>
            <div className="image-wrapper">
              <img src={notification.image} alt={notification.title} />
              {notification.isNew && <span className="badge-new">New</span>}
            </div>
            <div className="content-wrapper">
              <h2>
                {/* Sửa đường dẫn sang /thong-bao/[categorySlug]/[slug] */}
                <Link className="notification_title" to={`/thong-bao/${notification.notificationCategorySlugVi}/${notification.slug}`}>
                  {notification.title}
                </Link>
              </h2>
              <div className="notification-meta">
                <span>
                  <i className="far fa-calendar"></i>
                  {new Date(notification.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationSection; 