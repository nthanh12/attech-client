import { useEffect, useState } from "react";
import "./About.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ArrowIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const products = [
  {
    title: "CNS / ATM",
    images: [
      "/assets/images/cns_atm/cns_atm_1.webp",
      "/assets/images/cns_atm/cns_atm_2.webp",
      "/assets/images/cns_atm/cns_atm_3.webp",
      "/assets/images/cns_atm/dvor_dme_da_nang.webp",
      "/assets/images/cns_atm/dvor_dme_dien_bien.webp",
      "/assets/images/cns_atm/dvor_dme_van_don.webp",
    ],
    link: "/dich-vu/thong-tin-dan-duong-giam-sat",
  },
  {
    title: "BAY KIỂM TRA HIỆU CHUẨN",
    images: [
      "/assets/images/bhc/bhc_1.webp",
      "/assets/images/bhc/bhc_2.webp",
      "/assets/images/bhc/bhc_3.webp",
      "/assets/images/bhc/bhc_4.webp",
      "/assets/images/bhc/bhc_5.webp",
      "/assets/images/bhc/bhc_6.webp",
      
    ],
    link: "/dich-vu/bay-kiem-tra-hieu-chuan",
  },
  {
    title: "CÔNG NGHIỆP HÀNG KHÔNG",
    images: [
      "/assets/images/cnhk/cnhk_1.webp",
      "/assets/images/cnhk/cnhk_2.webp",
      "/assets/images/cnhk/cnhk_3.webp",
      "/assets/images/cnhk/cnhk_4.webp",
      "/assets/images/cnhk/cnhk_5.webp",
      "/assets/images/cnhk/cnhk_6.webp",
      "/assets/images/cnhk/cnhk_7.webp",
      "/assets/images/cnhk/cnhk_8.webp",
    ],
    link: "/dich-vu/ky-thuat-hang-khong",
  },
];

export default function About() {
  const [currentIndices, setCurrentIndices] = useState(products.map(() => 0));

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });

    // Image carousel interval
    const interval = setInterval(() => {
      setCurrentIndices((prev) =>
        prev.map((index, i) => (index + 1) % products[i].images.length)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handler for dot click (không dùng nữa)
  // const handleDotClick = (productIdx, imgIdx) => {
  //   setCurrentIndices((prev) =>
  //     prev.map((val, i) => (i === productIdx ? imgIdx : val))
  //   );
  // };

  return (
    <section className="about-hero">
      <div className="about-hero-content">
        <h1 className="about-main-title">Dịch vụ nổi bật</h1>
      </div>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={24}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          769: { slidesPerView: 2 },
          1200: { slidesPerView: 3 }
        }}
        className="about-hero-container"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div
              className="about-hero-column"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="about-hero-images">
                {product.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`${product.title} ${imgIndex + 1}`}
                    className={`carousel-image ${
                      imgIndex === currentIndices[index] ? "active" : ""
                    }`}
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="about-hero-overlay">
                <div className="about-hero-content">
                  <h2 className="about-content-title">{product.title}</h2>
                  <div className="custom-btn-group">
                    <Link to={product.link} className="custom-btn-more">
                      Xem thêm
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
