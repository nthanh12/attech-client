import React from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";

import banner1 from "../../../../assets/img/banner_attech.jpg";
import banner2 from "../../../../assets/img/cns/about_cns4.jpg";
import banner3 from "../../../../assets/img/cns/about_cns2.jpg";

const Carousel = () => {
  const slides = [
    {
      img: banner1,
      title: "SÁNG TẠO & THÍCH NGHI",
      subtitle:
        "Điều gì làm nên sự khác biệt trong quản lý bay? Hãy để ATTECH dẫn lối.",
    },
    {
      img: banner2,
      title: "CÔNG NGHỆ TIÊN TIẾN",
      subtitle: "Khám phá các giải pháp quản lý bay hiện đại.",
    },
    {
      img: banner3,
      title: "AN TOÀN HÀNG ĐẦU",
      subtitle: "Đảm bảo an toàn bay với công nghệ tối ưu.",
    },
  ];

  return (
    <div className="container-fluid overflow-hidden px-0">
      <div
        id="carouselId"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-pause="hover"
      >
        <div className="carousel-inner" role="listbox">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              data-bs-interval="10000"
            >
              <img
                src={slide.img}
                className="img-fluid w-100"
                alt={`Slide ${index + 1}`}
              />
              {/* <div className="carousel-caption">
                <p className="text-uppercase text-secondary fs-4 mb-0"></p>
                <h1 className="display-1 text-capitalize text-white mb-4 text-carou">
                  {slide.title}
                </h1>
                <p className="mb-5 fs-5 intro-sub">{slide.subtitle}</p>
              </div> */}
            </div>
          ))}
        </div>
        {/* Nút điều hướng thủ công */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselId"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselId"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
        {/* Chỉ báo (indicators) */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselId"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
