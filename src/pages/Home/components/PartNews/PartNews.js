import React, { useEffect } from "react";
import "./PartNews.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { newsGroups } from "../../../../data/postHome";

const PartNews = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <section className="part_news">
      <div className="part_news__container">
        <div className="news__header">
          <h2 className="news__title" data-aos="fade-down">Tin tức & Sự kiện</h2>
        </div>
        <div className="news__grid">
          {newsGroups.map((group, index) => (
            <article 
              key={group.id} 
              className="news__card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="news__card-header">
                <Link to={group.link} className="news__card-title">
                  <span>{group.title}</span>
                </Link>
              </div>

              <div className="news__image-container">
                <Link to={`/news/${group.featuredNews.id}/${group.featuredNews.slug}`}>
                  <img
                    src={group.featuredNews.image}
                    alt={group.featuredNews.title}
                    className="news__image"
                    loading="lazy"
                  />
                </Link>
                <div className="news__date-badge">
                  <i className="far fa-clock"></i>
                  <span>{group.featuredNews.date}</span>
                </div>
              </div>

              <div className="news__content">
                <Link to={`/news/${group.featuredNews.id}/${group.featuredNews.slug}`} className="news__article-title">
                  <span>{group.featuredNews.title}</span>
                </Link>
                <p className="news__excerpt">{group.featuredNews.excerpt}</p>
                <Link to={group.link} className="news__read-more">
                  Đọc thêm
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartNews;