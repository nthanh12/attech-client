import React from "react";
import "../Structure/Structure.css";
import cctc from "../../../../assets/img/attech-photo/cctc-9.jpg";

const Structure = () => {
  return (
    <div className="structure">
      <h2>Cơ cấu tổ chức của Công ty TNHH Kỹ thuật Quản lý bay</h2>
      <img src={cctc} alt="Cơ cấu tổ chức"></img>
      {/* <p className="structure-description">
        Sơ đồ cơ cấu tổ chức giúp thể hiện rõ các phòng ban và các bộ phận trong
        công ty.
      </p> */}
    </div>
  );
};

export default Structure;
