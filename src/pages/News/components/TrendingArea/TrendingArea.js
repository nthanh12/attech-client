import React from "react";
import "./TrendingArea.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

import right1 from "../../../../assets/imgs/trending/right1.jpg";
import right2 from "../../../../assets/imgs/trending/right2.jpg";
import right3 from "../../../../assets/imgs/trending/right3.jpg";
import right4 from "../../../../assets/imgs/trending/right4.jpg";
import right5 from "../../../../assets/imgs/trending/right5.jpg";
import { Autoplay } from "swiper/modules";

const TrendingArea = () => {
  return (
    <div class="trending-area fix">
      <div class="container">
        <div class="trending-main">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-tittle mb-20">
                <h3>Tin hoạt động công ty</h3>
              </div>
            </div>
          </div>
          <div class="row">
            <div className="col-lg-8">
              <Swiper
                className="trending-top mb-30"
                spaceBetween={50}
                modules={[Autoplay]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                loop={true}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                <SwiperSlide>
                  <div className="trend-top-img">
                    <img
                      src="https://cdn.popsww.com/blog-kids/sites/3/2023/04/ngay-gio-to-hung-vuong.jpg"
                      alt=""
                    />
                    <div className="trend-top-cap">
                      <h2>
                        <a href="details.html">
                          ATTECH chào mừng Kỷ niệm ngày Giỗ Tổ Hùng Vương
                          <br /> Mùng 10 tháng 3 (Âm lịch)
                        </a>
                      </h2>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="trend-top-img">
                    <img
                      src="https://phuong3.tayninh.gov.vn/uploads/news/2025_02/14.jpg"
                      alt=""
                    />
                    <div className="trend-top-cap">
                      {/* <span>Appetizers 2</span> */}
                      <h2>
                        <a href="details.html">
                          ATTECH hưởng ứng chào mừng 50 năm ngày giải phóng miền
                          Nam, thống nhất đất nước
                          <br />
                        </a>
                      </h2>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="trend-top-img">
                    <img
                      src="https://file.vnua.edu.vn/data/0/images/2024/04/29/host/a1.jpg?w=680"
                      alt=""
                    />
                    <div className="trend-top-cap">
                      {/* <span>Appetizers 2</span> */}
                      <h2>
                        <a href="details.html">
                          Chào mừng ngày Quốc tế lao động
                          <br /> 01/5
                        </a>
                      </h2>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div class="trending-bottom">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="single-bottom mb-35">
                      <div class="trend-bottom-img mb-30">
                        <img
                          src="https://attech.com.vn/wp-content/uploads/2025/03/canh-thu-Con-Son-28-3-1.jpg"
                          alt=""
                        />
                      </div>
                      <div class="trend-bottom-cap">
                        <span class="color1">31/03/2025</span>
                        <h4>
                          <a href="details.html">
                            Hoàn thành canh thu, đảm bảo kỹ thuật các tần số VHF
                            tại trạm CNS Côn Sơn
                          </a>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="single-bottom mb-35">
                      <div class="trend-bottom-img mb-30">
                        <img
                          src="https://attech.com.vn/wp-content/uploads/2025/03/hop-dong-tb05-4-3-1.jpg"
                          alt=""
                        />
                      </div>
                      <div class="trend-bottom-cap">
                        <span class="color2">30/04/2024</span>

                        <h4>
                          <a href="details.html">
                            Lễ ký kết Hợp đồng cho Gói thầu TB05 “Cung cấp và
                            lắp đặt hệ thống DVOR/DME” Dự án thành phần 2 “Các
                            công trình phục vụ quản lý bay” thuộc dự án “Cảng
                            hàng không quốc tế Long Thành – Giai đoạn 1”
                          </a>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="single-bottom mb-35">
                      <div class="trend-bottom-img mb-30">
                        <img
                          src="https://attech.com.vn/wp-content/uploads/2025/02/nesic-nghiem-thu-18-02-2.jpg"
                          alt=""
                        />
                      </div>
                      <div class="trend-bottom-cap">
                        <span class="color3">Travels</span>
                        <h4>
                          <a href="details.html">
                            ATTECH và NESIC hoàn thành nghiệm thu tại Nhà máy 05
                            phòng đặt thiết bị (Shelter) thép
                          </a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <Swiper
                direction="vertical"
                spaceBetween={10}
                slidesPerView="6"
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                modules={[Autoplay]}
                className="trand-right-swiper"
              >
                {/* Slide 1 */}
                <SwiperSlide>
                  <div className="trand-right-single d-flex">
                    <div className="trand-right-img">
                      <img
                        src="https://attech.com.vn/wp-content/uploads/2025/02/BHC-5-2.jpg"
                        alt=""
                      />
                    </div>
                    <div className="trand-right-cap">
                      <span className="color1">30/03/2025</span>
                      <h4>
                        <a href="details.html">
                          Hoàn thành công tác bay kiểm tra, hiệu chuẩn các thiết
                          bị dẫn đường, giám sát hàng không đợt 2 mùa bay
                          2024/2025
                        </a>
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
                {/* Slide 2 */}
                <SwiperSlide>
                  <div className="trand-right-single d-flex">
                    <div className="trand-right-img">
                      <img
                        src="https://attech.com.vn/wp-content/uploads/2025/01/hnnld-ban-22-1-2.jpg"
                        alt=""
                      />
                    </div>
                    <div className="trand-right-cap">
                      <span className="color3">26/03/2025</span>
                      <h4>
                        <a href="details.html">
                          Ban Quản lý dự án Đầu tư và xây dựng chuyên ngành tổ
                          chức Hội nghị người lao động năm 2025
                        </a>
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
                {/* Slide 3 */}
                <SwiperSlide>
                  <div className="trand-right-single d-flex">
                    <div className="trand-right-img">
                      <img
                        src="https://attech.com.vn/wp-content/uploads/2025/01/hntk-nam-2024-21-1-1.jpg"
                        alt=""
                      />
                    </div>
                    <div className="trand-right-cap">
                      <span className="color2">22/03/2025</span>
                      <h4>
                        <a href="details.html">
                          Công ty TNHH Kỹ thuật Quản lý bay tổ chức Hội nghị
                          tổng kết công tác năm 2024 và triển khai kế hoạch năm
                          2025
                        </a>
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
                {/* Slide 4 */}
                <SwiperSlide>
                  <div className="trand-right-single d-flex">
                    <div className="trand-right-img">
                      <img
                        src="https://attech.com.vn/wp-content/uploads/2025/01/pickleball-l1-21-1-1.jpg"
                        alt=""
                      />
                    </div>
                    <div className="trand-right-cap">
                      <span className="color4">21/03/2025</span>
                      <h4>
                        <a href="details.html">
                          Giải Pickleball Xưởng DVKT mở rộng lần 1
                        </a>
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
                {/* Slide 5 */}
                <SwiperSlide>
                  <div className="trand-right-single d-flex">
                    <div className="trand-right-img">
                      <img
                        src="https://attech.com.vn/wp-content/uploads/2025/01/dien-tap-attt-28-12-1.jpg"
                        alt=""
                      />
                    </div>
                    <div className="trand-right-cap">
                      <span className="color1">16/12/2024</span>
                      <h4>
                        <a href="details.html">
                          Diễn tập ứng phó tấn công giả mạo trên hệ thống thư
                          điện tử tên miền @attech.com.vn của Công ty
                        </a>
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
                {/* Slide 6*/}
                <SwiperSlide>
                  <div className="trand-right-single d-flex">
                    <div className="trand-right-img">
                      <img
                        src="https://attech.com.vn/wp-content/uploads/2025/01/amhs-6-1-2.jpg"
                        alt=""
                      />
                    </div>
                    <div className="trand-right-cap">
                      <span className="color1">16/12/2024</span>
                      <h4>
                        <a href="details.html">
                          Hệ thống AMHS mở rộng (AMHS Extended) do ATTECH nghiên
                          cứu, phát triển hoàn thành giai đoạn Conformance Test
                        </a>
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
                {/* Slide 7*/}
                <SwiperSlide>
                  <div className="trand-right-single d-flex">
                    <div className="trand-right-img">
                      <img
                        src="https://attech.com.vn/wp-content/uploads/2024/12/NTT-19-12-2.jpg"
                        alt=""
                      />
                    </div>
                    <div className="trand-right-cap">
                      <span className="color1">16/12/2024</span>
                      <h4>
                        <a href="details.html">
                          Công ty TNHH Kỹ thuật Quản lý bay nhận giấy khen của
                          Cục thuế Hà Nội tuyên dương người nộp thuế tiêu biểu
                          thủ đô năm 2023
                        </a>
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingArea;
