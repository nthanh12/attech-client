import React, { useState } from "react";
import "../CompanyInfoPage/CompanyInfoPage.css";
import { Route, Routes } from "react-router-dom";
import ContentInfo from "../components/Content/ContentInfo";
import photo from "../../../assets/img/attech-photo/2017-01-13.jpg";
import photo_sub from "../../../assets/img/attech-photo/2021-05-15.jpg";
import Structure from "../components/Structure/Structure";
import Leadership from "../components/Leadership/Leadership";

const CompanyInfo = () => {
  return (
    <div className="page-company-info">
      <Routes>
        <Route path="/" element={<ContentInfo backgroundImage={photo} />} />
        <Route path="/structure" element={<Structure />} />
        <Route path="/leadership" element={<Leadership />} />
      </Routes>
    </div>
  );
};

export default CompanyInfo;
