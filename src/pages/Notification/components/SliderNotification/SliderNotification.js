import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules"; // Cập nhật import
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./SliderNotification.css";
import slider1 from "../../../../assets/img/slider_img1.jpg";
import slider2 from "../../../../assets/img/slider_img2.jpg";
import slider3 from "../../../../assets/img/slider_img3.jpg";
import slider4 from "../../../../assets/img/slider_img4.jpg";

const SliderNotification = () => {
  return (
    <div className="slider-notification-wrapper">
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="slider-notification"
      >
        <SwiperSlide>
          <img src={slider1} alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <a href="http://geeksband.com">
            <img src={slider2} alt="Slide 2" title="Caption with a link" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider3} alt="Slide 3" title="Caption example" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider4} alt="Slide 4" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderNotification;
