import React, { useState, useEffect, useMemo, useCallback } from "react";
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/content/default/content.min.css';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/codesample';
import "./ProductsList.css";
import "../styles/adminTable.css";
import "../styles/adminCommon.css";
import {
  getProducts,
  getProductCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api";
import { mockProducts, mockProductCategories } from "../../utils/mockData.js";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import ReactModal from 'react-modal';

const ProductsList = () => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  // Định nghĩa object emptyProduct để dùng cho khởi tạo/reset form
  const emptyProduct = {
    id: null,
    nameVi: "",
    nameEn: "",
    category: "",
    content: "",
    summary: "",
    imageUrl: "",
    featured: false,
    status: "active",
    publishDate: new Date().toISOString().split("T")[0],
  };
  const [currentProduct, setCurrentProduct] = useState({ ...emptyProduct });
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    setProduct(mockProducts);
    // Sử dụng mock categories thay vì API call
    setCategories(mockProductCategories);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
    setCurrentProduct({ ...emptyProduct });
  }, []);

  const handleAddNew = () => {
    setEditMode(false);
    setCurrentProduct({ ...emptyProduct });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (productItem) => {
    setEditMode(true);
    setCurrentProduct({
      id: productItem.id,
      nameVi: productItem.nameVi || "",
      nameEn: productItem.nameEn || "",
      category: productItem.productCategoryId || "",
      content: productItem.contentVi || "",
      summary: productItem.descriptionVi || "",
      imageUrl: productItem.image || "",
      featured: productItem.featured || false,
      status: productItem.status === 1 ? "active" : "inactive",
      publishDate: productItem.timePosted ? productItem.timePosted.split("T")[0] : new Date().toISOString().split("T")[0],
    });
    setErrors({});
    setShowModal(true);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!currentProduct.nameVi.trim()) {
      newErrors.nameVi = 'Tên sản phẩm tiếng Việt là bắt buộc';
    }
    
    if (!currentProduct.nameEn.trim()) {
      newErrors.nameEn = 'Tên sản phẩm tiếng Anh là bắt buộc';
    }
    
    if (!currentProduct.category) {
      newErrors.category = 'Danh mục là bắt buộc';
    }
    
    if (!currentProduct.content.trim()) {
      newErrors.content = 'Nội dung là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitLoading(true);
    try {
      if (editMode) {
        // Update product
        setProduct(prev => prev.map(item => 
          item.id === currentProduct.id ? {
            ...item,
            nameVi: currentProduct.nameVi,
            nameEn: currentProduct.nameEn,
            contentVi: currentProduct.content,
            contentEn: currentProduct.content,
            descriptionVi: currentProduct.descriptionVi,
            descriptionEn: currentProduct.descriptionEn,
            productCategoryId: currentProduct.category,
            status: currentProduct.status === "active" ? 1 : 0,
            image: currentProduct.imageUrl,
            featured: currentProduct.featured
          } : item
        ));
        setToast({ show: true, message: 'Cập nhật sản phẩm thành công!', type: 'success' });
      } else {
        // Create new product
        const newProduct = {
          id: Date.now(),
          nameVi: currentProduct.nameVi,
          nameEn: currentProduct.nameEn,
          contentVi: currentProduct.content,
          contentEn: currentProduct.content,
          descriptionVi: currentProduct.descriptionVi,
          descriptionEn: currentProduct.descriptionEn,
          productCategoryId: currentProduct.category,
          status: currentProduct.status === "active" ? 1 : 0,
          image: currentProduct.imageUrl,
          featured: currentProduct.featured,
          timePosted: new Date().toISOString()
        };
        setProduct(prev => [newProduct, ...prev]);
        setToast({ show: true, message: 'Thêm sản phẩm thành công!', type: 'success' });
      }
      handleCloseModal();
    } catch (error) {
      setToast({ show: true, message: 'Lỗi khi lưu sản phẩm!', type: 'error' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProduct(prev => prev.filter(item => item.id !== id));
      setToast({ show: true, message: 'Xóa sản phẩm thành công!', type: 'success' });
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentProduct(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const filteredProducts = product.filter(item => {
    const matchesSearch = item.nameVi.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.nameEn.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.descriptionVi.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.descriptionEn.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || item.productCategoryId === parseInt(filters.category);
    const matchesStatus = !filters.status || 
                         (filters.status === "active" && item.status === 1) ||
                         (filters.status === "inactive" && item.status === 0);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const columns = [
    { key: 'nameVi', label: 'Tên sản phẩm (VI)', sortable: true },
    { key: 'nameEn', label: 'Product Name (EN)', sortable: true },
    { 
      key: 'descriptionVi', 
      label: 'Mô tả (VI)', 
      render: (value) => value ? <span title={value}>...</span> : ''
    },
    { 
      key: 'descriptionEn', 
      label: 'Description (EN)', 
      render: (value) => value ? <span title={value}>...</span> : ''
    },
    {
      key: 'productCategoryNameVi',
      label: 'Danh mục',
      sortable: true
    },
    {
      key: 'status',
      label: 'Trạng thái',
      sortable: true,
      render: (value) => (
        <span className={`status-badge ${value === 1 ? 'active' : 'inactive'}`}>
          {value === 1 ? 'Hoạt động' : 'Không hoạt động'}
        </span>
      )
    },
    {
      key: 'featured',
      label: 'Nổi bật',
      sortable: true,
      render: (value) => (
        <span className={`featured-badge ${value ? 'featured' : 'normal'}`}>
          {value ? 'Có' : 'Không'}
        </span>
      )
    },
    {
      key: 'timePosted',
      label: 'Ngày đăng',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('vi-VN')
    },
    {
      key: 'actions',
      label: 'Thao tác',
      render: (value, item) => (
        <div className="action-buttons">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(item)}
            title="Chỉnh sửa"
          >
            <i className="bi bi-pencil"></i>
            <span>Sửa</span>
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDeleteProduct(item.id)}
            title="Xóa"
          >
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
          placeholder="Tìm kiếm sản phẩm..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="form-control"
        />
      </div>
      <div className="filter-group">
        <select
          value={filters.category}
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          className="form-control"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.nameVi}</option>
          ))}
        </select>
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

  const renderProductForm = () => (
    <div className="product-form">
      <div className="form-row">
        <div className="form-group">
          <label>Tên sản phẩm (VI) *</label>
          <input
            type="text"
            value={currentProduct.nameVi}
            onChange={(e) => handleInputChange('nameVi', e.target.value)}
            className={`form-control ${errors.nameVi ? 'is-invalid' : ''}`}
            placeholder="Nhập tên sản phẩm tiếng Việt"
          />
          {errors.nameVi && <div className="invalid-feedback">{errors.nameVi}</div>}
        </div>
        <div className="form-group">
          <label>Product Name (EN) *</label>
          <input
            type="text"
            value={currentProduct.nameEn}
            onChange={(e) => handleInputChange('nameEn', e.target.value)}
            className={`form-control ${errors.nameEn ? 'is-invalid' : ''}`}
            placeholder="Enter product name in English"
          />
          {errors.nameEn && <div className="invalid-feedback">{errors.nameEn}</div>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Mô tả (VI)</label>
          <textarea
            value={currentProduct.descriptionVi}
            onChange={(e) => handleInputChange('descriptionVi', e.target.value)}
            className="form-control"
            rows="2"
            placeholder="Nhập mô tả tiếng Việt"
          />
        </div>
        <div className="form-group">
          <label>Description (EN)</label>
          <textarea
            value={currentProduct.descriptionEn}
            onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
            className="form-control"
            rows="2"
            placeholder="Enter description in English"
          />
        </div>
      </div>

      <div className="form-group">
        <label>URL hình ảnh</label>
        <input
          type="url"
          value={currentProduct.imageUrl}
          onChange={(e) => handleInputChange('imageUrl', e.target.value)}
          className="form-control"
          placeholder="Nhập URL hình ảnh"
        />
      </div>

      <div className="form-group">
        <label>Nội dung *</label>
        <Editor
          value={currentProduct.content}
          onEditorChange={c => handleInputChange('content', c)}
          init={{
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'help', 'wordcount',
              'emoticons', 'codesample'
            ],
            toolbar:
              'undo redo | blocks | bold italic underline strikethrough forecolor backcolor | ' +
              'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
              'link image media table codesample charmap emoticons | removeformat | help',
            height: 300,
            branding: false,
            promotion: false,
            appendTo: document.body
          }}
        />
        {errors.content && <div className="invalid-feedback">{errors.content}</div>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Trạng thái</label>
          <select
            value={currentProduct.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="form-control"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
          </select>
        </div>
        <div className="form-group">
          <label>Nổi bật</label>
          <select
            value={currentProduct.featured}
            onChange={(e) => handleInputChange('featured', e.target.value === 'true')}
            className="form-control"
          >
            <option value={false}>Không</option>
            <option value={true}>Có</option>
          </select>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-products-list">
      {/* Nơi TinyMCE sẽ render toolbar ra ngoài modal */}
      <div id="tiny-toolbar-container" />
      <div className="page-header">
        <h1>Quản lý sản phẩm</h1>
        <button className="btn btn-primary" onClick={handleAddNew}>
          <i className="bi bi-plus"></i>
          Thêm sản phẩm
        </button>
      </div>

      {renderFilters()}

      <div className="admin-table-container">
        <DataTable
          data={paginatedProducts}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sortConfig={sortConfig}
          onSort={handleSort}
          itemsPerPage={itemsPerPage}
          totalItems={sortedProducts.length}
          tableClassName="admin-table"
        />
      </div>

      {/* TEST: TinyMCE ngoài modal */}
      {/* Đã xóa Editor test ngoài modal */}

      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Sản phẩm"
        style={{
          overlay: { zIndex: 1000, background: 'rgba(0,0,0,0.5)' },
          content: {
            zIndex: 1001,
            maxWidth: '1000px',
            width: '90vw',
            minWidth: '320px',
            margin: 'auto',
            borderRadius: 12,
            padding: 0,
            border: 'none',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)'
          }
        }}
        ariaHideApp={false}
      >
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 24px 0 24px', borderBottom: '1px solid #eee' }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>{editMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
          <button className="modal-close" onClick={handleCloseModal} aria-label="Đóng" style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#6b7280' }}>✕</button>
        </div>
        <div className="modal-body" style={{ padding: '24px' }}>
          {renderProductForm()}
        </div>
        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '0 24px 24px 24px', borderTop: '1px solid #eee' }}>
          <button onClick={handleCloseModal} className="btn btn-secondary">Hủy</button>
          <button onClick={handleSubmit} className="btn btn-primary" disabled={submitLoading}>
            {submitLoading ? 'Đang xử lý...' : (editMode ? 'Cập nhật' : 'Thêm')}
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

export default ProductsList;
