import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import "./UserDashboard.css";
import logo from "../../assets/img/LOGO-attech.png";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState({});

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

  useEffect(() => {
    document.title = "Trang nội bộ";
  }, []);

  return (
    <div className="user-dashboard">
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <img className="logo-trang-noi-bo" src={logo}></img>
            <span>Trang thông tin nội bộ</span>
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

          <div className="sidebar-footer">
            <div className="footer-actions">
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/")}
                title="Về trang chủ"
              >
                <i className="bi bi-house"></i>
                <span>Trang chủ</span>
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
                title="Đăng xuất"
              >
                <i className="bi bi-box-arrow-right"></i>
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="dashboard-main">
          <main className="dashboard-content">
            {isDashboardHome ? (
              // Show dashboard content only on home page
              <>
                <div className="internal-page-header mb-4">
                  <h1>Dashboard</h1>
                  <p className="text-muted">Chào mừng bạn quay trở lại</p>
                </div>

                <div className="document-overview">
                  <div className="stats-row">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <i className="bi bi-file-earmark-text"></i>
                      </div>
                      <div className="stat-info">
                        <h4>125</h4>
                        <p>Tài liệu nội bộ</p>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <i className="bi bi-bell"></i>
                      </div>
                      <div className="stat-info">
                        <h4>8</h4>
                        <p>Thông báo mới</p>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <i className="bi bi-calendar-event"></i>
                      </div>
                      <div className="stat-info">
                        <h4>3</h4>
                        <p>Sự kiện sắp tới</p>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <i className="bi bi-clock-history"></i>
                      </div>
                      <div className="stat-info">
                        <h4>15</h4>
                        <p>Tài liệu mới</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="recent-documents">
                  <div className="section-header">
                    <h3>Tài liệu mới cập nhật</h3>
                    <button className="btn btn-outline-primary btn-sm">
                      Xem tất cả
                    </button>
                  </div>

                  <div className="documents-list">
                    <div className="document-item">
                      <div className="doc-icon">
                        <i className="bi bi-file-earmark-pdf text-danger"></i>
                      </div>
                      <div className="doc-info">
                        <h5>Quy định về làm việc từ xa năm 2024</h5>
                        <p>Quản lý nhân sự • Cập nhật 2 ngày trước</p>
                      </div>
                      <div className="doc-status">
                        <span className="badge bg-success">Mới</span>
                      </div>
                    </div>

                    <div className="document-item">
                      <div className="doc-icon">
                        <i className="bi bi-file-earmark-word text-primary"></i>
                      </div>
                      <div className="doc-info">
                        <h5>Hướng dẫn sử dụng hệ thống ERP</h5>
                        <p>Quản lý kỹ thuật & KHCN • Cập nhật 3 ngày trước</p>
                      </div>
                      <div className="doc-status">
                        <span className="badge bg-warning">Quan trọng</span>
                      </div>
                    </div>

                    <div className="document-item">
                      <div className="doc-icon">
                        <i className="bi bi-file-earmark-excel text-success"></i>
                      </div>
                      <div className="doc-info">
                        <h5>Báo cáo tài chính quý IV/2024</h5>
                        <p>Quản lý tài chính • Cập nhật 5 ngày trước</p>
                      </div>
                      <div className="doc-status">
                        <span className="badge bg-secondary">Đã xem</span>
                      </div>
                    </div>

                    <div className="document-item">
                      <div className="doc-icon">
                        <i className="bi bi-file-earmark-text"></i>
                      </div>
                      <div className="doc-info">
                        <h5>Thông báo nghỉ lễ Tết Nguyên Đán 2025</h5>
                        <p>Văn bản công ty • Cập nhật 1 tuần trước</p>
                      </div>
                      <div className="doc-status">
                        <span className="badge bg-info">Thông báo</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="quick-access">
                  <div className="section-header">
                    <h3>Truy cập nhanh</h3>
                  </div>

                  <div className="quick-links">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/trang-noi-bo/danh-ba");
                      }}
                      className="quick-link"
                    >
                      <i className="bi bi-telephone-fill"></i>
                      <span>Danh bạ điện thoại</span>
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/trang-noi-bo/so-tay-nhan-vien");
                      }}
                      className="quick-link"
                    >
                      <i className="bi bi-journal-bookmark"></i>
                      <span>Sổ tay nhân viên</span>
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/trang-noi-bo/tu-dien-nang-luc");
                      }}
                      className="quick-link"
                    >
                      <i className="bi bi-book"></i>
                      <span>Từ điển năng lực</span>
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/trang-noi-bo/van-ban-cong-doan");
                      }}
                      className="quick-link"
                    >
                      <i className="bi bi-people-fill"></i>
                      <span>Văn bản công đoàn</span>
                    </a>
                  </div>
                </div>
              </>
            ) : (
              // Show nested route content
              <Outlet />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
