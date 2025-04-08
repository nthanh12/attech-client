import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
// import "./Map.css";

// Import images
import pic_1 from "../../../../assets/img/ADSB V1.jpg";
import pic_2 from "../../../../assets/img/NAVAIDS.jpg";
import pic_3 from "../../../../assets/img/VHF V3.jpg";

const Map = () => {
  const swiperRef = useRef(null);

  const handleNavigation = (direction) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      direction === "next"
        ? swiperRef.current.swiper.slideNext()
        : swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <section className="modern-map">
      <div className="modern-container">
        <div className="intro-container">
          <div className="intro-content">
            <h2 className="intro-title">Giá trị mà ATTECH hướng đến</h2>
            <p className="intro-text">
              Với sứ mệnh mang đến các giải pháp công nghệ hàng không hiện đại,
              đáp ứng tiêu chuẩn quốc tế, với giá trị cốt lõi là độ an toàn,
              điều hòa và hiệu quả.
            </p>
          </div>
        </div>

        <div className="showcase-container">
          <div className="showcase-grid">
            <div className="showcase-media">
              <Swiper
                ref={swiperRef}
                modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  type: "bullets",
                  el: ".custom-pagination",
                }}
                className="showcase-swiper"
              >
                <SwiperSlide>
                  <div className="slide-wrapper">
                    <div className="image-container">
                      <img
                        src={pic_1}
                        alt="ADSB System V1"
                        className="slide-image"
                      />
                    </div>
                    <div className="slide-content">
                      <h3 className="slide-title">ADSB System V1</h3>
                      <p className="slide-description">
                        Sơ đồ hệ thống ADS-B (Automatic Dependent
                        Surveillance–Broadcast) của Việt Nam, thể hiện vùng phủ
                        sóng và cơ sở hạ tầng của hệ thống giám sát hàng không
                        tự động trên lãnh thổ Việt Nam.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide-wrapper">
                    <div className="image-container">
                      <img
                        src={pic_2}
                        alt="NAVAIDS System"
                        className="slide-image"
                      />
                    </div>
                    <div className="slide-content">
                      <h3 className="slide-title">NAVAIDS System</h3>
                      <p className="slide-description">
                        Sơ đồ hệ thống dẫn đường hàng không do ATTECH quản lý
                        tại Việt Nam. Bản đồ thể hiện vị trí các trạm dẫn đường
                        và phạm vi hoạt động của chúng trong không phận Việt
                        Nam.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide-wrapper">
                    <div className="image-container">
                      <img
                        src={pic_3}
                        alt="VHF System V3"
                        className="slide-image"
                      />
                    </div>
                    <div className="slide-content">
                      <h3 className="slide-title">VHF System V3</h3>
                      <p className="slide-description">
                        Sơ đồ hệ thống VHF do ATTECH quản lý, thể hiện vùng phủ
                        sóng của các trạm thông tin vô tuyến VHF (Very High
                        Frequency) phục vụ hàng không tại khu vực Việt Nam và
                        Singapore.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className="nav-controls">
                <button
                  className="nav-arrow prev"
                  onClick={() => handleNavigation("prev")}
                  aria-label="Previous"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="custom-pagination"></div>
                <button
                  className="nav-arrow next"
                  onClick={() => handleNavigation("next")}
                  aria-label="Next"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 6L15 12L9 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
