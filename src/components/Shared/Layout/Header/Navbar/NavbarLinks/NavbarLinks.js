import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavbarLinks.css";

const menuItems = [
  { path: "/", label: "Trang chủ" },
  {
    label: "Sản phẩm",
    path: "/products",
    submenu: [
      {
        path: "/products/cns-atm",
        label: "CNS/ATM",
        submenu: [
          { path: "/products/1/he-thong-ads-b", label: "Hệ thống ADS-B" },
          { path: "/products/2/he-thong-amhs", label: "Hệ thống AMHS" },
          { path: "/products/3/he-thong-amss", label: "Hệ thống AMSS" },
        ],
      },
      {
        path: "/products/he-thong-den-hieu",
        label: "Hệ thống đèn hiệu",
        submenu: [
          {
            path: "/products/4/den-papi",
            label: "Đèn chỉ thị góc tiếp cận chính xác - PAPI",
          },
          {
            path: "/products/5/den-chc-hai-huong",
            label: "Đèn lề đường CHC hai hướng lắp nổi",
          },
          {
            path: "/products/6/den-le-duong-noi-led",
            label: "Đèn lề đường lăn lắp nổi LED",
          },
          { path: "/products/7/den-chop-lap-noi", label: "Đèn chớp lắp nổi" },
          {
            path: "/products/8/den-1-pha-lap-noi",
            label: "Đèn pha 1 hướng lắp nổi",
          },
          { path: "/products/9/den-pha-xoay", label: "Đèn pha xoay" },
        ],
      },
      {
        path: "/products/shelter",
        label: "Shelter",
        submenu: [
          {
            path: "/products/10/shelter-composite",
            label: "Shelter Composite",
          },
          { path: "/products/11/shelter-thep", label: "Shelter Thép" },
        ],
      },
      {
        path: "/products/ban-console",
        label: "Bàn console",
        submenu: [
          { path: "/products/12/aic-console", label: "ATC consoles" },
          {
            path: "/products/13/technical-console",
            label: "Technical console",
          },
        ],
      },
      {
        path: "/products/gian-phan-xa-vor",
        label: "Giàn phản xạ VOR",
        submenu: [
          {
            path: "/products/14/gian-phan-xa-de-pha-huy",
            label: "Giàn phản xạ dễ phá hủy",
          },
          {
            path: "/products/15/gian-phan-xa-thep",
            label: "Giàn phản xạ thép",
          },
        ],
      },
      {
        path: "/products/thiet-bi-ghi-am-ghi-hinh",
        label: "Thiết bị ghi âm/ghi hình",
        submenu: [
          {
            path: "/products/16/ghi-am-chuyen-dung-hang-khong",
            label: "Thiết bị ghi âm chuyên dụng",
          },
          {
            path: "/products/17/ghi-thoai-du-lieu",
            label: "Thiết bị ghi thoại dữ liệu",
          },
        ],
      },
      {
        path: "/products/cac-san-pham-dan-dung-khac",
        label: "Các sản phẩm dân dụng khác",
        submenu: [
          {
            path: "/products/18/dong-ho-thoi-gian-chuan-gps",
            label: "Đồng hồ thời gian chuẩn GPS",
          },
          { path: "/products/19/may-cat-vau", label: "Máy cắt vấu" },
          { path: "/products/20/may-la", label: "Máy là" },
          { path: "/products/21/may-han-tig", label: "Máy hàn TIG" },
          { path: "/products/22/may-loc", label: "Máy lốc" },
          { path: "/products/23/may-han-quay", label: "Máy hàn quay" },
        ],
      },
    ],
  },
  {
    label: "Dịch vụ",
    path: "/services",
    submenu: [
      {
        path: "/services/cns",
        label: "Dịch vụ thông tin dẫn đường giám sát (CNS)",
      },
      {
        path: "/services/flightcheck",
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
        label: "Tin hoạt động",
        path: "/news/all-act",
        submenu: [
          { label: "Hoạt động công ty", path: "/news/activities" },
          { label: "Đảng bộ công ty", path: "/news/party" },
          { label: "Đoàn thanh niên công ty", path: "/news/youth" },
          { label: "Công đoàn công ty", path: "/news/union" },
        ],
      },
      {
        label: "Tin ngành hàng không",
        path: "/news/aviation",
      },
      {
        label: "Tuyên truyền pháp luật",
        path: "/news/law",
      },
    ],
  },
  {
    label: "Thông báo",
    path: "/notifications",
    submenu: [
      { path: "/notifications/recruitment", label: "Tuyển dụng" },
      { path: "/notifications/supplier", label: "Thông báo mời nhà cung cấp" },
      { path: "/notifications/others", label: "Thông báo khác" },
    ],
  },
  {
    label: "Thông tin công ty",
    path: "/company",
    submenu: [
      { path: "/company/history", label: "Lịch sử ra đời" },
      { path: "/company/structure", label: "Cơ cấu tổ chức" },
      { path: "/company/leadership", label: "Ban lãnh đạo" },
      { path: "/company/business", label: "Ngành nghề kinh doanh" },
      { path: "/company/iso", label: "Hệ thống chứng chỉ ISO" },
      { path: "/company/finance", label: "Thông tin tài chính" },
      { path: "/company/library", label: "Thư viện công ty" },
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

    return currentPath === path || currentPath.startsWith(path + "/");
  };

  const renderDropdownMenu = (items, parentPath = "") => {
    return (
      <div className="navbar-links dropdown-menu m-lg-0">
        {items.map((sub) => {
          if (sub.submenu) {
            // Xử lý menu con nhiều cấp
            return (
              <div key={sub.path} className="dropdown-item dropdown">
                <span
                  className={`dropdown-toggle ${
                    isActive(sub.path, sub.query) ? "active" : ""
                  }`}
                  onClick={() => handleNavigate(sub.path, sub.query)}
                  style={{ cursor: "pointer" }}
                >
                  {sub.label}
                </span>
                <div className="dropdown-menu-son dropdown-submenu">
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
          className="btn searchbtn py-2 px-3"
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
