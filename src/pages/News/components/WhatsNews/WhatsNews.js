import React, { useState, useEffect } from "react";
import { mockNews } from "../../../../utils/mockNews";
import { Link } from "react-router-dom";
import ViewAllButton from "../../../../components/ViewAllButton/ViewAllButton";
import "./WhatsNews.css";

const WhatsNews = () => {
  const aviationNews = mockNews
    .filter(
      (n) => n.status === 1 && n.postCategorySlugVi === "tin-nganh-hang-khong"
    )
    .sort((a, b) => new Date(b.timePosted) - new Date(a.timePosted));

  // Responsive: mobile chỉ hiển thị 2 bài, desktop 5 bài
  const [newsCount, setNewsCount] = useState(5);
  useEffect(() => {
    const handleResize = () => {
      setNewsCount(window.innerWidth <= 768 ? 2 : 5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const newsToShow = aviationNews.slice(0, newsCount);

  // Hàm format ngày dd/mm/yyyy
  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    return d.toLocaleDateString("vi-VN");
  };

  return (
    <section className="whats-news-area pt-50 pb-20">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-lg-5 col-md-5">
                <div className="section-tittle mb-20">
                  <h3>Tin ngành hàng không</h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 text-end d-none d-md-block">
                <ViewAllButton to="/tin-tuc/tin-nganh-hang-khong" />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="whats-news-caption">
                  <div className="whats-news-grid">
                    {newsToShow.map((news, idx) => (
                      <div className="whats-news-card" key={news.id}>
                        <div className="what-img">
                          <img src={news.image} alt={news.titleVi} />
                        </div>
                        <div className="what-cap">
                          <span className="title-news">
                            {formatDate(news.timePosted)}
                          </span>
                          <h4>
                            <Link
                              to={`/tin-tuc/${news.postCategorySlugVi}/${news.slugVi}`}
                            >
                              {news.titleVi}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Nút xem tất cả cho mobile */}
                  <div className="d-block d-md-none mt-3 text-center">
                    <ViewAllButton to="/tin-tuc/tin-nganh-hang-khong" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNews;
