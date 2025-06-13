import React, { useEffect } from "react";
import "./PartNews.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const newsGroups = [
  {
    id: "activities",
    title: "Tin hoạt động",
    link: "/tin-tuc/hoat-dong",
    featuredNews: {
      date: "26/03/2025",
      title: "Xưởng DVKT tổ chức cung cấp dịch vụ kỹ thuật CNS giai đoạn 2020-2025 an toàn, điều hòa và hiệu quả",
      image: "https://attech.com.vn/wp-content/uploads/2025/04/cung-cap-dv-cns-20-25-25-4-1.jpg",
    }
  },
  {
    id: "party",
    title: "Tin đảng bộ công ty",
    link: "/tin-tuc/dang-bo",
    featuredNews: {
      date: "26/03/2025",
      title: "Lễ kết nạp Đảng viên mới tại chi bộ Ban Quản lý dự án",
      image: "https://attech.com.vn/wp-content/uploads/2025/05/BQLDA-ket-nam-DV-12-5-1.jpg",
    }
  },
  {
    id: "youth",
    title: "Tin đoàn thanh niên",
    link: "/tin-tuc/doan-thanh-nien",
    featuredNews: {
      date: "26/03/2025",
      title: "Đoàn Thanh niên Công ty TNHH Kỹ thuật Quản lý bay tổ chức Lễ kỷ niệm 94 năm Ngày thành lập Đoàn TNCS Hồ Chí Minh",
      image: "https://attech.com.vn/wp-content/uploads/2025/03/doi-thoai-dtn-2025-2.jpg",
    }
  },
  {
    id: "union",
    title: "Tin công đoàn",
    link: "/tin-tuc/cong-doan",
    featuredNews: {
      date: "26/03/2025",
      title: "Nữ công ATTECH hưởng ứng chuỗi hoạt động chào mừng ngày 8/3",
      image: "https://vatm.vn/uploads/%E1%BA%A2nh%202_BL%C4%90%20%E1%BB%A7ng%20h%E1%BB%99%20gian%20h%C3%A0ng%20h%E1%BB%99i%20ch%E1%BB%A3.jpg",
    }
  }
];

const PartNews = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <section className="part_news">
      <div className="part_news__container">
        <div className="news__header">
          <h2 className="news__title" data-aos="fade-down">Tin tức & Sự kiện</h2>
        </div>
        <div className="news__grid">
          {newsGroups.map((group, index) => (
            <article 
              key={group.id} 
              className="news__card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="news__card-header">
                <Link to={group.link} className="news__card-title">
                  <span>{group.title}</span>
                </Link>
              </div>

              <div className="news__image-container">
                <img
                  src={group.featuredNews.image}
                  alt={group.featuredNews.title}
                  className="news__image"
                  loading="lazy"
                />
                <div className="news__date-badge">
                  <i className="far fa-clock"></i>
                  <span>{group.featuredNews.date}</span>
                </div>
              </div>

              <div className="news__content">
                <Link to={group.link} className="news__article-title">
                  <span>{group.featuredNews.title}</span>
                </Link>
                <p className="news__excerpt">{group.featuredNews.excerpt}</p>
                <Link to={group.link} className="news__read-more">
                  Đọc thêm
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartNews;