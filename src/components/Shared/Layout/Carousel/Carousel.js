import React from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";
import img1 from "../../../../assets/imgs/carousel-1.jpg";
import img2 from "../../../../assets/imgs/carousel-2.jpg";
import img3 from "../../../../assets/imgs/carousel-3.jpg";
import img4 from "../../../../assets/img/attech-photo/2017-01-13.jpg";

const Carousel = () => {
  const img5 = "https://vatm.vn/uploads/2024/07/tru-so-tct.jpg";
  return (
    <div className="container-fluid overflow-hidden px-0">
      <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner" role="listbox">
          <div className="carousel-item active">
            <img src={img5} className="img-fluid w-100" alt="First slide" />
            <div className="carousel-caption">
              <p className="text-uppercase text-secondary fs-4 mb-0"></p>
              <h1 className="display-1 text-capitalize text-white mb-4">
                Kiến tạo tương lai từ tầm nhìn không giới hạn
              </h1>
              <p className="mb-5 fs-5 intro-sub">
                Điều gì làm nên sự khác biệt trong quản lý bay? Hãy để ATTECH
                dẫn lối.
              </p>
              <div className="d-flex justify-content-center">
                <Link
                  className="btn btn-primary carousel-btn-left py-3 px-5 me-2 flex-shrink-0"
                  to="/contact"
                >
                  Liên hệ
                </Link>
                <Link
                  className="btn btn-secondary carousel-btn-right d-inline-block py-3 px-5 ms-2 flex-shrink-0"
                  to="/company-info"
                >
                  Xem thêm
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselId"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselId"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
