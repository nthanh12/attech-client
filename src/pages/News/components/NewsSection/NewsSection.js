import React from "react";
import "../NewsSection/NewsSection.css";
import { mockNews } from "../../../../utils/mockNews";
import { Link } from "react-router-dom";

const NewsSection = () => {
  // Lấy 7 tin nổi bật đầu tiên
  const trendingNews = mockNews.slice(0, 7);

  return (
    <section id="newsSection">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="news-section-container">
            <div className="news-section-header">
            <span className="trend-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 12l4-4 4 4 4-8" stroke="#002a5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span className="trend-label">Tin nổi bật</span>
              <div className="news-section-divider"></div>
            </div>
            <div className="trend-ticker">
              <div className="trend-list">
                {[...trendingNews, ...trendingNews].map((item, idx) => (
                  <Link key={item.id + '-' + idx} to={`/news/${item.id}/${item.slug}`} className="trend-link">
                    #{item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
