import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./NotificationCategory.css";
import "../../styles/adminTable.css";
import "../../styles/adminCommon.css";
import {
  getNotificationCategories,
  createNotificationCategory,
  updateNotificationCategory,
  deleteNotificationCategory,
  updateNotificationCategoryStatus,
} from "../../../api";
import { mockNotificationCategories } from "../../../utils/mockData.js";
import DataTable from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import ToastMessage from "../../components/ToastMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReactModal from 'react-modal';

const NotificationCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  // Định nghĩa object emptyCategory để dùng cho khởi tạo/reset form
  const emptyCategory = {
    id: null,
    nameVi: "",
    nameEn: "",
    descriptionVi: "",
    descriptionEn: "",
    slugVi: "",
    slugEn: "",
    status: "active",
  };
  const [currentCategory, setCurrentCategory] = useState({ ...emptyCategory });
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [translating, setTranslating] = useState({});
  const [activeTab, setActiveTab] = useState('vi');

  // Hàm dịch sử dụng backend proxy, fallback copy text
  const translateProxy = async (text) => {
    if (!text) return '';
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        source: 'vi',
        target: 'en'
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.translatedText;
  };

  const handleTranslate = async (fromField, toField) => {
    const text = currentCategory[fromField] || '';
    if (!text) return;
    setTranslating(prev => ({ ...prev, [toField]: true }));
    try {
      const translated = await translateProxy(text);
      setCurrentCategory(prev => ({ ...prev, [toField]: translated }));
    } catch (err) {
      setCurrentCategory(prev => ({ ...prev, [toField]: text }));
    } finally {
      setTranslating(prev => ({ ...prev, [toField]: false }));
    }
  };

  useEffect(() => {
    setCategories(mockNotificationCategories);
    // Sử dụng mock categories thay vì API call
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
    setCurrentCategory({ ...emptyCategory });
  }, []);

  const handleAddNew = () => {
    setEditMode(false);
    setCurrentCategory({ ...emptyCategory });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (categoryItem) => {
    setEditMode(true);
    setCurrentCategory({
      id: categoryItem.id,
      nameVi: categoryItem.nameVi || "",
      nameEn: categoryItem.nameEn || "",
      descriptionVi: categoryItem.descriptionVi || "",
      descriptionEn: categoryItem.descriptionEn || "",
      slugVi: categoryItem.slugVi || "",
      slugEn: categoryItem.slugEn || "",
      status: categoryItem.status === 1 ? "active" : "inactive",
    });
    setErrors({});
    setShowModal(true);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!currentCategory.nameVi.trim()) {
      newErrors.nameVi = 'Tên danh mục tiếng Việt là bắt buộc';
    }
    
    if (!currentCategory.nameEn.trim()) {
      newErrors.nameEn = 'Tên danh mục tiếng Anh là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitLoading(true);
    try {
      if (editMode) {
        // Update category
        setCategories(prev => prev.map(item => 
          item.id === currentCategory.id ? {
            ...item,
            nameVi: currentCategory.nameVi,
            nameEn: currentCategory.nameEn,
            descriptionVi: currentCategory.descriptionVi,
            descriptionEn: currentCategory.descriptionEn,
            slugVi: currentCategory.slugVi,
            slugEn: currentCategory.slugEn,
            status: currentCategory.status === "active" ? 1 : 0,
          } : item
        ));
        setToast({ show: true, message: 'Cập nhật danh mục thành công!', type: 'success' });
      } else {
        // Create new category
        const newCategory = {
          id: Date.now(),
          nameVi: currentCategory.nameVi,
          nameEn: currentCategory.nameEn,
          descriptionVi: currentCategory.descriptionVi,
          descriptionEn: currentCategory.descriptionEn,
          slugVi: currentCategory.slugVi,
          slugEn: currentCategory.slugEn,
          status: currentCategory.status === "active" ? 1 : 0,
        };
        setCategories(prev => [newCategory, ...prev]);
        setToast({ show: true, message: 'Thêm danh mục thành công!', type: 'success' });
      }
      handleCloseModal();
    } catch (error) {
      setToast({ show: true, message: 'Lỗi khi lưu danh mục!', type: 'error' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      setCategories(prev => prev.filter(item => item.id !== id));
      setToast({ show: true, message: 'Xóa danh mục thành công!', type: 'success' });
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentCategory(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const filteredCategories = categories.filter(item => {
    const matchesSearch = item.nameVi.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.nameEn.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.descriptionVi.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.descriptionEn.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || 
                         (filters.status === "active" && item.status === 1) ||
                         (filters.status === "inactive" && item.status === 0);
    
    return matchesSearch && matchesStatus;
  });

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
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
    { key: 'id', label: 'ID', sortable: true },
    { key: 'nameVi', label: 'Tên danh mục (VI)', sortable: true },
    { key: 'nameEn', label: 'Tên danh mục (EN)', sortable: true },
    { key: 'descriptionVi', label: 'Mô tả (VI)', render: value => value ? <span title={value}>{value.length > 30 ? value.slice(0, 30) + '...' : value}</span> : '' },
    {
      key: 'status',
      label: 'Trạng thái',
      sortable: true,
      render: value => (
        <span className={`status-badge ${value === 1 || value === 'active' ? 'active' : 'inactive'}`}>
          {value === 1 || value === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Thao tác',
      render: (value, item) => (
        <div className="action-buttons">
          <button className="btn btn-sm btn-primary" onClick={() => handleEdit(item)} title="Chỉnh sửa">
            <i className="bi bi-pencil"></i>
            <span>Sửa</span>
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => handleDeleteCategory(item.id)} title="Xóa">
            <i className="bi bi-trash"></i>
            <span>Xóa</span>
          </button>
        </div>
      )
    }
  ];

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const renderFilters = () => (
    <div className="filters-section">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Tìm kiếm danh mục..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="form-control"
        />
      </div>
      <div className="filter-group">
        <select
          value={filters.status}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          className="form-control"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Không hoạt động</option>
        </select>
      </div>
    </div>
  );

  const renderCategoryForm = () => (
    <div className="category-form">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button type="button" className={`btn btn-tab${activeTab === 'vi' ? ' active' : ''}`} onClick={() => setActiveTab('vi')}>Thông tin & Tiếng Việt</button>
        <button type="button" className={`btn btn-tab${activeTab === 'en' ? ' active' : ''}`} onClick={() => setActiveTab('en')}>Tiếng Anh</button>
      </div>
      {activeTab === 'vi' && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>Tên danh mục (VI) *</label>
              <input type="text" value={currentCategory.nameVi} onChange={e => handleInputChange('nameVi', e.target.value)} className={`form-control ${errors.nameVi ? 'is-invalid' : ''}`} placeholder="Nhập tên danh mục tiếng Việt" />
              {errors.nameVi && <div className="invalid-feedback">{errors.nameVi}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Mô tả (VI)</label>
              <textarea value={currentCategory.descriptionVi} onChange={e => handleInputChange('descriptionVi', e.target.value)} className="form-control" rows="2" placeholder="Nhập mô tả tiếng Việt" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Slug (VI)</label>
              <input type="text" value={currentCategory.slugVi} onChange={e => handleInputChange('slugVi', e.target.value)} className="form-control" placeholder="Nhập slug tiếng Việt" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Trạng thái</label>
              <select value={currentCategory.status} onChange={e => handleInputChange('status', e.target.value)} className="form-control">
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
          </div>
        </>
      )}
      {activeTab === 'en' && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>Category Name (EN) *</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="text" value={currentCategory.nameEn} onChange={e => handleInputChange('nameEn', e.target.value)} className={`form-control ${errors.nameEn ? 'is-invalid' : ''}`} placeholder="Enter category name in English" />
                <button type="button" className="btn btn-sm btn-secondary" onClick={() => handleTranslate('nameVi', 'nameEn')} title="Dịch từ tiếng Việt" disabled={!!translating.nameEn}>{translating.nameEn ? 'Đang dịch...' : 'Dịch'}</button>
              </div>
              {errors.nameEn && <div className="invalid-feedback">{errors.nameEn}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Description (EN)</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <textarea value={currentCategory.descriptionEn} onChange={e => handleInputChange('descriptionEn', e.target.value)} className="form-control" rows="2" placeholder="Enter description in English" />
                <button type="button" className="btn btn-sm btn-secondary" onClick={() => handleTranslate('descriptionVi', 'descriptionEn')} title="Dịch từ tiếng Việt" disabled={!!translating.descriptionEn}>{translating.descriptionEn ? 'Đang dịch...' : 'Dịch'}</button>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Slug (EN)</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="text" value={currentCategory.slugEn} onChange={e => handleInputChange('slugEn', e.target.value)} className="form-control" placeholder="Enter slug in English" />
                <button type="button" className="btn btn-sm btn-secondary" onClick={() => handleTranslate('slugVi', 'slugEn')} title="Dịch từ tiếng Việt" disabled={!!translating.slugEn}>{translating.slugEn ? 'Đang dịch...' : 'Dịch'}</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-category-list">
      <div className="page-header">
        <h1>Quản lý danh mục thông báo</h1>
        <button className="btn btn-primary" onClick={handleAddNew}>
          <i className="bi bi-plus"></i>
          Thêm danh mục
        </button>
      </div>

      {renderFilters()}

      <div className="admin-table-container">
        <DataTable
          data={paginatedCategories}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sortConfig={sortConfig}
          onSort={handleSort}
          itemsPerPage={itemsPerPage}
          totalItems={sortedCategories.length}
          tableClassName="admin-table"
        />
      </div>

      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Danh mục thông báo"
        style={{
          overlay: { zIndex: 1000, background: "rgba(0,0,0,0.5)" },
          content: {
            zIndex: 1001,
            maxWidth: "800px",
            width: "90vw",
            minWidth: "320px",
            margin: "auto",
            borderRadius: 12,
            padding: 0,
            border: "none",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          },
        }}
        ariaHideApp={false}
      >
        <div
          className="modal-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 24px 0 24px",
            borderBottom: "1px solid #eee",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>
            {editMode ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
          </h2>
          <button
            className="modal-close"
            onClick={handleCloseModal}
            aria-label="Đóng"
            style={{
              background: "none",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              color: "#6b7280",
            }}
          >
            ✕
          </button>
        </div>
        <div className="modal-body" style={{ padding: "24px" }}>
          {renderCategoryForm()}
        </div>
        <div
          className="modal-footer"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            padding: "0 24px 24px 24px",
            borderTop: "1px solid #eee",
          }}
        >
          <button onClick={handleCloseModal} className="btn btn-secondary">
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={submitLoading}
          >
            {submitLoading ? "Đang xử lý..." : editMode ? "Cập nhật" : "Thêm"}
          </button>
        </div>
      </ReactModal>

      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default NotificationCategory;
