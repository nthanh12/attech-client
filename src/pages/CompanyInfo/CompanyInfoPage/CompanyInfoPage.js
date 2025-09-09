import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarCompanyInfo from "../components/SidebarCompanyInfo/SidebarCompanyInfo";
import "./CompanyInfoPage.css";

const CompanyInfoPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="page-company-info">
      <SidebarCompanyInfo 
        openSidebar={sidebarOpen} 
        setOpenSidebar={setSidebarOpen}
      />
      <div className={`company-content ${sidebarOpen ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default CompanyInfoPage;
