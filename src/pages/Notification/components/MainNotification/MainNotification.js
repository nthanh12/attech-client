import React from "react";
import "./MainNotification.css";

import img1 from "../../../../assets/img/featured_img1.jpg";
import img2 from "../../../../assets/img/featured_img2.jpg";
import img3 from "../../../../assets/img/featured_img3.jpg";

const MainNotification = () => {
  const im1 =
    "https://congthuongbentre.gov.vn/image/upload/catalog/thong-bao/thong-bao-x480.png";
  return (
    <div className="main-notification">
      <section>
        <div id="line">
          <div className="dline"></div>
          <h1>Tuyển dụng</h1>
          <div className="dline"></div>
        </div>
        <div id="ourserv">
          <article>
            <h1>Danh sách nhân sự trúng tuyển đợt 3 năm 2024</h1>
            <img src={im1} alt="Web Design" />
            <p>
              Danh sách nhân sự trúng tuyển đợt 3 năm 2024 của Công ty TNHH Kỹ
              thuật Quản lý bay. Tài liệu đính kèm DS NS trung tuyen Dot 3 nam
              2024 (27.4 KB)
            </p>
            <a href="fullwidth.html" className="rma">
              Đọc thêm
            </a>
          </article>
          <article>
            <h1>Thông tin tuyển dụng đợt 3 năm 2024</h1>
            <img src={im1} alt="Graphic Design" />
            <p>
              Công ty TNHH Kỹ thuật Quản lý bay (tên gọi tắt là ATTECH) là một
              trong những đơn vị kỹ thuật hàng đầu của ngành hàng không Việt Nam
              với 3 lĩnh vực kinh doanh cốt lõi là cung cấp dịch vụ Thông tin –
              Dẫn đường – Giám sát hàng không, dịch vụ Bay kiểm tra hiệu chuẩn
              và Sản xuất công nghiệp hàng không.
            </p>
            <a href="fullwidth.html" className="rma">
              Đọc thêm
            </a>
          </article>
          <article className="lastarticle">
            <h1>Thông tin tuyển dụng vị trí nhân viên kế toán</h1>
            <img src={im1} alt="Web Development" />
            <p>
              Công ty TNHH Kỹ thuật Quản lý bay (tên gọi tắt là ATTECH) là một
              trong những đơn vị kỹ thuật hàng đầu của ngành hàng không Việt Nam
              với 3 lĩnh vực kinh doanh cốt lõi là cung cấp dịch vụ Thông tin –
              Dẫn đường – Giám sát hàng không, dịch vụ Bay kiểm tra hiệu chuẩn
              và Sản xuất công nghiệp hàng không. Tài liệu đính kèm Tiêu chuẩn
              vị trí Nhân viên kế toán (17.75 KB)
            </p>
            <a href="fullwidth.html" className="rma">
              Đọc thêm
            </a>
          </article>
        </div>
      </section>
    </div>
  );
};

export default MainNotification;
