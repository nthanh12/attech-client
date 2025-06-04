import React from "react";
import { Outlet } from "react-router-dom";
import "./CompanyInfoPage.css";

const CompanyInfoPage = () => {
  return (
    <div className="page-company-info">
      <Outlet />
    </div>
  );
};

export default CompanyInfoPage;
