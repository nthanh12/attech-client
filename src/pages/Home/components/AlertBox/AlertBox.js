import "../AlertBox/AlertBox.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";

const AlertBox = () => {
  const handleSlideEffect = (swiper) => {
    swiper.slides.forEach((slide) => {
      slide.style.opacity = "1";
      slide.style.transform = "scale(1)";
    });

    const activeIndex = swiper.activeIndex;
    const totalSlides = swiper.slides.length;

    const prevIndex = (activeIndex - 2 + totalSlides) % totalSlides;
    const nextIndex = (activeIndex + 2) % totalSlides;

    swiper.slides[prevIndex].style.opacity = "0.5";
    swiper.slides[prevIndex].style.transform = "scale(0.9)";
    swiper.slides[nextIndex].style.opacity = "0.5";
    swiper.slides[nextIndex].style.transform = "scale(0.9)";
  };

  return (
    <div className="alert-box">
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        onSlideChange={(swiper) => handleSlideEffect(swiper)}
        onInit={(swiper) => handleSlideEffect(swiper)}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
      >
        {/* Thêm đủ slide để đảm bảo hiển thị */}
        <SwiperSlide>
          <div className="wrap-item">
            <div className="item-img">
              <img src="https://vatm.vn/uploads/m.jpg" alt="alertbox Image" />
            </div>
            <div className="item-description">
              <p className="item-time">
                <i className="fa fa-solid fa-calendar-days"></i>
                05/03/2025
              </p>
              <p className="item-text">
                Tuyển dụng nhân viên nhà ở khu đô thị Tam Trinh
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="wrap-item">
            <div className="item-img">
              <img src="https://vatm.vn/uploads/m.jpg" alt="alertbox Image" />
            </div>
            <div className="item-description">
              <p className="item-time">
                <i className="fa fa-solid fa-calendar-days"></i>
                05/03/2025
              </p>
              <p className="item-text">
                Tuyển dụng nhân viên nhà ở khu đô thị Tam Trinh
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="wrap-item">
            <div className="item-img">
              <img src="https://vatm.vn/uploads/m.jpg" alt="alertbox Image" />
            </div>
            <div className="item-description">
              <p className="item-time">
                <i className="fa fa-solid fa-calendar-days"></i>
                05/03/2025
              </p>
              <p className="item-text">
                Tuyển dụng nhân viên nhà ở khu đô thị Tam Trinh
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="wrap-item">
            <div className="item-img">
              <img
                src="https://vimc.co/wp-content/uploads/2024/08/CMIT_8.24-400x300.jpg"
                alt="alertbox Image"
              />
            </div>
            <div className="item-description">
              <p className="item-time">
                <i className="fa fa-solid fa-calendar-days"></i>
                05/03/2025
              </p>
              <p className="item-text">
                Đồng loạt đề xuất tăng giá bốc dỡ cảng biển
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="wrap-item">
            <div className="item-img">
              <img
                src="https://vimc.co/wp-content/uploads/2025/02/VIMC-Svdv-11.2.25-3-400x300.jpg"
                alt="alertbox Image"
              />
            </div>
            <div className="item-description">
              <p className="item-time">
                <i className="fa fa-solid fa-calendar-days"></i>
                05/03/2025
              </p>
              <p className="item-text">
                VIMC và Câu lạc bộ Sao Vàng Đất Việt thúc đẩy hợp tác
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="wrap-item">
            <div className="item-img">
              <img
                src="https://vimc.co/wp-content/uploads/2025/02/Zalo-fanpage-VIMC-400x300.jpg"
                alt="alertbox Image"
              />
            </div>
            <div className="item-description">
              <p className="item-time">
                <i className="fa fa-solid fa-calendar-days"></i>
                05/03/2025
              </p>
              <p className="item-text">
                Công ty TNHH Kỹ thuật Quản lý bay đã chính thức có mặt trên
                Zalo!
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="wrap-item">
            <div className="item-img">
              <img
                src="https://vimc.co/wp-content/uploads/2025/02/PTT-Ho-Duc-Phoc-27.2.25-400x300.jpg"
                alt="alertbox Image"
              />
            </div>
            <div className="item-description">
              <p className="item-time">
                <i className="fa fa-solid fa-calendar-days"></i>
                05/03/2025
              </p>
              <p className="item-text">
                Hội nghị Thường trực Chính phủ làm việc với DNNN
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AlertBox;
