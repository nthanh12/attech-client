import React, { useState, useEffect, useCallback } from 'react';
import PageWrapper from '../components/PageWrapper';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import ToastMessage from '../components/ToastMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import './SEOManagement.css';
import "../styles/adminButtons.css";

const SEOManagement = () => {
  const [seoPages, setSeoPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSEO, setCurrentSEO] = useState({
    id: null,
    pageName: '',
    pageUrl: '',
    title: '',
    description: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    canonical: '',
    robots: 'index,follow',
    status: 'active'
  });
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [filters, setFilters] = useState({
    search: '',
    status: ''
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const emptyPage = {
    id: null,
    pageName: '',
    pageUrl: '',
    title: '',
    description: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    canonical: '',
    robots: 'index,follow',
    status: 'active'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: Connect to backend SEO service
        // const seoData = await getSEOPages();
        setSeoPages([]);
        // SEO management data loaded (empty until backend connection)
      } catch (error) {setSeoPages([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleAddNew = () => {
    setEditMode(false);
    setCurrentSEO({ ...emptyPage });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (page) => {
    setEditMode(true);
    setCurrentSEO(page);
    setErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!currentSEO.pageName.trim()) {
      newErrors.pageName = 'Tên trang là bắt buộc';
    }
    
    if (!currentSEO.pageUrl.trim()) {
      newErrors.pageUrl = 'URL trang là bắt buộc';
    }
    
    if (!currentSEO.title.trim()) {
      newErrors.title = 'Title là bắt buộc';
    }
    
    if (!currentSEO.description.trim()) {
      newErrors.description = 'Description là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (editMode) {
        // Update SEO page
        setSeoPages(prev => prev.map(page => 
          page.id === currentSEO.id ? currentSEO : page
        ));
        setToast({ show: true, message: 'Cập nhật SEO thành công!', type: 'success' });
      } else {
        // Create new SEO page
        const newPage = {
          ...currentSEO,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        setSeoPages(prev => [newPage, ...prev]);
        setToast({ show: true, message: 'Thêm SEO trang thành công!', type: 'success' });
      }
      handleCloseModal();
    } catch (error) {
      setToast({ show: true, message: 'Lỗi khi lưu SEO!', type: 'error' });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cấu hình SEO này?')) {
      setSeoPages(prev => prev.filter(page => page.id !== id));
      setToast({ show: true, message: 'Xóa cấu hình SEO thành công!', type: 'success' });
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentSEO(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const filteredPages = (seoPages || []).filter(page => {
    const matchesSearch = page.pageName?.toLowerCase().includes(filters.search.toLowerCase()) ||
                         page.pageUrl?.toLowerCase().includes(filters.search.toLowerCase()) ||
                         page.title?.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || page.status === filters.status;
    
    return matchesSearch && matchesStatus;
  });

  const sortedPages = [...filteredPages].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedPages = sortedPages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedPages.length / itemsPerPage);

  const columns = [
    {
      key: 'id',
      label: 'ID',
      sortable: true
    },
    {
      key: 'pageName',
      label: 'Tên trang',
      sortable: true
    },
    {
      key: 'pageUrl',
      label: 'URL',
      sortable: true
    },
    {
      key: 'title',
      label: 'SEO Title',
      sortable: true,
      render: (value) => value ? <span title={value}>{value.length > 40 ? value.substring(0, 40) + '...' : value}</span> : ''
    },
    {
      key: 'description',
      label: 'SEO Description',
      render: (value) => value ? <span title={value}>{value.length > 60 ? value.substring(0, 60) + '...' : value}</span> : ''
    },
    {
      key: 'status',
      label: 'Trạng thái',
      sortable: true,
      render: (value) => (
        <span className={`status-badge ${value === 'active' ? 'active' : 'inactive'}`}>
          {value === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Thao tác',
      render: (value, page) => (
        <div className="action-buttons">
          <button
            className="admin-btn admin-btn-xs admin-btn-primary"
            onClick={() => handleEdit(page)}
            title="Chỉnh sửa"
          >
            <i className="bi bi-pencil"></i>
            <span>Sửa</span>
          </button>
          <button
            className="admin-btn admin-btn-xs admin-btn-danger"
            onClick={() => handleDelete(page.id)}
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
          placeholder="Tìm kiếm trang, URL, title..."
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

  const renderSEOForm = () => (
    <div className="seo-form">
      <div className="form-row">
        <div className="form-group">
          <label>Tên trang *</label>
          <input
            type="text"
            value={currentSEO.pageName}
            onChange={(e) => handleInputChange('pageName', e.target.value)}
            className={`form-control ${errors.pageName ? 'is-invalid' : ''}`}
            placeholder="Nhập tên trang"
          />
          {errors.pageName && <div className="invalid-feedback">{errors.pageName}</div>}
        </div>
        <div className="form-group">
          <label>URL trang *</label>
          <input
            type="text"
            value={currentSEO.pageUrl}
            onChange={(e) => handleInputChange('pageUrl', e.target.value)}
            className={`form-control ${errors.pageUrl ? 'is-invalid' : ''}`}
            placeholder="/duong-dan-trang"
          />
          {errors.pageUrl && <div className="invalid-feedback">{errors.pageUrl}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>SEO Title *</label>
          <input
            type="text"
            value={currentSEO.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            placeholder="Tiêu đề SEO (tối đa 60 ký tự)"
            maxLength="60"
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          <small className="form-text text-muted">{currentSEO.title.length}/60 ký tự</small>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>SEO Description *</label>
          <textarea
            value={currentSEO.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            rows="3"
            placeholder="Mô tả SEO (tối đa 160 ký tự)"
            maxLength="160"
          />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          <small className="form-text text-muted">{currentSEO.description.length}/160 ký tự</small>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Keywords</label>
          <input
            type="text"
            value={currentSEO.keywords}
            onChange={(e) => handleInputChange('keywords', e.target.value)}
            className="form-control"
            placeholder="từ khóa, từ khóa 2, từ khóa 3"
          />
        </div>
        <div className="form-group">
          <label>Robots</label>
          <select
            value={currentSEO.robots}
            onChange={(e) => handleInputChange('robots', e.target.value)}
            className="form-control"
          >
            <option value="index,follow">index, follow</option>
            <option value="noindex,follow">noindex, follow</option>
            <option value="index,nofollow">index, nofollow</option>
            <option value="noindex,nofollow">noindex, nofollow</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Open Graph Title</label>
          <input
            type="text"
            value={currentSEO.ogTitle}
            onChange={(e) => handleInputChange('ogTitle', e.target.value)}
            className="form-control"
            placeholder="Tiêu đề khi chia sẻ trên social media"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Open Graph Description</label>
          <textarea
            value={currentSEO.ogDescription}
            onChange={(e) => handleInputChange('ogDescription', e.target.value)}
            className="form-control"
            rows="2"
            placeholder="Mô tả khi chia sẻ trên social media"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Open Graph Image</label>
          <input
            type="url"
            value={currentSEO.ogImage}
            onChange={(e) => handleInputChange('ogImage', e.target.value)}
            className="form-control"
            placeholder="URL hình ảnh khi chia sẻ"
          />
        </div>
        <div className="form-group">
          <label>Canonical URL</label>
          <input
            type="url"
            value={currentSEO.canonical}
            onChange={(e) => handleInputChange('canonical', e.target.value)}
            className="form-control"
            placeholder="URL chính thức của trang"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Trạng thái</label>
          <select
            value={currentSEO.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="form-control"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
          </select>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  const pageActions = (
    <button 
      className="admin-btn admin-btn-primary" 
      onClick={handleAddNew}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '0.875rem',
        fontWeight: '500',
        cursor: 'pointer'
      }}
    >
      <i className="bi bi-plus"></i>
      Thêm cấu hình SEO
    </button>
  );

  return (
    <PageWrapper actions={pageActions}>
      <div className="admin-seo-management">

      {renderFilters()}

      <div className="admin-table-container">
        <DataTable
          data={paginatedPages}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sortConfig={sortConfig}
          onSort={handleSort}
          itemsPerPage={itemsPerPage}
          totalItems={sortedPages.length}
          tableClassName="admin-table"
        />
      </div>

      <FormModal
        show={showModal}
        onClose={handleCloseModal}
        title={editMode ? 'Chỉnh sửa cấu hình SEO' : 'Thêm cấu hình SEO mới'}
        onSubmit={handleSubmit}
        submitText={editMode ? 'Cập nhật' : 'Thêm'}
        width={1000}
      >
        {renderSEOForm()}
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

export default SEOManagement;