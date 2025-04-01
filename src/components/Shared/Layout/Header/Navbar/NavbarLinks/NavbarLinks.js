import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavbarLinks.css";

const menuItems = [
  { path: "/", label: "Trang chủ" },
  {
    label: "Sản phẩm",
    path: "/products",
    submenu: [
      { path: "/products/cns-atm", label: "CNS/ATM" },
      {
        path: "/products/others",
        label: "Các sản phẩm khác",
        submenu: [
          { path: "/products/others/category1", label: "Hệ thống đèn hiệu" },
          { path: "/products/others/category2", label: "Shelt" },
        ],
      },
    ],
  },
  {
    label: "Dịch vụ",
    path: "/services",
    submenu: [
      {
        path: "/services/cns-atm",
        label: "Dịch vụ thông tin dẫn đường giám sát (CNS)",
      },
      {
        path: "/services/flight-check",
        label: "Dịch vụ Bay kiểm tra hiệu chuẩn",
      },
      {
        path: "/services/testing",
        label: "Dịch vụ Thử nghiệm - Hiệu chuẩn",
      },
      {
        path: "/services/aviation-tech",
        label: "Dịch vụ Kỹ thuật (Hàng không)",
      },
      {
        path: "/services/training",
        label: "Dịch vụ Huấn luyện - Đào tạo",
      },
      {
        path: "/services/consulting",
        label: "Dịch vụ Tư vấn đầu tư và xây dựng QLDA",
      },
    ],
  },
  {
    label: "Tin tức",
    path: "/news",
    submenu: [
      {
        path: "/news/list",
        query: { category: "activities" },
        label: "Tin hoạt động",
      },
      {
        path: "/news/list",
        query: { category: "aviation" },
        label: "Tin ngành hàng không",
      },
      {
        path: "/news/list",
        query: { category: "law" },
        label: "Tuyên truyền pháp luật",
      },
    ],
  },
  {
    label: "Thông báo",
    path: "/notifications",
    submenu: [
      { path: "/notifications/recruitment", label: "Tuyển dụng" },
      { path: "/notifications/supplier", label: "Thông báo mới nhà cung cấp" },
      { path: "/notifications/others", label: "Thông báo khác" },
    ],
  },
  {
    label: "Thông tin công ty",
    path: "/company-info",
    submenu: [
      { path: "/company-info/history", label: "Lịch sử ra đời" },
      { path: "/company-info/structure", label: "Cơ cấu tổ chức" },
      { path: "/company-info/leadership", label: "Ban lãnh đạo" },
      { path: "/company-info/business", label: "Ngành nghề kinh doanh" },
      { path: "/company-info/iso", label: "Hệ thống chứng chỉ ISO" },
      { path: "/company-info/finance", label: "Thông tin tài chính" },
    ],
  },
  { path: "/contact", label: "Liên hệ" },
];

const NavbarLinks = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path, query) => {
    if (query) {
      const queryString = new URLSearchParams(query).toString();
      navigate(`${path}?${queryString}`);
    } else {
      navigate(path);
    }
  };

  const isActive = (path, query) => {
    const currentPath = location.pathname;
    const currentQuery = new URLSearchParams(location.search).toString();

    if (query) {
      const queryString = new URLSearchParams(query).toString();
      return currentPath === path && currentQuery === queryString;
    }

    return currentPath.startsWith(path);
  };

  const renderDropdownMenu = (items, parentPath = "") => {
    return (
      <div className="dropdown-menu m-lg-0">
        {items.map((sub) => {
          if (sub.submenu) {
            // Xử lý menu con nhiều cấp
            return (
              <div key={sub.path} className="dropdown-item dropdown">
                <span
                  className={`dropdown-toggle ${
                    isActive(sub.path, sub.query) ? "active" : ""
                  }`}
                  data-bs-toggle="dropdown"
                  onClick={() => handleNavigate(sub.path, sub.query)}
                  style={{ cursor: "pointer" }}
                >
                  {sub.label}
                </span>
                <div className="dropdown-menu dropdown-submenu">
                  {sub.submenu.map((childSub) => (
                    <span
                      key={childSub.path}
                      className={`dropdown-item ${
                        isActive(childSub.path, childSub.query) ? "active" : ""
                      }`}
                      onClick={() =>
                        handleNavigate(childSub.path, childSub.query)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {childSub.label}
                    </span>
                  ))}
                </div>
              </div>
            );
          } else {
            // Xử lý menu con đơn giản
            return (
              <span
                key={sub.path}
                className={`dropdown-item ${
                  isActive(sub.path, sub.query) ? "active" : ""
                }`}
                onClick={() => handleNavigate(sub.path, sub.query)}
                style={{ cursor: "pointer" }}
              >
                {sub.label}
              </span>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <div className="navbar-nav ms-auto pt-2 pt-lg-0">
        {menuItems.map((item) => (
          <div key={item.path} className="nav-item dropdown">
            {item.submenu ? (
              <>
                <span
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  onClick={() => handleNavigate(item.path)}
                  style={{ cursor: "pointer" }}
                >
                  {item.label}
                </span>
                {renderDropdownMenu(item.submenu)}
              </>
            ) : (
              <span
                className={`nav-item nav-link ${
                  isActive(item.path) ? "active" : ""
                }`}
                onClick={() => handleNavigate(item.path)}
                style={{ cursor: "pointer" }}
              >
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="d-flex align-items-center flex-nowrap pt-3 pt-lg-0 ms-lg-2">
        <button
          className="btn btn-primary py-2 px-3"
          data-bs-toggle="modal"
          data-bs-target="#searchModal"
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  );
};

export default NavbarLinks;
