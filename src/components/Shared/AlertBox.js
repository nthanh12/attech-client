import "../../assets/css/AlertBox.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
//import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useRef } from "react";

const AlertBox = () => {
  //const AlertBoxRef = useRef(null);
  // const handleMove = (type) => {
  //   if (AlertBoxRef.current) {
  //     if (type === "next") {
  //       AlertBoxRef.current.swiper.slideNext();
  //     } else {
  //       AlertBoxRef.current.swiper.slidePrev();
  //     }
  //   }
  // };
  return (
    <div className="alert-box">
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="wrap-item">
            <div class="item-img">
              <img src="https://vatm.vn/uploads/m.jpg" alt="alertbox Image" />
            </div>
            <div className="item-description">
              <p className="item-time">05/03/2025</p>
              <p className="item-text">
                Tuyển dụng nhân viên nhà ở khu đô thị Tam Trinh
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="wrap-item">
            <div class="item-img">
              <img
                src="https://vimc.co/wp-content/uploads/2024/08/CMIT_8.24-400x300.jpg"
                alt="alertbox Image"
              />
            </div>
            <div className="item-description">
              <p className="item-time">05/03/2025</p>
              <p className="item-text">
                Đồng loạt đề xuất tăng giá bốc dỡ cảng biển
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="wrap-item">
            <div class="item-img">
              <img
                src="https://vimc.co/wp-content/uploads/2025/02/VIMC-Svdv-11.2.25-3-400x300.jpg"
                alt="alertbox Image"
              />
            </div>
            <div className="item-description">
              <p className="item-time">05/03/2025</p>
              <p className="item-text">
                VIMC và Câu lạc bộ Sao Vàng Đất Việt thúc đẩy hợp tác, mở rộng
                kết nối doanh nghiệp
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="wrap-item">
            <div class="item-img">
              <img
                src="https://vimc.co/wp-content/uploads/2025/02/Zalo-fanpage-VIMC-400x300.jpg"
                alt="alertbox Image"
              />
            </div>
            <div className="item-description">
              <p className="item-time">05/03/2025</p>
              <p className="item-text">
                Công ty TNHH Kỹ thuật Quản lý bay đã chính thức có mặt trên
                Zalo!
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="wrap-item">
            <div class="item-img">
              <img
                src="https://vimc.co/wp-content/uploads/2025/02/PTT-Ho-Duc-Phoc-27.2.25-400x300.jpg"
                alt="alertbox Image"
              />
            </div>
            <div className="item-description">
              <p className="item-time">05/03/2025</p>
              <p className="item-text">
                Hội nghị Thường trực Chính phủ làm việc với DNNN: VIMC quán
                triệt sâu sắc chỉ đạo, quyết tâm thúc đẩy tăng trưởng kinh tế
              </p>
            </div>
          </div>
        </SwiperSlide>
        {/* <button
          class="alertbox-control-prev"
          href="#alertbox"
          role="button"
          data-slide="prev"
          onClick={() => {
            handleMove("prev");
          }}
        >
          <span class="alertbox-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </button>
        <button
          class="alertbox-control-next"
          href="#alertbox"
          role="button"
          data-slide="next"
          onClick={() => {
            handleMove("next");
          }}
        >
          <span class="alertbox-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </button> */}
      </Swiper>
    </div>
  );
};

export default AlertBox;
