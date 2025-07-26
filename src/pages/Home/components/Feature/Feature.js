import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Feature.css";
import { useI18n } from "../../../../hooks/useI18n";
import LocalizedLink from "../../../../components/Shared/LocalizedLink";
import { LocalizedTitle } from "../../../../components/Shared/LocalizedContent";
import { mockNews } from "../../../../utils/mockNews";

const Feature = () => {
  const { t, currentLanguage } = useI18n();
  
  return (
    <section className="feature-section">
      <div className="feature-container">
        {/* 3 dịch vụ chính */}
        <LocalizedLink
          routeKey="SERVICE_DETAIL"
          params={{ slug: currentLanguage === 'vi' ? 'thong-tin-dan-duong-giam-sat' : 'cns-service' }}
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
              <h3>{t('frontend.home.services.cns.title')}</h3>
              <p className="feature-desc">{t('frontend.home.services.cns.description')}</p>
            </div>
          </div>
        </LocalizedLink>
        <LocalizedLink routeKey="SERVICE_DETAIL" params={{ slug: currentLanguage === 'vi' ? 'bay-kiem-tra-hieu-chuan' : 'calibration-service' }} className="feature-link">
          <div
            className="feature-item"
            style={{ backgroundImage: "url(/assets/images/bhc/bhc_1.webp)" }}
          >
            <div className="feature-overlay"></div>
            <div className="feature-icon">
              <i className="fas fa-plane"></i>
            </div>
            <div className="feature-text">
              <h3>{t('frontend.home.services.flight.title')}</h3>
              <p className="feature-desc">{t('frontend.home.services.flight.description')}</p>
            </div>
          </div>
        </LocalizedLink>
        <LocalizedLink routeKey="PRODUCTS" className="feature-link">
          <div
            className="feature-item"
            style={{ backgroundImage: "url(/assets/images/cnhk/cnhk_6.webp)" }}
          >
            <div className="feature-overlay"></div>
            <div className="feature-icon">
              <i className="fas fa-globe"></i>
            </div>
            <div className="feature-text">
              <h3>{t('frontend.home.services.industry.title')}</h3>
              <p className="feature-desc">{t('frontend.home.services.industry.description')}</p>
            </div>
          </div>
        </LocalizedLink>

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
            {mockNews.filter(item => item.isOutstanding).map((item, index) => (
              <SwiperSlide key={index}>
                <LocalizedLink 
                  to={`${currentLanguage === 'vi' ? '/tin-tuc' : '/en/news'}/${currentLanguage === 'vi' ? item.postCategorySlugVi : item.postCategorySlugEn}/${currentLanguage === 'vi' ? item.slugVi : item.slugEn}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="notify-item" title={currentLanguage === 'vi' ? item.titleVi : item.titleEn}>
                    <div className="notify-img">
                      <img src={item.image} alt={item.alt} loading="lazy" />
                      <span className="news-badge">{t('frontend.home.featuredNews')}</span>
                    </div>
                    <p className="notify-title" title={currentLanguage === 'vi' ? item.titleVi : item.titleEn}>
                      {currentLanguage === 'vi' ? item.titleVi : item.titleEn}
                    </p>
                  </div>
                </LocalizedLink>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Feature;
