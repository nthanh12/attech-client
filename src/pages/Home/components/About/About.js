import { useEffect, useState } from "react";
import "./About.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import about_img1 from "../../../../assets/img/feature-cns.jpg";
import about_img2 from "../../../../assets/img/feature-fi.jpg";
import about_img3 from "../../../../assets/img/feature-ai.jpg";

const products = [
  {
    title: "CNS / ATM",
    images: [about_img1, about_img2, about_img3],
    description:
      "Cung cấp dịch vụ chuyên ngành Thông tin, Dẫn đường, Giám sát hàng không hàng đầu tại Việt Nam.",
  },
  {
    title: "Bay kiểm tra hiệu chuẩn",
    images: [about_img2, about_img3, about_img1],
    description:
      "Bay hiệu chuẩn hệ thống ILS đến Cat III. Xử lý & lưu trữ dữ liệu bay trong thời gian thực.",
  },
  {
    title: "Công nghiệp hàng không",
    images: [about_img3, about_img1, about_img2],
    description:
      "Đổi mới công nghệ, tiên phong phát triển ngành hàng không toàn cầu.",
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
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <div className="custom-btn-group">
                  <Link to="/home" className="btn custom-btn-more">
                    Xem thêm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
