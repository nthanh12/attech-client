import "../AlertBox/AlertBox.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../../styles/swiper-custom.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useI18n } from "../../../../hooks/useI18n";
import { Link } from "react-router-dom";
import { mockNews } from "../../../../utils/mockNews";

function formatDate(isoString, lang) {
  const d = new Date(isoString);
  return d.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US');
}

const AlertBox = () => {
  const { currentLanguage } = useI18n();
  return (
    <div className="alert-box">
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        centeredSlides={false}
        loop={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 0 },
          640: { slidesPerView: 2, spaceBetween: 0 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1200: { slidesPerView: 5, spaceBetween: 20 },
        }}
      >
        {mockNews.slice(0, 12).map((item) => {
          const title = currentLanguage === 'vi' ? item.titleVi : item.titleEn;
          const categorySlug = currentLanguage === 'vi' ? item.postCategorySlugVi : item.postCategorySlugEn;
          const slug = currentLanguage === 'vi' ? item.slugVi : item.slugEn;
          const link = currentLanguage === 'vi'
            ? `/tin-tuc/${categorySlug}/${slug}`
            : `/en/news/${categorySlug}/${slug}`;
          return (
            <SwiperSlide key={item.id}>
              <Link
                to={link}
                aria-label={`Read more about ${title}`}
              >
                <div className="wrap-item">
                  <div className="item-img" title={title}>
                    <img src={item.image} alt={title} loading="lazy" />
                  </div>
                  <div className="item-description" title={title}>
                    <p className="item-time">
                      <i className="fa fa-calendar-days" aria-hidden="true"></i>{" "}
                      {formatDate(item.timePosted, currentLanguage)}
                    </p>
                    <p className="item-text">{title}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default AlertBox;
