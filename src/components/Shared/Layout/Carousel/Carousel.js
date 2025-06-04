import React from "react";
import "./Carousel.css";

import banner1 from "../../../../assets/img/banner_attech.jpg";
import banner2 from "../../../../assets/img/bay-kthc/fi8.jpg";
import banner3 from "../../../../assets/img/cns/about_cns2.jpg";

const Carousel = () => {
  const slides = [
    {
      img: banner1,
    },
    {
      img: banner2,
    },
    {
      img: banner3,
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
            </div>
          ))}
        </div>

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
