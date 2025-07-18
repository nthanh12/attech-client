import React from "react";
import "./TrendingArea.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "../../../../styles/swiper-custom.css";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import ViewAllButton from "../../../../components/ViewAllButton/ViewAllButton";
import { mockNews } from "../../../../utils/mockNews";

const CATEGORY_SLUG = "hoat-dong-cong-ty";
const filteredNews = mockNews.filter(
  (item) => item.postCategorySlugVi === CATEGORY_SLUG
);

const trendingTop = filteredNews.slice(0, 3);
const trendingBottom = filteredNews.slice(3, 6);
const trendingRight = filteredNews.slice(6);

const TrendingArea = () => {
  return (
    <div className="trending-area">
      <div className="container">
        <div className="trending-main">
          <div className="row">
            <div className="col-12 p-0">
              <div className="section-tittle">
                <h3>Tin hoạt động công ty</h3>
                <ViewAllButton to="/tin-tuc/hoat-dong-cong-ty" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-12 p-0">
              <div className="trending-top-wrapper">
                <Swiper
                  className="trending-top mb-30"
                  spaceBetween={0}
                  modules={[Autoplay, Navigation]}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  loop={trendingTop.length > 1}
                  slidesPerView={1}
                  navigation={true}
                >
                  {trendingTop.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div className="trend-top-img">
                        <img
                          src={item.image}
                          alt={item.titleVi}
                          title={item.titleVi}
                        />
                        <div className="trend-top-cap">
                          <h2>{item.titleVi}</h2>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="trending-bottom">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={3}
                  navigation
                  breakpoints={{
                    320: { slidesPerView: 1.1, spaceBetween: 12 },
                    576: { slidesPerView: 2, spaceBetween: 15 },
                    1248: { slidesPerView: 3, spaceBetween: 20 },
                  }}
                  className="trending-bottom-swiper"
                >
                  {trendingBottom.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div className="single-bottom">
                        <div className="trend-bottom-img">
                          <img
                            src={item.image}
                            alt={item.titleVi}
                            title={item.titleVi}
                          />
                        </div>
                        <div className="trend-bottom-cap">
                          <span className="color1">
                            {new Date(item.timePosted).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                          <h4>
                            <Link
                              to={`/tin-tuc/${item.postCategorySlugVi}/${item.slugVi}`}
                              title={item.titleVi}
                            >
                              {item.titleVi}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 p-0">
              <Swiper
                direction="vertical"
                spaceBetween={10}
                slidesPerView={6}
                autoplay={{ delay: 30000, disableOnInteraction: false }}
                loop={trendingRight.length > 6}
                modules={[Autoplay]}
                className="trand-right-swiper"
                breakpoints={{
                  320: {
                    direction: "horizontal",
                    slidesPerView: 1.2,
                    spaceBetween: 12,
                  },
                  576: {
                    direction: "horizontal",
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  992: {
                    direction: "vertical",
                    slidesPerView: 6,
                    spaceBetween: 10,
                  },
                }}
              >
                {trendingRight.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="trand-right-single d-flex">
                      <div className="trand-right-img">
                        <img
                          src={item.image}
                          alt={item.titleVi}
                          title={item.titleVi}
                        />
                      </div>
                      <div className="trand-right-cap">
                        <span className="color3">
                          {new Date(item.timePosted).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                        <h4>
                          <Link
                            to={`/tin-tuc/${item.postCategorySlugVi}/${item.slugVi}`}
                            title={item.titleVi}
                          >
                            {item.titleVi}
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingArea;
