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

      <Link
        to="/services"
        className="sp-nav-button"
        aria-label="Tất cả dịch vụ"
      >
        <i className="fas fa-list-alt" aria-hidden="true"></i>
        {openSidebar ? null : <span>Tất cả dịch vụ</span>}
      </Link>

      <Link
        to="/services/cns-atm"
        className="sp-nav-button"
        aria-label="CNS/ATM"
      >
        <i className="fas fa-broadcast-tower" aria-hidden="true"></i>
        {openSidebar ? null : (
          <span>Dịch vụ thông tin dẫn đường giám sát (CNS)</span>
        )}
      </Link>

      <Link
        to="/services/flight-check"
        className="sp-nav-button"
        aria-label="Bay kiểm tra hiệu chuẩn"
      >
        <i className="fas fa-plane" aria-hidden="true"></i>
        {openSidebar ? null : <span>Dịch vụ Bay kiểm tra hiệu chuẩn</span>}
      </Link>

      <Link
        to="/services/testing"
        className="sp-nav-button"
        aria-label="Thử nghiệm - Hiệu chuẩn"
      >
        <i className="fas fa-flask" aria-hidden="true"></i>
        {openSidebar ? null : <span>Dịch vụ Thử nghiệm - Hiệu chuẩn</span>}
      </Link>

      <Link
        to="/services/aviation-tech"
        className="sp-nav-button"
        aria-label="Kỹ thuật (Hàng không)"
      >
        <i className="fas fa-cogs" aria-hidden="true"></i>
        {openSidebar ? null : <span>Dịch vụ Kỹ thuật (Hàng không)</span>}
      </Link>

      <Link
        to="/services/training"
        className="sp-nav-button"
        aria-label="Huấn luyện - Đào tạo"
      >
        <i className="fas fa-chalkboard-teacher" aria-hidden="true"></i>
        {openSidebar ? null : <span>Dịch vụ Huấn luyện - Đào tạo</span>}
      </Link>

      <Link
        to="/services/consulting"
        className="sp-nav-button"
        aria-label="Tư vấn đầu tư"
      >
        <i className="fas fa-handshake" aria-hidden="true"></i>
        {openSidebar ? null : (
          <span>Dịch vụ tư vấn đầu tư xây dựng và QLDA</span>
        )}
      </Link>
    </div>
  );
};

export default SidebarService;
