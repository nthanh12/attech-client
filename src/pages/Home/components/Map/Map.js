import "../Map/Map.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useRef, useState } from "react";

import pic_1 from "../../../../assets/img/ADSB V1.jpg";
import pic_2 from "../../../../assets/img/NAVAIDS.jpg";
import pic_3 from "../../../../assets/img/VHF V3.jpg";

const Map = () => {
  const MapRef = useRef(null);

  // Dữ liệu về hình ảnh và nội dung liên quan
  const slidesData = [
    {
      image: pic_1,
      title: "ADSB System V1",
      description:
        "Sơ đồ hệ thống ADS-B (Automatic Dependent Surveillance–Broadcast) của Việt Nam, thể hiện vùng phủ sóng và cơ sở hạ tầng của hệ thống giám sát hàng không tự động trên lãnh thổ Việt Nam. Thể hiện hai vùng bay chính Hà Nội và TP. Hồ Chí Minh cùng với các trạm thu phát tín hiệu và phạm vi hoạt động của chúng, nhằm phục vụ công tác quản lý không lưu và đảm bảo an toàn hàng không trong không phận Việt Nam..",
    },
    {
      image: pic_2,
      title: "NAVAIDS System",
      description:
        "Sơ đồ hệ thống dẫn dẫn đường hàng không do ATTECH quản lý tại Việt Nam. Bản đồ thể hiện vị trí các trạm dẫn đường và phạm vi hoạt động của chúng trong không phận Việt Nam, bao gồm hai vùng thông báo bay chính: FIR Hà Nội và FIR Hồ Chí Minh.",
    },
    {
      image: pic_3,
      title: "VHF System V3",
      description:
        "Sơ đồ hệ thống VHF do ATTECH quản lý, thể hiện vùng phủ sóng của các trạm thông tin vô tuyến VHF (Very High Frequency) phục vụ hàng không tại khu vực Việt Nam và Singapore. Sơ đồ được chia thành bốn phần, bao gồm các vùng phủ sóng tại khu vực Hồ Chí Minh và FIR Singapore, với các vòng tròn màu sắc thể hiện phạm vi phủ sóng của từng trạm..",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);
  };

  const handleMove = (type) => {
    if (MapRef.current) {
      if (type === "next") {
        MapRef.current.swiper.slideNext();
      } else {
        MapRef.current.swiper.slidePrev();
      }
    }
  };

  return (
    <div className="map">
      <div className="container map-container">
        <div className="map-left">
          <Swiper
            centeredSlides={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            loop={true}
            ref={MapRef}
            onSlideChange={handleSlideChange} // Xử lý sự kiện thay đổi slide
            modules={[Autoplay, Pagination, Navigation]}
            className="swiper-map"
          >
            {slidesData.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="active">
                  <img
                    className="swp-img"
                    src={slide.image}
                    alt={slide.title}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="carousel-control-prev"
            role="button"
            onClick={() => {
              handleMove("prev");
            }}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            role="button"
            onClick={() => {
              handleMove("next");
            }}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div className="map-right">
          <div className="map-intro">
            <p className="map-intro-big">Giá trị mà ATTECH hướng đến</p>
            <p className="map-intro-small">
              Với sứ mệnh mang đến các giải pháp công nghệ hàng không hiện đại,
              đáp ứng tiêu chuẩn quốc tế, với giá trị cốt lõi là độ an toàn,
              điều hòa và hiệu quả. Các sản phẩm của ATTECH hướng tới nâng cao
              hiệu suất quản lý không lưu và góp phần vào sự phát triển bền vững
              của ngành hàng không. Hơn thế nữa, mỗi sản phẩm đều thể hiện sự
              cam kết về chất lượng và đổi mới, đóng góp quan trọng vào hành
              trình kết nối bầu trời Việt Nam với thế giới.
            </p>
          </div>
          <div className="map-content">
            <h2>{slidesData[currentIndex].title}</h2>
            <p className="map-description">
              {slidesData[currentIndex].description}
            </p>
            <button className="btn-learn-more">Đọc thêm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
