import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getRoleColor, getRoleText, getAllRoles } from "../../utils/roleUtils";
import { canModifyUser } from "../../utils/hierarchyUtils";
import { fetchUsers, getUsers, createUser, updateUser, deleteUser, getRoleText as getServiceRoleText } from "../../services/userService";
import { getRoles } from "../../services/roleService";
import PageWrapper from "../components/PageWrapper";
import AdminTable from "../components/AdminTable";
import FormModal from "../components/FormModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ToastMessage from "../components/ToastMessage";
import AccessDenied from "../../components/AccessDenied";
import AdminFilter from "../components/AdminFilter";
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
  const [roles, setRoles] = useState([]);
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

  // Server-side pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
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
    roleId: null, // Will be set dynamically based on available roles
    status: "active",
  });

  const [formErrors, setFormErrors] = useState({});

  // Simple role filtering based on hierarchy
  const getFilteredRoles = () => {
    if (!roles || roles.length === 0) {
      return [];
    }
    
    // Admin and above can see Admin + Editor + User roles in filter dropdown
    if (currentUser?.roleId <= ROLES.ADMIN) {
      return roles.filter(role => role.id >= ROLES.ADMIN);
    }
    
    return roles;
  };

  // Filter config for AdminFilter component
  const filterConfig = [
    {
      key: "search",
      type: "search",
      label: "Tìm kiếm",
      placeholder: "Nhập tên đăng nhập, email hoặc họ tên...",
      icon: "fas fa-search"
    },
    {
      key: "role",
      type: "select",
      label: "Vai trò",
      icon: "fas fa-user-tag",
      options: getFilteredRoles().map(role => ({
        value: role.id,
        label: role.name
      }))
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
  }, [filters.search]);

  // Load data function (following NewsList pattern)
  const loadData = async (showLoadingIndicator = true) => {
    if (showLoadingIndicator) {
      setIsLoading(true);
    }
    try {
      const [usersData, rolesData] = await Promise.all([
        fetchUsers(currentPage, itemsPerPage, searchDebounce, filters, sortConfig),
        getRoles({ size: 100 })
      ]);

      // Handle users data (fetchUsers returns direct data, not wrapped in status/data)
      const mappedUsers = (usersData?.items || []).map(user => ({
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        roleId: user.roleId,
        roleName: user.roleName,
        status: user.status,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }));
      
      setUsers(mappedUsers);
      setTotalItems(usersData?.totalItems || 0);
      setTotalPages(usersData?.totalPages || 0);

      // Handle roles data
      if (rolesData && rolesData.data && rolesData.data.items) {
        console.log('Roles data received:', rolesData.data.items);
        setRoles(rolesData.data.items);
      } else {
        console.log('No roles data or invalid format:', rolesData);
      }

    } catch (error) {
      console.error("Load data failed:", error);
      showToast("Tải dữ liệu thất bại: " + error.message, "error");
    } finally {
      if (showLoadingIndicator) {
        setIsLoading(false);
      }
    }
  };

  // Load data when component mounts
  useEffect(() => {
    loadData();
  }, []);

  // Load data when pagination/filters/sorting change
  useEffect(() => {
    if (searchDebounce !== filters.search) {
      // Search is still being debounced, don't show loading
      loadData(false);
    } else {
      // Other filters or pagination changed, show loading
      loadData(true);
    }
  }, [currentPage, itemsPerPage, searchDebounce, filters.role, filters.status, sortConfig]);

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  const handleCreate = () => {
    setEditMode(false);
    setEditingUser(null);
    
    // Get default role - lowest privilege role available to current user
    const availableRoles = getFilteredRoles();
    const defaultRoleId = availableRoles.length > 0 
      ? availableRoles[availableRoles.length - 1].id  // Last role (highest ID = lowest privilege)
      : 3; // Fallback to Editor if no roles available
    
    setFormData({
      username: "",
      email: "",
      fullName: "",
      phone: "",
      roleId: defaultRoleId,
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
        const response = await deleteUser(user.id);
        
        if (response.status === 1) {
          showToast("Xóa người dùng thành công", "success");
          loadData(false); // Reload data from server without loading indicator
        } else {
          throw new Error(response.message || "Xóa thất bại");
        }
      } catch (error) {
        console.error("Delete error:", error);
        showToast(error.message || "Không thể xóa người dùng", "error");
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
    
    // Email required for create user
    if (!editMode && !formData.email) {
      errors.email = "Email là bắt buộc";
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

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (editMode) {
        // Update user - theo UpdateUserDto
        const updateData = {
          id: editingUser.id,
          username: formData.username,
          fullName: formData.fullName,
          email: formData.email || null,
          phone: formData.phone || null,
          roleId: formData.roleId,
          status: formData.status === "active" ? 1 : 0
        };
        
        const response = await updateUser(updateData);
        
        if (response.status === 1) {
          showToast("Cập nhật người dùng thành công", "success");
          loadData(false); // Reload data from server without loading indicator
        } else {
          throw new Error(response.message || "Cập nhật thất bại");
        }
      } else {
        // Create user - theo CreateUserDto
        // Get default role if not selected
        let roleId = formData.roleId;
        if (!roleId) {
          const availableRoles = getFilteredRoles();
          roleId = availableRoles.length > 0 
            ? availableRoles[availableRoles.length - 1].id  // Lowest privilege role
            : 3; // Fallback
        }
        
        const createData = {
          username: formData.username,
          password: "123456", // Default password
          fullName: formData.fullName,
          email: formData.email, // Required theo document
          phone: formData.phone || null,
          roleId: roleId,
          status: formData.status === "active" ? 1 : 0
        };

        // Validate email required
        if (!createData.email) {
          throw new Error("Email là bắt buộc khi tạo người dùng mới");
        }
        
        const response = await createUser(createData);
        
        if (response.Status === 1) {
          showToast("Tạo người dùng thành công", "success");
          loadData(false); // Reload data from server without loading indicator
        } else {
          throw new Error(response.Message || "Tạo thất bại");
        }
      }
      
      setShowModal(false);
    } catch (error) {
      console.error("Submit error:", error);
      showToast(error.message || (editMode ? "Không thể cập nhật người dùng" : "Không thể tạo người dùng"), "error");
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
        onClick={() => loadData(true)}
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
        <AdminFilter
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onPageChange={setCurrentPage}
          filterConfig={filterConfig}
          isSearching={isSearching}
        />

        {/* Table Container */}
        <AdminTable
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
          sortConfig={sortConfig}
          onSort={(key) => {
            setSortConfig((prev) => ({
              key,
              direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
            }));
          }}
          pagination={{
            currentPage,
            totalPages,
            totalItems,
            itemsPerPage,
            onPageChange: setCurrentPage
          }}
          loading={isLoading}
        />

        {/* Form Modal */}
        <FormModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          title={editMode ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
          size="lg"
          submitText={editMode ? "Cập nhật" : "Thêm mới"}
          loading={isLoading}
        >
            <div className="form-grid">
              <div className="form-group">
                <label>Tên đăng nhập *</label>
                <input
                  type="text"
                  className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
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
                <label>Email {!editMode && <span className="text-danger">*</span>}</label>
                <input
                  type="email"
                  className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required={!editMode}
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
                  {getFilteredRoles().map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
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