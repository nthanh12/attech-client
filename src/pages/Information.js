import SidebarInformation from "../components/Information/SidebarInformation";
import { Routes, Route } from "react-router-dom";
import "../assets/css/Information/Information.css";

import CompanyHistory from "../components/Information/Content/CompanyHistory";
import Structure from "../components/Information/Content/Structure";
import Leadership from "../components/Information/Content/Leadership";
import Experience from "../components/Information/Content/Experience";
import Default from "../components/Information/Default";
const Information = () => {
  return (
    <div className="information-container d-flex">
      <SidebarInformation />
      <div className="content-container flex-grow-1 p-4">
        <Routes>
          {/* Route mặc định khi chỉ vào /information */}
          <Route index element={<Default />} />

          {/* Các route con */}
          <Route path="company-history" element={<CompanyHistory />} />
          <Route path="structure" element={<Structure />} />
          <Route path="leadership" element={<Leadership />} />
          {/* <Route path="business" element={<Business />} /> */}
          <Route path="experience" element={<Experience />} />
          {/* <Route path="iso" element={<ISOSystem />} />
          <Route path="financial" element={<Financial />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Information;
