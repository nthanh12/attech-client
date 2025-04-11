import React, { useEffect, useState } from "react";
import "./Media.css";
import banner from "../../../../assets/img/giai-bong-26_03_2025.jpg";

const rotatingWords = ["An toàn", "Điều hòa", "Hiệu quả"];

const Media = () => {
  const [displayedText, setDisplayedText] = useState(rotatingWords[0]);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText((prevText) => {
        if (currentIndex < rotatingWords.length) {
          const newText = prevText + " - " + rotatingWords[currentIndex];
          setCurrentIndex((prevIndex) => prevIndex + 1);
          return newText;
        } else {
          // Reset về từ đầu
          setCurrentIndex(1);
          return rotatingWords[0];
        }
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section
      className="hero-section d-flex justify-content-center align-items-center"
      id="section_1"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="section-overlay"></div>

      <svg
        className="svg-top"
        viewBox="0 0 1265 144"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="rgba(255, 255, 255, 1)"
          d="M 0 40 C 164 40 164 20 328 20 L 328 20 L 328 0 L 0 0 Z"
          strokeWidth="0"
        />
        <path
          fill="rgba(255, 255, 255, 1)"
          d="M 327 20 C 445.5 20 445.5 89 564 89 L 564 89 L 564 0 L 327 0 Z"
          strokeWidth="0"
        />
        <path
          fill="rgba(255, 255, 255, 1)"
          d="M 563 89 C 724.5 89 724.5 48 886 48 L 886 48 L 886 0 L 563 0 Z"
          strokeWidth="0"
        />
        <path
          fill="rgba(255, 255, 255, 1)"
          d="M 885 48 C 1006.5 48 1006.5 67 1128 67 L 1128 67 L 1128 0 L 885 0 Z"
          strokeWidth="0"
        />
        <path
          fill="rgba(255, 255, 255, 1)"
          d="M 1127 67 C 1196 67 1196 0 1265 0 L 1265 0 L 1265 0 L 1127 0 Z"
          strokeWidth="0"
        />
      </svg>

      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12">
            <div className="ratio ratio-16x9 animate-fade-in">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/bROog4Jqyzo?si=RT7niLf9saPsCGHF"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="ratio ratio-16x9 animate-fade-in">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/szACf6q5SoM?si=WWRz3pdNfG-9KCSB"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Media;
