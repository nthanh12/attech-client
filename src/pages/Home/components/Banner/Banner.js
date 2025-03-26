import "../Banner/Banner.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Button } from "bootstrap";
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
          <div class="carousel-item active">
            <img
              src="https://prd-sc102-cdn.rtx.com/-/media/ca/product-assets/marketing/a/air-traffic-getty-1351088941.jpg?rev=cbbc080bbe804ad4baeb6b87dbe011a1"
              alt="Carousel Image"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="carousel-item active">
            <img
              src="https://vatm.vn/uploads/2024/05/vatm-slide-1.jpg"
              alt="Carousel Image"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="carousel-item active">
            <img
              src="https://vatm.vn/uploads/2024/07/wep-new-5-4.jpg"
              alt="Carousel Image"
            />
          </div>
        </SwiperSlide>
        <button
          class="carousel-control-prev"
          href="#carousel"
          role="button"
          data-slide="prev"
          onClick={() => {
            handleMove("prev");
          }}
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          href="#carousel"
          role="button"
          data-slide="next"
          onClick={() => {
            handleMove("next");
          }}
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </button>
      </Swiper>
    </div>
  );
};

export default Banner;
