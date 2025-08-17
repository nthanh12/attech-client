import React, { useState, useEffect, useCallback } from "react";
import { useFormWithConfirm } from "../../../hooks/useFormWithConfirm";
import {
  handleApiResponse,
  handleApiError,
  prepareCategoryData,
} from "../../../utils/apiResponseHandler";
import {
  createNotificationCategory,
  updateNotificationCategory,
  deleteNotificationCategory,
  fetchNotificationCategories,
} from "../../../services/notificationService";
import { translateViToEn } from "../../../services/translationService";
import { generateSlug } from "../../../utils/slugUtils";
import DataTable from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import ToastMessage from "../../components/ToastMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageWrapper from "../../components/PageWrapper";
import "../../styles/adminCategory.css";
import "../../styles/adminTable.css";
import "../../styles/adminCommon.css";

const NotificationCategory = () => {
  const emptyCategory = {
    titleVi: "",
    titleEn: "",
    descriptionVi: "",
    descriptionEn: "",
    slugVi: "",
    slugEn: "",
    status: "active",
  };

  const fieldsToCompare = [
    "titleVi",
    "titleEn",
    "slugVi",
    "slugEn",
    "descriptionVi",
    "descriptionEn",
    "status",
  ];

  const {
    currentData: currentCategory,
    editMode,
    showModal,
    errors,
    submitLoading,
    handleCloseModal,
    resetForm,
    handleAddNew,
    handleEdit,
    handleInputChange,
    setSubmitLoading,
    setErrors,
  } = useFormWithConfirm(emptyCategory, fieldsToCompare);

  // Custom handleEdit để map dữ liệu từ API response sang form format
  const handleEditCategory = useCallback(
    (item) => {
      console.log("🔍 handleEditCategory - Original item:", item);

      // Map dữ liệu từ API response sang form format
      const mappedItem = {
        id: item.id,
        titleVi: item.titleVi || "",
        titleEn: item.titleEn || "",
        descriptionVi: item.descriptionVi || "",
        descriptionEn: item.descriptionEn || "",
        slugVi: item.slugVi || "",
        slugEn: item.slugEn || "",
        status:
          typeof item.status === "string"
            ? item.status
            : item.status === 1
            ? "active"
            : "inactive",
      };

      console.log("🔍 handleEditCategory - Mapped item:", mappedItem);

      handleEdit(mappedItem);
    },
    [handleEdit]
  );

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });
  const [translating, setTranslating] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });

  // Custom handleInputChange với auto-generate slug
  const handleInputChangeWithSlug = (field, value) => {
    handleInputChange(field, value);

    // Auto-generate slug khi title thay đổi
    if (field === "titleVi" && value) {
      const newSlugVi = generateSlug(value);
      handleInputChange("slugVi", newSlugVi);
    } else if (field === "titleEn" && value) {
      const newSlugEn = generateSlug(value);
      handleInputChange("slugEn", newSlugEn);
    }
  };

  // Kiểm tra xem có dữ liệu thay đổi không
  const hasUnsavedChanges = () => {
    // Logic này đã được handle trong hook
    return false;
  };

  // Kiểm tra xem form có dữ liệu không
  const hasFormData = () => {
    // Logic này đã được handle trong hook
    return false;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const categoriesData = await fetchNotificationCategories();

        // Map dữ liệu từ API về format camelCase
        const mappedCategories = categoriesData.map((item) => ({
          id: item.id,
          titleVi: item.titleVi || "",
          titleEn: item.titleEn || "",
          descriptionVi: item.descriptionVi || "",
          descriptionEn: item.descriptionEn || "",
          slugVi: item.slugVi || "",
          slugEn: item.slugEn || "",
          status: item.status === 1 ? "active" : "inactive",
        }));

        setCategories(mappedCategories);
      } catch (error) {
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const errorMessages = [];

    if (!currentCategory.titleVi.trim()) {
      newErrors.titleVi = "Tên danh mục tiếng Việt là bắt buộc";
      errorMessages.push("Tên danh mục tiếng Việt là bắt buộc");
    }

    if (!currentCategory.titleEn.trim()) {
      newErrors.titleEn = "Tên danh mục tiếng Anh là bắt buộc";
      errorMessages.push("Tên danh mục tiếng Anh là bắt buộc");
    }

    setErrors(newErrors);

    // Nếu có lỗi, hiển thị toast
    if (Object.keys(newErrors).length > 0) {
      const errorMessage = errorMessages.join(", ");
      setToast({
        show: true,
        message: `Vui lòng kiểm tra lại thông tin: ${errorMessage}`,
        type: "error",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return; // Return sớm nếu validation fail
    }

    setSubmitLoading(true);
    try {
      // Chuẩn bị dữ liệu theo format API
      const categoryData = prepareCategoryData(currentCategory);

      if (editMode) {
        // Update category - gọi API
        console.log("🔄 Updating notification category:", categoryData);
        const response = await updateNotificationCategory({
          id: currentCategory.id,
          ...categoryData,
        });

        handleApiResponse(
          response,
          "update",
          // onSuccess callback
          (response) => {
            console.log("✅ Update success callback, response:", response);
            const responseData = response.data || categoryData;
            const updatedData = {
              titleVi: responseData.titleVi || "",
              titleEn: responseData.titleEn || "",
              descriptionVi: responseData.descriptionVi || "",
              descriptionEn: responseData.descriptionEn || "",
              slugVi: responseData.slugVi || "",
              slugEn: responseData.slugEn || "",
              status: responseData.status === 1 ? "active" : "inactive",
            };
            setCategories((prev) =>
              prev.map((item) =>
                item.id === currentCategory.id
                  ? {
                      ...item,
                      ...updatedData,
                    }
                  : item
              )
            );
            resetForm();
          },
          // onError callback
          (response) => {
            console.log("❌ Update error callback, response:", response);
          },
          setToast
        );
      } else {
        // Create new category - gọi API
        console.log("🔄 Creating new notification category:", categoryData);
        const response = await createNotificationCategory(categoryData);

        handleApiResponse(
          response,
          "create",
          // onSuccess callback
          (response) => {
            console.log("✅ Create success callback, response:", response);
            const responseData = response.data || categoryData;
            const newCategory = {
              id: responseData?.id || Date.now(),
              titleVi: responseData.titleVi || "",
              titleEn: responseData.titleEn || "",
              descriptionVi: responseData.descriptionVi || "",
              descriptionEn: responseData.descriptionEn || "",
              slugVi: responseData.slugVi || "",
              slugEn: responseData.slugEn || "",
              status: responseData.status === 1 ? "active" : "inactive",
            };
            console.log("📝 New category to add:", newCategory);
            setCategories((prev) => [newCategory, ...prev]);
            resetForm();
          },
          // onError callback
          (response) => {},
          setToast
        );
      }
    } catch (error) {
      handleApiError(error, setToast, "lưu danh mục");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        console.log("🗑️ Deleting notification category with ID:", id);
        const response = await deleteNotificationCategory(id);

        handleApiResponse(
          response,
          "delete",
          // onSuccess callback
          (response) => {
            setCategories((prev) => prev.filter((item) => item.id !== id));
          },
          // onError callback
          (response) => {
            // Không làm gì, chỉ hiển thị toast lỗi
          },
          setToast
        );
      } catch (error) {
        handleApiError(error, setToast, "xóa danh mục");
      }
    }
  };

  const handleTranslate = async (fromField, toField) => {
    const text = currentCategory[fromField] || "";
    if (!text) return;

    setTranslating((prev) => ({ ...prev, [toField]: true }));
    try {
      const translated = await translateViToEn(text);
      handleInputChange(toField, translated);

      // Nếu translate title EN, thì cũng update slug EN
      if (toField === "titleEn" && translated) {
        const newSlugEn = generateSlug(translated);
        handleInputChange("slugEn", newSlugEn);
      }
    } catch (err) {
      handleInputChange(toField, text);
    } finally {
      setTranslating((prev) => ({ ...prev, [toField]: false }));
    }
  };

  const filteredCategories = categories.filter((item) => {
    const matchesSearch =
      (item.titleVi || "")
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      (item.titleEn || "")
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      (item.descriptionVi || "")
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      (item.descriptionEn || "")
        .toLowerCase()
        .includes(filters.search.toLowerCase());
    const matchesStatus =
      !filters.status ||
      (filters.status === "active" && item.status === 1) ||
      (filters.status === "inactive" && item.status === 0);

    return matchesSearch && matchesStatus;
  });

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedCategories = sortedCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedCategories.length / itemsPerPage);

  const columns = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      width: "80px",
    },
    {
      key: "titleVi",
      label: "Tên danh mục (VI)",
      sortable: true,
      width: "200px",
      render: (row) => (
        <div
          style={{
            maxWidth: "180px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            title: row.titleVi,
          }}
        >
          {row.titleVi || "-"}
        </div>
      ),
    },
    {
      key: "titleEn",
      label: "Tên danh mục (EN)",
      sortable: true,
      width: "200px",
      render: (row) => (
        <div
          style={{
            maxWidth: "180px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            title: row.titleEn,
          }}
        >
          {row.titleEn || "-"}
        </div>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      sortable: true,
      width: "120px",
      render: (row) => (
        <span
          className={`badge ${
            row.status === 1 || row.status === "active" || row.Status === 1
              ? "badge-success"
              : "badge-secondary"
          }`}
        >
          {row.status === 1 || row.status === "active" || row.Status === 1
            ? "Hoạt động"
            : "Không hoạt động"}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: "Sửa",
      onClick: handleEditCategory,
      className: "btn btn-sm btn-primary",
    },
    {
      label: "Xóa",
      onClick: (row) => handleDeleteCategory(row.id),
      className: "btn btn-sm btn-danger",
    },
  ];

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const pageActions = (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <button
        className="btn btn-outline-secondary"
        onClick={() => window.location.reload()}
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
        title="Làm mới danh sách danh mục"
      >
        <i className="fas fa-refresh"></i>
        Làm mới
      </button>
      <button
        className="btn btn-primary"
        onClick={handleAddNew}
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
        Thêm danh mục
      </button>
    </div>
  );

  return (
    <PageWrapper actions={pageActions}>
      <div className="admin-category-page">
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filter-group">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm danh mục..."
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
              <option value="">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>
          <div className="filter-group">
            <button
              className="btn btn-secondary"
              onClick={() =>
                setFilters({
                  search: "",
                  status: "",
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
          data={paginatedCategories}
          columns={columns}
          actions={actions}
          sortConfig={sortConfig}
          onSort={handleSort}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={sortedCategories.length}
          itemsPerPage={itemsPerPage}
        />

        {/* Modal with Category Form */}
        <FormModal
          show={showModal}
          onClose={handleCloseModal}
          title={editMode ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
          size="xl"
          showActions={false}
        >
          <div className="category-form">
            <div className="form-header">
              <h2>
                {editMode ? "Chỉnh sửa danh mục" : "Tạo danh mục tin tức mới"}
              </h2>
            </div>

            <div className="form-content">
              {/* Content Fields - Side by side Vi/En */}
              <div className="form-section">
                <h4>Thông tin danh mục</h4>

                {/* Title Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Tên danh mục (Tiếng Việt) *</label>
                    <input
                      type="text"
                      value={currentCategory.titleVi}
                      onChange={(e) =>
                        handleInputChangeWithSlug("titleVi", e.target.value)
                      }
                      className={errors.titleVi ? "error" : ""}
                      placeholder="Nhập tên danh mục tiếng Việt..."
                    />
                    {errors.titleVi && (
                      <span className="error-text">{errors.titleVi}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Category Name (English)</label>
                    <div className="input-with-translate">
                      <input
                        type="text"
                        value={currentCategory.titleEn}
                        onChange={(e) =>
                          handleInputChangeWithSlug("titleEn", e.target.value)
                        }
                        className={errors.titleEn ? "error" : ""}
                        placeholder="English name will be auto-generated..."
                      />
                      <button
                        type="button"
                        onClick={() => handleTranslate("titleVi", "titleEn")}
                        disabled={
                          translating.titleEn || !currentCategory.titleVi
                        }
                        className="translate-btn"
                      >
                        {translating.titleEn ? "..." : "Dịch"}
                      </button>
                    </div>
                    {errors.titleEn && (
                      <span className="error-text">{errors.titleEn}</span>
                    )}
                  </div>
                </div>

                {/* Description Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Mô tả (Tiếng Việt)</label>
                    <textarea
                      value={currentCategory.descriptionVi}
                      onChange={(e) =>
                        handleInputChangeWithSlug(
                          "descriptionVi",
                          e.target.value
                        )
                      }
                      rows="3"
                      placeholder="Nhập mô tả tiếng Việt..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Description (English)</label>
                    <div className="input-with-translate">
                      <textarea
                        value={currentCategory.descriptionEn}
                        onChange={(e) =>
                          handleInputChangeWithSlug(
                            "descriptionEn",
                            e.target.value
                          )
                        }
                        rows="3"
                        placeholder="English description will be auto-generated..."
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleTranslate("descriptionVi", "descriptionEn")
                        }
                        disabled={
                          translating.descriptionEn ||
                          !currentCategory.descriptionVi
                        }
                        className="translate-btn"
                      >
                        {translating.descriptionEn ? "..." : "Dịch"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common fields - 2 columns layout */}
              <div className="form-section">
                <h4>Cài đặt chung</h4>

                <div className="form-row">
                  <div className="form-group">
                    <label>Trạng thái</label>
                    <select
                      value={currentCategory.status}
                      onChange={(e) =>
                        handleInputChangeWithSlug("status", e.target.value)
                      }
                    >
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Không hoạt động</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Slugs section */}
              <div className="form-section">
                <h4>URL thân thiện (SEO)</h4>

                <div className="form-row">
                  <div className="form-group">
                    <label>Slug tiếng Việt</label>
                    <input
                      type="text"
                      value={currentCategory.slugVi}
                      onChange={(e) =>
                        handleInputChangeWithSlug("slugVi", e.target.value)
                      }
                      placeholder="Slug tự động tạo từ tên danh mục VI"
                    />
                    <small className="form-text">
                      Slug tự động tạo từ tên danh mục VI
                    </small>
                  </div>

                  <div className="form-group">
                    <label>Slug tiếng Anh</label>
                    <input
                      type="text"
                      value={currentCategory.slugEn}
                      onChange={(e) =>
                        handleInputChangeWithSlug("slugEn", e.target.value)
                      }
                      placeholder="Slug tự động tạo từ tên danh mục EN"
                    />
                    <small className="form-text">
                      Slug tự động tạo từ tên danh mục EN
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                <i className="fas fa-times"></i>
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={submitLoading}
              >
                {submitLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <i className={editMode ? "fas fa-save" : "fas fa-plus"}></i>
                    {editMode ? "Cập nhật" : "Thêm"}
                  </>
                )}
              </button>
            </div>
          </div>
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

export default NotificationCategory;
