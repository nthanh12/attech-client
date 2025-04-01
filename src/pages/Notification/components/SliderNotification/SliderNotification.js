import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules"; // Cập nhật import
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./SliderNotification.css";

const SliderNotification = () => {
  return (
    <div className="slider-notification-wrapper">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-tittle mb-20">
            <h3>Trang thông báo</h3>
          </div>
        </div>
      </div>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        className="slider-notification"
      >
        <SwiperSlide>
          <img
            src="http://vatm.vn/upload_images/images/T10.2017/U27A9375.JPG"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <a href="http://geeksband.com">
            <img
              src="https://attech.com.vn/wp-content/uploads/2025/03/banner-26-3.png"
              alt="Slide 2"
              title="Caption with a link"
            />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://attech.com.vn/wp-content/uploads/2023/07/25-nam1.jpg"
            alt="Slide 3"
            title="Caption example"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://vatm.vn/images/news/2019/12/26/original/attech-3_1577353826.jpg"
            alt="Slide 4"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderNotification;
