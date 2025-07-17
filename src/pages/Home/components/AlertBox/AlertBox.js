import "../AlertBox/AlertBox.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../../styles/swiper-custom.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { mockNews } from "../../../../utils/mockNews";

function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString('vi-VN');
}

const AlertBox = () => {
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
          pauseOnMouseEnter: true
        }}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 0 },
          640: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1200: { slidesPerView: 5, spaceBetween: 20 },
        }}
      >
        {mockNews.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/tin-tuc/${item.postCategorySlugVi}/${item.slugVi}`} aria-label={`Read more about ${item.title}`}>
              <div className="wrap-item">
                <div className="item-img" title={item.titleVi}>
                  <img src={item.image} alt={item.titleVi} loading="lazy" />
                </div>
                <div className="item-description" title={item.titleVi}>
                  <p className="item-time">
                    <i className="fa fa-calendar-days" aria-hidden="true"></i> {formatDate(item.timePosted)}
                  </p>
                  <p className="item-text">{item.titleVi}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AlertBox;