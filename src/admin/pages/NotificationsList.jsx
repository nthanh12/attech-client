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
import "./NotificationsList.css";
import "../styles/adminTable.css";
import "../styles/adminCommon.css";
import {
  getNotifications,
  getNotificationCategories,
  createNotification,
  updateNotification,
  deleteNotification,
} from "../../api";
import { mockNotifications, mockNotificationCategories } from "../../utils/mockData.js";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import ReactModal from 'react-modal';

const NotificationsList = () => {
  const [notification, setNotification] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  // Định nghĩa object emptyNotification để dùng cho khởi tạo/reset form
  const emptyNotification = {
    id: null,
    titleVi: "",
    titleEn: "",
    category: "",
    content: "",
    summaryVi: "",
    summaryEn: "",
    imageUrl: "",
    slug: "",
    featured: false,
    status: "active",
    publishDate: new Date().toISOString().split("T")[0],
  };
  const [currentNotification, setCurrentNotification] = useState({ ...emptyNotification });
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
    setNotification(mockNotifications);
    // Sử dụng mock categories thay vì API call
    setCategories(mockNotificationCategories);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
    setCurrentNotification({ ...emptyNotification });
  }, []);

  const handleAddNew = () => {
    setEditMode(false);
    setCurrentNotification({ ...emptyNotification });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (notificationItem) => {
    setEditMode(true);
    setCurrentNotification({
      id: notificationItem.id,
      titleVi: notificationItem.titleVi || "",
      titleEn: notificationItem.titleEn || "",
      category: notificationItem.notificationCategoryId || "",
      content: notificationItem.contentVi || "",
      summaryVi: notificationItem.descriptionVi || "",
      summaryEn: notificationItem.descriptionEn || "",
      imageUrl: notificationItem.image || "",
      slug: notificationItem.slugVi || "",
      featured: notificationItem.featured || false,
      status: notificationItem.status === 1 ? "active" : "inactive",
      publishDate: notificationItem.timePosted ? notificationItem.timePosted.split("T")[0] : new Date().toISOString().split("T")[0],
    });
    setErrors({});
    setShowModal(true);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!currentNotification.titleVi.trim()) {
      newErrors.titleVi = 'Tiêu đề tiếng Việt là bắt buộc';
    }
    if (!currentNotification.titleEn.trim()) {
      newErrors.titleEn = 'Tiêu đề tiếng Anh là bắt buộc';
    }
    
    if (!currentNotification.category) {
      newErrors.category = 'Danh mục là bắt buộc';
    }
    
    if (!currentNotification.content.trim()) {
      newErrors.content = 'Nội dung là bắt buộc';
    }
    if (!currentNotification.summaryVi.trim()) {
      newErrors.summaryVi = 'Tóm tắt tiếng Việt là bắt buộc';
    }
    if (!currentNotification.summaryEn.trim()) {
      newErrors.summaryEn = 'Tóm tắt tiếng Anh là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitLoading(true);
    try {
      if (editMode) {
        // Update notification
        setNotification(prev => prev.map(item => 
          item.id === currentNotification.id ? {
            ...item,
            titleVi: currentNotification.titleVi,
            titleEn: currentNotification.titleEn,
            contentVi: currentNotification.content,
            contentEn: currentNotification.content,
            descriptionVi: currentNotification.summaryVi,
            descriptionEn: currentNotification.summaryEn,
            slugVi: currentNotification.slug,
            slugEn: currentNotification.slug,
            notificationCategoryId: currentNotification.category,
            status: currentNotification.status === "active" ? 1 : 0,
            image: currentNotification.imageUrl,
            featured: currentNotification.featured
          } : item
        ));
        setToast({ show: true, message: 'Cập nhật thông báo thành công!', type: 'success' });
      } else {
        // Create new notification
        const newNotification = {
          id: Date.now(),
          titleVi: currentNotification.titleVi,
          titleEn: currentNotification.titleEn,
          contentVi: currentNotification.content,
          contentEn: currentNotification.content,
          descriptionVi: currentNotification.summaryVi,
          descriptionEn: currentNotification.summaryEn,
          slugVi: currentNotification.slug,
          slugEn: currentNotification.slug,
          notificationCategoryId: currentNotification.category,
          status: currentNotification.status === "active" ? 1 : 0,
          image: currentNotification.imageUrl,
          featured: currentNotification.featured,
          timePosted: new Date().toISOString()
        };
        setNotification(prev => [newNotification, ...prev]);
        setToast({ show: true, message: 'Thêm thông báo thành công!', type: 'success' });
      }
      handleCloseModal();
    } catch (error) {
      setToast({ show: true, message: 'Lỗi khi lưu thông báo!', type: 'error' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteNotification = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thông báo này?')) {
      setNotification(prev => prev.filter(item => item.id !== id));
      setToast({ show: true, message: 'Xóa thông báo thành công!', type: 'success' });
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentNotification(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const filteredNotifications = notification.filter(item => {
    const matchesSearch = item.titleVi.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.titleEn.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.descriptionVi.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.descriptionEn.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || item.notificationCategoryId === parseInt(filters.category);
    const matchesStatus = !filters.status || 
                         (filters.status === "active" && item.status === 1) ||
                         (filters.status === "inactive" && item.status === 0);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedNotifications = sortedNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedNotifications.length / itemsPerPage);

  const columns = [
    { key: 'titleVi', label: 'Tiêu đề (VI)', sortable: true },
    { key: 'titleEn', label: 'Title (EN)', sortable: true },
    { 
      key: 'descriptionVi', 
      label: 'Tóm tắt (VI)', 
      render: (value) => value ? <span title={value}>...</span> : ''
    },
    { 
      key: 'descriptionEn', 
      label: 'Summary (EN)', 
      render: (value) => value ? <span title={value}>...</span> : ''
    },
    {
      key: 'notificationCategoryNameVi',
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
            onClick={() => handleDeleteNotification(item.id)}
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
          placeholder="Tìm kiếm thông báo..."
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

  const renderNotificationForm = () => (
    <div className="notification-form">
      <div className="form-row">
        <div className="form-group">
          <label>Tiêu đề (VI) *</label>
          <input
            type="text"
            value={currentNotification.titleVi}
            onChange={(e) => handleInputChange('titleVi', e.target.value)}
            className={`form-control ${errors.titleVi ? 'is-invalid' : ''}`}
            placeholder="Nhập tiêu đề tiếng Việt"
          />
          {errors.titleVi && <div className="invalid-feedback">{errors.titleVi}</div>}
        </div>
        <div className="form-group">
          <label>Title (EN) *</label>
          <input
            type="text"
            value={currentNotification.titleEn}
            onChange={(e) => handleInputChange('titleEn', e.target.value)}
            className={`form-control ${errors.titleEn ? 'is-invalid' : ''}`}
            placeholder="Enter title in English"
          />
          {errors.titleEn && <div className="invalid-feedback">{errors.titleEn}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Slug</label>
          <input
            type="text"
            value={currentNotification.slug}
            onChange={(e) => handleInputChange('slug', e.target.value)}
            className="form-control"
            placeholder="Nhập slug (tự động tạo nếu để trống)"
          />
        </div>
        <div className="form-group">
          <label>URL hình ảnh</label>
          <input
            type="url"
            value={currentNotification.imageUrl}
            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
            className="form-control"
            placeholder="Nhập URL hình ảnh"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Tóm tắt (VI) *</label>
          <textarea
            value={currentNotification.summaryVi}
            onChange={(e) => handleInputChange('summaryVi', e.target.value)}
            className={`form-control ${errors.summaryVi ? 'is-invalid' : ''}`}
            rows="3"
            placeholder="Nhập tóm tắt tiếng Việt"
          />
          {errors.summaryVi && <div className="invalid-feedback">{errors.summaryVi}</div>}
        </div>
        <div className="form-group">
          <label>Summary (EN) *</label>
          <textarea
            value={currentNotification.summaryEn}
            onChange={(e) => handleInputChange('summaryEn', e.target.value)}
            className={`form-control ${errors.summaryEn ? 'is-invalid' : ''}`}
            rows="3"
            placeholder="Enter summary in English"
          />
          {errors.summaryEn && <div className="invalid-feedback">{errors.summaryEn}</div>}
        </div>
      </div>

      <div className="form-group">
        <label>Nội dung *</label>
        <Editor
          value={currentNotification.content}
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
            value={currentNotification.status}
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
            value={currentNotification.featured}
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
    <div className="admin-notifications-list">
      {/* Nơi TinyMCE sẽ render toolbar ra ngoài modal */}
      <div id="tiny-toolbar-container" />
      <div className="page-header">
        <h1>Quản lý thông báo</h1>
        <button className="btn btn-primary" onClick={handleAddNew}>
          <i className="bi bi-plus"></i>
          Thêm thông báo
        </button>
      </div>

      {renderFilters()}

      <div className="admin-table-container">
        <DataTable
          data={paginatedNotifications}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sortConfig={sortConfig}
          onSort={handleSort}
          itemsPerPage={itemsPerPage}
          totalItems={sortedNotifications.length}
          tableClassName="admin-table"
        />
      </div>

      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Thông báo"
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
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>{editMode ? 'Chỉnh sửa thông báo' : 'Thêm thông báo mới'}</h2>
          <button className="modal-close" onClick={handleCloseModal} aria-label="Đóng" style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#6b7280' }}>✕</button>
        </div>
        <div className="modal-body" style={{ padding: '24px' }}>
          {renderNotificationForm()}
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

export default NotificationsList; 