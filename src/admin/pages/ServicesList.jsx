import React, { useState, useEffect } from "react";
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
import "./ServicesList.css";
import "../styles/adminTable.css";
import "../styles/adminCommon.css";

const ServiceList = () => {
  const { t } = useTranslation();

  // Data state
  const [service, setService] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  // Pagination & filters
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
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

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [serviceData] = await Promise.all([fetchService()]);

      setService(serviceData?.items || []);
    } catch (error) {
      console.error("Load data failed:", error);
      setToast({
        show: true,
        message: "Tải dữ liệu thất bại: " + error.message,
        type: "error",
      });
    } finally {
      setIsLoading(false);
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

  // Filtering and sorting logic
  const filteredService = service.filter((item) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesTitle =
        item.titleVi?.toLowerCase().includes(searchTerm) ||
        item.titleEn?.toLowerCase().includes(searchTerm);
      if (!matchesTitle) return false;
    }

    // Status filter
    if (filters.status) {
      const itemStatus = parseInt(item.status);
      if (filters.status === "active" && itemStatus !== 1) return false;
      if (filters.status === "inactive" && itemStatus !== 0) return false;
    }

    // Date filter
    if (filters.dateFrom || filters.dateTo) {
      const itemDate = new Date(item.timePosted);
      const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
      const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

      if (fromDate && toDate) {
        if (itemDate < fromDate || itemDate > toDate) return false;
      } else if (fromDate) {
        if (itemDate < fromDate) return false;
      } else if (toDate) {
        if (itemDate > toDate) return false;
      }
    }

    return true;
  });

  const sortedService = filteredService.sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === "timePosted") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedService = sortedService.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      className: "btn btn-sm btn-primary",
    },
    {
      label: "Xóa",
      onClick: handleDelete,
      className: "btn btn-sm btn-danger",
    },
  ];

  // Page Actions for the sticky action bar
  const pageActions = (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <button
        className="btn btn-outline-secondary"
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
        className="btn btn-primary"
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
          <div className="filter-group">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo tiêu đề..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />
          </div>
          <div className="filter-group">
            <select
              className="form-control"
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
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
            <input
              type="date"
              className="form-control"
              placeholder="Từ ngày"
              value={filters.dateFrom}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))
              }
            />
          </div>
          <div className="filter-group">
            <input
              type="date"
              className="form-control"
              placeholder="Đến ngày"
              value={filters.dateTo}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, dateTo: e.target.value }))
              }
            />
          </div>
          <div className="filter-group">
            <button
              className="btn btn-secondary"
              onClick={() =>
                setFilters({
                  search: "",
                  status: "",
                  dateFrom: "",
                  dateTo: "",
                })
              }
            >
              <i className="fas fa-times"></i>
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
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
          totalPages={Math.ceil(filteredService.length / itemsPerPage)}
          onPageChange={setCurrentPage}
          totalItems={filteredService.length}
          itemsPerPage={itemsPerPage}
        />

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
