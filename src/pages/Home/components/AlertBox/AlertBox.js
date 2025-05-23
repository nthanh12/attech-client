import "../AlertBox/AlertBox.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { posts } from "../../../../../src/data/postHome";

const AlertBox = () => {
  return (
    <div className="alert-box">
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        centeredSlides={false}
        loop={true}
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
          320: { slidesPerView: 1, spaceBetween: 15 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1200: { slidesPerView: 5, spaceBetween: 20 },
        }}
      >
        {posts.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/news/${item.id}/${item.slug}`} aria-label={`Read more about ${item.title}`}>
              <div className="wrap-item">
                <div className="item-img" title={item.title}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="item-description" title={item.title}>
                  <p className="item-time">
                    <i className="fa fa-calendar-days" aria-hidden="true"></i> {item.date}
                  </p>
                  <p className="item-text">{item.title}</p>
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