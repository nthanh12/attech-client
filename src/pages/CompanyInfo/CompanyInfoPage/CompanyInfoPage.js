import React, { useState } from "react";
import "../CompanyInfoPage/CompanyInfoPage.css";
import { Route, Routes } from "react-router-dom";
import ContentInfo from "../components/Content/ContentInfo";
import photo from "../../../assets/img/attech-photo/anh_cong_ty.jpg";
import photo_sub from "../../../assets/img/attech-photo/2021-05-15.jpg";
import Structure from "../components/Structure/Structure";
import History from "../components/History/History";
import Leadership from "../components/Leadership/Leadership";
import Business from "../components/Business/Business";
import Iso from "../components/Iso/Iso";

const CompanyInfo = () => {
  return (
    <div className="page-company-info">
      <Routes>
        <Route path="/" element={<ContentInfo backgroundImage={photo} />} />
        <Route path="/history" element={<History />} />
        <Route path="/structure" element={<Structure />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/business" element={<Business />} />
        <Route path="/iso" element={<Iso />} />
      </Routes>
    </div>
  );
};

export default CompanyInfo;
