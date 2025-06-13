import React, { useEffect } from "react";
import "./Carousel.css";

import banner1 from "../../../../assets/img/banner_attech.jpg";
import banner2 from "../../../../assets/img/bay-kthc/fi3.jpg";
import banner3 from "../../../../assets/img/cns/about_cns5.jpg";

const Carousel = () => {
  const slides = [
    {
      img: banner1,
      className: "carousel-img-1"
    },
    {
      img: banner2,
      className: "carousel-img-2"
    },
    {
      img: banner3,
      className: "carousel-img-3"
    },
  ];

  useEffect(() => {
    // Initialize carousel
    const carouselElement = document.querySelector('#carouselId');
    if (carouselElement) {
      const carousel = new window.bootstrap.Carousel(carouselElement, {
        interval: 5000,
        wrap: true,
        keyboard: true,
        pause: 'hover',
        ride: 'carousel'
      });
    }
  }, []);

  return (
    <div className="container-fluid overflow-hidden px-0">
      <div
        id="carouselId"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-pause="hover"
        data-bs-interval="5000"
      >
        <div className="carousel-inner" role="listbox">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={slide.img}
                className={`img-fluid w-100 ${slide.className}`}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
