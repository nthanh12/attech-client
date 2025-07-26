import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./ProductCategory.css";
import "../../styles/adminTable.css";
import "../../styles/adminCommon.css";
import {
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  updateProductCategoryStatus,
} from "../../../api";
import { mockProductCategories } from "../../../utils/mockData.js";
import DataTable from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import ToastMessage from "../../components/ToastMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReactModal from 'react-modal';
import { fetchProductCategories } from '../../../services/productService';

const ProductCategory = () => {
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
    setCategories(mockProductCategories);
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
            <div className="form-group">
              <label>Tên danh mục (EN)</label>
              <input type="text" value={currentCategory.nameEn} onChange={e => handleInputChange('nameEn', e.target.value)} className="form-control" placeholder="Nhập tên danh mục tiếng Anh" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Slug (VI)</label>
              <input type="text" value={currentCategory.slugVi} onChange={e => handleInputChange('slugVi', e.target.value)} className="form-control" placeholder="Nhập slug tiếng Việt" />
            </div>
            <div className="form-group">
              <label>Slug (EN)</label>
              <input type="text" value={currentCategory.slugEn} onChange={e => handleInputChange('slugEn', e.target.value)} className="form-control" placeholder="Nhập slug tiếng Anh" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Mô tả (VI)</label>
              <textarea value={currentCategory.descriptionVi} onChange={e => handleInputChange('descriptionVi', e.target.value)} className="form-control" placeholder="Nhập mô tả tiếng Việt"></textarea>
            </div>
            <div className="form-group">
              <label>Mô tả (EN)</label>
              <textarea value={currentCategory.descriptionEn} onChange={e => handleInputChange('descriptionEn', e.target.value)} className="form-control" placeholder="Nhập mô tả tiếng Anh"></textarea>
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
              <label>Tên danh mục (EN) *</label>
              <input type="text" value={currentCategory.nameEn} onChange={e => handleInputChange('nameEn', e.target.value)} className={`form-control ${errors.nameEn ? 'is-invalid' : ''}`} placeholder="Nhập tên danh mục tiếng Anh" />
              {errors.nameEn && <div className="invalid-feedback">{errors.nameEn}</div>}
            </div>
            <div className="form-group">
              <label>Tên danh mục (VI)</label>
              <input type="text" value={currentCategory.nameVi} onChange={e => handleInputChange('nameVi', e.target.value)} className="form-control" placeholder="Nhập tên danh mục tiếng Việt" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Slug (EN)</label>
              <input type="text" value={currentCategory.slugEn} onChange={e => handleInputChange('slugEn', e.target.value)} className="form-control" placeholder="Nhập slug tiếng Anh" />
            </div>
            <div className="form-group">
              <label>Slug (VI)</label>
              <input type="text" value={currentCategory.slugVi} onChange={e => handleInputChange('slugVi', e.target.value)} className="form-control" placeholder="Nhập slug tiếng Việt" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Mô tả (EN)</label>
              <textarea value={currentCategory.descriptionEn} onChange={e => handleInputChange('descriptionEn', e.target.value)} className="form-control" placeholder="Nhập mô tả tiếng Anh"></textarea>
            </div>
            <div className="form-group">
              <label>Mô tả (VI)</label>
              <textarea value={currentCategory.descriptionVi} onChange={e => handleInputChange('descriptionVi', e.target.value)} className="form-control" placeholder="Nhập mô tả tiếng Việt"></textarea>
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
    </div>
  );

  const renderModal = () => (
    <ReactModal
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      contentLabel="Product Category Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>{editMode ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {renderCategoryForm()}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal} disabled={submitLoading}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitLoading}>
              {submitLoading ? <LoadingSpinner /> : editMode ? 'Cập nhật' : 'Thêm'}
            </button>
          </div>
        </form>
      )}
    </ReactModal>
  );

  return (
    <div className="product-category-container">
      <h1>Quản lý danh mục sản phẩm</h1>
      <div className="actions-bar">
        <button className="btn btn-primary" onClick={handleAddNew}>
          <i className="bi bi-plus-circle"></i> Thêm danh mục
        </button>
      </div>
      {renderFilters()}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={paginatedCategories}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onSort={handleSort}
          sortConfig={sortConfig}
          onSearch={setFilters}
          search={filters.search}
          onStatusFilter={setFilters}
          statusFilter={filters.status}
        />
      )}
      {toast.show && <ToastMessage message={toast.message} type={toast.type} />}
      {renderModal()}
    </div>
  );
};

export default ProductCategory;