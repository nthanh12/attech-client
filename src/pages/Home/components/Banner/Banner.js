import "../Banner/Banner.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useRef } from "react";

const Banner = () => {
  const bannerRef = useRef(null);
  const handleMove = (type) => {
    if (bannerRef.current) {
      if (type === "next") {
        bannerRef.current.swiper.slideNext();
      } else {
        bannerRef.current.swiper.slidePrev();
      }
    }
  };
  return (
    <div className="banner">
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        ref={bannerRef}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="banner-item active">
            <img
              src="https://prd-sc102-cdn.rtx.com/-/media/ca/product-assets/marketing/a/air-traffic-getty-1351088941.jpg?rev=cbbc080bbe804ad4baeb6b87dbe011a1"
              alt="Carousel Image"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner-item active">
            <img
              src="https://vatm.vn/uploads/2024/05/vatm-slide-1.jpg"
              alt="Carousel Image"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner-item active">
            <img
              src="https://vatm.vn/uploads/2024/07/wep-new-5-4.jpg"
              alt="Carousel Image"
            />
          </div>
        </SwiperSlide>
        <button
          className="carousel-control-prev"
          role="button"
          onClick={() => {
            handleMove("prev");
          }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          role="button"
          onClick={() => {
            handleMove("next");
          }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </button>
      </Swiper>
    </div>
  );
};

export default Banner;
