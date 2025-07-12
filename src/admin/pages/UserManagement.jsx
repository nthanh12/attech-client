import React, { useState, useEffect, useCallback } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import ToastMessage from '../components/ToastMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockRoles, mockUsers, mockDepartments, mockPositions } from '../../utils/mockData.js';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    username: '',
    email: '',
    fullName: '',
    phone: '',
    role: '',
    userType: 'user', // 'admin' or 'user'
    status: 'active',
    avatar: '',
    department: '',
    position: '',
    lastLogin: '',
    createdAt: ''
  });
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [filters, setFilters] = useState({
    search: '',
    userType: '', // 'admin' or 'user'
    role: '',
    status: '',
    department: ''
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Định nghĩa object emptyUser để dùng cho khởi tạo/reset form
  const emptyUser = {
    id: null,
    username: '',
    email: '',
    fullName: '',
    phone: '',
    role: '',
    userType: 'user',
    status: 'active',
    avatar: '',
    department: '',
    position: '',
    lastLogin: '',
    createdAt: ''
  };

  useEffect(() => {
    // Load roles, departments, positions từ mock data
    setRoles(mockRoles);
    setDepartments(mockDepartments);
    setPositions(mockPositions);
    
    // Load users từ mock data
    setUsers(mockUsers);
    setLoading(false);
  }, []);

  const handleAddNew = () => {
    setEditMode(false);
    setCurrentUser({ ...emptyUser });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setCurrentUser(user);
    setErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
  };

  const handleShowModal = useCallback((user = null) => {
    if (user) {
      setCurrentUser(user);
      setEditMode(true);
    } else {
      setCurrentUser({ ...emptyUser });
      setEditMode(false);
    }
    setShowModal(true);
    setErrors({});
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!currentUser.username.trim()) {
      newErrors.username = 'Tên đăng nhập là bắt buộc';
    }
    
    if (!currentUser.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(currentUser.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!currentUser.fullName.trim()) {
      newErrors.fullName = 'Họ tên là bắt buộc';
    }
    
    if (!currentUser.userType) {
      newErrors.userType = 'Loại tài khoản là bắt buộc';
    }
    
    if (!currentUser.role) {
      newErrors.role = 'Vai trò là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (editMode) {
        // Update user
        setUsers(prev => prev.map(user => 
          user.id === currentUser.id ? currentUser : user
        ));
        setToast({ show: true, message: 'Cập nhật người dùng thành công!', type: 'success' });
      } else {
        // Create new user
        const newUser = {
          ...currentUser,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        setUsers(prev => [...prev, newUser]);
        setToast({ show: true, message: 'Thêm người dùng thành công!', type: 'success' });
      }
      handleCloseModal();
    } catch (error) {
      setToast({ show: true, message: 'Lỗi khi lưu người dùng!', type: 'error' });
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(prev => prev.filter(user => user.id !== id));
      setToast({ show: true, message: 'Xóa người dùng thành công!', type: 'success' });
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
    setToast({ show: true, message: 'Cập nhật trạng thái thành công!', type: 'success' });
  };

  const handleInputChange = (field, value) => {
    setCurrentUser(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(filters.search.toLowerCase()) ||
                         user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
                         user.fullName.toLowerCase().includes(filters.search.toLowerCase());
    const matchesUserType = !filters.userType || user.userType === filters.userType;
    const matchesRole = !filters.role || user.role === filters.role;
    const matchesStatus = !filters.status || user.status === filters.status;
    const matchesDepartment = !filters.department || user.department === filters.department;
    
    return matchesSearch && matchesUserType && matchesRole && matchesStatus && matchesDepartment;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const columns = [
    {
      key: 'id',
      label: 'ID',
      sortable: true
    },
    {
      key: 'avatar',
      label: 'Avatar',
      render: (value, user) => (
        <img 
          src={user.avatar || 'https://picsum.photos/50/50?random=999'} 
          alt={user.fullName}
          className="user-avatar"
        />
      )
    },
    {
      key: 'username',
      label: 'Tên đăng nhập',
      sortable: true
    },
    {
      key: 'fullName',
      label: 'Họ tên',
      sortable: true
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true
    },
    {
      key: 'userType',
      label: 'Loại tài khoản',
      sortable: true,
      render: (value) => (
        <span className={`user-type-badge ${value === 'admin' ? 'admin' : 'user'}`}>
          {value === 'admin' ? 'Quản trị' : 'Người dùng'}
        </span>
      )
    },
    {
      key: 'role',
      label: 'Vai trò',
      sortable: true,
      render: (value) => (
        <span className={`role-badge role-${value.toLowerCase().replace(' ', '-')}`}>
          {value}
        </span>
      )
    },
    {
      key: 'department',
      label: 'Phòng ban',
      sortable: true
    },
    {
      key: 'status',
      label: 'Trạng thái',
      sortable: true,
      render: (value, user) => (
        <select
          value={value}
          onChange={(e) => handleStatusChange(user.id, e.target.value)}
          className={`status-select status-${value}`}
        >
          <option value="active">Hoạt động</option>
          <option value="inactive">Không hoạt động</option>
          <option value="suspended">Tạm khóa</option>
        </select>
      )
    },
    {
      key: 'lastLogin',
      label: 'Đăng nhập cuối',
      sortable: true,
      render: (value) => value ? new Date(value).toLocaleString('vi-VN') : 'Chưa đăng nhập'
    },
    {
      key: 'actions',
      label: 'Thao tác',
      render: (value, user) => (
        <div className="action-buttons">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(user)}
            title="Chỉnh sửa"
          >
            <i className="bi bi-pencil"></i>
            <span>Sửa</span>
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDeleteUser(user.id)}
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
          placeholder="Tìm kiếm..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="form-control"
        />
      </div>
      <div className="filter-group">
        <select
          value={filters.userType}
          onChange={(e) => setFilters(prev => ({ ...prev, userType: e.target.value }))}
          className="form-control"
        >
          <option value="">Tất cả loại tài khoản</option>
          <option value="admin">Tài khoản quản trị</option>
          <option value="user">Tài khoản người dùng</option>
        </select>
      </div>
      <div className="filter-group">
        <select
          value={filters.role}
          onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
          className="form-control"
        >
          <option value="">Tất cả vai trò</option>
          {roles.map(role => (
            <option key={role.id} value={role.name}>{role.name}</option>
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
          <option value="suspended">Tạm khóa</option>
        </select>
      </div>
      <div className="filter-group">
        <select
          value={filters.department}
          onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
          className="form-control"
        >
          <option value="">Tất cả phòng ban</option>
          {departments.map(dept => (
            <option key={dept.id} value={dept.name}>{dept.name}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderUserForm = () => (
    <div className="user-form">
      <div className="form-row">
        <div className="form-group">
          <label>Tên đăng nhập *</label>
          <input
            type="text"
            value={currentUser.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            placeholder="Nhập tên đăng nhập"
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={currentUser.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Nhập email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Họ tên *</label>
          <input
            type="text"
            value={currentUser.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
            placeholder="Nhập họ tên"
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="tel"
            value={currentUser.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="form-control"
            placeholder="Nhập số điện thoại"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Loại tài khoản *</label>
          <select
            value={currentUser.userType}
            onChange={(e) => handleInputChange('userType', e.target.value)}
            className={`form-control ${errors.userType ? 'is-invalid' : ''}`}
          >
            <option value="">Chọn loại tài khoản</option>
            <option value="admin">Tài khoản quản trị</option>
            <option value="user">Tài khoản người dùng</option>
          </select>
          {errors.userType && <div className="invalid-feedback">{errors.userType}</div>}
        </div>
        <div className="form-group">
          <label>Vai trò *</label>
          <select
            value={currentUser.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            className={`form-control ${errors.role ? 'is-invalid' : ''}`}
          >
            <option value="">Chọn vai trò</option>
            {roles.map(role => (
              <option key={role.id} value={role.name}>{role.name}</option>
            ))}
          </select>
          {errors.role && <div className="invalid-feedback">{errors.role}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Phòng ban</label>
          <select
            value={currentUser.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className="form-control"
          >
            <option value="">Chọn phòng ban</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.name}>{dept.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Chức vụ</label>
          <select
            value={currentUser.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            className="form-control"
          >
            <option value="">Chọn chức vụ</option>
            {positions.map(pos => (
              <option key={pos.id} value={pos.name}>{pos.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Avatar URL</label>
          <input
            type="url"
            value={currentUser.avatar}
            onChange={(e) => handleInputChange('avatar', e.target.value)}
            className="form-control"
            placeholder="Nhập URL avatar"
          />
        </div>
        <div className="form-group">
          <label>Trạng thái</label>
          <select
            value={currentUser.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="form-control"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
            <option value="suspended">Tạm khóa</option>
          </select>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-user-management">
      <div className="page-header">
        <h1>Quản lý người dùng</h1>
        <button className="btn btn-primary" onClick={handleAddNew}>
          <i className="bi bi-plus"></i>
          Thêm người dùng
        </button>
      </div>

      {renderFilters()}

      <div className="admin-table-container">
        <DataTable
          data={paginatedUsers}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sortConfig={sortConfig}
          onSort={handleSort}
          itemsPerPage={itemsPerPage}
          totalItems={sortedUsers.length}
          tableClassName="admin-table"
        />
      </div>

      <FormModal
        show={showModal}
        onClose={handleCloseModal}
        title={editMode ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
        onSubmit={handleSubmit}
        submitText={editMode ? 'Cập nhật' : 'Thêm'}
      >
        {renderUserForm()}
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

export default UserManagement; 