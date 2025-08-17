import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import ToastMessage from '../components/ToastMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../../api';
import './PermissionManagement.css';

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPermission, setCurrentPermission] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: ''
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Memoize static data
  const emptyPermission = useMemo(() => ({
    id: null,
    name: '',
    description: '',
    category: '',
    resource: '',
    action: '',
    status: 'active'
  }), []);

  const categories = useMemo(() => ['Content', 'User Management', 'System', 'Media', 'SEO'], []);
  const actions = useMemo(() => ['view', 'create', 'edit', 'delete', 'manage'], []);
  const resources = useMemo(() => ['news', 'products', 'services', 'notifications', 'users', 'roles', 'permissions', 'media', 'seo'], []);

  // Fetch permissions từ API
  const fetchPermissions = useCallback(async () => {
    try {
      setLoading(true);
      
      const response = await api.get('/api/permission/list');
      
      if (response.data.status === 1 && response.data.data) {
        // Flatten hierarchical data structure
        const flattenPermissions = (permissions, parentCategory = null) => {
          const result = [];
          
          for (const permission of permissions) {
            // Add parent permission
            const category = permission.permissionLabel || parentCategory || 'System';
            const permissionItem = {
              id: permission.id,
              name: permission.permissionLabel,
              permissionKey: permission.permissionKey,
              description: permission.description,
              category: category,
              parentId: permission.parentId,
              status: 'active', // Default since API doesn't provide status
              createdAt: new Date().toISOString(),
              isParent: permission.children && permission.children.length > 0
            };
            result.push(permissionItem);
            
            // Add children recursively
            if (permission.children && permission.children.length > 0) {
              const childPermissions = flattenPermissions(permission.children, category);
              result.push(...childPermissions);
            }
          }
          
          return result;
        };
        
        const flatPermissions = flattenPermissions(response.data.data);
        setPermissions(flatPermissions);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ Failed to fetch permissions:', error);
      setPermissions([]);
      setToast({ 
        show: true, 
        message: 'Lỗi khi tải danh sách quyền', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  // Memoize filtered and sorted data
  const filteredPermissions = useMemo(() => {
    return permissions.filter(perm => {
      const matchesSearch = perm.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
                           perm.description?.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || perm.category === filters.category;
      const matchesStatus = !filters.status || perm.status === filters.status;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [permissions, filters]);

  const sortedPermissions = useMemo(() => {
    return [...filteredPermissions].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredPermissions, sortConfig]);

  const paginatedPermissions = useMemo(() => {
    return sortedPermissions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [sortedPermissions, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedPermissions.length / itemsPerPage);
  }, [sortedPermissions.length, itemsPerPage]);

  const handleAddNew = useCallback(() => {
    setEditMode(false);
    setCurrentPermission({ ...emptyPermission });
    setErrors({});
    setShowModal(true);
  }, [emptyPermission]);

  const handleEdit = useCallback((permission) => {
    setEditMode(true);
    setCurrentPermission(permission);
    setErrors({});
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!currentPermission?.name?.trim()) {
      newErrors.name = 'Tên quyền là bắt buộc';
    }
    
    if (!currentPermission?.permissionKey?.trim()) {
      newErrors.permissionKey = 'Permission key là bắt buộc';
    }
    
    if (!currentPermission?.description?.trim()) {
      newErrors.description = 'Mô tả là bắt buộc';
    }
    
    if (!currentPermission?.category?.trim()) {
      newErrors.category = 'Danh mục là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentPermission]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    try {
      if (editMode) {
        setPermissions(prev => prev.map(perm => 
          perm.id === currentPermission.id ? currentPermission : perm
        ));
        setToast({ show: true, message: 'Cập nhật quyền thành công!', type: 'success' });
      } else {
        const newPermission = {
          ...currentPermission,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        setPermissions(prev => [newPermission, ...prev]);
        setToast({ show: true, message: 'Thêm quyền thành công!', type: 'success' });
      }
      handleCloseModal();
    } catch (error) {
      setToast({ show: true, message: 'Lỗi khi lưu quyền!', type: 'error' });
    }
  }, [editMode, currentPermission, validateForm, handleCloseModal]);

  const handleDelete = useCallback((id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa quyền này?')) {
      setPermissions(prev => prev.filter(perm => perm.id !== id));
      setToast({ show: true, message: 'Xóa quyền thành công!', type: 'success' });
    }
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setCurrentPermission(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  // Debounced filter handlers
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setFilters(prev => ({ ...prev, search: value }));
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  const handleCategoryChange = useCallback((e) => {
    const value = e.target.value;
    setFilters(prev => ({ ...prev, category: value }));
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((e) => {
    const value = e.target.value;
    setFilters(prev => ({ ...prev, status: value }));
    setCurrentPage(1);
  }, []);

  // Memoize column configuration adapted for new data structure
  const columns = useMemo(() => [
    {
      key: 'id',
      label: 'ID',
      sortable: true
    },
    {
      key: 'name',
      label: 'Tên quyền',
      sortable: true,
      render: (row) => (
        <span style={{ 
          fontWeight: row.isParent ? 'bold' : 'normal',
          paddingLeft: row.parentId ? '20px' : '0px'
        }}>
          {row.isParent && <i className="bi bi-folder me-2"></i>}
          {!row.isParent && row.parentId && <i className="bi bi-dash me-2"></i>}
          {row.name}
        </span>
      )
    },
    {
      key: 'permissionKey',
      label: 'Permission Key',
      sortable: true,
      render: (row) => <code>{row.permissionKey}</code>
    },
    {
      key: 'description',
      label: 'Mô tả',
      render: (row) => row.description ? <span title={row.description}>{row.description.length > 50 ? row.description.substring(0, 50) + '...' : row.description}</span> : ''
    },
    {
      key: 'category',
      label: 'Danh mục',
      sortable: true,
      render: (row) => <span className="role-badge">{row.category}</span>
    },
    {
      key: 'status',
      label: 'Trạng thái',
      sortable: true,
      render: (row) => (
        <span className={`status-badge ${row.status === 'active' ? 'active' : 'inactive'}`}>
          {row.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Thao tác',
      render: (row) => (
        <div className="action-buttons">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(row)}
            title="Chỉnh sửa"
          >
            <i className="bi bi-pencil"></i>
            <span>Sửa</span>
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row.id)}
            title="Xóa"
            disabled={row.isParent} // Disable delete for parent permissions
          >
            <i className="bi bi-trash"></i>
            <span>Xóa</span>
          </button>
        </div>
      )
    }
  ], [handleEdit, handleDelete]);

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const renderFilters = useMemo(() => (
    <div className="filters-section">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Tìm kiếm quyền..."
          value={filters.search}
          onChange={handleSearchChange}
          className="form-control"
        />
      </div>
      <div className="filter-group">
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="form-control"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <select
          value={filters.status}
          onChange={handleStatusChange}
          className="form-control"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Không hoạt động</option>
        </select>
      </div>
    </div>
  ), [filters, categories, handleSearchChange, handleCategoryChange, handleStatusChange]);

  const renderPermissionForm = useMemo(() => (
    <div className="permission-form">
      <div className="form-row">
        <div className="form-group">
          <label>Tên quyền *</label>
          <input
            type="text"
            value={currentPermission?.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Nhập tên quyền"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label>Permission Key *</label>
          <input
            type="text"
            value={currentPermission?.permissionKey || ''}
            onChange={(e) => handleInputChange('permissionKey', e.target.value)}
            className={`form-control ${errors.permissionKey ? 'is-invalid' : ''}`}
            placeholder="Nhập permission key (vd: menu_view)"
          />
          {errors.permissionKey && <div className="invalid-feedback">{errors.permissionKey}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Danh mục *</label>
          <select
            value={currentPermission?.category || ''}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
          >
            <option value="">Chọn danh mục</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <div className="invalid-feedback">{errors.category}</div>}
        </div>
        <div className="form-group">
          <label>Permission cha</label>
          <select
            value={currentPermission?.parentId || ''}
            onChange={(e) => handleInputChange('parentId', e.target.value)}
            className="form-control"
          >
            <option value="">Không có (Permission gốc)</option>
            {permissions.filter(p => p.isParent).map(parent => (
              <option key={parent.id} value={parent.id}>{parent.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Mô tả *</label>
          <textarea
            value={currentPermission?.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            rows="3"
            placeholder="Mô tả chi tiết quyền này"
          />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Trạng thái</label>
          <select
            value={currentPermission?.status || 'active'}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="form-control"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
          </select>
        </div>
      </div>
    </div>
  ), [currentPermission, errors, categories, permissions, handleInputChange]);

  const pageActions = useMemo(() => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button 
        className="btn btn-secondary" 
        onClick={fetchPermissions}
        disabled={loading}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer'
        }}
      >
        <i className="bi bi-arrow-clockwise"></i>
        Làm mới
      </button>
      <button 
        className="btn btn-primary" 
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
        Thêm quyền
      </button>
    </div>
  ), [handleAddNew, fetchPermissions, loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <PageWrapper actions={pageActions}>
      <div className="admin-permission-management">
        {renderFilters}

        <div className="admin-table-container">
          <DataTable
            data={paginatedPermissions}
            columns={columns}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            sortConfig={sortConfig}
            onSort={handleSort}
            itemsPerPage={itemsPerPage}
            totalItems={sortedPermissions.length}
            tableClassName="admin-table"
          />
        </div>

        <FormModal
          show={showModal}
          onClose={handleCloseModal}
          title={editMode ? 'Chỉnh sửa quyền' : 'Thêm quyền mới'}
          onSubmit={handleSubmit}
          submitText={editMode ? 'Cập nhật' : 'Thêm'}
          width={1000}
        >
          {renderPermissionForm}
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

export default PermissionManagement;
