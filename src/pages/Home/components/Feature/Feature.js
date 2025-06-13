import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Feature.css";
import { Link } from "react-router-dom";

import cns from "../../../../assets/img/feature-cns.jpg";
import flightcheck from "../../../../assets/img/feature-fi.jpg";
import aviation from "../../../../assets/img/feature-ai.jpg";

const notifications = [
  {
    title:
      "Đoàn thanh niên công ty Kỹ thuật Quản lý bay tổ chức Lễ kỷ niệm 94 năm Ngày thành lập đoàn TNCS Hồ Chí Minh",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/03/doi-thoai-dtn-2025-2.jpg",
    alt: "Bài viết 1",
  },
  {
    title:
      "Công đoàn Công ty TNHH Kỹ thuật Quản lý bay vinh dự nhận bằng khen của Tổng Liên đoàn Lao động Việt Nam",
    image:
      "https://attech.com.vn/wp-content/uploads/2019/08/Hội-nghị-BCH-CĐTCT-2019.jpg",
    alt: "Bài viết 2",
  },
  {
    title:
      "Công ty TNHH Kỹ thuật Quản lý bay tổ chức thành công Hội nghị Đài trạm trưởng CNS năm 2025",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/04/HN-dai-tram-truong-18-4-1.jpg",
    alt: "Bài viết 3",
  },
];

const Feature = () => {
  return (
    <section className="feature-section">
      <div className="feature-container">
        {/* 3 dịch vụ chính */}
        <Link to="/services/cns" className="feature-link">
          <div
            className="feature-item"
            style={{ backgroundImage: `url(${cns})` }}
          >
            <div className="feature-overlay"></div>
            <div className="feature-icon">
              <i className="fas fa-satellite"></i>
            </div>
            <div className="feature-text">
              <h3>CNS/ATM</h3>
              <p className="feature-desc">CNS Service</p>
            </div>
          </div>
        </Link>
        <Link to="/services/flightcheck" className="feature-link">
          <div
            className="feature-item"
            style={{ backgroundImage: `url(${flightcheck})` }}
          >
            <div className="feature-overlay"></div>
            <div className="feature-icon">
              <i className="fas fa-plane"></i>
            </div>
            <div className="feature-text">
              <h3>Bay hiệu chuẩn</h3>
              <p className="feature-desc">Flight Inspection</p>
            </div>
          </div>
        </Link>
        <Link to="/services/aviation-tech" className="feature-link">
          <div
            className="feature-item"
            style={{ backgroundImage: `url(${aviation})` }}
          >
            <div className="feature-overlay"></div>
            <div className="feature-icon">
              <i className="fas fa-globe"></i>
            </div>
            <div className="feature-text">
              <h3>Công nghiệp hàng không</h3>
              <p className="feature-desc">Aviation Industry</p>
            </div>
          </div>
        </Link>

        {/* Tin tức nổi bật */}
        <div className="notify-wrapper">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={15}
            slidesPerView={2}
            pagination={{ clickable: true }}
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            style={{ width: "100%", height: "100%" }}
          >
            {notifications.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="notify-item" title={item.title}>
                  <div className="notify-img">
                    <img src={item.image} alt={item.alt} loading="lazy" />
                    <span className="news-badge">Tin nổi bật</span>
                  </div>
                  <p className="notify-title">{item.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Feature;
