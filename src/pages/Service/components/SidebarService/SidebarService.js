import React from "react";
import "./SidebarService.css";

const SidebarService = ({ openSidebar, setOpenSidebar }) => {
  return (
    <div class={openSidebar ? "sidebar-service resize" : "sidebar-service"}>
      <div className="top-sidebar">
        <button onClick={() => setOpenSidebar(!openSidebar)}>
          <i className=" fa fa-solid fa-bars"></i>
        </button>
        <div>{!openSidebar && <span>DỊCH VỤ</span>}</div>
        <hr />
      </div>

      <div className="sp-nav-button" aria-label="Tất cả sản phẩm">
        <i className="fas fa-list-alt" aria-hidden="true"></i>
        {!openSidebar && <span>Tất cả dịch vụ</span>}
      </div>
      <div className="sp-nav-button" aria-label="CNS/ATM">
        <i className="fas fa-broadcast-tower" aria-hidden="true"></i>
        {!openSidebar && (
          <span>Dịch vụ thông tin dẫn đường giám sát (CNS)</span>
        )}
      </div>
      <div className="sp-nav-button" aria-label="Bay kiểm tra hiệu chuẩn">
        <i className="fas fa-plane" aria-hidden="true"></i>
        {!openSidebar && <span>Dịch vụ Bay kiểm tra hiệu chuẩn</span>}
      </div>
      <div className="sp-nav-button" aria-label="Thử nghiệm - Hiệu chuẩn">
        <i className="fas fa-flask" aria-hidden="true"></i>
        {!openSidebar && <span>Dịch vụ Thử nghiệm - Hiệu chuẩn</span>}
      </div>
      <div className="sp-nav-button" aria-label="Kỹ thuật (Hàng không)">
        <i className="fas fa-cogs" aria-hidden="true"></i>
        {!openSidebar && <span>Dịch vụ Kỹ thuật (Hàng không)</span>}
      </div>
      <div className="sp-nav-button" aria-label="Huấn luyện - Đào tạo">
        <i className="fas fa-chalkboard-teacher" aria-hidden="true"></i>
        {!openSidebar && <span>Dịch vụ Huấn luyện - Đào tạo</span>}
      </div>
      <div className="sp-nav-button" aria-label="Tư vấn đầu tư">
        <i className="fas fa-handshake" aria-hidden="true"></i>
        {!openSidebar && <span>Dịch vụ tư vấn đầu tư xây dựng và QLDA</span>}
      </div>
    </div>
  );
};

export default SidebarService;
