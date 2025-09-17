import React from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import AccessDenied from "../../components/AccessDenied";
import { useAuth } from "../../contexts/AuthContext";
import "./Dashboard.css";
import "../styles/adminButtons.css";

const Dashboard = () => {
  const { user: currentUser, ROLES } = useAuth();
  const navigate = useNavigate();

  // Check access permission
  if (!currentUser || currentUser.roleId > ROLES.EDITOR) {
    // Redirect user role 4 to trang-noi-bo
    if (currentUser && currentUser.roleId === 4) {
      navigate('/trang-noi-bo', { replace: true });
      return null;
    }

    return (
      <PageWrapper>
        <AccessDenied
          message="Bạn không có quyền truy cập trang này. Vui lòng liên hệ quản trị viên."
          user={currentUser ? {
            roleId: currentUser.roleId,
            roleName: currentUser.roleName,
            name: currentUser.name,
            username: currentUser.username
          } : null}
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="simple-admin-welcome">
        <div className="welcome-header">
          <div className="welcome-icon">
            <i className="bi bi-shield-check"></i>
          </div>
          <div className="welcome-content">
            <h1>Trang quản trị hệ thống</h1>
            <p>Quản lý và điều hành các chức năng của hệ thống</p>
            <div className="admin-info">
              <span className="user-role">Vai trò: {currentUser?.roleName || 'Admin'}</span>
              <span className="login-time">Đăng nhập: {new Date().toLocaleDateString('vi-VN')}</span>
            </div>
          </div>
        </div>

        <div className="admin-sections">
          <div className="section-title">
            <h3>Quản lý nội dung</h3>
            <p>Quản lý các nội dung và thông tin trên website</p>
          </div>
          <div className="admin-quick-access-grid">
            <button
              className="admin-quick-btn content"
              onClick={() => navigate("/admin/phonebook")}
            >
              <i className="bi bi-telephone-fill"></i>
              <span>Danh bạ điện thoại</span>
              <small>Quản lý thông tin liên hệ</small>
            </button>

            <button
              className="admin-quick-btn content"
              onClick={() => navigate("/admin/news")}
            >
              <i className="bi bi-newspaper"></i>
              <span>Tin tức</span>
              <small>Đăng và quản lý tin tức</small>
            </button>

            <button
              className="admin-quick-btn content"
              onClick={() => navigate("/admin/notifications")}
            >
              <i className="bi bi-bell"></i>
              <span>Thông báo</span>
              <small>Gửi thông báo tới người dùng</small>
            </button>

            <button
              className="admin-quick-btn content"
              onClick={() => navigate("/admin/contacts")}
            >
              <i className="bi bi-envelope"></i>
              <span>Liên hệ khách hàng</span>
              <small>Xem và trả lời liên hệ</small>
            </button>
          </div>
        </div>

        <div className="admin-sections">
          <div className="section-title">
            <h3>Quản lý hệ thống</h3>
            <p>Cấu hình và quản lý tài khoản, phân quyền</p>
          </div>
          <div className="admin-quick-access-grid">
            <button
              className="admin-quick-btn system"
              onClick={() => navigate("/admin/users")}
            >
              <i className="bi bi-people"></i>
              <span>Người dùng</span>
              <small>Quản lý tài khoản</small>
            </button>

            <button
              className="admin-quick-btn system"
              onClick={() => navigate("/admin/roles")}
            >
              <i className="bi bi-person-badge"></i>
              <span>Phân quyền</span>
              <small>Quản lý vai trò</small>
            </button>

            <button
              className="admin-quick-btn system"
              onClick={() => navigate("/admin/system-settings")}
            >
              <i className="bi bi-gear"></i>
              <span>Cài đặt</span>
              <small>Cấu hình hệ thống</small>
            </button>

            <button
              className="admin-quick-btn system"
              onClick={() => navigate("/admin/language-content")}
            >
              <i className="bi bi-translate"></i>
              <span>Ngôn ngữ</span>
              <small>Quản lý đa ngôn ngữ</small>
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;