import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../assets/css/News/SliderSection/SliderSection.css";
import sliderImg1 from "../../assets/img/slider_img1.jpg";
import sliderImg2 from "../../assets/img/slider_img2.jpg";
import sliderImg3 from "../../assets/img/slider_img3.jpg";
import sliderImg4 from "../../assets/img/slider_img4.jpg";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const SliderSection = () => {
  return (
    <section id="sliderSection">
      <div className="row">
        <div className="col-lg-8">
          <Swiper
            spaceBetween={10}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
              clickable: true,
            }}
            modules={Autoplay}
            navigation={true}
            className="swiper_slider"
          >
            <SwiperSlide>
              <div className="single_item">
                <a href="pages/single_page.html">
                  <img src={sliderImg1} alt="Slider 1" />
                </a>
                <div className="slider_article">
                  <h2>
                    <a className="slider_title" href="pages/single_page.html">
                      Fusce eu nulla semper porttitor felis sit amet
                    </a>
                  </h2>
                  <p>
                    Nunc tincidunt, elit non cursus euismod, lacus augue ornare
                    metus, egestas imperdiet nulla nisl quis mauris. Suspendisse
                    a pharetra urna. Morbi dui...
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single_item">
                <a href="pages/single_page.html">
                  <img src={sliderImg2} alt="Slider 2" />
                </a>
                <div className="slider_article">
                  <h2>
                    <a className="slider_title" href="pages/single_page.html">
                      Fusce eu nulla semper porttitor felis sit amet
                    </a>
                  </h2>
                  <p>
                    Nunc tincidunt, elit non cursus euismod, lacus augue ornare
                    metus, egestas imperdiet nulla nisl quis mauris. Suspendisse
                    a pharetra urna. Morbi dui...
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single_item">
                <a href="pages/single_page.html">
                  <img src={sliderImg3} alt="Slider 3" />
                </a>
                <div className="slider_article">
                  <h2>
                    <a className="slider_title" href="pages/single_page.html">
                      Fusce eu nulla semper porttitor felis sit amet
                    </a>
                  </h2>
                  <p>
                    Nunc tincidunt, elit non cursus euismod, lacus augue ornare
                    metus, egestas imperdiet nulla nisl quis mauris. Suspendisse
                    a pharetra urna. Morbi dui...
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single_item">
                <a href="pages/single_page.html">
                  <img src={sliderImg4} alt="Slider 4" />
                </a>
                <div className="slider_article">
                  <h2>
                    <a className="slider_title" href="pages/single_page.html">
                      Fusce eu nulla semper porttitor felis sit amet
                    </a>
                  </h2>
                  <p>
                    Nunc tincidunt, elit non cursus euismod, lacus augue ornare
                    metus, egestas imperdiet nulla nisl quis mauris. Suspendisse
                    a pharetra urna. Morbi dui...
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div class="col-lg-4">
          <div class="latest_post">
            <h2>
              <span>Thông báo</span>
            </h2>
            <div class="fixed_announcement">
              <div class="media">
                <a href="pages/single_page.html" class="media-left">
                  <img
                    alt=""
                    src="https://attech.com.vn/wp-content/uploads/2023/07/giai-bong-da1-170x130.jpg"
                  />
                </a>
                <div class="media-body">
                  <a href="pages/single_page.html" class="catg_title">
                    Thông báo ghim: Nữ công ATTECH hưởng ứng chuỗi hoạt động
                    chào mừng ngày 8/3
                  </a>
                </div>
              </div>
            </div>
            <Swiper
              direction="vertical"
              slidesPerView={4}
              spaceBetween={15}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              modules={[Autoplay]}
              className="swiper_latest_post"
            >
              <SwiperSlide>
                {" "}
                <div className="media">
                  {" "}
                  <a href="pages/single_page.html" className="media-left">
                    {" "}
                    <img
                      alt=""
                      src="https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg"
                    />{" "}
                  </a>{" "}
                  <div className="media-body">
                    {" "}
                    <a href="pages/single_page.html" className="catg_title">
                      {" "}
                      Hội nghị tuyên dương điển hình tiên tiến giai đoạn
                      2020-2024 và phát động phong trào thi đua giai đoạn
                      2025-2030{" "}
                    </a>{" "}
                  </div>{" "}
                </div>{" "}
              </SwiperSlide>{" "}
              <SwiperSlide>
                {" "}
                <div className="media">
                  {" "}
                  <a href="pages/single_page.html" className="media-left">
                    {" "}
                    <img
                      alt=""
                      src="https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg"
                    />{" "}
                  </a>{" "}
                  <div className="media-body">
                    {" "}
                    <a href="pages/single_page.html" className="catg_title">
                      {" "}
                      Đại hội Chi bộ Chi nhánh tại Tp. HCM nhiệm kỳ 2025 – 2027{" "}
                    </a>{" "}
                  </div>{" "}
                </div>{" "}
              </SwiperSlide>{" "}
              <SwiperSlide>
                {" "}
                <div className="media">
                  {" "}
                  <a href="pages/single_page.html" className="media-left">
                    {" "}
                    <img
                      alt=""
                      src="https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg"
                    />{" "}
                  </a>{" "}
                  <div className="media-body">
                    {" "}
                    <a href="pages/single_page.html" className="catg_title">
                      {" "}
                      Đại hội Chi bộ Phòng Tổ chức cán bộ – Lao động nhiệm kỳ
                      2025-2027{" "}
                    </a>{" "}
                  </div>{" "}
                </div>{" "}
              </SwiperSlide>{" "}
              <SwiperSlide>
                {" "}
                <div className="media">
                  {" "}
                  <a href="pages/single_page.html" className="media-left">
                    {" "}
                    <img
                      alt=""
                      src="https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg"
                    />{" "}
                  </a>{" "}
                  <div className="media-body">
                    {" "}
                    <a href="pages/single_page.html" className="catg_title">
                      {" "}
                      Hoạt động chào mừng Ngày truyền thống của Công ty TNHH Kỹ
                      thuật Quản lý Bay 22/7 & kỷ niệm 15 năm tiếp nhận cung cấp
                      dịch vụ dẫn đường{" "}
                    </a>{" "}
                  </div>{" "}
                </div>{" "}
              </SwiperSlide>{" "}
              <SwiperSlide>
                {" "}
                <div className="media">
                  {" "}
                  <a href="pages/single_page.html" className="media-left">
                    {" "}
                    <img
                      alt=""
                      src="https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg"
                    />{" "}
                  </a>{" "}
                  <div className="media-body">
                    {" "}
                    <a href="pages/single_page.html" className="catg_title">
                      {" "}
                      Ngày hội gia đình ATTECH năm 2023 – We are a family{" "}
                    </a>{" "}
                  </div>{" "}
                </div>{" "}
              </SwiperSlide>{" "}
              <SwiperSlide>
                {" "}
                <div className="media">
                  {" "}
                  <a href="pages/single_page.html" className="media-left">
                    {" "}
                    <img
                      alt=""
                      src="https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg"
                    />{" "}
                  </a>{" "}
                  <div className="media-body">
                    {" "}
                    <a href="pages/single_page.html" className="catg_title">
                      {" "}
                      Ngày hội gia đình ATTECH khu vực phía Nam năm 2023{" "}
                    </a>{" "}
                  </div>{" "}
                </div>{" "}
              </SwiperSlide>
              <SwiperSlide>
                <div class="media">
                  <a href="pages/single_page.html" class="media-left">
                    <img
                      alt=""
                      src="https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg"
                    />
                  </a>
                  <div class="media-body">
                    <a href="pages/single_page.html" class="catg_title">
                      Công ty TNHH Kỹ thuật Quản lý bay tổ chức Hội nghị đại
                      biểu Người lao động năm 2025
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <Link to="/news/notification/all" className="more-btn">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
              <span>Xem tất cả</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderSection;
