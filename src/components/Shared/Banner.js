import "../../assets/css/Banner.css";
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
    <>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        ref={bannerRef}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div class="carousel-item active">
            <img
              src="https://prd-sc102-cdn.rtx.com/-/media/ca/product-assets/marketing/a/air-traffic-getty-1351088941.jpg?rev=cbbc080bbe804ad4baeb6b87dbe011a1"
              alt="Carousel Image"
            />
            <div class="carousel-caption">
              <p class="animated fadeInRight">We Are Professional</p>
              <h1 class="animated fadeInLeft">For Your Dream Project</h1>
              <a
                class="btn animated fadeInUp"
                href="https://htmlcodex.com/construction-company-website-template"
              >
                Get A Quote
              </a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="carousel-item active">
            <img
              src="https://th.bing.com/th/id/OIP.t50cU0nEC7rGaxxMz42DsQHaEO?w=280&h=180&c=7&r=0&o=5&pid=1.7"
              alt="Carousel Image"
            />
            <div class="carousel-caption">
              <p class="animated fadeInRight">We Are Professional</p>
              <h1 class="animated fadeInLeft">For Your Dream Project</h1>
              <a
                class="btn animated fadeInUp"
                href="https://htmlcodex.com/construction-company-website-template"
              >
                Get A Quote
              </a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="carousel-item active">
            <img
              src="https://th.bing.com/th/id/OIP.wQ66CGNwaq2w4X8WgdfB9AHaEK?w=310&h=180&c=7&r=0&o=5&pid=1.7"
              alt="Carousel Image"
            />
            <div class="carousel-caption">
              <p class="animated fadeInRight">We Are Professional</p>
              <h1 class="animated fadeInLeft">For Your Dream Project</h1>
              <a
                class="btn animated fadeInUp"
                href="https://htmlcodex.com/construction-company-website-template"
              >
                Get A Quote
              </a>
            </div>
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
    </>
  );
};

export default Banner;
