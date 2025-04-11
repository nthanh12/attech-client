import { useEffect, useState } from "react";
import "./About.css";
import { Link } from "react-router-dom";

import about_img1 from "../../../../assets/img/featured_img1.jpg";
import about_img2 from "../../../../assets/img/featured_img2.jpg";
import about_img3 from "../../../../assets/img/featured_img3.jpg";

const products = [
  {
    title: "CNS / ATM",
    image: about_img1,
    description:
      "Cung cấp dịch vụ chuyên ngành Thông tin, Dẫn đường, Giám sát hàng không hàng đầu tại Việt Nam.",
  },
  {
    title: "Bay kiểm tra hiệu chuẩn",
    image: about_img2,
    description:
      "Bay hiệu chuẩn hệ thống ILS đến Cat III. Xử lý & lưu trữ dữ liệu bay trong thời gian thực.",
  },
  {
    title: "Công nghiệp hàng không",
    image: about_img3,
    description:
      "Đổi mới công nghệ, tiên phong phát triển ngành hàng không toàn cầu.",
  },
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { image, title, description } = products[currentIndex];

  return (
    <section
      className="about-hero"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* <div className="about-wave-top">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,160L34.3,144C68.6,128,137,96,206,90.7C274.3,85,343,107,411,112C480,117,549,107,617,117.3C685.7,128,754,149,823,165C891.4,181,960,181,1029,170.7C1097.1,160,1166,139,1234,128C1302.9,117,1371,117,1406,117.3L1440,117L1440,0L0,0Z"
          ></path>
        </svg>
      </div> */}

      <div className="about-hero-overlay">
        <div className="about-hero-content">
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="custom-btn-group">
            <Link to="/home" className="btn custom-btn-more">
              Xem thêm
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="about-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#002a5c"
            fillOpacity="1"
            d="M0,160L34.3,144C68.6,128,137,96,206,90.7C274.3,85,343,107,411,112C480,117,549,107,617,117.3C685.7,128,754,149,823,165C891.4,181,960,181,1029,170.7C1097.1,160,1166,139,1234,128C1302.9,117,1371,117,1406,117.3L1440,117L1440,320L0,320Z"
          ></path>
        </svg>
      </div> */}
    </section>
  );
}
