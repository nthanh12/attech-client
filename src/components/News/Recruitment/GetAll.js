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
      "https://ihaf.org.vn/uploads/plugin/recruitments/1/1609224723-1669367595-tuy-n-d-ng.png",
  },
  {
    id: 6,
    category: "Thông báo",
    time: "16/12/2024",
    title: "Thông báo số 1614/TB-KTQLB",
    description:
      "Thông báo số 1614/TB-KTQLB ngày 16/12/2024 v/v thông báo kết quả lựa chọn tổ chức đấu giá tai sản của Công ty TNHH Kỹ thuật Quản lý bay. Tài liệu đính kèm 1614 TB-KTQLB_đấu giá_16.12 (83.28 KB)",
    image:
      "https://ihaf.org.vn/uploads/plugin/recruitments/1/1609224723-1669367595-tuy-n-d-ng.png",
  },
  {
    id: 7,
    category: "Danh sách",
    time: "Năm 2024",
    title: "Danh sách nhân sự trúng tuyển đợt 3 năm 2024",
    description:
      "Danh sách nhân sự trúng tuyển đợt 3 năm 2024 vị trí Nhân viên Bay hiệu chuẩn của Công ty TNHH Kỹ thuật Quản lý bay. Tài liệu đính kèm DS NS trung tuyen Dot 3 vi tri NV BHC (20.61 KB)",
    image:
      "https://ihaf.org.vn/uploads/plugin/recruitments/1/1609224723-1669367595-tuy-n-d-ng.png",
  },
  {
    id: 8,
    category: "Gặp mặt",
    time: "Năm 2024",
    title: "Ban lãnh đạo Công ty gặp mặt các nhân viên mới năm 2024",
    description:
      "Năm 2024, Công ty TNHH Kỹ thuật Quản lý bay đã tổ chức 03 đợt tuyển dụng lao động từ tháng 7 đến tháng 12 cho các vị trí thuộc khối lao động gián tiếp (Nhân viên Hành chính, Nhân viên Quản trị cơ sở hạ tầng, Nhân viên Pháp lý,…) và khối bảo đảm kỹ thuật (Nhân viên kỹ thuật CNS, Nhân viên khai thác CNS các đài/trạm). Qua các vòng thi tuyển lý thuyết chuyên ngành, tiếng Anh và phỏng vấn, Công ty đã tuyển chọn được 29 ứng viên xuất sắc từ hàng trăm hồ sơ ứng...",
    image:
      "https://ihaf.org.vn/uploads/plugin/recruitments/1/1609224723-1669367595-tuy-n-d-ng.png",
  },
  {
    id: 9,
    category: "Danh sách",
    time: "Năm 2024",
    title: "Danh sách nhân sự trúng tuyển đợt 3 năm 2024",
    description:
      "Danh sách nhân sự trúng tuyển đợt 3 năm 2024 của Công ty TNHH Kỹ thuật Quản lý bay. Tài liệu đính kèm DS NS trung tuyen Dot 3 nam 2024 (27.4 KB)",
    image:
      "https://ihaf.org.vn/uploads/plugin/recruitments/1/1609224723-1669367595-tuy-n-d-ng.png",
  },
  {
    id: 10,
    category: "Thông báo tuyển dụng",
    time: "Năm 2024",
    title: "THÔNG TIN TUYỂN DỤNG ĐỢT 3 NĂM 2024",
    description:
      "Công ty TNHH Kỹ thuật Quản lý bay (tên gọi tắt là ATTECH) là một trong những đơn vị kỹ thuật hàng đầu của ngành hàng không Việt Nam với 3 lĩnh vực kinh doanh cốt lõi là cung cấp dịch vụ Thông tin – Dẫn đường – Giám sát hàng không, dịch vụ Bay kiểm tra hiệu chuẩn và Sản xuất công nghiệp hàng không. Tài liệu đính kèm tại đây_2 (20.19 KB)tại đây_3 (16.87 KB)tại đây_1 (25.03 KB)tại đây_4 (28.15 KB)tại đây_5 (24.17 KB)tại đây_6 (15.58 KB)tại đây_7 (18.35 KB)tại đây_8 (18.54 KB)",
    image:
      "https://ihaf.org.vn/uploads/plugin/recruitments/1/1609224723-1669367595-tuy-n-d-ng.png",
  },
  {
    id: 11,
    category: "Danh sách",
    time: "Năm 2024",
    title: "Danh sách nhân sự trúng tuyển đợt 2 năm 2024",
    description:
      "Danh sách nhân sự trúng tuyển đợt 2 năm 2024 của Công ty TNHH Kỹ thuật Quản lý bay. Tài liệu đính kèm DS nhan su trung tuyen Dot 2 (24.77 KB)",
    image:
      "https://ihaf.org.vn/uploads/plugin/recruitments/1/1609224723-1669367595-tuy-n-d-ng.png",
  },
  {
    id: 12,
    category: "Thông báo tuyển dụng",
    time: "Năm 2024",
    title: "THÔNG TIN TUYỂN DỤNG VỊ TRÍ NHÂN VIÊN KẾ TOÁN",
    description:
      "Công ty TNHH Kỹ thuật Quản lý bay (tên gọi tắt là ATTECH) là một trong những đơn vị kỹ thuật hàng đầu của ngành hàng không Việt Nam với 3 lĩnh vực kinh doanh cốt lõi là cung cấp dịch vụ Thông tin – Dẫn đường – Giám sát hàng không, dịch vụ Bay kiểm tra hiệu chuẩn và Sản xuất công nghiệp hàng không. Tài liệu đính kèm Tiêu chuẩn vị trí Nhân viên kế toán (17.75 KB)",
    image:
      "https://ihaf.org.vn/uploads/plugin/recruitments/1/1609224723-1669367595-tuy-n-d-ng.png",
  },
  {
    id: 13,
    category: "Danh sách",
    time: "Năm 2024",
    title: "Danh sách nhân sự trúng tuyển đợt 1 năm 2024",
    description:
      "Danh sách nhân sự trúng tuyển đợt 1 năm 2024 của Công ty TNHH Kỹ thuật Quản lý bay. Tài liệu đính kèm DS nhân sự trúng tuyển Đợt 1 năm 2024 (60.14 KB)",
    image:
      "https://ihaf.org.vn/uploads/plugin/recruitments/1/1609224723-1669367595-tuy-n-d-ng.png",
  },
];

const GetAll = () => {
  return (
    <div className="container">
      <div className="get-all">
        <h2>Tuyển dụng</h2>
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

export default GetAll;
