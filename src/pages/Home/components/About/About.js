import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../About/About.css";
import about_img1 from "../../../../assets/img/featured_img1.jpg";
import about_img2 from "../../../../assets/img/featured_img2.jpg";
import about_img3 from "../../../../assets/img/featured_img3.jpg";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    title: "CNS / ATM",
    image: about_img1,
    description:
      "Công ty TNHH Kỹ thuật Quản lý bay (ATTECH) tự hào là nhà cung cấp dịch vụ chuyên ngành Thông tin (Communication – C), dẫn đường (Navigation – N), Giám sát (Surveilance- S) hàng không hàng đầu tại Việt Nam.",
  },
  {
    title: "Bay kiểm tra hiệu chuẩn",
    image: about_img2,
    description:
      "Bằng việc sử dụng công nghệ bay hiệu chuẩn hoàn toàn tự động mới, thiết bị bay hiệu chuẩn có khả năng: Bay hiệu chuẩn hệ thống ILS đến Cat III – Thu thập và xử lý dữ liệu trong thời gian thực, lưu trữ dữ liệu bay hiệu chuẩn liên tục trong quá trình thực hiện nhiệm vụ.",
  },
  {
    title: "Công nghiệp hàng không",
    image: about_img3,
    description: "Đổi mới công nghệ cho ngành hàng không toàn cầu.",
  },
];

const About = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const aboutRef = useRef(null);
  const imageRefs = useRef([]);

  useLayoutEffect(() => {
    const aboutEl = aboutRef.current;

    const scrollTrigger = ScrollTrigger.create({
      trigger: aboutEl,
      start: "top top",
      end: `+=${window.innerHeight * (products.length - 1)}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const productIndex = Math.min(
          Math.floor(progress * products.length),
          products.length - 1
        );

        if (productIndex !== currentProductIndex) {
          // Ẩn ảnh cũ
          if (imageRefs.current[currentProductIndex]) {
            gsap.to(imageRefs.current[currentProductIndex], {
              x: 100,
              opacity: 0,
              duration: 0.5,
            });
          }

          // Cập nhật chỉ số sản phẩm hiện tại
          setCurrentProductIndex(productIndex);

          // Hiển thị ảnh mới
          if (imageRefs.current[productIndex]) {
            gsap.fromTo(
              imageRefs.current[productIndex],
              { x: -100, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.5 }
            );
          }

          // Cập nhật indicator
          gsap.to(".indicator", {
            scale: (i) => (i === productIndex ? 1.3 : 1),
            backgroundColor: (i) =>
              i === productIndex ? "#1a2a44" : "rgba(26, 42, 68, 0.3)",
            duration: 0.3,
          });
        }
      },
    });

    // Khởi tạo trạng thái ban đầu cho các ảnh
    imageRefs.current.forEach((img, index) => {
      if (img) {
        gsap.set(img, {
          x: index === 0 ? 0 : -100,
          opacity: index === 0 ? 1 : 0,
        });
      }
    });

    return () => {
      scrollTrigger.kill();
      gsap.killTweensOf(imageRefs.current);
      gsap.killTweensOf(".indicator");
    };
  }, [currentProductIndex]);

  return (
    <div className="about" ref={aboutRef}>
      <div className="about-container">
        <div className="product-content">
          <div className="product-title-wrapper">
            <h1 className="product-title">
              {products[currentProductIndex].title}
            </h1>
            <p className="product-description">
              {products[currentProductIndex].description}
            </p>
            <button className="view-more-btn">Xem thêm</button>
          </div>
          <div className="product-image-wrapper">
            {products.map((product, index) => (
              <img
                key={index}
                ref={(el) => (imageRefs.current[index] = el)}
                src={product.image}
                className="img-fluid"
                alt={product.title}
              />
            ))}
          </div>
        </div>
        <div className="product-indicators">
          {products.map((_, index) => (
            <div
              key={index}
              className={`indicator ${
                index === currentProductIndex ? "active" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
