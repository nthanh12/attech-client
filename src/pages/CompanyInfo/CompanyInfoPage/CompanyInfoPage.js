import React, { useState } from "react";
import "../CompanyInfoPage/CompanyInfoPage.css";
import { Route, Routes } from "react-router-dom";
import SidebarCompanyInfo from "../components/SidebarCompanyInfo/SidebarCompanyInfo";

const CompanyInfo = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="page-company-info">
      {/* Sidebar cố định */}
      <SidebarCompanyInfo
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      <div
        className={
          openSidebar ? "company-info-content resize" : "company-info-content"
        }
      >
        <Routes>
          {/* <Route
            path="/"
            element={<company-infoList company-infos={company - infos} />}
          />
          <Route
            path=":company-infoId"
            element={<company-infoDetail company-infos={company - infos} />}
          /> */}
        </Routes>
      </div>
    </div>
  );
};

export default CompanyInfo;
