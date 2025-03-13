import React from "react";
import "../../../assets/css/News/Recruitment/GetAll.css";

import { Link } from "react-router-dom";

const data = [
  {
    id: 5,
    category: "Thông báo",
    time: "21/02/2025",
    title: "Thông báo số 220/KTQLB-KHKD",
    description:
      "Thông báo số 220/KTQLB-KHKD ngày 21/02/2025 v/v thông báo mời quan tâm cung ứng nguồn lực phục vụ tổ chức bay kiểm tra hiệu chuẩn và bay đánh giá phương thức bay mùa bay 2025/2026. Tài liệu đính kèm 220 KTQLB-KHKD (360.82 KB)",
    image:
      "https://congthuongbentre.gov.vn/image/upload/catalog/thong-bao/thong-bao-x480.png",
  },
  {
    id: 6,
    category: "Thông báo",
    time: "16/12/2024",
    title: "Thông báo số 1614/TB-KTQLB",
    description:
      "Thông báo số 1614/TB-KTQLB ngày 16/12/2024 v/v thông báo kết quả lựa chọn tổ chức đấu giá tai sản của Công ty TNHH Kỹ thuật Quản lý bay. Tài liệu đính kèm 1614 TB-KTQLB_đấu giá_16.12 (83.28 KB)",
    image:
      "https://congthuongbentre.gov.vn/image/upload/catalog/thong-bao/thong-bao-x480.png",
  },
];

const GetAllNotification = () => {
  return (
    <div className="container">
      <div className="get-all">
        <h2>Thông báo</h2>
        {data.map((item) => (
          <Link
            key={item.id}
            to={`/news/notification/detail/${item.id}`}
            className="piece-link"
          >
            <div key={item.id} className="piece">
              <div className="piece-img">
                <img
                  src={item.image}
                  alt={item.title}
                  className="piece-image"
                />
              </div>
              <div className="piece-content">
                <h3 className="piece-title">{item.title}</h3>
                <p className="piece-category">
                  {item.category} - {item.time}
                </p>
                <p className="piece-description">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GetAllNotification;
