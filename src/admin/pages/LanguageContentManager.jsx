import React, { useState, useEffect, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();

  // Data state
  const [contents, setContents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
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
  const [inputValue, setInputValue] = useState(""); // Local input state

  // Form data
  const [formData, setFormData] = useState({
    contentKey: "",
    valueVi: "",
    valueEn: "",
    category: "common",
    description: "",
  });

  // Debounce search - chỉ lắng nghe inputValue
  useEffect(() => {
    if (inputValue !== searchDebounce) {
      setIsSearching(true);
    }

    const timer = setTimeout(() => {
      if (searchDebounce !== inputValue) {
        setSearchDebounce(inputValue);
        setFilters(prev => ({ ...prev, search: inputValue }));
        setIsSearching(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [inputValue, searchDebounce]);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Load data when pagination/filters change - KHÔNG auto search
  useEffect(() => {
    startTransition(() => {
      loadData();
    });
  }, [currentPage, itemsPerPage, searchDebounce, filters.category, sortConfig]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [contentsData, categoriesData] = await Promise.all([
        fetchLanguageContents(currentPage, itemsPerPage, searchDebounce, {
          category: filters.category && filters.category !== "" ? filters.category : undefined
        }, sortConfig),
        fetchLanguageContentCategories(),
      ]);

      console.log('🔍 Loading data with filters:', { 
        searchDebounce, 
        category: filters.category,
        currentPage,
        itemsPerPage 
      });

      startTransition(() => {
        setContents(contentsData.items || []);
        setTotalItems(contentsData.totalItems || 0);
        setTotalPages(contentsData.totalPages || 1);
        setCategories(categoriesData || []);
      });
    } catch (error) {
      console.error("Error loading data:", error);
      setToast({
        show: true,
        message: "Lỗi khi tải dữ liệu",
        type: "error",
      });
    } finally {
      setIsLoading(false);
      setIsSearching(false); // Tắt searching state
    }
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    // Nếu là search, chỉ update inputValue (không trigger re-render)
    if (newFilters.search !== undefined) {
      setInputValue(newFilters.search);
    }
    
    // Các filter khác (category) vẫn update bình thường
    if (newFilters.category !== undefined) {
      startTransition(() => {
        setFilters(prev => ({ ...prev, category: newFilters.category }));
        setCurrentPage(1);
      });
    }
  };

  // Handle create/edit
  const handleEdit = (item) => {
    setEditMode(true);
    setEditingItem(item);
    setFormData({
      contentKey: item.contentKey,
      valueVi: item.valueVi || "",
      valueEn: item.valueEn || "",
      category: item.category || "common",
      description: item.description || "",
    });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditMode(false);
    setEditingItem(null);
    setFormData({
      contentKey: "",
      valueVi: "",
      valueEn: "",
      category: "common",
      description: "",
    });
    setShowModal(true);
  };

  // Handle delete
  const handleDelete = async (item) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa "${item.contentKey}"?`)) return;

    try {
      await deleteLanguageContent(item.id);
      setContents(prev => prev.filter(c => c.id !== item.id));
      setToast({
        show: true,
        message: "Xóa thành công!",
        type: "success",
      });

      // Reload translations
      await reloadTranslations('vi');
      await reloadTranslations('en');
    } catch (error) {
      console.error("Error deleting:", error);
      setToast({
        show: true,
        message: `Lỗi: ${error.message || "Có lỗi xảy ra"}`,
        type: "error",
      });
    }
  };

  // Handle form submit
  const handleSubmit = async () => {
    try {
      let savedContent;
      if (editMode && editingItem) {
        savedContent = await updateLanguageContent(editingItem.id, formData);
        // Update in list
        setContents(prev => prev.map(item => 
          item.id === editingItem.id ? { ...item, ...formData } : item
        ));
        setToast({
          show: true,
          message: "Cập nhật thành công!",
          type: "success",
        });
      } else {
        savedContent = await createLanguageContent(formData);
        // Reload data to get updated list
        loadData();
        setToast({
          show: true,
          message: "Thêm mới thành công!",
          type: "success",
        });
      }

      setShowModal(false);
      setEditingItem(null);

      // Reload translations
      await reloadTranslations('vi');
      await reloadTranslations('en');
    } catch (error) {
      console.error("Error saving:", error);
      setToast({
        show: true,
        message: `Lỗi: ${error.message || "Có lỗi xảy ra"}`,
        type: "error",
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Filter configuration - search + category
  const filterConfig = [
    {
      key: "search",
      type: "search",
      label: "Tìm kiếm",
      placeholder: "Tìm kiếm theo key hoặc nội dung...",
      icon: "fas fa-search"
    },
    {
      key: "category",
      type: "select", 
      label: "Danh mục",
      icon: "fas fa-tags",
      options: categories.map(cat => ({
        value: cat.name || cat,
        label: cat.displayName || cat.name || cat
      }))
    }
  ];

  // Table columns - BE có thể cần field names khác
  const columns = [
    { key: "id", label: "ID", sortable: true, width: "80px" },
    { 
      key: "contentKey", 
      label: "Key", 
      sortable: true, 
      width: "200px",
      render: (item) => (
        <div>
          <code className="text-primary" style={{ fontSize: '0.85rem' }}>
            {item.contentKey}
          </code>
          {item.description && (
            <div className="small text-muted mt-1">
              {item.description}
            </div>
          )}
        </div>
      )
    },
    { 
      key: "category", 
      label: "Danh mục", 
      sortable: true, 
      width: "120px",
      render: (item) => (
        <span className="badge bg-secondary">
          {item.category || 'common'}
        </span>
      )
    },
    { 
      key: "valueVi", 
      label: "Tiếng Việt", 
      sortable: false, // Text fields không nên sort
      width: "200px",
      render: (item) => (
        <div className="text-truncate" style={{ maxWidth: '180px' }}>
          {item.valueVi || <em className="text-muted">Chưa có</em>}
        </div>
      )
    },
    { 
      key: "valueEn", 
      label: "English", 
      sortable: false, // Text fields không nên sort  
      width: "200px",
      render: (item) => (
        <div className="text-truncate" style={{ maxWidth: '180px' }}>
          {item.valueEn || <em className="text-muted">Not set</em>}
        </div>
      )
    }
  ];

  // Action buttons for each row - NewsList pattern
  const actions = [
    {
      label: "Chỉnh sửa",
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
        AdminPageActions.createAddAction(handleCreate, "Thêm Thông tin")
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
      <div className="admin-language-content-list">{/* Match NewsList naming */}

        {/* Filters Section - Using AdminFilter Component */}
        <AdminFilter
          filters={{...filters, search: inputValue}} // Dùng inputValue cho search
          onFiltersChange={handleFiltersChange}
          onPageChange={setCurrentPage}
          filterConfig={filterConfig}
          isSearching={isSearching}
        />

        {/* Table Container */}
        <AdminTable
            data={contents}
            columns={columns}
            actions={actions}
            sortConfig={sortConfig}
            onSort={(key) => {
              startTransition(() => {
                setSortConfig((prev) => ({
                  key,
                  direction:
                    prev.key === key && prev.direction === "desc" ? "asc" : "desc",
                }));
              });
            }}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              startTransition(() => {
                setCurrentPage(page);
              });
            }}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(newSize) => {
              startTransition(() => {
                setItemsPerPage(newSize);
                setCurrentPage(1); // Reset về trang 1
              });
            }}
            loading={isLoading || isPending}
            emptyText="Chưa có dữ liệu ngôn ngữ"
        />

        {/* Modal Form */}
        <FormModal
          show={showModal}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          title={editMode ? "Chỉnh sửa Thông tin" : "Thêm Thông tin Mới"}
          size="lg"
          submitText={editMode ? "Cập nhật" : "Thêm mới"}
        >
          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label">
                Key <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.contentKey}
                onChange={(e) => handleFormChange("contentKey", e.target.value)}
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
                onChange={(e) => handleFormChange("category", e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.id || cat.name || cat} value={cat.name || cat}>
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
                onChange={(e) => handleFormChange("valueVi", e.target.value)}
                placeholder="Nhập text tiếng Việt"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">English</label>
              <textarea
                className="form-control"
                rows="3"
                value={formData.valueEn}
                onChange={(e) => handleFormChange("valueEn", e.target.value)}
                placeholder="Enter English text"
              />
            </div>
            <div className="col-12">
              <label className="form-label">Mô tả (tùy chọn)</label>
              <input
                type="text"
                className="form-control"
                value={formData.description}
                onChange={(e) => handleFormChange("description", e.target.value)}
                placeholder="Mô tả ngắn gọn về key này"
              />
            </div>
          </div>
        </FormModal>

        {/* Toast Message */}
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

export default LanguageContentManager;