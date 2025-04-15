import React, { useEffect } from "react";
import "./SubNotification.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const SubNotification = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="sub-notification">
      <section>
        <div className="row">
          <div className="col-lg-12">
            <div className="section-tittle mb-20">
              <h3 data-aos="fade-up">Thông báo khác</h3>
            </div>
          </div>
        </div>
        <div className="notification-grid">
          <article data-aos="fade-up">
            <div className="image-wrapper">
              <img
                src="https://attech.com.vn/wp-content/uploads/2018/12/Ong-NDSon-TCCBTCT.jpg"
                alt="Recruitment List"
              />
            </div>
            <div className="content-wrapper">
              <Link>
                Khai giảng khóa huấn luyện “Đào tạo ban đầu để cấp chứng chỉ
                chuyên môn cho nhân viên thông tin, dẫn đường, giám sát hàng
                không” của Tổng công ty Quản lý bay Việt Nam
              </Link>
            </div>
          </article>
          <article data-aos="fade-up">
            <div className="image-wrapper">
              <img
                src="https://attech.com.vn/wp-content/uploads/2024/04/ket-nap-D-Thanh-Hung-Anh1.jpg"
                alt="Recruitment List"
              />
            </div>
            <div className="content-wrapper">
              <Link>
                Chi bộ giám sát và đảm bảo kỹ thuật CNS tổ chức Lễ kết nạp đảng
                viên mới
              </Link>
            </div>
          </article>
          <article data-aos="fade-up">
            <div className="image-wrapper">
              <img
                src="https://attech.com.vn/wp-content/uploads/2020/05/Nghiem-thu-CT-cap-dien-NB1.jpg"
                alt="Recruitment List"
              />
            </div>
            <div className="content-wrapper">
              <Link>Nghiệm thu công trình cấp điện nguồn Đài Nội Bài</Link>
            </div>
          </article>
          <article data-aos="fade-up">
            <div className="image-wrapper">
              <img
                src="https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg"
                alt="Recruitment List"
              />
            </div>
            <div className="content-wrapper">
              <Link>Thông tin tuyển dụng vị trí nhân viên kế toán</Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default SubNotification;
