import React, { useState } from "react";
import "./PartNews.css";
import icon_fb from "../../../../assets/imgs/news/icon-fb.png";
import icon_ins from "../../../../assets/imgs/news/icon-ins.png";
import icon_tw from "../../../../assets/imgs/news/icon-tw.png";
import icon_yh from "../../../../assets/imgs/news/icon-yo.png";
import icon_new_card from "../../../../assets/img/part-banner.jpg";
import giai_bong from "../../../../assets/img/giai-bong-26_03_2025.jpg";

const categories = [
  { id: "nav-home", label: "Tất cả" },
  { id: "nav-profile", label: "Hoạt động" },
  { id: "nav-dangbo", label: "Đảng bộ công ty" },
  { id: "nav-doan", label: "Đoàn thanh niên" },
  { id: "nav-congdoan", label: "Công đoàn" },
];

const newsData = [
  {
    id: 1,
    category: "Tất cả",
    date: "26/03/2025",
    title: "Hãng hàng không mở thêm nhiều đường bay quốc tế",
    image:
      "https://i1-vnexpress.vnecdn.net/2025/03/26/dscf2195-jpeg-1742964488-9432-1742964646.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=rdW-ecy_PkZfo0BvWIhEYw",
  },
  {
    id: 2,
    category: "Hoạt động",
    date: "26/03/2025",
    title:
      "ATTECH tổ chức thành công giải bóng đá chào mừng 94 năm ngày thành lập Đoàn TNCS Hồ Chí Minh",
    image: giai_bong,
  },
  {
    id: 3,
    category: "Đoàn thanh niên",
    date: "26/03/2025",
    title:
      "Đoàn Thanh niên Công ty TNHH Kỹ thuật Quản lý bay tổ chức “Lễ kỷ niệm 94 năm Ngày thành lập Đoàn TNCS Hồ Chí Minh” và “Đối thoại giữa Đảng ủy – Ban Lãnh đạo Công ty với Đoàn Thanh niên năm 2025”",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/03/doi-thoai-dtn-2025-2.jpg",
  },
  {
    id: 4,
    category: "Đảng bộ công ty",
    date: "26/03/2025",
    title: "Chi bộ Đài dẫn đường Tân Sơn Nhất tổ chức Lễ kết nạp Đảng viên mới",
    image:
      "https://attech.com.vn/wp-content/uploads/2025/02/ket-nap-dv-tsn-26-2-2.jpg",
  },
  {
    id: 5,
    category: "Đảng bộ công ty",
    date: "26/03/2025",
    title:
      "Đảng ủy Công ty TNHH Kỹ thuật Quản lý bay triển khai Hội nghị tổng kết công tác năm 2024 và triển khai nhiệm vụ năm 2025",
    image:
      "https://attech.com.vn/wp-content/uploads/2024/12/ct-%C4%90%E1%BA%A3ng-26-12-3.jpg",
  },
  {
    id: 6,
    category: "Công đoàn",
    date: "26/03/2025",
    title: "Nữ công ATTECH hưởng ứng chuỗi hoạt động chào mừng ngày 8/3",
    image: "https://attech.com.vn/wp-content/uploads/2025/03/ngay-8-3-3.jpg",
  },
];

const socialLinks = [
  { icon: icon_fb, label: "Fans", count: "8,045" },
  { icon: icon_tw, label: "Followers", count: "8,045" },
  { icon: icon_ins, label: "Followers", count: "8,045" },
  { icon: icon_yh, label: "Subscribers", count: "8,045" },
];

const PartNews = () => {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const filteredNews = newsData.filter(
    (news) => activeTab === "Tất cả" || news.category === activeTab
  );

  return (
    <section className="whats-news-area pt-50 pb-20">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="row d-flex justify-content-between">
              <div className="col-lg-2 col-md-2">
                <div className="section-tittle mb-20">
                  <h3>Tin tức</h3>
                </div>
              </div>
              <div className="col-lg-10 col-md-10">
                <div className="properties__button">
                  <nav>
                    <div className="nav nav-tabs" role="tablist">
                      {categories.map((cat) => (
                        <a
                          key={cat.id}
                          className={`nav-item nav-link ${
                            activeTab === cat.label ? "active" : ""
                          }`}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab(cat.label);
                          }}
                        >
                          {cat.label}
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="tab-content">
                  <div className="tab-pane fade show active">
                    <div className="whats-news-caption">
                      <div className="row">
                        {filteredNews.map((news) => (
                          <div key={news.id} className="col-lg-4 col-md-4">
                            <div className="single-what-news mb-60">
                              <div className="what-img">
                                <img src={news.image} alt="news" />
                              </div>
                              <div className="what-cap">
                                <span className="title-news">{news.date}</span>
                                <h4>
                                  <a title={news.title} href="#">
                                    {news.title}
                                  </a>
                                </h4>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="follow-tittle mb-40">
              <h3>Theo dõi chúng tôi</h3>
            </div>
            <div className="single-follow mb-45">
              <div className="single-box">
                {socialLinks.map((social, index) => (
                  <div
                    key={index}
                    className="follow-us d-flex align-items-center"
                  >
                    <div className="follow-social">
                      <a href="#">
                        <img src={social.icon} alt="social" />
                      </a>
                    </div>
                    <div className="follow-count">
                      <span>{social.count}</span>
                      <p>{social.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="news-poster d-none d-lg-block">
              <img src={icon_new_card} alt="news poster" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartNews;
