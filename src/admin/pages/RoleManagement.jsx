import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getAllRoles, createRole, updateRole, deleteRole, updateRoleStatus, getActiveRoles, getRoleById } from '../../services/roleService';
import { getPermissions } from '../../services/permissionService';
import PageWrapper from '../components/PageWrapper';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ToastMessage from '../components/ToastMessage';
import './RoleManagement.css';
import './RolePermissions.css';

const RoleManagement = () => {
  const { user, hasPermission } = useAuth();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permissionsLoading, setPermissionsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    id: null,
    name: '',
    description: '',
    status: 1,
    permissionIds: []
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

  const emptyRole = useMemo(() => ({
    id: null,
    name: '',
    description: '',
    status: 1,
    permissionIds: []
  }), []);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllRoles();
      setRoles(res.data?.items || []);
    } catch (err) {
      console.error('Failed to fetch roles:', err);
      setRoles([]);
      setToast({ show: true, message: 'Lỗi khi tải danh sách vai trò', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPermissions = useCallback(async () => {
    setPermissionsLoading(true);
    try {
      const res = await getPermissions();
      // Keep hierarchical structure for better UI
      setPermissions(res.data || []);
    } catch (err) {
      console.error('Failed to fetch permissions:', err);
      setPermissions([]);
    } finally {
      setPermissionsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, [fetchRoles, fetchPermissions]);

  const handleAddNew = useCallback(() => {
    setEditMode(false);
    setCurrentRole({ ...emptyRole });
    setErrors({});
    setShowModal(true);
  }, [emptyRole]);

  const handleEdit = useCallback(async (role) => {
    try {
      // Fetch full role detail with permissions BEFORE opening modal
      console.log('🔍 Loading role detail for ID:', role.id);
      const roleDetail = await getRoleById(role.id);
      console.log('🔍 Role detail loaded:', roleDetail);
      console.log('🔍 Permission IDs:', roleDetail.permissionIds);
      
      // Set complete role data including permissionIds
      setCurrentRole({
        id: roleDetail.id,
        name: roleDetail.name,
        description: roleDetail.description || '',
        status: roleDetail.status,
        permissionIds: roleDetail.permissionIds || []
      });
      
      setEditMode(true);
      setErrors({});
      setShowModal(true);
    } catch (error) {
      console.error('Failed to load role detail:', error);
      // Fallback to basic role data
      setCurrentRole(role);
      setEditMode(true);
      setErrors({});
      setShowModal(true);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!currentRole?.name?.trim()) {
      newErrors.name = 'Tên vai trò là bắt buộc';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentRole]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    try {
      const roleData = {
        name: currentRole.name,
        description: currentRole.description,
        permissionIds: currentRole.permissionIds || []
      };

      if (editMode) {
        await updateRole(currentRole.id, roleData);
        fetchRoles(); // Refresh roles list
        setToast({ show: true, message: 'Cập nhật vai trò thành công!', type: 'success' });
      } else {
        await createRole(roleData);
        fetchRoles(); // Refresh roles list
        setToast({ show: true, message: 'Thêm vai trò thành công!', type: 'success' });
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving role:', error);
      setToast({ show: true, message: 'Lỗi khi lưu vai trò!', type: 'error' });
    }
  }, [editMode, currentRole, validateForm, handleCloseModal, fetchRoles]);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vai trò này?')) {
      try {
        await deleteRole(id);
        setRoles(prev => prev.filter(role => role.id !== id));
        setToast({ show: true, message: 'Xóa vai trò thành công!', type: 'success' });
      } catch (error) {
        console.error('Error deleting role:', error);
        setToast({ show: true, message: 'Lỗi khi xóa vai trò!', type: 'error' });
      }
    }
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setCurrentRole(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  // Memoize filtered and sorted data
  const filteredRoles = useMemo(() => {
    if (!Array.isArray(roles)) return [];
    return roles.filter(role => {
      const matchesSearch = role.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
                           role.description?.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = !filters.status || role.status === parseInt(filters.status);
      
      return matchesSearch && matchesStatus;
    });
  }, [roles, filters]);

  const sortedRoles = useMemo(() => {
    return [...filteredRoles].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredRoles, sortConfig]);

  const paginatedRoles = useMemo(() => {
    return sortedRoles.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [sortedRoles, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedRoles.length / itemsPerPage);
  }, [sortedRoles.length, itemsPerPage]);

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const columns = useMemo(() => [
    {
      key: 'id',
      label: 'ID',
      sortable: true
    },
    {
      key: 'name',
      label: 'Tên vai trò',
      sortable: true
    },
    {
      key: 'description',
      label: 'Mô tả',
      render: (row) => row.description ? <span title={row.description}>{row.description.length > 50 ? row.description.substring(0, 50) + '...' : row.description}</span> : ''
    },
    {
      key: 'status',
      label: 'Trạng thái',
      sortable: true,
      render: (row) => (
        <span className={`status-badge ${row.status === 1 ? 'active' : 'inactive'}`}>
          {row.status === 1 ? 'Hoạt động' : 'Không hoạt động'}
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
          >
            <i className="bi bi-trash"></i>
            <span>Xóa</span>
          </button>
        </div>
      )
    }
  ], [handleEdit, handleDelete]);

  const renderFilters = useMemo(() => (
    <div className="filters-section">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Tìm kiếm vai trò..."
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
          <option value="1">Hoạt động</option>
          <option value="0">Không hoạt động</option>
        </select>
      </div>
      <div className="filter-group">
        <select
          className="form-control"
          disabled
        >
          <option value="">Tất cả nhóm</option>
        </select>
      </div>
    </div>
  ), [filters]);

  const handlePermissionChange = useCallback((permissionId, checked, permission = null) => {
    const permissionIdNum = parseInt(permissionId);
    
    setCurrentRole(prev => {
      let newPermissionIds = [...(prev.permissionIds || [])];
      
      if (checked) {
        // Add current permission
        if (!newPermissionIds.includes(permissionIdNum)) {
          newPermissionIds.push(permissionIdNum);
        }
        
        // If this is a parent permission, also add all children
        if (permission && permission.children && permission.children.length > 0) {
          permission.children.forEach(child => {
            if (!newPermissionIds.includes(child.id)) {
              newPermissionIds.push(child.id);
            }
          });
        }
      } else {
        // Remove current permission
        newPermissionIds = newPermissionIds.filter(id => id !== permissionIdNum);
        
        // If this is a parent permission, also remove all children
        if (permission && permission.children && permission.children.length > 0) {
          permission.children.forEach(child => {
            newPermissionIds = newPermissionIds.filter(id => id !== child.id);
          });
        }
        
        // If this is a child permission, check if we should uncheck parent
        if (permission) {
          // Find parent of this child
          const parentPermission = permissions.find(p => 
            p.children && p.children.some(c => c.id === permissionIdNum)
          );
          
          if (parentPermission) {
            // If no children are selected, uncheck parent
            const hasSelectedChildren = parentPermission.children.some(child => 
              newPermissionIds.includes(child.id)
            );
            
            if (!hasSelectedChildren) {
              newPermissionIds = newPermissionIds.filter(id => id !== parentPermission.id);
            }
          }
        }
      }
      
      return {
        ...prev,
        permissionIds: newPermissionIds
      };
    });
  }, [permissions]);

  const renderRoleForm = useMemo(() => (
    <div className="role-form">
      <div className="form-row">
        <div className="form-group">
          <label>Tên vai trò *</label>
          <input
            type="text"
            value={currentRole?.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Nhập tên vai trò"
            maxLength={256}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label>Trạng thái</label>
          <select
            value={currentRole?.status || 1}
            onChange={(e) => handleInputChange('status', parseInt(e.target.value))}
            className="form-control"
          >
            <option value={1}>Hoạt động</option>
            <option value={0}>Không hoạt động</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Mô tả</label>
          <textarea
            value={currentRole?.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="form-control"
            rows="3"
            placeholder="Mô tả vai trò này"
            maxLength={500}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Quyền hạn</label>
          {permissionsLoading ? (
            <div className="text-center py-3">Đang tải permissions...</div>
          ) : (
            <div className="role-permissions-container">
              {permissions.length === 0 ? (
                <div className="text-muted">Không có quyền nào</div>
              ) : (
                permissions.map(permission => (
                  <div key={permission.id} className="role-permission-group">
                    {/* Parent Permission */}
                    <div className="role-permission-parent">
                      <input
                        type="checkbox"
                        className="role-permission-checkbox"
                        id={`permission-${permission.id}`}
                        checked={(currentRole?.permissionIds || []).includes(permission.id)}
                        onChange={(e) => handlePermissionChange(permission.id, e.target.checked, permission)}
                      />
                      <label className="role-permission-label-parent" htmlFor={`permission-${permission.id}`}>
                        {permission.permissionLabel}
                      </label>
                    </div>
                    
                    {/* Children Permissions */}
                    {permission.children && permission.children.length > 0 && (
                      <div className="role-permission-children">
                        {permission.children.map(child => (
                          <div key={child.id} className="role-permission-child">
                            <input
                              type="checkbox"
                              className="role-permission-checkbox"
                              id={`permission-${child.id}`}
                              checked={(currentRole?.permissionIds || []).includes(child.id)}
                              onChange={(e) => handlePermissionChange(child.id, e.target.checked, child)}
                            />
                            <label className="role-permission-label-child" htmlFor={`permission-${child.id}`}>
                              {child.permissionLabel}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ), [currentRole, errors, handleInputChange, permissions, permissionsLoading, handlePermissionChange]);

  const pageActions = useMemo(() => (
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
      Thêm vai trò
    </button>
  ), [handleAddNew]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <PageWrapper actions={pageActions}>
      <div className="admin-role-management">

      {renderFilters}

      <div className="admin-table-container">
        <DataTable
          data={paginatedRoles}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sortConfig={sortConfig}
          onSort={handleSort}
          itemsPerPage={itemsPerPage}
          totalItems={sortedRoles.length}
          tableClassName="admin-table"
        />
      </div>

      <FormModal
        show={showModal}
        onClose={handleCloseModal}
        title={editMode ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
        onSubmit={handleSubmit}
        submitText={editMode ? 'Cập nhật' : 'Thêm'}
        width={1000}
      >
        {renderRoleForm}
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

export default RoleManagement;
