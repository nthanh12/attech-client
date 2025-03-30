import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules"; // Cập nhật import
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
      <div class="row">
        <div class="col-lg-12">
          <div class="section-tittle mb-20">
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
              src="https://hust.edu.vn/uploads/sys/sinh-vien/2018/05/330156.jpg"
              alt="Slide 2"
              title="Caption with a link"
            />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://vatm.vn/upload_images/images/T7.2019/24-7%20ATTECH%20-%20PIC%201.jpg"
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
