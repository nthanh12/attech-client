import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getRoleColor, getRoleText, getAllRoles } from "../../utils/roleUtils";
import { canModifyUser, getAssignableRoles } from "../../utils/hierarchyUtils";
import PageWrapper from "../components/PageWrapper";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ToastMessage from "../components/ToastMessage";
import AccessDenied from "../../components/AccessDenied";
import "./ContactList.css";
import "./UserManagement.css";
import "../styles/adminTable.css";
import "../styles/adminCommon.css";
import "../styles/adminPageStyles.css";
import "../styles/adminButtons.css";

const UserManagement = () => {
  const { user: currentUser, ROLES } = useAuth();

  // Data state
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  // Pagination & filters
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchDebounce, setSearchDebounce] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "desc",
  });
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    status: "",
  });

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    phone: "",
    roleId: 3,
    status: "active",
  });

  const [formErrors, setFormErrors] = useState({});

  // Debounce search - đợi user gõ xong
  useEffect(() => {
    if (filters.search !== searchDebounce) {
      setIsSearching(true);
    }
    
    const timer = setTimeout(() => {
      setSearchDebounce(filters.search);
      setIsSearching(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [filters.search]);

  const loadUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      // Mock data for now - replace with real API
      const mockUsers = [
        {
          id: 1,
          username: "superadmin",
          fullName: "Super Administrator", 
          email: "superadmin@company.com",
          phone: "+84123456789",
          roleId: 1,
          roleName: "superadmin",
          status: "active",
          lastLogin: "2024-08-20T10:30:00Z",
          createdAt: "2024-01-01T00:00:00Z"
        },
        {
          id: 2,
          username: "admin",
          fullName: "System Admin",
          email: "admin@company.com", 
          phone: "+84987654321",
          roleId: 2,
          roleName: "admin",
          status: "active",
          lastLogin: "2024-08-20T09:15:00Z",
          createdAt: "2024-02-01T00:00:00Z"
        },
        {
          id: 3,
          username: "editor1",
          fullName: "Content Editor 1",
          email: "editor1@company.com",
          phone: "+84555666777", 
          roleId: 3,
          roleName: "editor",
          status: "active",
          lastLogin: "2024-08-19T16:45:00Z",
          createdAt: "2024-03-01T00:00:00Z"
        },
        {
          id: 4,
          username: "editor2",
          fullName: "Content Editor 2",
          email: "editor2@company.com",
          phone: "+84111222333",
          roleId: 3,
          roleName: "editor", 
          status: "inactive",
          lastLogin: "2024-08-15T14:20:00Z",
          createdAt: "2024-04-01T00:00:00Z"
        }
      ];
      
      setUsers(mockUsers);
      showToast("Tải danh sách người dùng thành công", "success");
    } catch (error) {
      console.error("Error loading users:", error);
      showToast("Không thể tải danh sách người dùng", "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  const handleCreate = () => {
    setEditMode(false);
    setEditingUser(null);
    setFormData({
      username: "",
      email: "",
      fullName: "",
      phone: "",
      roleId: 3,
      status: "active",
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleEdit = (user) => {
    const permissions = canModifyUser(currentUser, user);
    if (!permissions.canEdit) {
      showToast("Bạn không có quyền chỉnh sửa người dùng này", "error");
      return;
    }

    setEditMode(true);
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email || "",
      fullName: user.fullName || "",
      phone: user.phone || "",
      roleId: user.roleId,
      status: user.status,
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleDelete = async (user) => {
    const permissions = canModifyUser(currentUser, user);
    if (!permissions.canDelete) {
      showToast("Bạn không có quyền xóa người dùng này", "error");
      return;
    }

    if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.fullName}"?`)) {
      try {
        // Call delete API here
        setUsers(users.filter(u => u.id !== user.id));
        showToast("Xóa người dùng thành công", "success");
      } catch (error) {
        showToast("Không thể xóa người dùng", "error");
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = "Tên đăng nhập là bắt buộc";
    }
    
    if (!formData.fullName.trim()) {
      errors.fullName = "Họ tên là bắt buộc";
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!editMode && users.some(u => u.username === formData.username)) {
      errors.username = "Tên đăng nhập đã tồn tại";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (editMode) {
        // Update user
        const updatedUser = { ...editingUser, ...formData };
        setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
        showToast("Cập nhật người dùng thành công", "success");
      } else {
        // Create user
        const newUser = {
          ...formData,
          id: Math.max(...users.map(u => u.id)) + 1,
          roleName: getAllRoles().find(r => r.id === formData.roleId)?.name || 'editor',
          lastLogin: null,
          createdAt: new Date().toISOString()
        };
        setUsers([...users, newUser]);
        showToast("Tạo người dùng thành công", "success");
      }
      
      setShowModal(false);
    } catch (error) {
      showToast(editMode ? "Không thể cập nhật người dùng" : "Không thể tạo người dùng", "error");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa đăng nhập";
    return new Date(dateString).toLocaleString("vi-VN");
  };

  const columns = [
    {
      key: "username",
      label: "Tên đăng nhập",
      sortable: true,
    },
    {
      key: "fullName",
      label: "Họ tên",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (row) => row.email || "Chưa có",
    },
    {
      key: "role",
      label: "Vai trò", 
      sortable: true,
      render: (row) => {
        const roleId = row.roleId || 3;
        return (
          <span
            className={`badge bg-${getRoleColor(roleId)}`}
            title={getRoleText(roleId)}
          >
            {getRoleText(roleId)}
          </span>
        );
      },
    },
    {
      key: "status",
      label: "Trạng thái",
      sortable: true,
      render: (row) => (
        <span className={`badge ${row.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
          {row.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
        </span>
      ),
    },
    {
      key: "lastLogin",
      label: "Đăng nhập cuối",
      sortable: true,
      render: (row) => formatDate(row.lastLogin),
    },
  ];

  // Page Actions for the sticky action bar
  const pageActions = (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <button
        className="admin-btn admin-btn-outline-secondary"
        onClick={loadUsers}
        disabled={isLoading}
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
        title="Làm mới danh sách người dùng"
      >
        <i className="fas fa-refresh"></i>
        Làm mới
      </button>
      <button
        className="admin-btn admin-btn-primary"
        onClick={handleCreate}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1rem",
          backgroundColor: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "0.875rem",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        <i className="fas fa-plus"></i>
        Thêm người dùng
      </button>
    </div>
  );

  // Check permission - only Admin and SuperAdmin can manage users
  if (!currentUser || currentUser.roleId > ROLES.ADMIN) {
    return (
      <PageWrapper actions={pageActions}>
        <AccessDenied
          message="Bạn không có quyền truy cập trang này. Chỉ Admin và SuperAdmin mới có thể quản lý người dùng."
          user={currentUser}
        />
      </PageWrapper>
    );
  }

  if (isLoading) {
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
      <div className="admin-contact-list">
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filters-title">
            <i className="fas fa-filter"></i>
            Bộ lọc & Tìm kiếm
          </div>
          <div className="filters-grid">
            <div className="filter-group">
              <label>
                {isSearching ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-search"></i>
                )} Tìm kiếm
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên đăng nhập, email hoặc họ tên..."
                value={filters.search}
                onChange={(e) => {
                  const newSearch = e.target.value;
                  setFilters((prev) => ({ ...prev, search: newSearch }));
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="filter-group">
              <label><i className="fas fa-user-tag"></i> Vai trò</label>
              <select
                className="form-control"
                value={filters.role}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, role: e.target.value }));
                  setCurrentPage(1);
                }}
              >
                <option key="all-roles" value="">Tất cả vai trò</option>
                <option key="superadmin" value="1">Super Admin</option>
                <option key="admin" value="2">Admin</option>
                <option key="editor" value="3">Editor</option>
              </select>
            </div>
            <div className="filter-group">
              <label><i className="fas fa-toggle-on"></i> Trạng thái</label>
              <select
                className="form-control"
                value={filters.status}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, status: e.target.value }));
                  setCurrentPage(1);
                }}
              >
                <option key="all-status" value="">Tất cả trạng thái</option>
                <option key="active" value="active">Hoạt động</option>
                <option key="inactive" value="inactive">Tạm khóa</option>
              </select>
            </div>
            <div className="filter-actions">
              <button
                className="admin-btn admin-btn-primary"
                onClick={() => {
                  setFilters({
                    search: "",
                    role: "",
                    status: "",
                  });
                  setCurrentPage(1);
                }}
                title="Xóa tất cả bộ lọc"
              >
                <i className="fas fa-eraser"></i>
                Xóa lọc
              </button>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="table-container">
          <DataTable
            data={users}
            columns={columns}
            actions={[
              {
                label: "Sửa",
                onClick: handleEdit,
                className: "admin-btn admin-btn-xs admin-btn-info",
                condition: (row) => canModifyUser(currentUser, row).canEdit
              },
              {
                label: "Xóa",
                onClick: handleDelete,
                className: "admin-btn admin-btn-xs admin-btn-danger",
                condition: (row) => canModifyUser(currentUser, row).canDelete
              }
            ]}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            sortConfig={sortConfig}
            onSort={setSortConfig}
            filters={filters}
            searchFields={["username", "fullName", "email"]}
          />
        </div>

        {/* Form Modal */}
        <FormModal
          show={showModal}
          onClose={() => setShowModal(false)}
          title={editMode ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
          size="lg"
          showActions={false}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Tên đăng nhập *</label>
                <input
                  type="text"
                  className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  disabled={editMode}
                />
                {formErrors.username && (
                  <div className="invalid-feedback">{formErrors.username}</div>
                )}
              </div>
              
              <div className="form-group">
                <label>Họ tên *</label>
                <input
                  type="text"
                  className={`form-control ${formErrors.fullName ? 'is-invalid' : ''}`}
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
                {formErrors.fullName && (
                  <div className="invalid-feedback">{formErrors.fullName}</div>
                )}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                {formErrors.email && (
                  <div className="invalid-feedback">{formErrors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  className="form-control"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Vai trò</label>
                <select
                  className="form-control"
                  value={formData.roleId}
                  onChange={(e) => setFormData({...formData, roleId: parseInt(e.target.value)})}
                >
                  {getAssignableRoles(currentUser).map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Trạng thái</label>
                <select
                  className="form-control"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
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
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="admin-btn admin-btn-primary"
                disabled={isLoading}
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

export default UserManagement;