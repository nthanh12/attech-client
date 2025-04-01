import React from "react";
import "./SidebarCompanyInfo.css";

const SidebarCompanyInfo = ({ openSidebar, setOpenSidebar }) => {
  return (
    <div
      className={
        openSidebar ? "sidebar-company-info resize" : "sidebar-company-info"
      }
    >
      <div className="top-sidebar">
        <button onClick={() => setOpenSidebar(!openSidebar)}>
          <i className=" fa fa-solid fa-bars"></i>
        </button>
        <div>{!openSidebar && <span>THÔNG TIN CÔNG TY</span>}</div>
        <hr />
      </div>

      <div className="sp-nav-button" aria-label="Tất cả sản phẩm">
        <i className="fas fa-list-alt" aria-hidden="true"></i>
        {!openSidebar && <span>Lịch sử ra đời</span>}
      </div>
      <div className="sp-nav-button" aria-label="CNS/ATM">
        <i className="fas fa-broadcast-tower" aria-hidden="true"></i>
        {!openSidebar && <span>Cơ cấu tổ chức</span>}
      </div>
      <div className="sp-nav-button" aria-label="Bay kiểm tra hiệu chuẩn">
        <i className="fas fa-plane" aria-hidden="true"></i>
        {!openSidebar && <span>Ban lãnh đạo</span>}
      </div>
      <div className="sp-nav-button" aria-label="Thử nghiệm - Hiệu chuẩn">
        <i className="fas fa-flask" aria-hidden="true"></i>
        {!openSidebar && <span>Ngành nghề kinh doanh</span>}
      </div>
      <div className="sp-nav-button" aria-label="Kỹ thuật (Hàng không)">
        <i className="fas fa-cogs" aria-hidden="true"></i>
        {!openSidebar && <span>Hệ thống chứng chỉ ISO</span>}
      </div>
    </div>
  );
};

export default SidebarCompanyInfo;
