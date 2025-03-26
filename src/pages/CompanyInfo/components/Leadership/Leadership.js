import React from "react";
import "../Leadership/Leadership.css";
import bld from "../../../../assets/img/attech-photo/dld.jpg";

const Leadership = () => {
  return (
    <div className="leadership">
      <h2>Ban lãnh đạo của Công ty TNHH Kỹ thuật Quản lý bay</h2>
      <img src={bld} alt="Ban lãnh đạo"></img>
      {/* <p className="structure-description">
        Sơ đồ cơ cấu tổ chức giúp thể hiện rõ các phòng ban và các bộ phận trong
        công ty.
      </p> */}
    </div>
  );
};

export default Leadership;
