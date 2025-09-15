import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getRoles, createRole, updateRole, deleteRole } from '../../services/roleService';
import PageWrapper from '../components/PageWrapper';
import AdminTable from '../components/AdminTable';
import FormModal from '../components/FormModal';
import AdminPageActions from '../components/AdminPageActions';
import ToastMessage from '../components/ToastMessage';
import AccessDenied from '../../components/AccessDenied';
import AdminFilter from '../components/AdminFilter';
// Use standardized CSS matching NewsList design
import "../styles/adminTable.css";
import "../styles/adminCommon.css";
import "../styles/adminButtons.css";

const RoleManagement = () => {
  const { user: currentUser, ROLES } = useAuth();
  
  // Role data from API
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    id: null,
    name: '',
    description: '',
    status: 'active',
  });
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchDebounce, setSearchDebounce] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });
  const [filters, setFilters] = useState({
    search: '',
    status: ''
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Debounce search - đợi user gõ xong
  useEffect(() => {
    if (filters.search !== searchDebounce) {
      setIsSearching(true);
    }
    
    const timer = setTimeout(() => {
      setSearchDebounce(filters.search);
      setIsSearching(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [filters.search, searchDebounce]);

  // Load data function (following NewsList pattern)
  const loadData = useCallback(async (showLoadingIndicator = true) => {
    if (showLoadingIndicator) {
      setLoading(true);
    }
    try {
      const params = {
        page: currentPage,
        size: itemsPerPage,
        search: searchDebounce,
        status: filters.status || undefined
      };
      
      // Remove undefined params
      Object.keys(params).forEach(key => 
        params[key] === undefined && delete params[key]
      );
      
      const response = await getRoles(params);
      
      if (response.data && response.data.items) {
        // Map API response to component format
        const mappedRoles = response.data.items.map(role => ({
          id: role.id,
          name: role.name,
          description: role.description,
          status: role.status === 1 ? 'active' : 'inactive',
          userCount: role.userCount,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt
        }));
        
        setRoles(mappedRoles);
        setTotalItems(response.data.totalItems || 0);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (error) {setToast({
        show: true,
        message: "Tải dữ liệu thất bại: " + error.message,
        type: "error",
      });
    } finally {
      if (showLoadingIndicator) {
        setLoading(false);
      }
    }
  }, [currentPage, itemsPerPage, searchDebounce, filters.status]);

  const emptyRole = useMemo(() => ({
    id: null,
    name: '',
    description: '',
    status: 'active',
  }), []);

  // Toast helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  // Filter config for AdminFilter component
  const filterConfig = [
    {
      key: "search",
      type: "search",
      label: "Tìm kiếm",
      placeholder: "Nhập tên vai trò hoặc mô tả...",
      icon: "fas fa-search"
    },
    {
      key: "status",
      type: "select", 
      label: "Trạng thái",
      icon: "fas fa-toggle-on",
      options: [
        { value: "active", label: "Hoạt động" },
        { value: "inactive", label: "Tạm khóa" }
      ]
    }
  ];

  // Handle filters change
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Load data when pagination/filters/sorting change (without showing loading for search)
  useEffect(() => {
    if (searchDebounce !== filters.search) {
      // Search is still being debounced, don't show loading
      loadData(false);
    } else {
      // Other filters or pagination changed, show loading
      loadData(true);
    }
  }, [currentPage, itemsPerPage, searchDebounce, filters.status, sortConfig]);


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
    if (e) e.preventDefault();
    if (!validateForm()) return;

    try {
      const roleData = {
        name: currentRole.name,
        description: currentRole.description,
        status: currentRole.status === 'active' ? 1 : 0
      };
      
      if (editMode) {
        // Update existing role
        const response = await updateRole(currentRole.id, roleData);
        if (response.status === 1) {
          showToast('Cập nhật vai trò thành công', 'success');
          await loadData(); // Reload data from server to ensure consistency
        } else {
          throw new Error(response.message || 'Cập nhật thất bại');
        }
      } else {
        // Create new role
        const response = await createRole(roleData);
        if (response.status === 1) {
          showToast('Tạo vai trò thành công', 'success');
          await loadData(); // Reload data from server to ensure consistency
        } else {
          throw new Error(response.message || 'Tạo thất bại');
        }
      }
      
      handleCloseModal();
    } catch (error) {showToast(error.message || `Lỗi khi ${editMode ? 'cập nhật' : 'tạo'} vai trò`, 'error');
    }
  }, [editMode, currentRole, validateForm, handleCloseModal, loadData]);

  const handleDelete = useCallback(async (role) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa vai trò "${role.name}"?`)) {
      try {
        const response = await deleteRole(role.id);
        if (response.status === 1) {
          showToast('Xóa vai trò thành công', 'success');
          await loadData(); // Reload data from server to ensure consistency
        } else {
          throw new Error(response.message || 'Xóa thất bại');
        }
      } catch (error) {showToast(error.message || 'Lỗi khi xóa vai trò', 'error');
      }
    }
  }, [loadData]);

  const handleInputChange = useCallback((field, value) => {
    setCurrentRole(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  // Use server-side data directly (no client-side filtering/sorting)
  const paginatedRoles = roles;



  const columns = [
    { key: "id", label: "ID", sortable: true, width: "80px" },
    { key: "name", label: "Tên vai trò", sortable: true, width: "200px" },
    {
      key: "description",
      label: "Mô tả",
      width: "300px",
      render: (item) => (
        <span title={item.description}>
          {item.description?.length > 60 
            ? item.description.substring(0, 60) + "..." 
            : item.description || ""}
        </span>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      sortable: true,
      width: "120px",
      render: (item) => (
        <span
          className={`badge ${
            item.status === 'active' ? "badge-success" : "badge-secondary"
          }`}
        >
          {item.status === 'active' ? "Hoạt động" : "Không hoạt động"}
        </span>
      ),
    },
  ];




  // Page Actions using AdminPageActions
  const pageActions = (
    <AdminPageActions
      loading={loading}
      actions={[
        AdminPageActions.createRefreshAction(loadData, loading),
        AdminPageActions.createAddAction(handleAddNew, "Thêm vai trò")
      ]}
    />
  );

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
        <AdminFilter
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onPageChange={setCurrentPage}
          filterConfig={filterConfig}
          isSearching={isSearching}
        />

        {/* Table Container */}
        <AdminTable
            data={paginatedRoles}
            columns={columns}
            actions={[
              {
                label: "Sửa",
                onClick: handleEdit,
                className: "admin-btn admin-btn-xs admin-btn-primary",
              },
              {
                label: "Xóa",
                onClick: handleDelete,
                className: "admin-btn admin-btn-xs admin-btn-danger",
              }
            ]}
            sortConfig={sortConfig}
            onSort={(key) => {
              setSortConfig((prev) => ({
                key,
                direction:
                  prev.key === key && prev.direction === "desc" ? "asc" : "desc",
              }));
            }}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(newSize) => {
              setItemsPerPage(newSize);
              setCurrentPage(1); // Reset về trang 1
            }}
            loading={loading}
            emptyText="Chưa có vai trò nào"
        />

        {/* Form Modal */}
        <FormModal
          show={showModal}
          onClose={handleCloseModal}
          onSubmit={() => handleSubmit()}
          title={editMode ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
          submitText={editMode ? "Cập nhật" : "Thêm mới"}
          cancelText="Hủy"
          loading={loading}
          size="lg"
        >
            <div className="form-grid">
              
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
