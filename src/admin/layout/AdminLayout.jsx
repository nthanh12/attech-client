// AdminLayout.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});
  const [now, setNow] = useState(new Date());

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem("admin_token");
      navigate("/admin/login");
    }
  };

  const handleAccount = () => {
    navigate("/admin/account");
    setDropdownOpen(false);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const toggleSubMenu = (path) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: "bi bi-speedometer2" },
    { path: "/admin/products", label: "Sản phẩm", icon: "bi bi-box" },
    { path: "/admin/services", label: "Dịch vụ", icon: "bi bi-gear" },
    { path: "/admin/news", label: "Tin tức", icon: "bi bi-newspaper" },
    { path: "/admin/notifications", label: "Thông báo", icon: "bi bi-bell" },
    { path: "/admin/config", label: "Cấu hình", icon: "bi bi-sliders" },
    { path: "/admin/accounts", label: "Tài khoản", icon: "bi bi-people" },
    {
      path: "/admin/menu",
      label: "Danh mục",
      icon: "bi bi-collection-fill",
      subItems: [
        { path: "/admin/product-category", label: "Loại sản phẩm" },
        { path: "/admin/news-category", label: "Loại tin tức" },
        { path: "/admin/notification-category", label: "Loại thông báo" },
      ],
    },
  ];

  useEffect(() => {
    const activeParent = navItems.find(
      (item) =>
        item.subItems &&
        item.subItems.some((si) => si.path === location.pathname)
    );
    if (activeParent && !openSubMenus[activeParent.path]) {
      toggleSubMenu(activeParent.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  return (
    <div className="admin-layout d-flex">
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
          <Link
            to="/admin"
            className="d-flex align-items-center gap-2 text-decoration-none"
          >
            <i className="bi bi-rocket-takeoff fs-4"></i>
            <h4 className="mb-0 sidebar-title">ATTECH</h4>
          </Link>
          <button
            className="btn btn-sm d-md-none toggle-sidebar-close-btn"
            onClick={toggleSidebar}
          >
            <i className="bi bi-x-lg fs-5"></i>
          </button>
        </div>

        <ul className="nav flex-column mt-3">
          {navItems.map((item) =>
            item.subItems ? (
              <li key={item.path} className="nav-item">
                <button
                  className={`nav-link d-flex align-items-center gap-2 w-100 ${
                    location.pathname.startsWith(item.path)
                      ? "active-parent"
                      : ""
                  }`}
                  onClick={() => toggleSubMenu(item.path)}
                  aria-expanded={!!openSubMenus[item.path]}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                  <i
                    className={`bi bi-chevron-down ms-auto ${
                      openSubMenus[item.path] ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>
                <ul className={`sub-menu ${openSubMenus[item.path] ? "open" : ""}`}>
                  {item.subItems.map((si) => (
                    <li key={si.path}>
                      <Link
                        to={si.path}
                        className={`nav-link d-flex align-items-center gap-2 w-100 ${
                          location.pathname === si.path ? "active" : ""
                        }`}
                        onClick={handleLinkClick}
                      >
                        <span>{si.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link d-flex align-items-center gap-2 w-100 ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          )}

          <li className="nav-item mt-auto sidebar-logout-section">
            <button
              className="nav-link d-flex align-items-center gap-2 w-100 btn btn-link"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i>
              <span>Đăng xuất</span>
            </button>
          </li>
        </ul>
      </div>

      <div className="main-wrapper flex-grow-1 d-flex flex-column">
        <header className="bg-white p-3 border-bottom d-flex justify-content-between align-items-center main-header sticky-header">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn d-md-none p-1 toggle-sidebar-open-btn"
              onClick={toggleSidebar}
            >
              <i className="bi bi-list fs-3"></i>
            </button>
            <h5 className="mb-0 header-title">Trang quản trị</h5>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="header-clock">
              <i className="bi bi-clock"></i> {now.toLocaleTimeString()}
            </div>
            <Link
              to="/"
              className="btn btn-outline-primary d-flex align-items-center gap-2"
              title="Về trang chủ"
            >
              <span>Trang chủ</span>
            </Link>
            <div className="dropdown position-relative">
              <button
                className="btn btn-outline-secondary d-flex align-items-center gap-2"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
              >
                <Link to="/login" className="text-decoration-none" style={{color: 'inherit'}}>
                  Đăng nhập người dùng
                </Link>
                <i className="bi bi-chevron-down"></i>
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu show position-absolute end-0 mt-2">
                  <li>
                    <button className="dropdown-item" onClick={handleAccount}>
                      Tài khoản
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </header>

        <main className="flex-grow-1 p-4 main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
