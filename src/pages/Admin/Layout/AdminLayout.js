import React, { useState, useEffect } from "react"; // Thêm useEffect
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Thay đổi: Quản lý trạng thái mở cho từng sub-menu
  const [openSubMenus, setOpenSubMenus] = useState({});

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem("authToken");
      navigate("/admin/login");
    }
  };

  const handleAccount = () => {
    navigate("/admin/account");
    setDropdownOpen(false); // Đóng dropdown sau khi điều hướng
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Thay đổi: Hàm toggle cho từng sub-menu cụ thể
  const toggleSubMenu = (path) => {
    setOpenSubMenus((prevOpenSubMenus) => ({
      ...prevOpenSubMenus,
      [path]: !prevOpenSubMenus[path],
    }));
  };

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: "bi bi-speedometer2" },
    { path: "/admin/products", label: "Sản phẩm", icon: "bi bi-box" },
    { path: "/admin/services", label: "Dịch vụ", icon: "bi bi-gear" },
    { path: "/admin/news", label: "Tin tức", icon: "bi bi-newspaper" },
    { path: "/admin/notifications", label: "Thông báo", icon: "bi bi-bell" },
    { path: "/admin/config", label: "Cấu hình", icon: "bi bi-sliders" }, // Đổi icon cho Cấu hình
    {
      path: "/admin/menu", // Path này dùng làm key cho sub-menu
      label: "Danh mục từ điển",
      icon: "bi bi-collection-fill", // Đổi icon
      subItems: [
        { path: "/admin/menu/product-types", label: "Loại sản phẩm" },
        { path: "/admin/menu/news-types", label: "Loại tin tức" },
        { path: "/admin/menu/notification-types", label: "Loại thông báo" },
      ],
    },
    // Thêm một ví dụ menu có sub-menu khác để kiểm tra
    // {
    //   path: "/admin/settings",
    //   label: "Cài đặt hệ thống",
    //   icon: "bi bi-tools",
    //   subItems: [
    //     { path: "/admin/settings/general", label: "Cài đặt chung" },
    //     { path: "/admin/settings/users", label: "Quản lý người dùng" },
    //   ],
    // },
  ];

  // Tự động mở sub-menu chứa item active khi tải trang hoặc chuyển route
  useEffect(() => {
    const activeParent = navItems.find(
      (item) =>
        item.subItems &&
        item.subItems.some((subItem) => subItem.path === location.pathname)
    );
    if (activeParent && !openSubMenus[activeParent.path]) {
      toggleSubMenu(activeParent.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, navItems]); // Thêm navItems vào dependency array nếu nó có thể thay đổi (mặc dù ở đây là hằng số)

  // Đóng sidebar khi click vào link (kể cả sub-item) trên mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="admin-layout d-flex">
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      {/* Sidebar */}
      <div className={`sidebar bg-dark  ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
          <Link
            to="/admin"
            className="d-flex align-items-center gap-2 text-white text-decoration-none"
          >
            <i className="bi bi-rocket-takeoff fs-4"></i>
            <h4 className="mb-0 sidebar-title">ATTECH</h4>
          </Link>
          <button
            className="btn btn-sm d-md-none text-white toggle-sidebar-close-btn"
            onClick={toggleSidebar}
          >
            <i className="bi bi-x-lg fs-5"></i>
          </button>
        </div>
        <ul className="nav flex-column mt-3">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              {item.subItems ? (
                <>
                  <button
                    className={`nav-link text-white d-flex align-items-center gap-2 w-100 ${
                      // Highlight parent nếu path hiện tại bắt đầu bằng path của parent
                      location.pathname.startsWith(item.path)
                        ? "active-parent"
                        : ""
                    }`}
                    onClick={() => toggleSubMenu(item.path)} // Sử dụng item.path làm key
                    aria-expanded={!!openSubMenus[item.path]} // Chuyển sang boolean
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                    <i
                      className={`bi bi-chevron-down ms-auto transition-transform ${
                        openSubMenus[item.path] ? "rotate-180" : "" // class rotate mới
                      }`}
                    ></i>
                  </button>
                  {/* Sử dụng class để ẩn hiện sub-menu cho phép animation CSS */}
                  <ul
                    className={`sub-menu ${
                      openSubMenus[item.path] ? "open" : ""
                    }`}
                  >
                    {item.subItems.map((subItem) => (
                      <li key={subItem.path}>
                        <Link
                          to={subItem.path}
                          className={`nav-link text-white d-flex align-items-center gap-2 ${
                            location.pathname === subItem.path ? "active" : ""
                          }`}
                          onClick={handleLinkClick} // Đóng sidebar trên mobile
                        >
                          <span>{subItem.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`nav-link text-white d-flex align-items-center gap-2 ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  onClick={handleLinkClick} // Đóng sidebar trên mobile
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
          <li className="nav-item mt-auto sidebar-logout-section">
            <button
              className="nav-link text-white d-flex align-items-center gap-2 btn btn-link w-100"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i>
              <span>Đăng xuất</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="main-wrapper flex-grow-1 d-flex flex-column">
        {/* Header */}
        <header className="bg-white p-3 border-bottom d-flex justify-content-between align-items-center main-header">
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
            <Link
              to="/"
              className="btn btn-outline-primary d-flex align-items-center gap-2"
              title="Về trang chủ"
            >
              <i className="bi bi-house-door-fill fs-5"></i>
              <span className="d-none d-sm-inline">Trang chủ</span>
            </Link>

            <div className="position-relative">
              <button
                className="btn btn-light d-flex align-items-center gap-2 user-dropdown-toggle"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <i className="bi bi-person-circle fs-4"></i>
                <span className="d-none d-md-inline">Admin</span>{" "}
                {/* Ẩn chữ Admin trên mobile nhỏ */}
                <i className="bi bi-caret-down-fill small"></i>
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu dropdown-menu-end show mt-2 user-dropdown-menu">
                  <button className="dropdown-item" onClick={handleAccount}>
                    <i className="bi bi-person-fill me-2"></i>
                    Tài khoản
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 bg-light flex-grow-1 page-content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
