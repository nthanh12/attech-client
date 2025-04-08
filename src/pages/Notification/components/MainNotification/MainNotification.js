import React, { useEffect } from "react";
import "./MainNotification.css";
import AOS from "aos";
import "aos/dist/aos.css";
import img1 from "../../../../assets/img/featured_img1.jpg";
import img2 from "../../../../assets/img/featured_img2.jpg";
import img3 from "../../../../assets/img/featured_img3.jpg";

const MainNotification = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="main-notification">
      <section>
        <div className="row">
          <div className="col-lg-12">
            <div className="section-tittle mb-20">
              <h3 data-aos="fade-up">Tin tuyển dụng</h3>
            </div>
          </div>
        </div>
        <div className="notification-grid">
          <article data-aos="fade-up">
            <div className="image-wrapper">
              <img src={img1} alt="Recruitment List" />
            </div>
            <h2>Danh sách nhân sự trúng tuyển đợt 3 năm 2024</h2>

            <a href="fullwidth.html" className="read-more">
              Xem thêm
            </a>
          </article>
          <article data-aos="fade-up">
            <div className="image-wrapper">
              <img src={img2} alt="Recruitment Info" />
            </div>
            <h2>Thông tin tuyển dụng đợt 3 năm 2024</h2>

            <a href="fullwidth.html" className="read-more">
              Xem thêm
            </a>
          </article>
          <article data-aos="fade-up">
            <div className="image-wrapper">
              <img src={img3} alt="Accounting Position" />
            </div>
            <h2>Thông tin tuyển dụng vị trí nhân viên kế toán</h2>

            <a href="fullwidth.html" className="read-more">
              Xem thêm
            </a>
          </article>
        </div>
      </section>
    </div>
  );
};

export default MainNotification;
