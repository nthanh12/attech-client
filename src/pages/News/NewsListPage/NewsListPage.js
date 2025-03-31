import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./NewsListPage.css";

const newsData = [
  {
    id: 1,
    title: "Chuyển đổi số trong hàng không: Xu hướng công nghệ mới",
    category: "activities",
    description:
      "Khám phá những công nghệ đang định hình lại ngành hàng không hiện đại",
    image: "http://img2.caa.gov.vn/2020/08/03/09/25/vnpdoitaubay.jpg",
    date: "15/03/2024",
  },
  {
    id: 2,
    title: "Cải cách pháp luật: Những điểm quan trọng cần biết",
    category: "law",
    description:
      "Phân tích chuyên sâu về những thay đổi then chốt trong hệ thống pháp luật",
    image: "http://img2.caa.gov.vn/2020/08/03/09/25/vnpdoitaubay.jpg",
    date: "20/03/2024",
  },
  {
    id: 3,
    title: "Công nghệ bay không người lái trong hàng không",
    category: "aviation",
    description: "Tương lai của vận tải hàng không và những đột phá công nghệ",
    image: "http://img2.caa.gov.vn/2020/08/03/09/25/vnpdoitaubay.jpg",
    date: "10/03/2024",
  },
];

const NewsListPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const [filteredNews, setFilteredNews] = useState([]);
  const [pageTitle, setPageTitle] = useState("Tin Tức Mới Nhất");

  useEffect(() => {
    let filtered = newsData;

    if (category) {
      filtered = newsData.filter((news) => news.category === category);

      switch (category) {
        case "activities":
          setPageTitle("Tin Hoạt Động");
          break;
        case "aviation":
          setPageTitle("Tin Tức Hàng Không");
          break;
        case "law":
          setPageTitle("Tin Tức Pháp Luật");
          break;
        default:
          setPageTitle("Tin Tức Mới Nhất");
      }
    }

    setFilteredNews(filtered);
  }, [category]);

  return (
    <div className="news-list-page">
      <div className="news-list-header">
        <h1>{pageTitle}</h1>
        <p>Cập nhật thông tin chính xác và đáng tin cậy</p>
      </div>

      {filteredNews.length > 0 ? (
        <div className="news-list">
          {filteredNews.map((news) => (
            <div key={news.id} className="news-item">
              <div className="news-image-container">
                <img src={news.image} alt={news.title} />
              </div>

              <div className="news-content">
                <h2 className="news-title">{news.title}</h2>

                <p className="news-description">{news.description}</p>

                <div className="news-action">
                  <a href="#" className="read-more">
                    Đọc thêm
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
                <div className="news-meta">
                  <span className="news-date">{news.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-news">Không có tin tức phù hợp.</p>
      )}
    </div>
  );
};

export default NewsListPage;
