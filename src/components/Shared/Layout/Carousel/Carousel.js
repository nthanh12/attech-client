import React, { useState, useEffect } from "react";
import "./Carousel.css";

import useIsMobile from "../Header/Navbar/useIsMobile";
import { useBannerSettings } from "../../../../hooks/useBannerSettings";

const Carousel = () => {
  const isMobile = useIsMobile(1025);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 600);
  const { getCarouselImages, loading } = useBannerSettings();

  useEffect(() => {
    const handleResize = () => setIsSmallMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get slides from banner settings with fallback to default images
  const slides = getCarouselImages();

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
