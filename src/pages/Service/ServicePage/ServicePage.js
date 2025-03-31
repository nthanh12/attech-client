import React, { useState } from "react";
import SidebarService from "../components/SidebarService/SidebarService";
import "../ServicePage/ServicePage.css";
import { Outlet } from "react-router-dom";

const Service = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="page-service">
      <SidebarService
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      <div
        className={openSidebar ? "service-content resize" : "service-content"}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Service;
