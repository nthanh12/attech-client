import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  fetchService,
  deleteService,
  getServiceById,
} from "../../services/serviceService";
import { getApiUrl } from "../../config/apiConfig";
import ServiceCreationForm from "../components/ServiceCreationForm";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import PageWrapper from "../components/PageWrapper";
import "./ContactList.css";
import "./ServicesList.css";
import "../styles/adminTable.css";
import "../styles/adminCommon.css";
import "../styles/adminButtons.css";

const ServiceList = () => {
  const { t } = useTranslation();

  // Data state
  const [service, setService] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingService, setEditingService] = useState(null);
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
  }, [currentPage, itemsPerPage, searchDebounce, filters.status, filters.dateFrom, filters.dateTo, sortConfig]);

  const loadData = async (showLoadingIndicator = true) => {
    if (showLoadingIndicator) {
      setIsLoading(true);
    }
    try {
      const [serviceData] = await Promise.all([fetchService(currentPage, itemsPerPage, searchDebounce, filters, sortConfig)]);

      setService(serviceData?.items || []);
      setTotalItems(serviceData?.totalItems || 0);
      setTotalPages(serviceData?.totalPages || 0);
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
    setEditingService(null);
    setShowModal(true);
  };

  const handleEdit = async (serviceItem) => {
    setEditMode(true);
    setEditingService(serviceItem); // Set basic data first

    try {
      // Fetch full DetailServiceDto with attachments
      const fullServiceData = await getServiceById(serviceItem.id);
      setEditingService(fullServiceData);
      setShowModal(true); // Only show modal after data is loaded
    } catch (error) {
      console.error("Error loading service detail:", error);
      setToast({
        show: true,
        message: "Lỗi tải chi tiết dịch vụ: " + error.message,
        type: "error",
      });
      // Fallback to basic data and show modal
      setEditingService(serviceItem);
      setShowModal(true);
    }
  };

  const handleDelete = async (serviceItem) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      try {
        const response = await deleteService(serviceItem.id);
        if (response && response.status === 1) {
          // Reload data from server to ensure consistency
          await loadData();
          setToast({
            show: true,
            message: "Xóa dịch vụ thành công!",
            type: "success",
          });
        } else {
          throw new Error("Delete failed");
        }
      } catch (error) {
        setToast({
          show: true,
          message: `Xóa dịch vụ thất bại: ${error.message}`,
          type: "error",
        });
      }
    }
  };

  const handleFormSuccess = async (savedService) => {
    try {
      // Reload data from server to ensure consistency
      await loadData();

      if (editMode) {
        setToast({
          show: true,
          message: "Cập nhật dịch vụ thành công!",
          type: "success",
        });
      } else {
        setToast({
          show: true,
          message: "Thêm dịch vụ thành công!",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error reloading data:", error);
      // Fallback to old behavior if loadData fails
      if (editMode) {
        setService((prev) =>
          prev.map((item) =>
            item.id === savedService.id ? { ...item, ...savedService } : item
          )
        );
        setToast({
          show: true,
          message: "Cập nhật dịch vụ thành công!",
          type: "success",
        });
      } else {
        setService((prev) => [savedService, ...prev]);
        setToast({
          show: true,
          message: "Thêm dịch vụ thành công!",
          type: "success",
        });
      }
    }

    setShowModal(false);
    setEditingService(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
  };

  // Use server-side data directly (no client-side filtering/sorting)
  const paginatedService = service;

  // Table columns
  const columns = [
    { key: "id", label: "ID", sortable: true, width: "80px" },
    {
      key: "featuredImage",
      label: "Ảnh",
      width: "100px",
      render: (item) => {
        // ServiceDto có field ImageUrl trực tiếp
        const rawImageUrl = item.ImageUrl || item.imageUrl;

        // Nếu là relative path, thêm base URL
        const imageUrl = rawImageUrl
          ? rawImageUrl.startsWith("http")
            ? rawImageUrl
            : getApiUrl(rawImageUrl)
          : null;

        return (
          <div className="service-thumbnail-container">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={item.titleVi || "Service"}
                className="service-thumbnail"
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
      className: "admin-btn admin-btn-sm admin-btn-primary",
    },
    {
      label: "Xóa",
      onClick: handleDelete,
      className: "admin-btn admin-btn-sm admin-btn-danger",
    },
  ];

  // Page Actions for the sticky action bar
  const pageActions = (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <button
        className="admin-btn admin-btn-outline-secondary"
        onClick={loadData}
        disabled={isLoading}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1rem",
          backgroundColor: "#f8f9fa",
          color: "#6c757d",
          border: "1px solid #dee2e6",
          borderRadius: "6px",
          fontSize: "0.875rem",
          fontWeight: "500",
          cursor: "pointer",
        }}
        title="Làm mới danh sách dịch vụ"
      >
        <i className="fas fa-refresh"></i>
        Làm mới
      </button>
      <button
        className="admin-btn admin-btn-primary"
        onClick={handleAdd}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1rem",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "0.875rem",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        <i className="fas fa-plus"></i>
        Thêm dịch vụ
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <PageWrapper actions={pageActions}>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper actions={pageActions}>
      <div className="admin-service-list">
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filters-title">
            <i className="fas fa-filter"></i>
            Bộ lọc & Tìm kiếm
          </div>
          <div className="filters-grid">
            <div className="filter-group">
              <label>
                {isSearching ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-search"></i>
                )} Tìm kiếm
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên dịch vụ, mô tả..."
                value={filters.search}
                onChange={(e) => {
                  const newSearch = e.target.value;
                  setFilters((prev) => ({ ...prev, search: newSearch }));
                  setCurrentPage(1); // Reset về trang 1 khi search
                }}
              />
            </div>
            <div className="filter-group">
              <label><i className="fas fa-flag"></i> Trạng thái</label>
              <select
                className="form-control"
                value={filters.status}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, status: e.target.value }));
                  setCurrentPage(1); // Reset về trang 1 khi filter
                }}
              >
                <option key="all-status" value="">
                  Tất cả trạng thái
                </option>
                <option key="active" value="active">
                  Hoạt động
                </option>
                <option key="inactive" value="inactive">
                  Không hoạt động
                </option>
              </select>
            </div>
            <div className="filter-group">
              <label><i className="fas fa-calendar"></i> Từ ngày</label>
              <input
                type="date"
                className="form-control"
                placeholder="Từ ngày"
                value={filters.dateFrom}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, dateFrom: e.target.value }));
                  setCurrentPage(1); // Reset về trang 1 khi filter
                }}
              />
            </div>
            <div className="filter-group">
              <label><i className="fas fa-calendar"></i> Đến ngày</label>
              <input
                type="date"
                className="form-control"
                placeholder="Đến ngày"
                value={filters.dateTo}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, dateTo: e.target.value }));
                  setCurrentPage(1); // Reset về trang 1 khi filter
                }}
              />
            </div>
            <div className="filter-actions">
              <button
                className="admin-btn admin-btn-primary"
                onClick={() => {
                  setFilters({
                    search: "",
                    status: "",
                    dateFrom: "",
                    dateTo: "",
                  });
                  setCurrentPage(1); // Reset về trang 1 khi reset filters
                }}
                title="Xóa tất cả bộ lọc"
              >
                <i className="fas fa-eraser"></i>
                Xóa lọc
              </button>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="table-container">
          <DataTable
          data={paginatedService}
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
        />
        </div>

        {/* Modal with ServiceCreationForm */}
        <FormModal
          show={showModal}
          onClose={handleCloseModal}
          title={editMode ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
          size="xl"
          showActions={false}
        >
          <ServiceCreationForm
            editingService={editingService}
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

export default ServiceList;
