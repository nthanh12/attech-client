import React from "react";
import "../../../assets/css/News/Recruitment/GetAll.css";

import { Link } from "react-router-dom";

const data = [
  {
    id: 18,
    category: "Đào tạo",
    time: "26/11/2024",
    title:
      "Tổ chức khóa “Đào tạo ban đầu để cấp chứng chỉ chuyên môn Thông tin, Giám sát hàng không” cho đội ngũ nhân viên bảo đảm hoạt động bay của Công ty TNHH Kỹ thuật Quản lý bay",
    description:
      "Công ty TNHH Kỹ thuật Quản lý bay tổ chức khóa “Đào tạo ban đầu để cấp chứng chỉ chuyên môn Thông tin, Giám sát hàng không” cho 30 lượt học viên là nhân viên CNS mới tuyển dụng năm 2024 theo Chương trình đào tạo mới được Cục Hàng không phê duyệt tại Quyết định số 2936/QĐ-CHK ngày 26/11/2024.",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/01/thong-tin-10-1-2-170x130.jpg",
  },
  {
    id: 19,
    category: "Huấn luyện",
    time: "9/12/2024",
    title:
      "Khai giảng khóa “Huấn luyện về phòng cháy chữa cháy và cứu nạn cứu hộ”",
    description:
      "Ngày 9/12/2024, Trung tâm huấn luyện CNS – Công ty TNHH Kỹ thuật Quản lý bay đã phối hợp với Đội Cảnh sát phòng cháy chữa cháy quận Long Biên tổ chức khóa “Huấn luyện về phòng cháy chữa cháy và cứu nạn cứu hộ”. Tham dự lễ khai giảng có bà Nguyễn Tố Loan – Phó Trưởng Trung tâm Huấn luyện CNS và các học viên là thành viên Ban chỉ huy, thành viên lực lượng PCCC cơ sở của Công ty.",
    image:
      "https://attech.com.vn/wp-content/uploads/2024/12/hl-pccc-12-10-1-170x130.jpg",
  },
  {
    id: 20,
    category: "Lễ kỷ niệm",
    time: "20/11/2024",
    title:
      "Công ty TNHH Kỹ thuật Quản lý bay tổ chức Lễ kỷ niệm 42 năm Ngày Nhà giáo Việt Nam 20/11/2024",
    description:
      "Ngày 20/11/2024, Trung tâm huấn luyện CNS – Công ty TNHH Kỹ thuật Quản lý bay tổ chức Lễ kỷ niệm 42 năm ngày Nhà giáo Việt Nam 20/11. Buổi lễ tôn vinh và ghi nhận những đóng góp vô cùng quan trọng của những người làm công tác giáo dục, đào tạo – những người thầy, người cô đã và đang cống hiến hết mình vì sự nghiệp phát triển nguồn nhân lực chất lượng cao cho Công ty.",
    image:
      "https://attech.com.vn/wp-content/uploads/2024/11/TTHL-21-11-5-170x130.jpg",
  },
  {
    id: 21,
    category: "Huấn luyện",
    time: "11/11/2024",
    title:
      "Khai giảng khóa huấn luyện “Nhân viên mới” và “Đào tạo ban đầu để cấp chứng chỉ chuyên môn nhân viên CNS”",
    description:
      "Ngày 11/11/2024, Trung tâm huấn luyện CNS – Công ty TNHH Kỹ thuật Quản lý bay đã tổ chức khóa huấn luyện “Nhân viên mới” và “Đào tạo ban đầu để cấp chứng chỉ chuyên môn nhân viên CNS”. Tham dự lễ khai giảng có bà Nguyễn Tố Loan – Phó Trưởng Trung tâm Huấn luyện CNS.",
    image:
      "https://attech.com.vn/wp-content/uploads/2024/11/nvm-13-11-1-170x130.jpg",
  },
];

const GetAllTrain = () => {
  return (
    <div className="container">
      <div className="get-all">
        {data.map((item) => (
          <Link
            key={item.id}
            to={`/news/recruitment/detail/${item.id}`}
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

export default GetAllTrain;
