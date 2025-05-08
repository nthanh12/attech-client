import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem("authToken");
      navigate("/admin/login");
    }
  };

  const handleAccount = () => {
    navigate("/admin/account");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSubMenu = () => setSubMenuOpen(!subMenuOpen);

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: "bi bi-speedometer2" },
    { path: "/admin/products", label: "Sản phẩm", icon: "bi bi-box" },
    { path: "/admin/services", label: "Dịch vụ", icon: "bi bi-gear" },
    { path: "/admin/news", label: "Tin tức", icon: "bi bi-newspaper" },
    { path: "/admin/notifications", label: "Thông báo", icon: "bi bi-bell" },
    { path: "/admin/config", label: "Cấu hình", icon: "bi bi-bell" },
    {
      path: "/admin/menu",
      label: "Danh mục từ điển",
      icon: "bi bi-menu",
      subItems: [
        { path: "/admin/menu/product-types", label: "Loại sản phẩm" },
        { path: "/admin/menu/news-types", label: "Loại tin tức" },
        { path: "/admin/menu/notification-types", label: "Loại thông báo" },
      ],
    },
  ];

  return (
    <div className="admin-layout d-flex">
      {/* Sidebar */}
      <div
        className={`sidebar bg-dark text-white ${sidebarOpen ? "open" : ""}`}
      >
        <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-rocket-takeoff fs-4"></i>
            <h4 className="mb-0">ATTECH</h4>
          </div>
          <button
            className="btn btn-sm d-md-none text-white"
            onClick={toggleSidebar}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <ul className="nav flex-column mt-3">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              {item.subItems ? (
                <>
                  <button
                    className={`nav-link text-white d-flex align-items-center gap-2 w-100 ${
                      location.pathname.startsWith(item.path) ? "active" : ""
                    }`}
                    onClick={toggleSubMenu}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                    <i
                      className={`bi bi-chevron-down ms-auto ${
                        subMenuOpen ? "rotate" : ""
                      }`}
                    ></i>
                  </button>
                  {subMenuOpen && (
                    <ul className="sub-menu">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            className={`nav-link text-white d-flex align-items-center gap-2 ${
                              location.pathname === subItem.path ? "active" : ""
                            }`}
                            onClick={() => setSidebarOpen(false)}
                          >
                            <span>{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`nav-link text-white d-flex align-items-center gap-2 ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
          <li className="nav-item mt-auto">
            <button
              className="nav-link text-white d-flex align-items-center gap-2 btn btn-link"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i>
              <span>Đăng xuất</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="main-content flex-grow-1 d-flex flex-column">
        {/* Header */}
        <header className="bg-white p-3 border-bottom d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <button className="btn d-md-none" onClick={toggleSidebar}>
              <i className="bi bi-list fs-3"></i>
            </button>
            <h5 className="mb-0">Trang quản trị</h5>
          </div>
          <div className="d-flex align-items-center gap-3">
            {/* Nút về trang chủ */}
            <Link
              to="/"
              className="btn btn-light d-flex align-items-center gap-2"
            >
              <i className="bi bi-house-door-fill fs-5"></i>
              <span>Trang chủ</span>
            </Link>

            {/* Dropdown */}
            <div className="position-relative">
              <button
                className="btn btn-light d-flex align-items-center gap-2"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <i className="bi bi-person-circle fs-4"></i>
                <span>Admin</span>
                <i className="bi bi-caret-down-fill small"></i>
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu dropdown-menu-end show mt-2">
                  <button className="dropdown-item" onClick={handleAccount}>
                    {/* <i className="fa fa-box-arrow-right me-2"></i> */}
                    Tài khoản
                  </button>
                  <button className="dropdown-item" onClick={handleLogout}>
                    {/* <i className="bi bi-box-arrow-right me-2"></i> */}
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 bg-light flex-grow-1">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
