import { useEffect, useState } from "react";
import "./About.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import about_cns1 from "../../../../assets/img/cns/about_cns1.jpg";
import about_cns2 from "../../../../assets/img/cns/about_cns2.jpg";
import about_cns3 from "../../../../assets/img/cns/about_cns3.jpg";
import about_cns4 from "../../../../assets/img/cns/about_cns4.jpg";
import about_cns5 from "../../../../assets/img/cns/about_cns5.jpg";
import about_fi1 from "../../../../assets/img/bay-kthc/fi1.jpg";
import about_fi2 from "../../../../assets/img/bay-kthc/fi2.jpg";
import about_fi3 from "../../../../assets/img/bay-kthc/fi3.jpg";
import about_ai1 from "../../../../assets/img/cnhk/about_ai1.jpg";
import about_ai2 from "../../../../assets/img/cnhk/about_ai2.jpg";
import about_ai3 from "../../../../assets/img/cnhk/about_ai3.jpg";
import about_ai4 from "../../../../assets/img/cnhk/about_ai4.jpg";

const products = [
  {
    title: "CNS / ATM",
    images: [about_cns1, about_cns2, about_cns3, about_cns4, about_cns5],
    description:
      "Cung cấp dịch vụ chuyên ngành Thông tin, Dẫn đường, Giám sát hàng không hàng đầu tại Việt Nam.",
    link: "/services/cns",
  },
  {
    title: "BAY KIỂM TRA HIỆU CHUẨN",
    images: [about_fi1, about_fi2, about_fi3],
    description:
      "Bay hiệu chuẩn hệ thống ILS đến Cat III. Xử lý & lưu trữ dữ liệu bay trong thời gian thực.",
    link: "/services/flightcheck",
  },
  {
    title: "CÔNG NGHIỆP HÀNG KHÔNG",
    images: [about_ai4, about_ai2, about_ai3, about_ai1],
    description:
      "Đổi mới công nghệ, tiên phong phát triển ngành hàng không toàn cầu.",
    link: "/services/aviation-tech",
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

  return (
    <section className="about-hero">
      <div className="about-hero-container">
        {products.map((product, index) => (
          <div
            key={index}
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
                />
              ))}
            </div>
            <div className="about-hero-overlay">
              <div className="about-hero-content">
                <h1 className="about-content-title">{product.title}</h1>
              </div>
              <div className="custom-btn-group">
                <Link to={product.link} className="custom-btn-more">
                  Xem thêm
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
