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

const newsData = {
  all: [
    {
      date: "26/03/2025",
      title: "Hãng hàng không mở thêm nhiều đường bay quốc tế",
      image: "https://i1-vnexpress.vnecdn.net/2025/03/26/dscf2195-jpeg-1742964488-9432-1742964646.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=rdW-ecy_PkZfo0BvWIhEYw",
      link: "#",
    },
    {
      date: "29/03/2025",
      title: "Vietnam Airlines đặt mục tiêu thu hơn 3,7 tỷ USD",
      image: "https://i1-kinhdoanh.vnecdn.net/2025/02/24/vietnamairlinesxacdinhconnguoi-6915-5590-1740372946.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=zOeTryNAHMk0b1tAzVw-Zw",
      link: "#",
    },
    {
      date: "26/03/2025",
      title: "Công ty Trung Quốc phát triển máy bay siêu thanh 5.000 km/h",
      image: "https://i1-vnexpress.vnecdn.net/2025/01/21/may-bay-sieu-thanh-moi-1737460-3193-1420-1737460593.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=iz_0y1tc-sAmjaNAOr5kzg",
      link: "#",
    },
    {
      date: "31/03/2025",
      title: "7 máy bay thay đổi lịch sử hàng không",
      image: "https://i1-vnexpress.vnecdn.net/2024/12/22/VNE-Plane-3-1734830968-9113-1734831213.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=WEE5lOSxNzRs8E9EH4O5fA",
      link: "#",
    },
    {
      date: "31/03/2025",
      title: "Vietnam Airlines dứt mạch thua lỗ 4 năm liên tiếp",
      image: "https://i1-kinhdoanh.vnecdn.net/2024/12/13/ic3a9923-1734103107-1770-1734103117.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=RMWTo32rrFuDezw_GCfI6g",
      link: "#",
    },
  ],
  domestic: [
    { date: "01/04/2025", title: "Vietnam Airlines dứt mạch thua lỗ 4 năm liên tiếp", image: whatsNews1, link: "#" },
    { date: "01/04/2025", title: "Welcome To The Best Model Winner Contest", image: whatsNews2, link: "#" },
    { date: "01/04/2025", title: "Welcome To The Best Model Winner Contest", image: whatsNews3, link: "#" },
    { date: "01/04/2025", title: "Welcome To The Best Model Winner Contest", image: whatsNews3, link: "#" },
  ],
  international: [
    { date: "01/04/2025", title: "Welcome To The Best Model Winner Contest", image: whatsNews1, link: "#" },
    { date: "01/04/2025", title: "Welcome To The Best Model Winner Contest", image: whatsNews2, link: "#" },
    { date: "01/04/2025", title: "Welcome To The Best Model Winner Contest", image: whatsNews3, link: "#" },
    { date: "01/04/2025", title: "Welcome To The Best Model Winner Contest", image: whatsNews4, link: "#" },
  ],
};

const socialMedia = [
  { icon: icon_fb, count: "8,045", label: "Fans", link: "#" },
  { icon: icon_tw, count: "8,045", label: "Fans", link: "#" },
  { icon: icon_ins, count: "8,045", label: "Fans", link: "#" },
  { icon: icon_yh, count: "8,045", label: "Fans", link: "#" },
];

const WhatsNews = () => {
  return (
    <section className="whats-news-area pt-50 pb-20">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-lg-5 col-md-5">
                <div className="section-tittle mb-20">
                  <h3>Tin ngành hàng không</h3>
                </div>
              </div>
              <div className="col-lg-7 col-md-7">
                <div className="properties__button">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                        Tất cả
                      </a>
                      <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">
                        Trong nước
                      </a>
                      <a className="nav-item nav-link" id="nav-technology" data-toggle="tab" href="#nav-techno" role="tab" aria-controls="nav-techno" aria-selected="false">
                        Quốc tế
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="tab-content" id="nav-tabContent">
                  {["all", "domestic", "international"].map((category, index) => (
                    <div
                      className={`tab-pane fade ${category === "all" ? "show active" : ""}`}
                      id={`nav-${category === "all" ? "home" : category === "domestic" ? "profile" : "techno"}`}
                      role="tabpanel"
                      aria-labelledby={`nav-${category === "all" ? "home" : category === "domestic" ? "profile" : "technology"}-tab`}
                      key={index}
                    >
                      <div className="whats-news-caption">
                        <div className="row">
                          {newsData[category].map((news, idx) => (
                            <div className="col-lg-4 col-md-6" key={idx}>
                              <div className="single-what-news mb-20">
                                <div className="what-img">
                                  <img src={news.image} alt={news.title} />
                                </div>
                                <div className="what-cap">
                                  <span className="title-news">{news.date}</span>
                                  <h4>
                                    <a href={news.link}>{news.title}</a>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
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
                {socialMedia.map((social, index) => (
                  <div className="follow-us d-flex align-items-center" key={index}>
                    <div className="follow-social">
                      <a href={social.link}>
                        <img src={social.icon} alt={social.label} />
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
              <img src={icon_new_card} alt="News Poster" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNews;