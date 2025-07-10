import React, { useState, useEffect } from "react";
import "./Carousel.css";

import banner1 from "../../../../assets/img/banner_attech.jpg";
import banner2 from "../../../../assets/img/bay-kthc/fi3.jpg";
import banner3 from "../../../../assets/img/cns/about_cns5.jpg";
import useIsMobile from '../Header/Navbar/useIsMobile';

const Carousel = () => {
  const isMobile = useIsMobile(1025);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsSmallMobile(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = [
    {
      img: banner1,
      className: "carousel-img-1",
    },
    {
      img: banner2,
      className: "carousel-img-2",
    },
    {
      img: "https://attech.com.vn/wp-content/uploads/2015/05/mnuSanPham.png",
      className: "carousel-img-3",
    },
  ];

  useEffect(() => {
    // Initialize carousel
    const carouselElement = document.querySelector("#carouselId");
    if (carouselElement) {
      const carousel = new window.bootstrap.Carousel(carouselElement, {
        interval: 5000,
        wrap: true,
        keyboard: true,
        pause: "hover",
        ride: "carousel",
      });
    }
  }, []);

  const carouselStyle = {
    marginTop: isSmallMobile ? 48 : isMobile ? 60 : 120,
  };

  return (
    <div className="container-fluid overflow-hidden px-0" style={carouselStyle}>
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
