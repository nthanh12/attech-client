import React, { useState, useEffect, useCallback } from 'react';
import PageWrapper from '../components/PageWrapper';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import ToastMessage from '../components/ToastMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import BulkActions from '../components/BulkActions';
import { 
  getAllFiles,
  searchFiles,
  getFilesByType,
  getFilesByEntityType,
  getFileById,
  updateFileMetadata,
  deleteFile,
  getOrphanedFiles,
  cleanupOrphanedFiles,
  bulkDeleteFiles,
  bulkUpdateMetadata,
  getStorageStats,
  EntityType,
  FILE_TYPES,
  getEntityTypeDisplayName,
  getFileTypeDisplayName,
  formatFileSize
} from '../../services/newFileManagementService';
import './FileManagement.css';

const FileManagement = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storageStats, setStorageStats] = useState(null);
  const [selectedFileIds, setSelectedFileIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showOrphanedModal, setShowOrphanedModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentFile, setCurrentFile] = useState({
    id: null,
    title: '',
    tags: []
  });
  const [orphanedFiles, setOrphanedFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [filters, setFilters] = useState({
    search: '',
    fileType: '',
    entityType: ''
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const emptyFile = {
    id: null,
    title: '',
    tags: []
  };

  useEffect(() => {
    fetchFiles();
    fetchStorageStats();
  }, [currentPage, filters]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const queryParams = {
        page: currentPage,
        limit: itemsPerPage,
        ...filters
      };
      
      let filesData;
      if (filters.search) {
        filesData = await searchFiles(filters.search, queryParams);
      } else if (filters.fileType) {
        filesData = await getFilesByType(filters.fileType, queryParams);
      } else if (filters.entityType) {
        filesData = await getFilesByEntityType(filters.entityType, queryParams);
      } else {
        filesData = await getAllFiles(queryParams);
      }
      
      setFiles(Array.isArray(filesData?.data?.items) ? filesData.data.items : []);
    } catch (error) {
      console.error('Failed to fetch files:', error);
      setFiles([]);
      setToast({ show: true, message: 'Lỗi khi tải dữ liệu file!', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchStorageStats = async () => {
    try {
      const stats = await getStorageStats();
      setStorageStats(stats.data);
    } catch (error) {
      console.error('Failed to fetch storage stats:', error);
    }
  };

  const fetchOrphanedFiles = async () => {
    try {
      const orphaned = await getOrphanedFiles();
      setOrphanedFiles(Array.isArray(orphaned?.data) ? orphaned.data : []);
      setShowOrphanedModal(true);
    } catch (error) {
      console.error('Failed to fetch orphaned files:', error);
      setToast({ show: true, message: 'Lỗi khi tải file mồ côi!', type: 'error' });
    }
  };

  const handleCleanupOrphaned = async () => {
    try {
      await cleanupOrphanedFiles();
      setToast({ show: true, message: 'Dọn dẹp file mồ côi thành công!', type: 'success' });
      setOrphanedFiles([]);
      setShowOrphanedModal(false);
      fetchFiles();
      fetchStorageStats();
    } catch (error) {
      console.error('Failed to cleanup orphaned files:', error);
      setToast({ show: true, message: 'Lỗi khi dọn dẹp file mồ côi!', type: 'error' });
    }
  };

  const handleEdit = async (item) => {
    try {
      const fileDetails = await getFileById(item.id);
      setEditMode(true);
      setCurrentFile({
        id: item.id,
        title: fileDetails.title || item.originalFileName,
        tags: fileDetails.tags || []
      });
      setErrors({});
      setShowModal(true);
    } catch (error) {
      console.error('Failed to fetch file details:', error);
      setToast({ show: true, message: 'Lỗi khi tải thông tin file!', type: 'error' });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!currentFile.title.trim()) {
      setErrors({ title: 'Tiêu đề là bắt buộc' });
      return;
    }

    try {
      await updateFileMetadata(currentFile.id, {
        title: currentFile.title,
        tags: currentFile.tags.join(',')
      });
      
      setFiles(prev => prev.map(item => 
        item.id === currentFile.id ? { 
          ...item, 
          title: currentFile.title,
          tags: currentFile.tags 
        } : item
      ));
      
      setToast({ show: true, message: 'Cập nhật thông tin thành công!', type: 'success' });
      handleCloseModal();
    } catch (error) {
      console.error('Update error:', error);
      setToast({ show: true, message: 'Lỗi khi cập nhật thông tin!', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa file này?')) {
      try {
        await deleteFile(id);
        setFiles(prev => prev.filter(item => item.id !== id));
        setToast({ show: true, message: 'Xóa file thành công!', type: 'success' });
        fetchStorageStats();
      } catch (error) {
        console.error('Failed to delete file:', error);
        setToast({ show: true, message: 'Lỗi khi xóa file!', type: 'error' });
      }
    }
  };

  const handleBulkDelete = async (selectedIds) => {
    try {
      await bulkDeleteFiles(selectedIds);
      setFiles(prev => prev.filter(item => !selectedIds.includes(item.id)));
      setSelectedFileIds([]);
      setToast({ show: true, message: `Xóa thành công ${selectedIds.length} file!`, type: 'success' });
      fetchStorageStats();
    } catch (error) {
      console.error('Failed to bulk delete files:', error);
      setToast({ show: true, message: 'Lỗi khi xóa file hàng loạt!', type: 'error' });
      throw error;
    }
  };

  const handleBulkUpdateTags = async (selectedIds) => {
    const tags = prompt('Nhập tags mới (phân cách bằng dấu phẩy):');
    if (tags !== null) {
      try {
        await bulkUpdateMetadata(selectedIds, { tags });
        setToast({ show: true, message: `Cập nhật tags cho ${selectedIds.length} file thành công!`, type: 'success' });
        setSelectedFileIds([]);
        fetchFiles();
      } catch (error) {
        console.error('Failed to bulk update metadata:', error);
        setToast({ show: true, message: 'Lỗi khi cập nhật tags hàng loạt!', type: 'error' });
        throw error;
      }
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentFile(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileSelection = (id, checked) => {
    if (checked) {
      setSelectedFileIds(prev => [...prev, id]);
    } else {
      setSelectedFileIds(prev => prev.filter(fileId => fileId !== id));
    }
  };

  const handleSelectAll = () => {
    setSelectedFileIds(files.map(file => file.id));
  };
  
  const handleDeselectAll = () => {
    setSelectedFileIds([]);
  };

  const columns = [
    {
      key: 'select',
      label: (
        <input
          type="checkbox"
          checked={selectedFileIds.length === files.length && files.length > 0}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
      render: (value, item) => (
        <input
          type="checkbox"
          checked={selectedFileIds.includes(item.id)}
          onChange={(e) => handleFileSelection(item.id, e.target.checked)}
        />
      )
    },
    { key: 'id', label: 'ID', sortable: true },
    {
      key: 'originalFileName',
      label: 'Tên file',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="file-name">{value}</div>
          <div className="file-path">{item.filePath}</div>
        </div>
      )
    },
    {
      key: 'fileType',
      label: 'Loại file',
      sortable: true,
      render: (value) => (
        <span className={`file-type-badge ${value}`}>
          {getFileTypeDisplayName(value)}
        </span>
      )
    },
    {
      key: 'entityType',
      label: 'Entity Type',
      sortable: true,
      render: (value) => (
        <span className={`entity-type-badge entity-${value}`}>
          {getEntityTypeDisplayName(value)}
        </span>
      )
    },
    {
      key: 'title',
      label: 'Tiêu đề',
      render: (value, item) => value || item.originalFileName
    },
    {
      key: 'fileSizeInBytes',
      label: 'Kích thước',
      sortable: true,
      render: (value) => formatFileSize(value)
    },
    {
      key: 'downloadCount',
      label: 'Lượt tải',
      sortable: true
    },
    {
      key: 'createdAt',
      label: 'Ngày tạo',
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
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(item.id)}
            title="Xóa"
          >
            <i className="bi bi-trash"></i>
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
          value={filters.fileType}
          onChange={(e) => setFilters(prev => ({ ...prev, fileType: e.target.value }))}
          className="form-control"
        >
          <option value="">Tất cả loại file</option>
          {Object.values(FILE_TYPES).map(type => (
            <option key={type} value={type}>{getFileTypeDisplayName(type)}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <select
          value={filters.entityType}
          onChange={(e) => setFilters(prev => ({ ...prev, entityType: e.target.value }))}
          className="form-control"
        >
          <option value="">Tất cả Entity Type</option>
          {Object.entries(EntityType).map(([key, value]) => (
            <option key={value} value={value}>{getEntityTypeDisplayName(value)}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderFileForm = () => (
    <div className="file-form">
      <div className="form-group">
        <label>Tiêu đề *</label>
        <input
          type="text"
          value={currentFile.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          placeholder="Nhập tiêu đề file"
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>
      <div className="form-group">
        <label>Tags</label>
        <input
          type="text"
          value={Array.isArray(currentFile.tags) ? currentFile.tags.join(', ') : ''}
          onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag))}
          className="form-control"
          placeholder="Nhập tags, phân cách bằng dấu phẩy"
        />
      </div>
    </div>
  );

  const renderStorageStats = () => (
    <div className="storage-stats">
      <h4>Thống kê lưu trữ</h4>
      {storageStats && (
        <div>
          <div className="stat-item">
            <strong>Tổng số file:</strong> {storageStats.totalFiles}
          </div>
          <div className="stat-item">
            <strong>Dung lượng:</strong> {formatFileSize(storageStats.totalSizeBytes)} ({storageStats.totalSizeMB} MB)
          </div>
          <div className="stat-section">
            <h5>Theo loại file:</h5>
            {Object.entries(storageStats.byFileType || {}).map(([type, stats]) => (
              <div key={type} className="stat-item">
                <strong>{getFileTypeDisplayName(type)}:</strong> {stats.count} file ({formatFileSize(stats.sizeBytes)})
              </div>
            ))}
          </div>
          <div className="stat-section">
            <h5>Theo Entity Type:</h5>
            {Object.entries(storageStats.byEntityType || {}).map(([type, stats]) => (
              <div key={type} className="stat-item">
                <strong>{type}:</strong> {stats.count} file ({formatFileSize(stats.sizeBytes)})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderOrphanedFiles = () => (
    <div className="orphaned-files">
      <h4>File mồ côi ({orphanedFiles.length})</h4>
      {orphanedFiles.length > 0 ? (
        <div>
          <div className="orphaned-list">
            {orphanedFiles.map(file => (
              <div key={file.id} className="orphaned-item">
                <div>{file.originalFileName}</div>
                <div className="file-size">{formatFileSize(file.fileSizeInBytes)}</div>
              </div>
            ))}
          </div>
          <button
            className="btn btn-danger"
            onClick={handleCleanupOrphaned}
          >
            Dọn dẹp tất cả file mồ côi
          </button>
        </div>
      ) : (
        <p>Không có file mồ côi nào.</p>
      )}
    </div>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  const pageActions = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      {selectedFileIds.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn btn-warning"
            onClick={handleBulkUpdateTags}
          >
            <i className="bi bi-tags"></i> Cập nhật Tags ({selectedFileIds.length})
          </button>
          <button
            className="btn btn-danger"
            onClick={handleBulkDelete}
          >
            <i className="bi bi-trash"></i> Xóa đã chọn ({selectedFileIds.length})
          </button>
        </div>
      )}
      <button
        className="btn btn-info"
        onClick={() => setShowStatsModal(true)}
      >
        <i className="bi bi-bar-chart"></i> Thống kê
      </button>
      <button
        className="btn btn-warning"
        onClick={fetchOrphanedFiles}
      >
        <i className="bi bi-files"></i> File mồ côi
      </button>
    </div>
  );

  const bulkActions = [
    {
      label: 'Update Tags',
      icon: 'bi bi-tags',
      variant: 'primary',
      handler: handleBulkUpdateTags,
      tooltip: 'Update tags for selected files'
    },
    {
      label: 'Delete',
      icon: 'bi bi-trash',
      variant: 'danger',
      handler: handleBulkDelete,
      confirmMessage: 'Are you sure you want to delete {count} selected files?',
      tooltip: 'Delete selected files'
    }
  ];

  return (
    <PageWrapper actions={pageActions}>
      <div className="admin-file-management">
        <BulkActions
          selectedItems={selectedFileIds}
          totalItems={files.length}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          actions={bulkActions}
        />
        
        {renderFilters()}

        <div className="admin-table-container">
          <DataTable
            data={files}
            columns={columns}
            currentPage={currentPage}
            totalPages={Math.ceil(files.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            sortConfig={sortConfig}
            onSort={handleSort}
            itemsPerPage={itemsPerPage}
            totalItems={files.length}
            tableClassName="admin-table"
          />
        </div>

        <FormModal
          show={showModal}
          onClose={handleCloseModal}
          title="Chỉnh sửa thông tin file"
          onSubmit={handleSubmit}
          submitText="Cập nhật"
          width={600}
        >
          {renderFileForm()}
        </FormModal>

        <FormModal
          show={showStatsModal}
          onClose={() => setShowStatsModal(false)}
          title="Thống kê lưu trữ"
          hideSubmit={true}
          width={700}
        >
          {renderStorageStats()}
        </FormModal>

        <FormModal
          show={showOrphanedModal}
          onClose={() => setShowOrphanedModal(false)}
          title="File mồ côi"
          hideSubmit={true}
          width={600}
        >
          {renderOrphanedFiles()}
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

export default FileManagement;