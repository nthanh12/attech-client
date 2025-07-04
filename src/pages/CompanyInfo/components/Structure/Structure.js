import cctc from "../../../../assets/img/attech-photo/cctc-9.jpg";
import "../Structure/Structure.css";

export default function Structure() {
  return (
    <div className="structure">
      <h2>Cơ cấu tổ chức của Công ty TNHH Kỹ thuật Quản lý bay</h2>
      <p className="structure-description">
        Sơ đồ cơ cấu tổ chức giúp thể hiện rõ các phòng ban và các bộ phận trong
        công ty.
      </p>
      <img src={cctc} alt="Cơ cấu tổ chức" />
    </div>
  );
}
