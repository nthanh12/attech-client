import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mockNews } from "../../utils/mockNews";
import "./NewsSection.css";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get latest 6 news items
        const latestNews = mockNews
          .sort((a, b) => new Date(b.timePosted) - new Date(a.timePosted))
          .slice(0, 6);
        
        setNews(latestNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  if (loading) {
    return (
      <section className="news-section">
        <div className="container">
          <div className="section-header">
            <h2>Tin tức mới nhất</h2>
            <Link to="/news" className="view-all-link">
              Xem tất cả
            </Link>
          </div>
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Đang tải tin tức...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="news-section">
      <div className="container">
        <div className="section-header">
          <h2>Tin tức mới nhất</h2>
          <Link to="/news" className="view-all-link">
            Xem tất cả
          </Link>
        </div>

        <div className="news-grid">
          {news.map((item) => (
            <div className="news-item" key={item.id}>
              <div className="news-image">
                <Link to={`/news/${item.id}/${item.slug}`}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    title={item.title}
                  />
                </Link>
              </div>
              <div className="news-content">
                <div className="news-meta">
                  <span className="news-date">{formatDate(item.timePosted)}</span>
                  <span className="news-category">
                    <Link to={`/news/${item.postCategorySlug}`}>
                      {item.postCategoryName}
                    </Link>
                  </span>
                </div>
                <h3 className="news-title">
                  <Link to={`/news/${item.id}/${item.slug}`}>
                    {item.title}
                  </Link>
                </h3>
                <p className="news-summary">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection; 