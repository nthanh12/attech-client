import React from "react";
import { Link } from "react-router-dom";
import "./SidebarService.css";

const SidebarService = ({ openSidebar, setOpenSidebar }) => {
  return (
    <div className={openSidebar ? "sidebar-service resize" : "sidebar-service"}>
      <div className="top-sidebar">
        <button
          onClick={() => setOpenSidebar(!openSidebar)}
          aria-label={openSidebar ? "Thu nhỏ sidebar" : "Mở rộng sidebar"}
          aria-expanded={!openSidebar}
        >
          <i className="fa fa-solid fa-bars"></i>
        </button>
        {openSidebar ? null : <span>DỊCH VỤ</span>}
        <hr />
      </div>

      <Link to="/services/cns" className="sp-nav-button" aria-label="CNS/ATM">
        {openSidebar ? null : <span>Dịch vụ thông tin dẫn đường giám sát</span>}
      </Link>

      <Link
        to="/services/flightcheck"
        className="sp-nav-button"
        aria-label="Bay kiểm tra hiệu chuẩn"
      >
        {openSidebar ? null : <span>Dịch vụ Bay kiểm tra hiệu chuẩn</span>}
      </Link>

      <Link
        to="/services/testing"
        className="sp-nav-button"
        aria-label="Thử nghiệm - Hiệu chuẩn"
      >
        {openSidebar ? null : <span>Dịch vụ Thử nghiệm - Hiệu chuẩn</span>}
      </Link>

      <Link
        to="/services/aviation-tech"
        className="sp-nav-button"
        aria-label="Kỹ thuật (Hàng không)"
      >
        {openSidebar ? null : <span>Dịch vụ Kỹ thuật (Hàng không)</span>}
      </Link>

      <Link
        to="/services/training"
        className="sp-nav-button"
        aria-label="Huấn luyện - Đào tạo"
      >
        {openSidebar ? null : <span>Dịch vụ Huấn luyện - Đào tạo</span>}
      </Link>

      <Link
        to="/services/consulting"
        className="sp-nav-button"
        aria-label="Tư vấn đầu tư"
      >
        {openSidebar ? null : (
          <span>Dịch vụ tư vấn đầu tư xây dựng và QLDA</span>
        )}
      </Link>
    </div>
  );
};

export default SidebarService;
