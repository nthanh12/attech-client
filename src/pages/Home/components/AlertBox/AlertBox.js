import "../AlertBox/AlertBox.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { posts } from "../../../../../src/data/postHome";

const AlertBox = () => {
  const handleSlideEffect = (swiper) => {
    if (!swiper?.slides || swiper.slides.length === 0) return;

    swiper.slides.forEach((slide) => {
      slide.style.opacity = "1";
      slide.style.transform = "scale(1)";
    });

    const activeIndex = swiper.activeIndex;
    const totalSlides = swiper.slides.length;
    const prevIndex = (activeIndex - 2 + totalSlides) % totalSlides;
    const nextIndex = (activeIndex + 2) % totalSlides;

    swiper.slides[prevIndex].style.opacity = "0.5";
    swiper.slides[prevIndex].style.transform = "scale(0.9)";
    swiper.slides[nextIndex].style.opacity = "0.5";
    swiper.slides[nextIndex].style.transform = "scale(0.9)";
  };

  return (
    <div className="alert-box">
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        onSlideChange={handleSlideEffect}
        onInit={handleSlideEffect}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 5, spaceBetween: 10 },
        }}
      >
        {posts.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/news/${item.id}/${item.slug}`}>
              <div className="wrap-item">
                <div className="item-img">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="item-description">
                  <p className="item-time">
                    <i className="fa fa-calendar-days"></i> {item.date}
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
