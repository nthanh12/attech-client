import React, { useEffect, useState } from "react";
import "./Media.css";
import banner from "../../../../assets/img/cns/about_cns4.jpg";
import customImage from "../../../../assets/img/cns/about_cns3.jpg";

const rotatingWords = ["An toàn", "Điều hòa", "Hiệu quả"];

const Media = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVideo1Playing, setIsVideo1Playing] = useState(false);
  const [isVideo2Playing, setIsVideo2Playing] = useState(false);

  // Rotate words one at a time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Handle click to play video
  const handleVideoClick = (videoNumber) => {
    if (videoNumber === 1) {
      setIsVideo1Playing(true);
    } else {
      setIsVideo2Playing(true);
    }
  };

  return (
    <section
      className="hero-section"
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
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row g-4">
              <div className="col-12 col-md-6">
                <div className="ratio ratio-16x9 animate-fade-in video-wrapper">
                  {!isVideo1Playing && (
                    <div
                      className="video-overlay"
                      onClick={() => handleVideoClick(1)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleVideoClick(1);
                        }
                      }}
                    >
                      <img
                        src={customImage}
                        alt="Sự kiện bóng đá 26/03/2025 - Video 1"
                        className="custom-image"
                        loading="lazy"
                      />
                      <div className="play-button"></div>
                    </div>
                  )}
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/bROog4Jqyzo?si=RT7niLf9saPsCGHF${
                      isVideo1Playing ? "&autoplay=1" : ""
                    }`}
                    title="YouTube video player 1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className={isVideo1Playing ? "" : "hidden"}
                  ></iframe>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="ratio ratio-16x9 animate-fade-in video-wrapper">
                  {!isVideo2Playing && (
                    <div
                      className="video-overlay"
                      onClick={() => handleVideoClick(2)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleVideoClick(2);
                        }
                      }}
                    >
                      <img
                        src={customImage}
                        alt="Sự kiện bóng đá 26/03/2025 - Video 2"
                        className="custom-image"
                        loading="lazy"
                      />
                      <div className="play-button"></div>
                    </div>
                  )}
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/szACf6q5SoM?si=WWRz3pdNfG-9KCSB${
                      isVideo2Playing ? "&autoplay=1" : ""
                    }`}
                    title="YouTube video player 2"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className={isVideo2Playing ? "" : "hidden"}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Media;