import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../assets/css/News/SliderSection/SliderSection.css";
import sliderImg1 from "../../assets/img/slider_img1.jpg";
import sliderImg2 from "../../assets/img/slider_img2.jpg";
import sliderImg3 from "../../assets/img/slider_img3.jpg";
import sliderImg4 from "../../assets/img/slider_img4.jpg";
import postImg from "../../assets/img/img-01.png";
import { Autoplay } from "swiper/modules";

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

        <div className="col-lg-4">
          <div className="latest_post">
            <h2>
              <span>Thông báo</span>
            </h2>
            <Swiper
              direction="vertical"
              slidesPerView={5}
              spaceBetween={10}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              modules={[Autoplay]}
              className="swiper_latest_post"
            >
              <SwiperSlide>
                <div className="media">
                  <a href="pages/single_page.html" className="media-left">
                    <img alt="" src={postImg} />
                  </a>
                  <div className="media-body">
                    <a href="pages/single_page.html" className="catg_title">
                      Aliquam malesuada diam eget turpis varius 1
                    </a>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="media">
                  <a href="pages/single_page.html" className="media-left">
                    <img alt="" src={postImg} />
                  </a>
                  <div className="media-body">
                    <a href="pages/single_page.html" className="catg_title">
                      Aliquam malesuada diam eget turpis varius 2
                    </a>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="media">
                  <a href="pages/single_page.html" className="media-left">
                    <img alt="" src={postImg} />
                  </a>
                  <div className="media-body">
                    <a href="pages/single_page.html" className="catg_title">
                      Aliquam malesuada diam eget turpis varius 3
                    </a>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="media">
                  <a href="pages/single_page.html" className="media-left">
                    <img alt="" src={postImg} />
                  </a>
                  <div className="media-body">
                    <a href="pages/single_page.html" className="catg_title">
                      Aliquam malesuada diam eget turpis varius 4
                    </a>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="media">
                  <a href="pages/single_page.html" className="media-left">
                    <img alt="" src={postImg} />
                  </a>
                  <div className="media-body">
                    <a href="pages/single_page.html" className="catg_title">
                      Aliquam malesuada diam eget turpis varius 5
                    </a>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="media">
                  <a href="pages/single_page.html" className="media-left">
                    <img alt="" src={postImg} />
                  </a>
                  <div className="media-body">
                    <a href="pages/single_page.html" className="catg_title">
                      Aliquam malesuada diam eget turpis varius 6
                    </a>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="media">
                  <a href="pages/single_page.html" className="media-left">
                    <img alt="" src={postImg} />
                  </a>
                  <div className="media-body">
                    <a href="pages/single_page.html" className="catg_title">
                      Aliquam malesuada diam eget turpis varius 7
                    </a>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="media">
                  <a href="pages/single_page.html" className="media-left">
                    <img alt="" src={postImg} />
                  </a>
                  <div className="media-body">
                    <a href="pages/single_page.html" className="catg_title">
                      Aliquam malesuada diam eget turpis varius 8
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderSection;
