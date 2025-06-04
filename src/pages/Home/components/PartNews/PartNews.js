import React, { useState } from "react";
import "./PartNews.css";
import giai_bong from "../../../../assets/img/giai-bong-26_03_2025.jpg";
import ViewAllButton from "../../../../components/ViewAllButton/ViewAllButton";

const categories = [
  { id: "all", label: "Tất cả", link: "/tin-tuc" },
  { id: "activities", label: "Tin hoạt động", link: "/tin-tuc/hoat-dong" },
  { id: "party", label: "Đảng bộ công ty", link: "/tin-tuc/dang-bo" },
  { id: "youth", label: "Đoàn thanh niên", link: "/tin-tuc/doan-thanh-nien" },
  { id: "union", label: "Công đoàn", link: "/tin-tuc/cong-doan" },
];

const newsData = [
  {
    id: 1,
    category: "Tất cả",
    date: "26/03/2025",
    title: "Hãng hàng không mở thêm nhiều đường bay quốc tế",
    image:
      "https://i1-vnexpress.vnecdn.net/2025/03/26/dscf2195-jpeg-1742964488-9432-1742964646.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=rdW-ecy_PkZfo0BvWIhEYw",
  },
  {
    id: 2,
    category: "Tin hoạt động",
    date: "26/03/2025",
    title:
      "ATTECH tổ chức thành công giải bóng đá chào mừng 94 năm ngày thành lập Đoàn TNCS Hồ Chí Minh",
    image: giai_bong,
  },
  {
    id: 3,
    category: "Đoàn thanh niên",
    date: "26/03/2025",
    title:
      "Đoàn Thanh niên Công ty TNHH Kỹ thuật Quản lý bay tổ chức Lễ kỷ niệm 94 năm Ngày thành lập Đoàn TNCS Hồ Chí Minh và Đối thoại giữa Đảng ủy – Ban Lãnh đạo Công ty với Đoàn Thanh niên năm 2025",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/03/doi-thoai-dtn-2025-2.jpg",
  },
  {
    id: 4,
    category: "Đảng bộ công ty",
    date: "26/03/2025",
    title: "Chi bộ Đài dẫn đường Tân Sơn Nhất tổ chức Lễ kết nạp Đảng viên mới",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/02/ket-nap-dv-tsn-26-2-2.jpg",
  },
  {
    id: 5,
    category: "Đảng bộ công ty",
    date: "26/03/2025",
    title:
      "Đảng ủy Công ty TNHH Kỹ thuật Quản lý bay triển khai Hội nghị tổng kết công tác năm 2024 và triển khai nhiệm vụ năm 2025",
    image:
      "https://attech.com.vn/wp-content/uploads/2024/12/ct-%C4%90%E1%BA%A3ng-26-12-3.jpg",
  },
  {
    id: 6,
    category: "Công đoàn",
    date: "26/03/2025",
    title: "Nữ công ATTECH hưởng ứng chuỗi hoạt động chào mừng ngày 8/3",
    image: "https://attech.com.vn/wp-content/uploads/2025/03/ngay-8-3-3.jpg",
  },
];

const PartNews = () => {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const filteredNews = newsData.filter(
    (news) => activeTab === "Tất cả" || news.category === activeTab
  );

  const activeCategory = categories.find((cat) => cat.label === activeTab);

  return (
    <section className="part_news">
      <div className="part_news__container">
        <div className="news__header">
          <h3 className="news__title">Tin tức</h3>
          <div className="news__nav">
            <div className="news__categories">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`news__category ${
                    activeTab === cat.label ? "news__category--active" : ""
                  }`}
                  onClick={() => setActiveTab(cat.label)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <ViewAllButton to={activeCategory?.link} className="news__view-more" />
          </div>
        </div>
        <div className="news__list">
          {filteredNews.map((news) => (
            <article key={news.id} className="news__item">
              <div className="news__image">
                <img src={news.image} alt={news.title} title={news.title} />
              </div>
              <div className="news__content">
                <div className="news__info">
                  <span className="news__date">
                    <i className="far fa-clock"></i>
                    {news.date}
                  </span>
                </div>
                <a href="#" className="news__link">
                  <h4 className="news__heading" title={news.title}>
                    {news.title}
                  </h4>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartNews;
