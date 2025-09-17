import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import AccountModal from "../../components/AccountModal";
import "./UserDashboard.css";
import logo from "../../assets/img/logo.png";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);

  // Check if we're on the main dashboard page
  const isDashboardHome = location.pathname === "/trang-noi-bo";

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const toggleSubmenu = (submenuKey) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [submenuKey]: !prev[submenuKey],
    }));
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarVisible(!mobileSidebarVisible);
  };

  useEffect(() => {
    document.title = "Trang nội bộ";
  }, []);

  return (
    <div className="user-dashboard">
      {mobileSidebarVisible && (
        <div
          className="mobile-sidebar-overlay"
          onClick={toggleMobileSidebar}
        ></div>
      )}
      <div className="dashboard-layout">
        <aside className={`dashboard-sidebar ${mobileSidebarVisible ? 'show' : ''}`}>
          <div className="sidebar-header">
            <img className="logo-trang-noi-bo" src={logo}></img>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section">
              <h4>Dashboard</h4>
              <ul className="nav-list">
                <li className={`nav-item ${isDashboardHome ? "active" : ""}`}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/trang-noi-bo");
                    }}
                  >
                    <i className="bi bi-speedometer2"></i>
                    <span>Trang chủ</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="nav-section">
              <h4>Văn bản quản lý nội bộ</h4>
              <ul className="nav-list">
                <li className="nav-item">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/trang-noi-bo/to-chuc-bo-may");
                    }}
                  >
                    <i className="bi bi-diagram-3"></i>
                    <span>Tổ chức bộ máy</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/trang-noi-bo/quan-ly-hanh-chinh");
                    }}
                  >
                    <i className="bi bi-building"></i>
                    <span>Quản lý hành chính</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/trang-noi-bo/quan-ly-nhan-su");
                    }}
                  >
                    <i className="bi bi-people"></i>
                    <span>Quản lý nhân sự</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/trang-noi-bo/quan-ly-tai-chinh");
                    }}
                  >
                    <i className="bi bi-cash-stack"></i>
                    <span>Quản lý tài chính</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/trang-noi-bo/quan-ly-ky-thuat");
                    }}
                  >
                    <i className="bi bi-gear-wide-connected"></i>
                    <span>Quản lý kỹ thuật & KHCN</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="nav-section">
              <h4>Văn bản quản lý điều hành</h4>
              <ul className="nav-list">
                <li className="nav-item">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/trang-noi-bo/van-ban-cong-ty");
                    }}
                  >
                    <i className="bi bi-file-earmark-text"></i>
                    <span>Văn bản công ty</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/trang-noi-bo/van-ban-nhan-su");
                    }}
                  >
                    <i className="bi bi-file-earmark-text"></i>
                    <span>Văn bản về nhân sự</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/trang-noi-bo/van-ban-chk-va-bo-xay-dung");
                    }}
                  >
                    <i className="bi bi-file-earmark-text"></i>
                    <span>Văn bản CHK và Bộ Xây dựng </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/trang-noi-bo/he-thong-dinh-muc");
                    }}
                  >
                    <i className="bi bi-file-earmark-text"></i>
                    <span>Hệ thống định mức</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/trang-noi-bo/van-ban-cac-don-vi-khac");
                    }}
                  >
                    <i className="bi bi-file-earmark-text"></i>
                    <span>Văn bản các đơn vị khác</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="nav-section">
              <h4>Văn bản công đoàn</h4>
              <ul className="nav-list">
                <li className="nav-item">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/trang-noi-bo/van-ban-cong-doan");
                    }}
                  >
                    <i className="bi bi-people-fill"></i>
                    <span>Văn bản công đoàn</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="nav-section">
              <h4>Tài liệu hỗ trợ</h4>
              <ul className="nav-list">
                <li className="nav-item">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/trang-noi-bo/danh-ba");
                    }}
                  >
                    <i className="bi bi-telephone-fill"></i>
                    <span>Danh bạ điện thoại</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/trang-noi-bo/so-tay-nhan-vien");
                    }}
                  >
                    <i className="bi bi-journal-bookmark"></i>
                    <span>Sổ tay nhân viên</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        <div className="dashboard-main">
          <header className="dashboard-header">
            <div className="header-left">
              <button
                className="header-btn mobile-menu-btn"
                onClick={toggleMobileSidebar}
                title="Toggle menu"
              >
                <i className="bi bi-list"></i>
              </button>
              <button
                className="header-btn home-btn"
                onClick={() => navigate("/")}
                title="Về trang chủ website"
              >
                <i className="bi bi-house"></i>
                <span>Trang chủ</span>
              </button>
            </div>
            <div className="header-user">
              <div className="user-info">
                <i className="bi bi-person-circle"></i>
                <div className="user-details">
                  <span className="user-name">
                    {user?.name || user?.username}
                  </span>
                </div>
              </div>
              <div className="user-actions">
                <button
                  className="header-btn account-btn"
                  onClick={() => setShowAccountModal(true)}
                  title="Quản lý tài khoản"
                >
                  <i className="bi bi-person-gear"></i>
                  <span>Tài khoản</span>
                </button>
                <button
                  className="header-btn logout-btn"
                  onClick={handleLogout}
                  title="Đăng xuất khỏi hệ thống"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          </header>
          <main className="dashboard-content">
            {isDashboardHome ? (
              // Simple intro content with quick access
              <div className="simple-welcome">
                <div className="welcome-content">
                  <h1>Trang thông tin nội bộ</h1>
                  <p>Chào mừng bạn đến với hệ thống quản lý thông tin nội bộ</p>
                </div>

                <div className="quick-access-grid">
                  <button
                    className="quick-btn"
                    onClick={() => navigate("/trang-noi-bo/danh-ba")}
                  >
                    <i className="bi bi-telephone-fill"></i>
                    <span>Danh bạ điện thoại</span>
                  </button>

                  <button
                    className="quick-btn"
                    onClick={() => navigate("/trang-noi-bo/so-tay-nhan-vien")}
                  >
                    <i className="bi bi-journal-bookmark"></i>
                    <span>Sổ tay nhân viên</span>
                  </button>

                  <button
                    className="quick-btn"
                    onClick={() => navigate("/trang-noi-bo/van-ban-cong-ty")}
                  >
                    <i className="bi bi-file-earmark-text"></i>
                    <span>Văn bản công ty</span>
                  </button>

                  <button
                    className="quick-btn"
                    onClick={() => navigate("/trang-noi-bo/quan-ly-nhan-su")}
                  >
                    <i className="bi bi-people"></i>
                    <span>Quản lý nhân sự</span>
                  </button>

                  <button
                    className="quick-btn"
                    onClick={() => navigate("/trang-noi-bo/quan-ly-tai-chinh")}
                  >
                    <i className="bi bi-cash-stack"></i>
                    <span>Quản lý tài chính</span>
                  </button>

                  <button
                    className="quick-btn"
                    onClick={() => navigate("/trang-noi-bo/van-ban-cong-doan")}
                  >
                    <i className="bi bi-people-fill"></i>
                    <span>Văn bản công đoàn</span>
                  </button>
                </div>
              </div>
            ) : (
              // Show nested route content
              <Outlet />
            )}
          </main>
        </div>
      </div>

      <AccountModal
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
      />
    </div>
  );
};

export default UserDashboard;
