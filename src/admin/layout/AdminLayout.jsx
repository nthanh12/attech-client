// AdminLayout.js
import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./AdminLayout.css";
import "../admin-common.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    user,
    logout,
    hasPermission,
    ROLES,
    loading,
    isAuthenticated,
  } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Always starts closed for overlay mode
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});
  // Removed now state - không cần clock

  // Watch for user state changes
  useEffect(() => {}, [user]);

  // Memoize navItems để tránh infinite loop
  const navItems = useMemo(() => {
    return getNavItemsByPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.roleId]); // Re-calculate khi roleId thay đổi

  useEffect(() => {
    const activeParent = navItems.find(
      (item) =>
        item.subItems &&
        item.subItems.some((subItem) =>
          location.pathname.startsWith(subItem.path)
        )
    );

    if (activeParent) {
      setOpenSubMenus((prev) => ({ ...prev, [activeParent.path]: true }));
    }
  }, [location.pathname, navItems]);

  // Không cần timer cho clock nữa - đã remove

  // Handle authentication state
  useEffect(() => {
    const authStatus = isAuthenticated();
    console.log('🔍 AdminLayout auth check:', { 
      pathname: location.pathname, 
      loading, 
      authStatus, 
      user: user?.username 
    });

    if (!loading && !authStatus) {
      console.log('❌ Not authenticated, redirecting to login');
      navigate("/dang-nhap", { replace: true });
    }
  }, [loading, isAuthenticated, navigate, location.pathname, user]);

  // Now handle early returns after all hooks
  if (loading) {
    return (
      <div
        className="attech-admin-loading-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated
  if (!isAuthenticated()) {
    return null;
  }

  function getNavItemsByPermissions() {
    
    // Define all possible navigation items with their required roleId
    const allNavItems = [
      {
        path: "/admin/dashboard",
        label: "Dashboard",
        icon: "bi bi-speedometer2",
        requiredRoleId: ROLES.EDITOR, // All roles can see dashboard
      },

      // News Management
      {
        path: "/admin/news",
        label: "Quản lý tin tức",
        icon: "bi bi-newspaper",
        requiredRoleId: ROLES.EDITOR,
        subItems: [
          {
            path: "/admin/news",
            label: "Danh sách tin tức",
            icon: "bi bi-newspaper",
            requiredRoleId: ROLES.EDITOR,
          },
          {
            path: "/admin/news-category",
            label: "Danh mục tin tức",
            icon: "bi bi-collection",
            requiredRoleId: ROLES.EDITOR,
          },
        ],
      },

      // Notification Management
      {
        path: "/admin/notifications",
        label: "Quản lý thông báo",
        icon: "bi bi-bell",
        requiredRoleId: ROLES.EDITOR,
        subItems: [
          {
            path: "/admin/notifications",
            label: "Danh sách thông báo",
            icon: "bi bi-bell",
            requiredRoleId: ROLES.EDITOR,
          },
          {
            path: "/admin/notification-category",
            label: "Danh mục thông báo",
            icon: "bi bi-collection",
            requiredRoleId: ROLES.EDITOR,
          },
        ],
      },

      // Product Management
      {
        path: "/admin/products",
        label: "Quản lý sản phẩm",
        icon: "bi bi-box",
        requiredRoleId: ROLES.EDITOR,
        subItems: [
          {
            path: "/admin/products",
            label: "Danh sách sản phẩm",
            icon: "bi bi-box",
            requiredRoleId: ROLES.EDITOR,
          },
          {
            path: "/admin/product-category",
            label: "Danh mục sản phẩm",
            icon: "bi bi-collection",
            requiredRoleId: ROLES.EDITOR,
          },
        ],
      },

      // Service Management
      {
        path: "/admin/services",
        label: "Quản lý dịch vụ",
        icon: "bi bi-gear",
        requiredRoleId: ROLES.EDITOR,
        subItems: [
          {
            path: "/admin/services",
            label: "Danh sách dịch vụ",
            icon: "bi bi-gear",
            requiredRoleId: ROLES.EDITOR,
          },
        ],
      },

      // User Management
      {
        path: "/admin/users",
        label: "Quản lý người dùng",
        icon: "bi bi-people-fill",
        requiredRoleId: ROLES.ADMIN, // Admin level required
        subItems: [
          {
            path: "/admin/users",
            label: "Danh sách người dùng",
            icon: "bi bi-person-lines-fill",
            requiredRoleId: ROLES.ADMIN,
          },
          {
            path: "/admin/roles",
            label: "Quản lý vai trò",
            icon: "bi bi-person-badge",
            requiredRoleId: ROLES.ADMIN,
          },
          // Permission Management removed - UserLevel system doesn't need permission UI
        ],
      },

      // Media Management
      {
        path: "/admin/albums",
        label: "Quản lý thư viện",
        icon: "bi bi-images",
        requiredRoleId: ROLES.EDITOR,
      },

      // Document Management
      {
        path: "/admin/documents",
        label: "Quản lý tài liệu",
        icon: "bi bi-file-earmark-text",
        requiredRoleId: ROLES.EDITOR,
      },
      // Contact Management
      {
        path: "/admin/contacts",
        label: "Quản lý liên hệ",
        icon: "bi bi-envelope",
        requiredRoleId: ROLES.EDITOR, // Allow editors to view contacts
      },

      // System Management
      {
        path: "/admin/system",
        label: "Cài đặt hệ thống",
        icon: "bi bi-gear-fill",
        requiredRoleId: ROLES.ADMIN,
        subItems: [
          {
            path: "/admin/config",
            label: "Cấu hình Banner",
            icon: "bi bi-sliders",
            requiredRoleId: ROLES.ADMIN,
          },
          {
            path: "/admin/system-settings",
            label: "Cài đặt hệ thống",
            icon: "bi bi-gear",
            requiredRoleId: ROLES.ADMIN,
          },
          {
            path: "/admin/routes",
            label: "Quản lý Route",
            icon: "bi bi-signpost",
            requiredRoleId: ROLES.SUPERADMIN,
          },
          {
            path: "/admin/api-endpoints",
            label: "Quản lý API Endpoint",
            icon: "bi bi-plug",
            requiredRoleId: ROLES.SUPERADMIN,
          },
        ],
      },
    ];

    // Filter navigation items based on roleId
    const filterItems = (items) => {
      if (!user || !user.roleId) {
        return []; // Hide all items if no user or roleId
      }

      return items.filter((item) => {
        // Check if user has the required role
        const hasRequiredRole = !item.requiredRoleId || hasPermission(item.requiredRoleId);

        // If item has subitems, filter them too
        if (item.subItems) {
          const filteredSubItems = filterItems(item.subItems);
          item.subItems = filteredSubItems;
          // Show parent item if it has permission OR if any subitem is visible
          return hasRequiredRole || filteredSubItems.length > 0;
        }

        return hasRequiredRole;
      });
    };

    const filteredItems = filterItems(allNavItems);
    return filteredItems;
  }

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      logout();
      navigate("/dang-nhap");
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

  const getPageTitle = () => {
    // Simple page title logic based on pathname
    const path = location.pathname;

    const titleMap = {
      "/admin": "Dashboard",
      "/admin/news": "Quản lý tin tức",
      "/admin/products": "Quản lý sản phẩm",
      "/admin/services": "Quản lý dịch vụ",
      "/admin/notifications": "Quản lý thông báo",
      "/admin/news-category": "Danh mục tin tức",
      "/admin/product-category": "Danh mục sản phẩm",
      "/admin/notification-category": "Danh mục thông báo",
      "/admin/users": "Quản lý người dùng",
      "/admin/albums": "Quản lý thư viện",
      "/admin/documents": "Quản lý tài liệu",
      "/admin/contacts": "Quản lý liên hệ",
    };

    return titleMap[path] || "Admin Dashboard";
  };

  const renderNavItem = (item) => {
    const isActive = location.pathname === item.path;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isSubMenuOpen = openSubMenus[item.path];

    if (hasSubItems) {
      return (
        <li
          key={item.path}
          className="attech-admin-nav-item"
          style={{ margin: "0.5rem 0" }}
        >
          <button
            className={`attech-admin-nav-link ${
              isActive ? "attech-admin-nav-active" : ""
            }`}
            onClick={() => toggleSubMenu(item.path)}
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1rem",
              color: "#e2e8f0",
              background: "transparent",
              border: "none",
              borderRadius: "8px",
              margin: "0 0.75rem",
              width: "calc(100% - 1.5rem)",
              cursor: "pointer",
            }}
          >
            <i className={item.icon}></i>
            <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
            <i
              className={`bi bi-chevron-${
                isSubMenuOpen ? "down" : "right"
              } attech-admin-submenu-toggle`}
            ></i>
          </button>
          <ul
            className={`attech-admin-submenu ${
              isSubMenuOpen ? "attech-admin-submenu-open" : ""
            }`}
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: isSubMenuOpen ? "block" : "none",
            }}
          >
            {item.subItems.map((subItem) => {
              // Check roleId for submenu item
              if (subItem.requiredRoleId && !hasPermission(subItem.requiredRoleId)) {
                return null;
              }

              return (
                <li key={subItem.path} className="attech-admin-submenu-item">
                  <Link
                    to={subItem.path}
                    className={`attech-admin-submenu-link ${
                      location.pathname === subItem.path
                        ? "attech-admin-submenu-active"
                        : ""
                    }`}
                    onClick={(e) => {
                      // Force navigation if needed
                      setTimeout(() => {
                        if (window.location.pathname !== subItem.path) {
                          window.location.href = subItem.path;
                        }
                      }, 100);

                      setSidebarOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.5rem 1rem 0.5rem 3rem",
                      color: "#cbd5e1",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      backgroundColor:
                        location.pathname === subItem.path
                          ? "rgba(59, 130, 246, 0.2)"
                          : "transparent",
                    }}
                  >
                    {subItem.icon && <i className={subItem.icon}></i>}
                    <span>{subItem.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      );
    }

    return (
      <li
        key={item.path}
        className="attech-admin-nav-item"
        style={{ margin: "0.5rem 0" }}
      >
        <Link
          to={item.path}
          className={`attech-admin-nav-link ${
            isActive ? "attech-admin-nav-active" : ""
          }`}
          onClick={(e) => {
            setSidebarOpen(false);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1rem",
            color: "#e2e8f0",
            textDecoration: "none",
            borderRadius: "8px",
            margin: "0 0.75rem",
            backgroundColor: isActive
              ? "rgba(59, 130, 246, 0.2)"
              : "transparent",
          }}
        >
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </Link>
      </li>
    );
  };

  // renderUserInfo removed - user info now in header dropdown

  return (
    <div
      className="attech-admin-dashboard-layout"
      style={{ display: "flex", minHeight: "100vh" }}
    >
      {/* Sidebar */}
      <nav
        className={`attech-admin-sidebar-nav ${
          sidebarOpen ? "attech-admin-sidebar-open" : ""
        }`}
        style={{
          width: "280px",
          backgroundColor: "#1e293b",
          color: "#e2e8f0",
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : "-280px", // Use exact pixel value
          height: "100vh",
          overflowY: "auto",
          zIndex: 1040,
          transition: "left 0.3s ease-in-out",
          boxShadow: sidebarOpen ? "0 0 20px rgba(0, 0, 0, 0.3)" : "none",
        }}
      >
        <div
          className="attech-admin-sidebar-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 1.5rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <i
              className="bi bi-gear-fill"
              style={{ color: "#3b82f6", fontSize: "1.25rem" }}
            ></i>
            <span style={{ fontWeight: "600", color: "#fff" }}>
              Admin Panel
            </span>
          </div>
          <button
            className="attech-admin-sidebar-toggle"
            onClick={toggleSidebar}
            style={{
              background: "none",
              border: "none",
              color: "#e2e8f0",
              fontSize: "1.125rem",
              cursor: "pointer",
              padding: "0.25rem",
            }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div
          className="attech-admin-sidebar-content"
          style={{ padding: "1rem 0" }}
        >
          <ul
            className="attech-admin-nav-menu"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            {navItems.map(renderNavItem)}
          </ul>
        </div>

        <div
          className="attech-admin-sidebar-footer"
          style={{
            padding: "1rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: "0.75rem",
            color: "#94a3b8",
            textAlign: "center",
          }}
        >
          <div>Chương trình quản trị Website</div>
          <div>Attech Admin Panel</div>
          <div>v1.0.0</div>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className="attech-admin-main-content"
        style={{
          marginLeft: "0", // No margin for overlay mode
          flex: 1,
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* Header */}
        <header
          className="attech-admin-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 1.5rem",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <div
            className="attech-admin-header-left"
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <button
              className="attech-admin-sidebar-toggle"
              onClick={toggleSidebar}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "1rem",
                color: "#6b7280",
                cursor: "pointer",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                width: "36px",
                height: "36px",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f3f4f6";
                e.target.style.color = "#374151";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#6b7280";
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <h1
              className="attech-admin-page-title"
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#1f2937",
                margin: 0,
              }}
            >
              {getPageTitle()}
            </h1>
          </div>

          <div
            className="attech-admin-header-right"
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            {/* Home Button */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0.75rem",
                background: "#315851ff",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: "500",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 4px 8px rgba(59, 130, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <i className="bi bi-house-door" style={{ fontSize: "1rem" }}></i>
              <span>Trang chủ</span>
            </Link>

            {/* User Dropdown */}
            <div
              className="attech-admin-user-dropdown"
              style={{ position: "relative" }}
            >
              <button
                className="attech-admin-user-dropdown-toggle"
                onClick={toggleDropdown}
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 0.75rem",
                  background: "#f3f4f6",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  color: "#374151",
                }}
              >
                <i
                  className="bi bi-person-circle"
                  style={{ fontSize: "1.25rem" }}
                ></i>
                <span>
                  {(user?.name || user?.username || "Admin").toString()}
                </span>
                <i
                  className={`bi bi-chevron-${dropdownOpen ? "up" : "down"}`}
                  style={{ fontSize: "0.75rem" }}
                ></i>
              </button>

              {dropdownOpen && (
                <div
                  className="attech-admin-dropdown-menu"
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "0.5rem",
                    backgroundColor: "#ffffff",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                    minWidth: "200px",
                    zIndex: 1001,
                  }}
                >
                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <div style={{ fontWeight: "500", color: "#1f2937" }}>
                      {(user?.name || user?.username || "Admin").toString()}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                      {user?.email || ""}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                      {user?.roleName || 'editor'}
                    </div>
                  </div>
                  <button
                    className="attech-admin-dropdown-item"
                    onClick={(e) => {
                      handleAccount();
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1rem",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      color: "#374151",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#f3f4f6")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    <i className="bi bi-person"></i>
                    Tài khoản
                  </button>
                  <div
                    className="attech-admin-dropdown-divider"
                    style={{
                      height: "1px",
                      backgroundColor: "#e5e7eb",
                      margin: "0.25rem 0",
                    }}
                  ></div>
                  <button
                    className="attech-admin-dropdown-item"
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1rem",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      color: "#dc2626",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#fef2f2")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main
          className="attech-admin-page-content"
          style={{
            flex: 1,
            overflow: "auto",
          }}
        >
          {console.log('🔍 AdminLayout rendering Outlet for path:', location.pathname)}
          <Outlet />
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="attech-admin-sidebar-overlay"
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1030,
            transition: "opacity 0.3s ease-in-out",
          }}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
