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
  // ... các mục khác
];
const NewsListPage = () => {
  const { category } = useParams();

  // Lọc dữ liệu theo danh mục
  const filteredItems = category
    ? allData.filter((item) => item.category === category && item.id)
    : allData.filter((item) => item.id);

  // Tiêu đề động
  const getCategoryTitle = () => {
    switch (category) {
      case "activities":
        return "Danh sách tin hoạt động";
      case "events":
        return "Danh sách sự kiện";
      case "updates":
        return "Danh sách cập nhật";
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
