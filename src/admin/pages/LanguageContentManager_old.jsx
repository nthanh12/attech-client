import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  fetchLanguageContents,
  fetchLanguageContentCategories,
  createLanguageContent,
  updateLanguageContent,
  deleteLanguageContent,
} from "../../services/languageContentService";
import { reloadTranslations } from "../../i18n";
import PageWrapper from "../components/PageWrapper";
import AdminFilter from "../components/AdminFilter";
import AdminTable from "../components/AdminTable";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import AdminPageActions from "../components/AdminPageActions";
import "./LanguageContentManager.css";
import "../styles/adminTable.css";
import "../styles/adminCommon.css";
import "../styles/adminButtons.css";
import "../styles/adminPageStyles.css";

const LanguageContentManager = () => {
  const { t } = useTranslation();

  // Data state
  const [contents, setContents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  // Server-side pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
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
  });

  // Form data
  const [formData, setFormData] = useState({
    contentKey: "",
    valueVi: "",
    valueEn: "",
    category: "common",
    description: "",
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounce(filters.search);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Load data when pagination/filters change
  useEffect(() => {
    loadData();
  }, [currentPage, itemsPerPage, searchDebounce, filters.category, sortConfig]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [contentsData, categoriesData] = await Promise.all([
        fetchLanguageContents(
          currentPage,
          itemsPerPage,
          searchDebounce,
          {
            category: filters.category || undefined,
          },
          sortConfig
        ),
        fetchLanguageContentCategories(),
      ]);

      setContents(contentsData.items || []);
      setTotalItems(contentsData.totalItems || 0);
      setTotalPages(contentsData.totalPages || 1);
      setCategories(categoriesData || []);
    } catch (error) {
      setToast({
        show: true,
        message: "Lỗi khi tải dữ liệu",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to page 1 when filters change
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        contentKey: item.contentKey,
        valueVi: item.valueVi || "",
        valueEn: item.valueEn || "",
        category: item.category || "common",
        description: item.description || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        contentKey: "",
        valueVi: "",
        valueEn: "",
        category: "common",
        description: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingItem) {
        await updateLanguageContent(editingItem.id, formData);
        alert("Cập nhật thành công!");
      } else {
        await createLanguageContent(formData);
        alert("Thêm mới thành công!");
      }

      closeModal();
      loadContents();

      // Reload translations để cập nhật ngay lập tức
      await reloadTranslations("vi");
      await reloadTranslations("en");
    } catch (error) {
      alert(`Lỗi: ${error.message || "Có lỗi xảy ra"}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa nội dung này?")) return;

    try {
      await deleteLanguageContent(id);
      alert("Xóa thành công!");
      loadContents();

      // Reload translations sau khi xóa
      await reloadTranslations("vi");
      await reloadTranslations("en");
    } catch (error) {
      alert(`Lỗi: ${error.message || "Có lỗi xảy ra"}`);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading && contents.length === 0) {
    return (
      <div className="language-content-manager-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="language-content-manager">
      {/* Header */}
      <div className="language-content-header">
        <div className="header-info">
          <h2>Quản lý ngôn ngữ</h2>
          <p>Quản lý nội dung đa ngôn ngữ cho hệ thống</p>
        </div>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <i className="bi bi-plus-circle me-2"></i>
          Thêm Thông tin
        </button>
      </div>

      {/* Filters */}
      <div className="language-content-filters">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo key hoặc nội dung..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={categoryFilter}
              onChange={handleCategoryFilter}
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option
                  key={cat.id || cat.name || cat}
                  value={cat.id || cat.name || cat}
                >
                  {cat.displayName || cat.name || cat}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <div className="text-muted">Tổng: {contents.length} items</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="language-content-table">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th width="20%">Key</th>
                <th width="15%">Danh mục</th>
                <th width="25%">Tiếng Việt</th>
                <th width="25%">English</th>
                <th width="15%">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((item) => (
                <tr key={item.id}>
                  <td>
                    <code className="text-primary">{item.contentKey}</code>
                    {item.description && (
                      <div className="small text-muted mt-1">
                        {item.description}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="badge bg-secondary">
                      {item.category || "common"}
                    </span>
                  </td>
                  <td>
                    <div className="language-content-text">
                      {item.valueVi || <em className="text-muted">Chưa có</em>}
                    </div>
                  </td>
                  <td>
                    <div className="language-content-text">
                      {item.valueEn || <em className="text-muted">Chưa có</em>}
                    </div>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => openModal(item)}
                        title="Chỉnh sửa"
                      >
                        <i className="bi bi-pencil">Chỉnh sửa</i>
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(item.id)}
                        title="Xóa"
                      >
                        <i className="bi bi-trash">Xóa</i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {contents.length === 0 && !loading && (
            <div className="text-center py-4">
              <p className="text-muted">Không có dữ liệu</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="language-content-pagination">
          <nav>
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Trước
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <li
                    key={page}
                    className={`page-item ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                )
              )}

              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Sau
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingItem ? "Chỉnh sửa Thông tin" : "Thêm Thông tin Mới"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label">
                        Key <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.contentKey}
                        onChange={(e) =>
                          handleFormChange("contentKey", e.target.value)
                        }
                        placeholder="Ví dụ: common.save"
                        required
                        disabled={!!editingItem}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Danh mục</label>
                      <select
                        className="form-select"
                        value={formData.category}
                        onChange={(e) =>
                          handleFormChange("category", e.target.value)
                        }
                      >
                        {categories.map((cat) => (
                          <option
                            key={cat.id || cat.name || cat}
                            value={cat.name || cat}
                          >
                            {cat.displayName || cat.name || cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Tiếng Việt</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={formData.valueVi}
                        onChange={(e) =>
                          handleFormChange("valueVi", e.target.value)
                        }
                        placeholder="Nhập text tiếng Việt"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">English</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={formData.valueEn}
                        onChange={(e) =>
                          handleFormChange("valueEn", e.target.value)
                        }
                        placeholder="Enter English text"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Mô tả (tùy chọn)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.description}
                        onChange={(e) =>
                          handleFormChange("description", e.target.value)
                        }
                        placeholder="Mô tả ngắn gọn về key này"
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-check-lg me-2"></i>
                    {editingItem ? "Cập nhật" : "Thêm mới"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-backdrop show" onClick={closeModal}></div>
      )}
    </div>
  );
};

export default LanguageContentManager;
