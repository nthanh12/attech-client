import React from "react";
import { Link, useParams } from "react-router-dom";
import "./NewsListPage.css";

const allData = [
  {
    id: 1,
    slug: "hoan-thanh-canh-thu-tai-tram-cns-con-son",
    title: "Hoàn thành canh thu, đảm bảo kỹ thuật các tần số VHF...",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/03/canh-thu-Con-Son-28-3-1.jpg",
    date: "31/03/2025",
    category: "activities",
  },
  {
    id: 2,
    slug: "le-ky-ket-hop-dong-goi-thau-tb05",
    title: "Lễ ký kết Hợp đồng cho Gói thầu TB05...",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/03/hop-dong-tb05-4-3-1.jpg",
    date: "30/04/2024",
    category: "activities",
  },
  {
    id: 3,
    slug: "dai-hoi-dang-bo-xuong-dich-vu-ky-thuat-nhiem-ky-2025-2030",
    title: "Đại hội Đảng bộ bộ phận Xưởng Dịch vụ kỹ thuật nhiệm kỳ 2025-2030",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/04/DH-DBBP-Xuong-11-4-4.jpg",
    date: "30/04/2024",
    category: "party",
  },
  {
    id: 4,
    slug: "doan-thanh-nien-cong-ty-to-chuc-giai-pickleball-vao-toi-ngay-09-04-2025",
    title:
      "Đoàn Thanh niên Công ty TNHH Kỹ thuật Quản lý bay đã tổ chức giải PickleBall vào tối ngày 09/04/2025 tại sân Pickleball Đảo Sen",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/04/pickleball-11-4-1.jpg",
    date: "30/04/2024",
    category: "youth",
  },
  {
    id: 5,
    slug: "hoi-nghi-nguoi-lao-dong-2025",
    title:
      "Ban Quản lý dự án Đầu tư và xây dựng chuyên ngành tổ chức Hội nghị người lao động năm 2025",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/01/hnnld-ban-22-1-2.jpg",
    date: "26/03/2025",
    category: "activities",
  },
  {
    id: 6,
    slug: "hoi-nghi-tong-ket-2024-va-ke-hoach-2025",
    title:
      "Công ty TNHH Kỹ thuật Quản lý bay tổ chức Hội nghị tổng kết công tác năm 2024 và triển khai kế hoạch năm 2025",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/01/hntk-nam-2024-21-1-1.jpg",
    date: "22/03/2025",
    category: "union",
  },
  {
    id: 7,
    slug: "giai-pickleball-xuong-dvkt-lan-1",
    title: "Giải Pickleball Xưởng DVKT mở rộng lần 1",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/01/pickleball-l1-21-1-1.jpg",
    date: "21/03/2025",
    category: "youth",
  },
  {
    id: 8,
    slug: "dien-tap-ung-pho-tan-cong-gia-mao",
    title:
      "Diễn tập ứng phó tấn công giả mạo trên hệ thống thư điện tử tên miền @attech.com.vn của Công ty",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/01/dien-tap-attt-28-12-1.jpg",
    date: "16/12/2024",
    category: "activities",
  },
  {
    id: 9,
    slug: "he-thong-amhs-mo-rong-hoan-thanh-conformance-test",
    title:
      "Hệ thống AMHS mở rộng (AMHS Extended) do ATTECH nghiên cứu, phát triển hoàn thành giai đoạn Conformance Test",
    image: "https://attech.com.vn/wp-content/uploads/2025/01/amhs-6-1-2.jpg",
    date: "16/12/2024",
    category: "activities",
  },
  {
    id: 10,
    slug: "nhan-giay-khen-cuc-thue-ha-noi-2023",
    title:
      "Công ty TNHH Kỹ thuật Quản lý bay nhận giấy khen của Cục thuế Hà Nội tuyên dương người nộp thuế tiêu biểu thủ đô năm 2023",
    image: "https://attech.com.vn/wp-content/uploads/2024/12/NTT-19-12-2.jpg",
    date: "16/12/2024",
    category: "activities",
  },
  {
    id: 11,
    slug: "cong-bo-quyet-dinh-bo-nhiem-chu-tich-hoi-dong-thanh-vien-vatm",
    title: "Công bố Quyết định bổ nhiệm Chủ tịch Hội đồng thành viên VATM",
    image: "https://vatm.vn/upload_images/images/8.2023/U27A4383.JPG",
    date: "31/03/2025",
    category: "aviation",
  },
  {
    id: 12,
    slug: "doan-cong-tac-tong-cong-ty-quan-ly-bay-viet-nam-tham-quan-dao-truong-sa-nha-gian-dk1-21",
    title:
      "Đoàn công tác Tổng công ty Quản lý bay Việt Nam thăm quần đảo Trường Sa, nhà giàn DK1/21",
    image: "https://vatm.vn/upload_images/images/5.2023/Anh%204.jpg",
    date: "30/04/2024",
    category: "aviation",
  },
  {
    id: 13,
    slug: "thu-chuc-mung-nam-moi-cua-bo-truong-bo-giao-thong-van-tai",
    title: "Thư chúc mừng năm mới của Bộ trưởng Bộ Giao thông Vận tải",
    image: "https://attech.com.vn/wp-content/uploads/2022/01/Thu-Bo-GTVT-1.jpg",
    date: "30/04/2024",
    category: "aviation",
  },
  {
    id: 14,
    slug: "chi-thi-ve-viec-dam-bao-an-toan-khai-thac-tau-bay",
    title: "Chỉ thị về việc đảm bảo an toàn khai thác tàu bay",
    image: "http://img2.caa.gov.vn/2020/08/03/09/25/vnpdoitaubay.jpg",
    date: "30/04/2024",
    category: "aviation",
  },
  {
    id: 15,
    slug: "quy-dinh-so-232-qd-tw-ngay-20-01-2025-cua-ban-chap-hanh-trung-uong-ve-thi-hanh-dieu-le-dang",
    title:
      "Quy định số 232-QĐ/TW ngày 20/01/2025 của Ban Chấp hành Trung ương về thi hành Điều lệ Đảng.",
    image:
      "https://image.luatvietnam.vn/uploaded/twebp/images/original/2023/08/14/su-dung-phap-luat-la-gi-co-gi-khac-ap-dung-phap-luat_1408224538.png",
    date: "30/04/2024",
    category: "law",
  },
  {
    id: 16,
    slug: "quy-dinh-so-189-qd-tư-ngay-08-10-2024-quy-dinh-ve-kiem-soat-quyen-luc-phong-chong-tham-nhung-tieu-cuc",
    title:
      "Quy định số 189-QĐ/TW ngày 08/10/2024 v/v Quy định về kiểm soát quyền lực, phòng, chống tham nhũng, tiêu cực trong quản lý, sử dụng tài chính, tài sản công.",
    image:
      "https://image.luatvietnam.vn/uploaded/twebp/images/original/2023/08/14/su-dung-phap-luat-la-gi-co-gi-khac-ap-dung-phap-luat_1408224538.png",
    date: "30/04/2024",
    category: "law",
  },
];
const NewsListPage = () => {
  const { category } = useParams();

  // Lọc dữ liệu theo danh mục
  const filteredItems =
    !category || category === "all-act"
      ? allData.filter((item) => item.id)
      : allData.filter((item) => item.category === category && item.id);

  const getCategoryTitle = () => {
    switch (category) {
      case "activities":
        return "Danh sách tin tức hoạt động công ty";
      case "party":
        return "Danh sách tin tức đảng bộ công ty";
      case "youth":
        return "Danh sách tin tức đoàn thanh niên";
      case "union":
        return "Danh sách tin tức công đoàn công ty";
      case "aviation":
        return "Danh sách tin ngành hàng không";
      case "law":
        return "Danh sách tin tuyên truyền pháp luật";
      default:
        return "Danh sách tin tức";
    }
  };

  return (
    <div className="news-list-page">
      <div className="container">
        <h2 className="page-title">{getCategoryTitle()}</h2>
        <div className="news-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div className="news-item" key={item.id}>
                <div className="news-image">
                  <img src={item.image} alt={item.title} title={item.title} />
                </div>
                <div className="news-content">
                  <span className="news-date">{item.date}</span>
                  <h3>
                    <Link
                      to={`/news/${item.id}/${item.slug}`}
                      title={item.title}
                    >
                      {item.title}
                    </Link>
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <p>Chưa có tin tức nào trong danh mục này.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsListPage;
