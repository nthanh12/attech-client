import React, { useState, useEffect, useCallback } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import ToastMessage from '../components/ToastMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockMedia } from '../../utils/mockMedia.js';
import './MediaManagement.css';

const MediaManagement = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentMedia, setCurrentMedia] = useState({
    id: null,
    name: '',
    description: '',
    tags: []
  });
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [sortConfig, setSortConfig] = useState({ key: 'uploadedAt', direction: 'desc' });
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    uploadedBy: ''
  });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Định nghĩa object emptyMedia để dùng cho khởi tạo/reset form
  const emptyMedia = {
    id: null,
    name: '',
    description: '',
    tags: []
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMedia(mockMedia);
    } catch (error) {
      setToast({ show: true, message: 'Lỗi khi tải dữ liệu!', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setToast({ show: true, message: 'Vui lòng chọn file để upload!', type: 'error' });
      return;
    }

    setUploading(true);
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newMedia = selectedFiles.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'document',
        size: file.size,
        url: URL.createObjectURL(file),
        thumbnail: file.type.startsWith('image/') ? URL.createObjectURL(file) : '/icons/file-icon.png',
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'admin',
        description: '',
        tags: []
      }));

      setMedia(prev => [...newMedia, ...prev]);
      setSelectedFiles([]);
      setToast({ show: true, message: 'Upload file thành công!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'Lỗi khi upload file!', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setCurrentMedia({
      id: item.id,
      name: item.name,
      description: item.description,
      tags: item.tags
    });
    setErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
  };

  const handleShowModal = (media = null) => {
    if (media) {
      setCurrentMedia(media);
      setEditMode(true);
    } else {
      setCurrentMedia({ ...emptyMedia });
      setEditMode(false);
    }
    setShowModal(true);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!currentMedia.name.trim()) {
      setErrors({ name: 'Tên file là bắt buộc' });
      return;
    }

    try {
      if (editMode) {
        setMedia(prev => prev.map(item => 
          item.id === currentMedia.id ? { ...item, ...currentMedia } : item
        ));
        setToast({ show: true, message: 'Cập nhật thông tin thành công!', type: 'success' });
      }
      handleCloseModal();
    } catch (error) {
      setToast({ show: true, message: 'Lỗi khi lưu thông tin!', type: 'error' });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa file này?')) {
      setMedia(prev => prev.filter(item => item.id !== id));
      setToast({ show: true, message: 'Xóa file thành công!', type: 'success' });
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentMedia(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return 'bi bi-image';
      case 'document':
        return 'bi bi-file-text';
      case 'video':
        return 'bi bi-camera-video';
      case 'audio':
        return 'bi bi-music-note';
      default:
        return 'bi bi-file';
    }
  };

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = !filters.type || item.type === filters.type;
    const matchesUploader = !filters.uploadedBy || item.uploadedBy === filters.uploadedBy;
    
    return matchesSearch && matchesType && matchesUploader;
  });

  const sortedMedia = [...filteredMedia].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedMedia = sortedMedia.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedMedia.length / itemsPerPage);

  const columns = [
    {
      key: 'thumbnail',
      label: 'Preview',
      render: (value, item) => (
        <div className="media-thumbnail">
          {item.type === 'image' ? (
            <img src={item.thumbnail} alt={item.name} />
          ) : (
            <i className={getFileIcon(item.type)}></i>
          )}
        </div>
      )
    },
    {
      key: 'name',
      label: 'Tên file',
      sortable: true
    },
    {
      key: 'type',
      label: 'Loại',
      sortable: true,
      render: (value) => (
        <span className={`file-type-badge ${value}`}>
          {value === 'image' ? 'Hình ảnh' : 
           value === 'document' ? 'Tài liệu' : 
           value === 'video' ? 'Video' : 
           value === 'audio' ? 'Âm thanh' : 'Khác'}
        </span>
      )
    },
    {
      key: 'size',
      label: 'Kích thước',
      sortable: true,
      render: (value) => formatFileSize(value)
    },
    {
      key: 'uploadedBy',
      label: 'Người upload',
      sortable: true
    },
    {
      key: 'uploadedAt',
      label: 'Ngày upload',
      sortable: true,
      render: (value) => new Date(value).toLocaleString('vi-VN')
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
            onClick={() => handleDelete(item.id)}
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
          placeholder="Tìm kiếm file..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="form-control"
        />
      </div>
      <div className="filter-group">
        <select
          value={filters.type}
          onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
          className="form-control"
        >
          <option value="">Tất cả loại file</option>
          <option value="image">Hình ảnh</option>
          <option value="document">Tài liệu</option>
          <option value="video">Video</option>
          <option value="audio">Âm thanh</option>
        </select>
      </div>
      <div className="filter-group">
        <select
          value={filters.uploadedBy}
          onChange={(e) => setFilters(prev => ({ ...prev, uploadedBy: e.target.value }))}
          className="form-control"
        >
          <option value="">Tất cả người upload</option>
          <option value="admin">Admin</option>
          <option value="editor1">Editor 1</option>
          <option value="author1">Author 1</option>
        </select>
      </div>
      <div className="filter-group">
        <div className="view-mode-toggle">
          <button
            className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setViewMode('grid')}
          >
            <i className="bi bi-grid"></i>
          </button>
          <button
            className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setViewMode('list')}
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
      </div>
    </div>
  );

  const renderMediaGrid = () => (
    <div className="media-grid">
      {paginatedMedia.map((item) => (
        <div key={item.id} className="media-item">
          <div className="media-preview">
            {item.type === 'image' ? (
              <img src={item.thumbnail} alt={item.name} />
            ) : (
              <div className="file-icon">
                <i className={getFileIcon(item.type)}></i>
              </div>
            )}
            <div className="media-overlay">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleEdit(item)}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(item.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
          <div className="media-info">
            <div className="media-name">{item.name}</div>
            <div className="media-meta">
              <span className="file-size">{formatFileSize(item.size)}</span>
              <span className="upload-date">{new Date(item.uploadedAt).toLocaleDateString('vi-VN')}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMediaForm = () => (
    <div className="media-form">
      <div className="form-group">
        <label>Tên file</label>
        <input
          type="text"
          value={currentMedia.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          placeholder="Nhập tên file"
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label>Mô tả</label>
        <textarea
          value={currentMedia.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="form-control"
          rows="3"
          placeholder="Nhập mô tả file"
        />
      </div>
      <div className="form-group">
        <label>Tags</label>
        <input
          type="text"
          value={currentMedia.tags.join(', ')}
          onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
          className="form-control"
          placeholder="Nhập tags, phân cách bằng dấu phẩy"
        />
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-media-management">
      <div className="page-header">
        <h1>Quản lý Media</h1>
        <div className="upload-section">
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="file-input"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="btn btn-primary">
            <i className="bi bi-upload"></i>
            Chọn file
          </label>
          {selectedFiles.length > 0 && (
            <button
              className="btn btn-success"
              onClick={handleUpload}
              disabled={uploading}
            >
              <i className="bi bi-cloud-upload"></i>
              {uploading ? 'Đang upload...' : `Upload ${selectedFiles.length} file`}
            </button>
          )}
        </div>
      </div>

      {renderFilters()}

      <div className="admin-table-container">
        <DataTable
          data={paginatedMedia}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sortConfig={sortConfig}
          onSort={handleSort}
          itemsPerPage={itemsPerPage}
          totalItems={sortedMedia.length}
          tableClassName="admin-table"
        />
      </div>

      <FormModal
        show={showModal}
        onClose={handleCloseModal}
        title={editMode ? 'Chỉnh sửa thông tin file' : 'Thêm file mới'}
        onSubmit={handleSubmit}
        submitText={editMode ? 'Cập nhật' : 'Thêm'}
      >
        {renderMediaForm()}
      </FormModal>

      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default MediaManagement; 