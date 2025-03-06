import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../assets/css/Quotes.css";

const Quotes = () => {
  return (
    <div className="quotes">
      <Swiper spaceBetween={50} slidesPerView={1}>
        <SwiperSlide>
          <div className="quote">
            <p className="quote-text">
              "Sự thành công không phải là điểm đến, mà là quá trình."
            </p>
            <p className="quote-author">Chủ tịch công ty: Lê Tiến Thịnh</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="quote">
            <p className="quote-text">"Chỉ bàn làm - không bàn lùi."</p>
            <p className="quote-author">Giám đốc công ty: Nguyễn Hoàng Giang</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Quotes;
