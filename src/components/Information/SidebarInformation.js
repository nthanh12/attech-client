import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Information/SidebarInformation.css";

const menuItems = [
  { name: "Lịch sử ra đời", path: "company-history" },
  { name: "Cơ cấu tổ chức", path: "structure" },
  { name: "Ban lãnh đạo", path: "leadership" },
  { name: "Ngành nghề kinh doanh", path: "business" },
  { name: "Năng lực, Kinh nghiệm", path: "experience" },
  { name: "Hệ thống chứng chỉ ISO", path: "iso" },
  { name: "Thông tin tài chính", path: "financial" },
];

const SidebarInformation = () => {
  return (
    <div className="sidebar-information">
      <div className="sidebar bg-light border-end p-4">
        <h5>Thông tin công ty</h5>
        <ul className="list-group">
          {menuItems.map((item) => (
            <li key={item.path} className="list-group-item">
              <Link
                to={`/information/${item.path}`}
                className="text-decoration-none text-dark"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarInformation;
