import React from "react";
import "./WhatsNews.css";
import whatsNews1 from "../../../../assets/imgs/news/whatNews1.jpg";
import whatsNews2 from "../../../../assets/imgs/news/whatNews2.jpg";
import whatsNews3 from "../../../../assets/imgs/news/whatNews3.jpg";
import whatsNews4 from "../../../../assets/imgs/news/whatNews4.jpg";
import icon_fb from "../../../../assets/imgs/news/icon-fb.png";
import icon_ins from "../../../../assets/imgs/news/icon-ins.png";
import icon_tw from "../../../../assets/imgs/news/icon-tw.png";
import icon_yh from "../../../../assets/imgs/news/icon-yo.png";
import icon_new_card from "../../../../assets/img/part-banner.jpg";

const WhatsNews = () => {
  return (
    <section class="whats-news-area pt-50 pb-20">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="row d-flex justify-content-between">
              <div class="col-lg-5 col-md-5">
                <div class="section-tittle mb-20">
                  <h3>Tin ngành hàng không</h3>
                </div>
              </div>
              <div class="col-lg-7 col-md-7">
                <div class="properties__button">
                  <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                      <a
                        class="nav-item nav-link active"
                        id="nav-home-tab"
                        data-toggle="tab"
                        href="#nav-home"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        Tất cả
                      </a>
                      <a
                        class="nav-item nav-link"
                        id="nav-profile-tab"
                        data-toggle="tab"
                        href="#nav-profile"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                      >
                        Trong nước
                      </a>
                      <a
                        class="nav-item nav-link"
                        id="nav-technology"
                        data-toggle="tab"
                        href="#nav-techno"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                      >
                        Quốc tế
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="tab-content" id="nav-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div class="whats-news-caption">
                      <div class="row">
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img
                                src="https://i1-vnexpress.vnecdn.net/2025/03/26/dscf2195-jpeg-1742964488-9432-1742964646.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=rdW-ecy_PkZfo0BvWIhEYw"
                                alt=""
                              />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">26/03/2025</span>
                              <h4>
                                <a href="#">
                                  Hãng hàng không mở thêm nhiều đường bay quốc
                                  tế
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img
                                src="https://i1-kinhdoanh.vnecdn.net/2025/02/24/vietnamairlinesxacdinhconnguoi-6915-5590-1740372946.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=zOeTryNAHMk0b1tAzVw-Zw"
                                alt=""
                              />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">29/03/2025</span>
                              <h4>
                                <a href="#">
                                  Vietnam Airlines đặt mục tiêu thu hơn 3,7 tỷ
                                  USD
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img
                                src="https://i1-vnexpress.vnecdn.net/2025/01/21/may-bay-sieu-thanh-moi-1737460-3193-1420-1737460593.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=iz_0y1tc-sAmjaNAOr5kzg"
                                alt=""
                              />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">26/03/2025</span>
                              <h4>
                                <a href="#">
                                  Công ty Trung Quốc phát triển máy bay siêu
                                  thanh 5.000 km/h
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img
                                src="https://i1-vnexpress.vnecdn.net/2024/12/22/VNE-Plane-3-1734830968-9113-1734831213.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=WEE5lOSxNzRs8E9EH4O5fA"
                                alt=""
                              />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">31/03/2025</span>
                              <h4>
                                <a href="#">
                                  7 máy bay thay đổi lịch sử hàng không
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img
                                src="https://i1-kinhdoanh.vnecdn.net/2024/12/13/ic3a9923-1734103107-1770-1734103117.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=RMWTo32rrFuDezw_GCfI6g"
                                alt=""
                              />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">31/03/2025</span>
                              <h4>
                                <a href="#">
                                  Vietnam Airlines dứt mạch thua lỗ 4 năm liên
                                  tiếp
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <div class="whats-news-caption">
                      <div class="row">
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews1} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Vietnam Airlines dứt mạch thua lỗ 4 năm liên
                                  tiếp
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews2} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews3} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews3} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="nav-contact"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                  >
                    <div class="whats-news-caption">
                      <div class="row">
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews1} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews2} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews3} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews4} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="nav-last"
                    role="tabpanel"
                    aria-labelledby="nav-last-tab"
                  >
                    <div class="whats-news-caption">
                      <div class="row">
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews1} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews2} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews3} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews4} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="nav-nav-Sport"
                    role="tabpanel"
                    aria-labelledby="nav-Sports"
                  >
                    <div class="whats-news-caption">
                      <div class="row">
                        <div class="col-lg-6 col-md-6">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews1} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews2} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews3} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews4} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="nav-techno"
                    role="tabpanel"
                    aria-labelledby="nav-technology"
                  >
                    <div class="whats-news-caption">
                      <div class="row">
                        <div class="col-lg-6 col-md-6">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews1} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews2} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews3} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="single-what-news mb-60">
                            <div class="what-img">
                              <img src={whatsNews3} alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="title-news">Night party</span>
                              <h4>
                                <a href="#">
                                  Welcome To The Best Model Winner Contest
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="section-tittle mb-40">
              <h3>Theo dõi chúng tôi</h3>
            </div>
            <div class="single-follow mb-45">
              <div class="single-box">
                <div class="follow-us d-flex align-items-center">
                  <div class="follow-social">
                    <a href="#">
                      <img src={icon_fb} alt="" />
                    </a>
                  </div>
                  <div class="follow-count">
                    <span>8,045</span>
                    <p>Fans</p>
                  </div>
                </div>
                <div class="follow-us d-flex align-items-center">
                  <div class="follow-social">
                    <a href="#">
                      <img src={icon_tw} alt="" />
                    </a>
                  </div>
                  <div class="follow-count">
                    <span>8,045</span>
                    <p>Fans</p>
                  </div>
                </div>
                <div class="follow-us d-flex align-items-center">
                  <div class="follow-social">
                    <a href="#">
                      <img src={icon_ins} alt="" />
                    </a>
                  </div>
                  <div class="follow-count">
                    <span>8,045</span>
                    <p>Fans</p>
                  </div>
                </div>
                <div class="follow-us d-flex align-items-center">
                  <div class="follow-social">
                    <a href="#">
                      <img src={icon_yh} alt="" />
                    </a>
                  </div>
                  <div class="follow-count">
                    <span>8,045</span>
                    <p>Fans</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="news-poster d-none d-lg-block">
              <img src={icon_new_card} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNews;
