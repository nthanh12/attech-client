import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { changePassword } from '../../services/authService';
import './AccountManagement.css';

const AccountManagement = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ show: false, type: '', text: '' });

  // Debug removed to prevent React rendering issues

  // Form states for change password
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordForm.currentPassword.trim()) {
      newErrors.currentPassword = 'Mật khẩu hiện tại là bắt buộc';
    }

    if (!passwordForm.newPassword.trim()) {
      newErrors.newPassword = 'Mật khẩu mới là bắt buộc';
    } else if (passwordForm.newPassword.length < 6) {
      newErrors.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự';
    }

    if (!passwordForm.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      return;
    }

    setLoading(true);
    try {
      const result = await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword
      });

      if (result.success) {
        setMessage({
          show: true,
          type: 'success',
          text: result.message || 'Đổi mật khẩu thành công!'
        });

        // Reset form
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setErrors({});

        // Show success message and logout after delay
        setTimeout(() => {
          alert('Đổi mật khẩu thành công! Bạn sẽ được đăng xuất để đăng nhập lại với mật khẩu mới.');
          logout();
        }, 2000);
      } else {
        setMessage({
          show: true,
          type: 'error',
          text: result.message || 'Đổi mật khẩu thất bại'
        });
      }

    } catch (error) {
      setMessage({
        show: true,
        type: 'error',
        text: error.message || 'Đổi mật khẩu thất bại'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      logout();
    }
  };

  useEffect(() => {
    if (message.show) {
      const timer = setTimeout(() => {
        setMessage({ show: false, type: '', text: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message.show]);

  return (
    <div className="account-management">
      <div className="account-header">
        <h1>Quản lý tài khoản</h1>
        <p>Quản lý thông tin cá nhân và bảo mật tài khoản</p>
      </div>

      <div className="account-tabs">
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <i className="bi bi-person"></i>
          Thông tin tài khoản
        </button>
        <button
          className={`tab-button ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          <i className="bi bi-lock"></i>
          Đổi mật khẩu
        </button>
      </div>

      {message.show && (
        <div className={`alert alert-${message.type}`}>
          <i className={`bi bi-${message.type === 'success' ? 'check-circle' : 'exclamation-triangle'}`}></i>
          {message.text}
        </div>
      )}

      <div className="account-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className="profile-info">
                  <h3>{user?.name || 'User'}</h3>
                  <p className="user-role">{user?.userType || 'User'}</p>
                </div>
              </div>

              <div className="profile-details">
                <div className="detail-item">
                  <label>Username:</label>
                  <span>{user?.username || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <label>Email:</label>
                  <span>{user?.email || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <label>Họ tên:</label>
                  <span>{user?.name || user?.fullName || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <label>Vai trò:</label>
                  <span>{user?.roleName || 'editor'}</span>
                </div>
                <div className="detail-item">
                  <label>ID vai trò:</label>
                  <span>
                    {user?.roleId || 3}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Đăng nhập lần cuối:</label>
                  <span>{user?.lastLogin ? new Date(user.lastLogin).toLocaleString('vi-VN') : 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <label>Trạng thái:</label>
                  <span className={`status ${user?.status === 'active' ? 'active' : 'inactive'}`}>
                    {user?.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </div>
              </div>

              <div className="profile-actions">
                <button className="btn btn-primary" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i>
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="password-section">
            <div className="password-card">
              <h3>Đổi mật khẩu</h3>
              <p>Nhập mật khẩu hiện tại và mật khẩu mới để thay đổi</p>

              <form onSubmit={handleChangePassword} className="password-form">
                <div className="form-group">
                  <label>Mật khẩu hiện tại *</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
                    placeholder="Nhập mật khẩu hiện tại"
                    disabled={loading}
                  />
                  {errors.currentPassword && (
                    <div className="invalid-feedback">{errors.currentPassword}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Mật khẩu mới *</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                    placeholder="Nhập mật khẩu mới"
                    disabled={loading}
                  />
                  {errors.newPassword && (
                    <div className="invalid-feedback">{errors.newPassword}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Xác nhận mật khẩu mới *</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="Nhập lại mật khẩu mới"
                    disabled={loading}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status"></span>
                      Đang đổi mật khẩu...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle"></i>
                      Đổi mật khẩu
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountManagement; 