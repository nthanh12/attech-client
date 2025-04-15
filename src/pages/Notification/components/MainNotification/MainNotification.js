import React, { useEffect } from "react";
import "./MainNotification.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom"; // nếu bạn dùng react-router

const MainNotification = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const notifications = [
    {
      id: 1,
      slug: "danh-sach-nhan-su-trung-tuyen-dot-3-nam-2024",
      title: "Danh sách nhân sự trúng tuyển đợt 3 năm 2024",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
    },
    {
      id: 2,
      slug: "thong-tin-tuyen-dung-dot-3-nam-2024",
      title: "Thông tin tuyển dụng đợt 3 năm 2024",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
    },
    {
      id: 3,
      slug: "thong-tin-tuyen-dung-vi-tri-nhan-vien-ke-toan",
      title: "Thông tin tuyển dụng vị trí nhân viên kế toán",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
    },
    {
      id: 4,
      slug: "danh-sach-nhan-su-trung-tuyen-dot-3-nam-2024",
      title: "Thông tin tuyển dụng vị trí nhân viên kế toán",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
    },
  ];

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
          {notifications.map((item) => (
            <article key={item.id} data-aos="fade-up">
              <Link
                to={`/notifications/${item.id}/${item.slug}`}
                className="notification-link"
              >
                <div className="image-wrapper">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="content-wrapper">
                  <h2 title={item.title}>{item.title}</h2>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainNotification;
