import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Feature.css";
import { Link } from "react-router-dom";
import { mockNews } from "../../../../utils/mockNews";

const Feature = () => {
  return (
    <section className="feature-section">
      <div className="feature-container">
        {/* 3 dịch vụ chính */}
        <Link
          to="/dich-vu/thong-tin-dan-duong-giam-sat"
          className="feature-link"
        >
          <div
            className="feature-item"
            style={{
              backgroundImage:
                "url(/assets/images/cns_atm/dvor_dme_van_don.webp)",
            }}
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
        <Link to="/dich-vu/bay-kiem-tra-hieu-chuan" className="feature-link">
          <div
            className="feature-item"
            style={{ backgroundImage: "url(/assets/images/bhc/bhc_1.webp)" }}
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
        <Link to="/san-pham" className="feature-link">
          <div
            className="feature-item"
            style={{ backgroundImage: "url(/assets/images/cnhk/cnhk_6.webp)" }}
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
            {mockNews.map((item, index) => (
              <SwiperSlide key={index}>
                <Link to={`/tin-tuc/${item.postCategorySlugVi}/${item.slugVi}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="notify-item" title={item.titleVi}>
                    <div className="notify-img">
                      <img src={item.image} alt={item.alt} loading="lazy" />
                      <span className="news-badge">Tin nổi bật</span>
                    </div>
                    <p className="notify-title" title={item.titleVi}>
                      {item.titleVi}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Feature;
