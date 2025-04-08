import React, { useEffect } from "react";
import "./SubNotification.css";
import AOS from "aos";
import "aos/dist/aos.css";

const SubNotification = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Hiệu ứng mượt mà
      easing: "ease-in-out", // Kiểu easing
      once: true, // Hiệu ứng chỉ chạy một lần
    });
  }, []);

  const projects = [
    {
      title:
        "Tổ chức khóa “Đào tạo ban đầu để cấp chứng chỉ chuyên môn Thông tin, Giám sát hàng không” cho đội ngũ nhân viên bảo đảm hoạt động bay của Công ty TNHH Kỹ thuật Quản lý bay",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/01/thong-tin-10-1-2.jpg",
      description:
        "Công ty TNHH Kỹ thuật Quản lý bay tổ chức khóa “Đào tạo ban đầu để cấp chứng chỉ chuyên môn Thông tin, Giám sát hàng không” cho 30 lượt học viên là nhân viên CNS mới tuyển dụng năm 2024.",
      link: "singlepost.html",
    },
    {
      title:
        "Khai giảng khóa “Huấn luyện về phòng cháy chữa cháy và cứu nạn cứu hộ”",
      image:
        "https://attech.com.vn/wp-content/uploads/2024/12/hl-pccc-12-10-1.jpg",
      description:
        "Ngày 9/12/2024, Trung tâm huấn luyện CNS – Công ty TNHH Kỹ thuật Quản lý bay đã phối hợp với Đội Cảnh sát phòng cháy chữa cháy tổ chức khóa huấn luyện.",
      link: "singlepost.html",
    },
    {
      title:
        "Công ty TNHH Kỹ thuật Quản lý bay tổ chức Lễ kỷ niệm 42 năm Ngày Nhà giáo Việt Nam 20/11/2024",
      image:
        "https://attech.com.vn/wp-content/uploads/2024/11/TTHL-21-11-5.jpg",
      description:
        "Trung tâm huấn luyện CNS tổ chức Lễ kỷ niệm ngày Nhà giáo Việt Nam 20/11, ghi nhận đóng góp của đội ngũ giáo dục.",
      link: "singlepost.html",
    },
    {
      title:
        "Khai giảng khóa huấn luyện “Nhân viên mới” và “Đào tạo ban đầu để cấp chứng chỉ chuyên môn nhân viên CNS”",
      image: "https://attech.com.vn/wp-content/uploads/2024/11/nvm-13-11-2.jpg",
      description:
        "Ngày 11/11/2024, Trung tâm huấn luyện CNS tổ chức khóa huấn luyện dành cho nhân viên mới.",
      link: "singlepost.html",
    },
  ];

  return (
    <div className="sub-notification">
      <section>
        <div className="row">
          <div className="col-lg-12">
            <div className="section-tittle mb-20" data-aos="fade-up">
              <h3>Thông tin khác</h3>
            </div>
          </div>
        </div>
        <div className="notification-grid" id="latestp">
          {projects.map((project, index) => (
            <article
              key={index}
              data-aos="fade-up"
              className={index === projects.length - 1 ? "lastarticle" : ""}
            >
              <div className="image-wrapper">
                <img src={project.image} alt={project.title} />
              </div>
              <h2>{project.title}</h2>
              <a href={project.link} className="read-more">
                Xem thêm
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SubNotification;
