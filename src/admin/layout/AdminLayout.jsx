// AdminLayout.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { usePermissions } from "../hooks/usePermissions";
import "./AdminLayout.css";
import "../admin-common.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { canAccess } = usePermissions();
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
    { path: "/admin", label: "Dashboard", icon: "bi bi-speedometer2", permission: "view_dashboard" },
    { 
      path: "/admin/products", 
      label: "Sản phẩm", 
      icon: "bi bi-box",
      permission: "view_products"
    },
    { 
      path: "/admin/services", 
      label: "Dịch vụ", 
      icon: "bi bi-gear",
      permission: "view_services"
    },
    { 
      path: "/admin/news", 
      label: "Tin tức", 
      icon: "bi bi-newspaper",
      permission: "view_news"
    },
    { 
      path: "/admin/notifications", 
      label: "Thông báo", 
      icon: "bi bi-bell",
      permission: "view_notifications"
    },
    { 
      path: "/admin/users", 
      label: "Quản lý người dùng", 
      icon: "bi bi-person-gear",
      permission: "view_users"
    },
    { 
      path: "/admin/routes", 
      label: "Quản lý Routes", 
      icon: "bi bi-diagram-3",
      permission: "view_routes"
    },
    { 
      path: "/admin/permissions", 
      label: "Quản lý Quyền hạn", 
      icon: "bi bi-shield-check",
      permission: "view_permissions"
    },
    { 
      path: "/admin/media", 
      label: "Quản lý Media", 
      icon: "bi bi-images",
      permission: "view_media"
    },
    { 
      path: "/admin/system-settings", 
      label: "Cài đặt hệ thống", 
      icon: "bi bi-gear-wide-connected",
      permission: "view_system_settings"
    },
    { 
      path: "/admin/config", 
      label: "Cấu hình Banner", 
      icon: "bi bi-sliders",
      permission: "view_banner_config"
    },
    {
      path: "/admin/menu",
      label: "Danh mục",
      icon: "bi bi-collection-fill",
      subItems: [
        { 
          path: "/admin/product-category", 
          label: "Loại sản phẩm",
          permission: "view_product_categories"
        },
        { 
          path: "/admin/news-category", 
          label: "Loại tin tức",
          permission: "view_news_categories"
        },
        { 
          path: "/admin/notification-category", 
          label: "Loại thông báo",
          permission: "view_notification_categories"
        },
      ],
    },
  ];

  // Filter nav items based on permissions
  const filteredNavItems = navItems.map(item => {
    if (item.subItems) {
      return {
        ...item,
        subItems: item.subItems.filter(subItem => 
          !subItem.permission || canAccess(subItem.permission)
        )
      };
    }
    return item;
  }).filter(item => 
    !item.permission || canAccess(item.permission)
  );

  useEffect(() => {
    const activeParent = filteredNavItems.find(
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
    <div className="admin-layout">
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            <i className="bi bi-rocket-takeoff"></i>
            <span>Admin Panel</span>
          </div>
        </div>

        <ul className="nav flex-column mt-3">
          {filteredNavItems.map((item) =>
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

      <div className="main-wrapper">
        <header className="header">
          <div className="header-left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              <i className="bi bi-list"></i>
            </button>
            <div className="breadcrumb">
              <span>Admin Panel</span>
              <i className="bi bi-chevron-right"></i>
              <span>{now.toLocaleDateString("vi-VN")}</span>
            </div>
          </div>

          <div className="header-right">
            <div className="time-display">
              <i className="bi bi-clock"></i>
              <span>{now.toLocaleTimeString("vi-VN")}</span>
            </div>

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
