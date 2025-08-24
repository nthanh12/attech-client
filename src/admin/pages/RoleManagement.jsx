import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import PageWrapper from '../components/PageWrapper';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ToastMessage from '../components/ToastMessage';
import AccessDenied from '../../components/AccessDenied';
// Use standardized CSS matching NewsList design
import "../styles/adminTable.css";
import "../styles/adminCommon.css";
import "../styles/adminButtons.css";

const RoleManagement = () => {
  const { user: currentUser, ROLES } = useAuth();
  
  // Use simple role data structure matching the new system
  const [roles, setRoles] = useState([
    { id: 1, roleId: 1, name: 'Super Admin', description: 'Toàn quyền quản trị hệ thống', status: 'active' },
    { id: 2, roleId: 2, name: 'Admin', description: 'Quản lý hầu hết các tính năng', status: 'active' },
    { id: 3, roleId: 3, name: 'Editor', description: 'Chỉnh sửa nội dung', status: 'active' }
  ]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    id: null,
    roleId: 3,
    name: '',
    description: '',
    status: 'active',
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
    roleId: 3,
    name: '',
    description: '',
    status: 'active',
  }), []);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      // Mock delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setToast({ show: true, message: 'Tải danh sách vai trò thành công', type: 'success' });
    } catch (err) {
      console.error('Failed to fetch roles:', err);
      setToast({ show: true, message: 'Lỗi khi tải danh sách vai trò', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleAddNew = useCallback(() => {
    setEditMode(false);
    setCurrentRole({ ...emptyRole });
    setErrors({});
    setShowModal(true);
  }, [emptyRole]);

  const handleEdit = useCallback(async (role) => {
    // Simple role editing - no complex API calls needed
    setCurrentRole({
      id: role.id,
      roleId: role.roleId,
      name: role.name,
      description: role.description || '',
      status: role.status,
    });
    
    setEditMode(true);
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
    
    if (!currentRole?.name?.trim()) {
      newErrors.name = 'Tên vai trò là bắt buộc';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentRole]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editMode) {
        // Update existing role
        const updatedRole = { 
          ...currentRole,
          name: currentRole.name,
          description: currentRole.description,
          status: currentRole.status
        };
        setRoles(prev => prev.map(r => r.id === currentRole.id ? updatedRole : r));
        setToast({ show: true, message: 'Cập nhật vai trò thành công!', type: 'success' });
      } else {
        // Add new role
        const newRole = {
          ...currentRole,
          id: Math.max(...roles.map(r => r.id)) + 1,
          roleId: currentRole.roleId
        };
        setRoles(prev => [...prev, newRole]);
        setToast({ show: true, message: 'Thêm vai trò thành công!', type: 'success' });
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving role:', error);
      setToast({ show: true, message: 'Lỗi khi lưu vai trò!', type: 'error' });
    }
  }, [editMode, currentRole, validateForm, handleCloseModal, roles]);

  const handleDelete = useCallback(async (role) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa vai trò "${role.name}"?`)) {
      try {
        setRoles(prev => prev.filter(r => r.id !== role.id));
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

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
  };

  // Filter logic matching UserManagement pattern
  const filteredRoles = useMemo(() => {
    if (!Array.isArray(roles)) return [];
    return roles.filter(role => {
      const matchesSearch = !filters.search || 
                           role.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
                           role.description?.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = !filters.status || role.status === filters.status;
      
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

  const getRoleColor = (roleId) => {
    switch(roleId) {
      case 1: return 'danger';   // Super Admin - red
      case 2: return 'warning';  // Admin - orange
      case 3: return 'info';     // Editor - blue
      default: return 'secondary';
    }
  };

  const getRoleText = (roleId) => {
    switch(roleId) {
      case 1: return 'Super Admin';
      case 2: return 'Admin';
      case 3: return 'Editor';
      default: return 'Unknown';
    }
  };

  const columns = useMemo(() => [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      width: '80px'
    },
    {
      key: 'roleId',
      label: 'Mức độ',
      sortable: true,
      width: '120px',
      render: (row) => (
        <span className={`badge bg-${getRoleColor(row.roleId)}`}>
          {row.roleId}
        </span>
      )
    },
    {
      key: 'name',
      label: 'Tên vai trò',
      sortable: true,
      width: '200px'
    },
    {
      key: 'description',
      label: 'Mô tả',
      width: '300px',
      render: (row) => (
        <span title={row.description}>
          {row.description?.length > 60 ? row.description.substring(0, 60) + '...' : row.description || ''}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Trạng thái',
      sortable: true,
      width: '120px',
      render: (row) => (
        <span className={`badge ${row.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
          {row.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
        </span>
      )
    }
  ], []);




  // Page Actions matching NewsList style
  const pageActions = useMemo(() => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <button
        className="admin-btn admin-btn-outline-secondary"
        onClick={fetchRoles}
        disabled={loading}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1rem",
          backgroundColor: "#f8f9fa",
          color: "#6c757d",
          border: "1px solid #dee2e6",
          borderRadius: "6px",
          fontSize: "0.875rem",
          fontWeight: "500",
          cursor: "pointer",
        }}
        title="Làm mới danh sách vai trò"
      >
        <i className="fas fa-refresh"></i>
        Làm mới
      </button>
      <button
        className="admin-btn admin-btn-primary"
        onClick={handleAddNew}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1rem",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "0.875rem",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        <i className="fas fa-plus"></i>
        Thêm vai trò
      </button>
    </div>
  ), [handleAddNew, fetchRoles, loading]);

  // Check permission - only Admin and SuperAdmin can manage roles
  if (!currentUser || currentUser.roleId > ROLES.ADMIN) {
    return (
      <PageWrapper>
        <AccessDenied
          message="Bạn không có quyền truy cập trang này. Chỉ Admin và SuperAdmin mới có thể quản lý vai trò."
          user={currentUser}
        />
      </PageWrapper>
    );
  }

  if (loading) {
    return (
      <PageWrapper actions={pageActions}>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper actions={pageActions}>
      <div className="admin-news-list">
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filter-group">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo tên vai trò, mô tả..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <div className="filter-group">
            <select
              className="form-control"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Tạm khóa</option>
            </select>
          </div>
          <div className="filter-group">
            <button
              className="admin-btn admin-btn-secondary"
              onClick={() => setFilters({ search: "", status: "" })}
            >
              <i className="fas fa-times"></i>
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          data={roles}
          columns={columns}
          actions={[
            {
              label: "Sửa",
              onClick: handleEdit,
              className: "admin-btn admin-btn-sm admin-btn-primary"
            },
            {
              label: "Xóa",
              onClick: handleDelete,
              className: "admin-btn admin-btn-sm admin-btn-danger"
            }
          ]}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          sortConfig={sortConfig}
          onSort={handleSort}
          filters={filters}
          searchFields={["name", "description"]}
        />

        {/* Form Modal */}
        <FormModal
          show={showModal}
          onClose={handleCloseModal}
          title={editMode ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
          size="lg"
          showActions={false}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Mức vai trò</label>
                <select
                  className="form-control"
                  value={currentRole?.roleId || 3}
                  onChange={(e) => handleInputChange('roleId', parseInt(e.target.value))}
                  disabled={editMode}
                >
                  <option value={1}>1 - Super Admin</option>
                  <option value={2}>2 - Admin</option>
                  <option value={3}>3 - Editor</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Tên vai trò *</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  value={currentRole?.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Nhập tên vai trò"
                  maxLength={256}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  className="form-control"
                  value={currentRole?.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows="3"
                  placeholder="Mô tả vai trò này"
                  maxLength={500}
                />
              </div>

              <div className="form-group">
                <label>Trạng thái</label>
                <select
                  className="form-control"
                  value={currentRole?.status || 'active'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm khóa</option>
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={handleCloseModal}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="admin-btn admin-btn-primary"
                disabled={loading}
              >
                {editMode ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </form>
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
