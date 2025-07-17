import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./NotificationListPage.css";
import { mockNotifications } from "../../../utils/mockNotifications";

const itemsPerPage = 8;

const NotificationListPage = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc dữ liệu theo category param (so sánh với notificationCategorySlugVi)
  let filteredItems = !category || category === "all-act"
    ? mockNotifications
    : mockNotifications.filter(item => item.notificationCategorySlugVi === category);

  // Lọc theo searchTerm
  if (searchTerm.trim() !== "") {
    const lower = searchTerm.toLowerCase();
    filteredItems = filteredItems.filter(item => {
      return (
        item.titleVi.toLowerCase().includes(lower) ||
        item.descriptionVi?.toLowerCase().includes(lower)
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
    setCurrentPage(1); // Reset về trang 1 khi đổi category
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [category]);

  const getCategoryTitle = () => {
    if (!category || category === "all-act") return "Danh sách tất cả thông báo";
    const found = mockNotifications.find(item => item.notificationCategorySlugVi === category);
    return found ? `${found.notificationCategoryNameVi}` : "Danh sách thông báo";
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
      <div className="newslist-minimal">
        <div className="container">
          <div className="loading newslist-loading">
            <div className="loading-spinner" />
            <p>Đang tải thông báo...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="newslist-minimal">
      <div className="container">
        <h1 className="page-title-minimal">{getCategoryTitle()}</h1>
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:18}}>
          <input
            type="text"
            placeholder="Tìm kiếm thông báo..."
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
                <Link to={`/thong-bao/${item.notificationCategorySlugVi}/${item.slugVi}`} className="newslist-img-link-minimal">
                  <img src={item.image} alt={item.titleVi} className="newslist-img-minimal" title={item.titleVi}/>
                </Link>
                <div className="newslist-content-minimal">
                  <span className="newslist-date-minimal">{formatDate(item.timePosted)}</span>
                  <Link to={`/thong-bao/${item.notificationCategorySlugVi}/${item.slugVi}`} className="newslist-title-minimal clamp-2-lines" title={item.titleVi}>
                    {item.titleVi}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="newslist-empty">
              <p>Chưa có thông báo nào trong danh mục này.</p>
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

export default NotificationListPage;
