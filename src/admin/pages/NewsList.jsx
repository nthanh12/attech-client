import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  fetchNews,
  fetchNewsCategories,
  deleteNews,
  getNewsById,
} from "../../services/newsService";
import { getApiUrl } from "../../config/apiConfig";
import NewsCreationForm from "../components/NewsCreationForm";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import PageWrapper from "../components/PageWrapper";
import AdminFilter from "../components/AdminFilter";
import AdminPageActions from "../components/AdminPageActions";
import AdminTable from "../components/AdminTable";
import "./NewsList.css";
import "../styles/adminTable.css";
import "../styles/adminCommon.css";
import "../styles/adminButtons.css";
import "../styles/adminPageStyles.css";

const NewsList = () => {
  const { t } = useTranslation();

  // Data state
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  // Server-side pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchDebounce, setSearchDebounce] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "desc",
  });
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  // Debounce search - đợi user gõ xong
  useEffect(() => {
    if (filters.search !== searchDebounce) {
      setIsSearching(true);
    }
    
    const timer = setTimeout(() => {
      setSearchDebounce(filters.search);
      setIsSearching(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Load data when pagination/filters/sorting change (without showing loading for search)
  useEffect(() => {
    if (searchDebounce !== filters.search) {
      // Search is still being debounced, don't show loading
      loadData(false);
    } else {
      // Other filters or pagination changed, show loading
      loadData(true);
    }
  }, [currentPage, itemsPerPage, searchDebounce, filters.category, filters.status, filters.dateFrom, filters.dateTo, sortConfig]);

  const loadData = async (showLoadingIndicator = true) => {
    if (showLoadingIndicator) {
      setIsLoading(true);
    }
    try {
      const [newsData, categoriesData] = await Promise.all([
        fetchNews(currentPage, itemsPerPage, searchDebounce, filters, sortConfig),
        fetchNewsCategories(),
      ]);

      setNews(newsData?.items || []);
      setTotalItems(newsData?.totalItems || 0);
      setTotalPages(newsData?.totalPages || 0);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error("Load data failed:", error);
      setToast({
        show: true,
        message: "Tải dữ liệu thất bại: " + error.message,
        type: "error",
      });
    } finally {
      if (showLoadingIndicator) {
        setIsLoading(false);
      }
    }
  };

  // Handlers
  const handleAdd = () => {
    setEditMode(false);
    setEditingNews(null);
    setShowModal(true);
  };

  const handleEdit = async (newsItem) => {
    setEditMode(true);
    setEditingNews(newsItem); // Set basic data first

    try {
      // Fetch full DetailNewsDto with attachments
      const fullNewsData = await getNewsById(newsItem.id);
      setEditingNews(fullNewsData);
      setShowModal(true); // Only show modal after data is loaded
    } catch (error) {
      console.error("Error loading news detail:", error);
      setToast({
        show: true,
        message: "Lỗi tải chi tiết tin tức: " + error.message,
        type: "error",
      });
      // Fallback to basic data and show modal
      setEditingNews(newsItem);
      setShowModal(true);
    }
  };

  const handleDelete = async (newsItem) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tin tức này?")) {
      try {
        const response = await deleteNews(newsItem.id);
        if (response && response.status === 1) {
          // Reload data from server to ensure consistency
          await loadData();
          setToast({
            show: true,
            message: "Xóa tin tức thành công!",
            type: "success",
          });
        } else {
          throw new Error("Delete failed");
        }
      } catch (error) {
        setToast({
          show: true,
          message: `Xóa tin tức thất bại: ${error.message}`,
          type: "error",
        });
      }
    }
  };

  const handleFormSuccess = async (savedNews) => {
    try {
      // Reload data from server to ensure consistency
      await loadData();

      if (editMode) {
        setToast({
          show: true,
          message: "Cập nhật tin tức thành công!",
          type: "success",
        });
      } else {
        setToast({
          show: true,
          message: "Thêm tin tức thành công!",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error reloading data:", error);
      // Fallback to old behavior if loadData fails
      if (editMode) {
        setNews((prev) =>
          prev.map((item) =>
            item.id === savedNews.id ? { ...item, ...savedNews } : item
          )
        );
        setToast({
          show: true,
          message: "Cập nhật tin tức thành công!",
          type: "success",
        });
      } else {
        setNews((prev) => [savedNews, ...prev]);
        setToast({
          show: true,
          message: "Thêm tin tức thành công!",
          type: "success",
        });
      }
    }

    setShowModal(false);
    setEditingNews(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingNews(null);
  };

  // Filter configuration for AdminFilter component
  const filterConfig = [
    {
      key: "search",
      type: "search",
      label: "Tìm kiếm",
      placeholder: "Tìm kiếm theo tiêu đề, nội dung hoặc tác giả...",
      icon: "fas fa-search"
    },
    {
      key: "category",
      type: "select",
      label: "Danh mục",
      icon: "fas fa-tags",
      options: categories.map(cat => ({
        value: cat.id,
        label: cat.titleVi
      }))
    },
    {
      key: "status",
      type: "select",
      label: "Trạng thái",
      icon: "fas fa-flag",
      options: [
        { value: "active", label: "Hoạt động" },
        { value: "inactive", label: "Không hoạt động" }
      ]
    },
    {
      type: "daterange",
      fromKey: "dateFrom",
      toKey: "dateTo",
      icon: "fas fa-calendar"
    }
  ];

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Use server-side data directly (no client-side filtering/sorting)
  const paginatedNews = news;

  // Table columns
  const columns = [
    { key: "id", label: "ID", sortable: true, width: "80px" },
    {
      key: "featuredImage",
      label: "Ảnh",
      width: "100px",
      render: (item) => {
        // NewsDto có field ImageUrl trực tiếp
        const rawImageUrl = item.ImageUrl || item.imageUrl;

        // Nếu là relative path, thêm base URL
        const imageUrl = rawImageUrl
          ? rawImageUrl.startsWith("http")
            ? rawImageUrl
            : getApiUrl(rawImageUrl)
          : null;

        return (
          <div className="news-thumbnail-container">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={item.titleVi || "News"}
                className="news-thumbnail"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="no-image-placeholder"
              style={{ display: imageUrl ? "none" : "flex" }}
            >
              <i className="fas fa-image"></i>
            </div>
          </div>
        );
      },
    },
    { key: "titleVi", label: "Tiêu đề", sortable: true, width: "250px" },
    {
      key: "category",
      label: "Danh mục",
      width: "150px",
      render: (item) => {
        const category = categories.find(
          (cat) => cat.id === item.newsCategoryId
        );
        return category?.titleVi || "N/A";
      },
    },
    {
      key: "status",
      label: "Trạng thái",
      width: "120px",
      render: (item) => (
        <span
          className={`badge ${
            item.status === 1 ? "badge-success" : "badge-secondary"
          }`}
        >
          {item.status === 1 ? "Hoạt động" : "Không hoạt động"}
        </span>
      ),
    },
    {
      key: "timePosted",
      label: "Ngày đăng",
      sortable: true,
      width: "140px",
      render: (item) => new Date(item.timePosted).toLocaleDateString("vi-VN"),
    },
  ];

  const actions = [
    {
      label: "Sửa",
      onClick: handleEdit,
      className: "admin-btn admin-btn-xs admin-btn-primary",
    },
    {
      label: "Xóa",
      onClick: handleDelete,
      className: "admin-btn admin-btn-xs admin-btn-danger",
    },
  ];

  // Page Actions using AdminPageActions
  const pageActions = (
    <AdminPageActions
      loading={isLoading}
      actions={[
        AdminPageActions.createRefreshAction(loadData, isLoading),
        AdminPageActions.createAddAction(handleAdd, "Thêm tin tức")
      ]}
    />
  );

  if (isLoading) {
    return (
      <PageWrapper actions={pageActions}>
        <div className="admin-page-container">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper actions={pageActions}>
      <div className="admin-news-list">
        {/* Filters Section - Using AdminFilter Component */}
        <AdminFilter
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onPageChange={setCurrentPage}
          filterConfig={filterConfig}
          isSearching={isSearching}
        />

        {/* Table Container */}
        <AdminTable
            data={paginatedNews}
            columns={columns}
            actions={actions}
            sortConfig={sortConfig}
            onSort={(key) => {
              setSortConfig((prev) => ({
                key,
                direction:
                  prev.key === key && prev.direction === "desc" ? "asc" : "desc",
              }));
            }}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(newSize) => {
              setItemsPerPage(newSize);
              setCurrentPage(1); // Reset về trang 1
            }}
            loading={isLoading}
            emptyText="Chưa có tin tức nào"
        />

        {/* Modal with NewsCreationForm */}
        <FormModal
          show={showModal}
          onClose={handleCloseModal}
          title={editMode ? "Chỉnh sửa tin tức" : "Thêm tin tức mới"}
          size="xl"
          showActions={false}
        >
          <NewsCreationForm
            categories={categories}
            editingNews={editingNews}
            onSuccess={handleFormSuccess}
            onCancel={handleCloseModal}
          />
        </FormModal>

        <ToastMessage
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      </div>
    </PageWrapper>
  );
};

export default NewsList;
