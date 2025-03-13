import React from "react";
import "../../../assets/css/News/Recruitment/GetAll.css";

import { Link } from "react-router-dom";

const data = [
  {
    id: 14,
    category: "Hoạt động",
    time: "7-8/3/2025",
    title: "Nữ công ATTECH hưởng ứng chuỗi hoạt động chào mừng ngày 8/3",
    description:
      "Chuỗi hoạt động chào mừng ngày Quốc tế phụ nữ 8/3 được BCH Công đoàn, Ban Nữ công Công ty triển khai gồm tham gia Chương trình 'Hội chợ ẩm thực năm 2025' do Công đoàn Tổng công ty Quản lý bay tổ chức .",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/03/ngay-8-3-1-170x130.jpg",
  },
  {
    id: 15,
    category: "Lễ ký kết",
    time: "4/3/2025",
    title: "Lễ ký kết Hợp đồng cho Gói thầu TB05",
    description:
      "Lễ ký kết Hợp đồng cho Gói thầu TB05 'Cung cấp và lắp đặt hệ thống DVOR/DME' Dự án thành phần 2 'Các công trình phục vụ quản lý bay' thuộc dự án 'Cảng hàng không quốc tế Long Thành – Giai đoạn 1'.",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/03/hop-dong-tb05-4-3-2-170x130.jpg",
  },
  {
    id: 16,
    category: "Hội nghị",
    time: "28/02/2025",
    title:
      "Công ty TNHH Kỹ thuật Quản lý bay tổ chức Hội nghị đại biểu Người lao động năm 2025",
    description:
      "Chiều ngày 28/02/2025, Công ty TNHH Kỹ thuật Quản lý bay (ATTECH) đã tổ chức Hội nghị đại biểu Người lao động năm 2025.",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg",
  },
  {
    id: 17,
    category: "Hội nghị",
    time: "28/02/2025",
    title:
      "Tuyên dương điển hình tiên tiến giai đoạn 2020-2024 và phát động phong trào thi đua giai đoạn 2025-2030",
    description:
      "Sáng ngày 28/02/2025, Công ty TNHH Kỹ thuật Quản lý bay và Công đoàn cơ sở tổ chức Hội nghị tuyên dương điển hình tiên tiến giai đoạn 2020-2024 và phát động phong trào thi đua giai đoạn 2025-2030.",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/03/HN-dien-hinh-tt-3-3-7-170x130.jpg",
  },
];

const GetAllActivity = () => {
  return (
    <div className="container">
      <div className="get-all">
        <h2>Tin tức hoạt động</h2>
        {data.map((item) => (
          <Link
            key={item.id}
            to={`/news/activity/detail/${item.id}`}
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

export default GetAllActivity;
