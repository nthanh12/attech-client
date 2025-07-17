import React, { useEffect } from "react";
import "./PartNews.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { mockNews } from "../../../../utils/mockNews";

const groups = [
  { slug: "hoat-dong-cong-ty", title: "Hoạt động công ty" },
  { slug: "dang-bo-cong-ty", title: "Đảng bộ công ty" },
  { slug: "doan-thanh-nien-cong-ty", title: "Đoàn thanh niên công ty" },
  { slug: "cong-doan-cong-ty", title: "Công đoàn công ty" },
];

const getLatestBySlug = (slug) =>
  mockNews
    .filter(item => item.postCategorySlugVi === slug)
    .sort((a, b) => new Date(b.timePosted) - new Date(a.timePosted))[0];

const orderedNewsGroups = groups
  .map(group => {
    const featuredNews = getLatestBySlug(group.slug);
    return featuredNews ? { ...group, featuredNews } : null;
  })
  .filter(Boolean);

function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString('vi-VN');
}

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
        <div className="news__grid">
          {orderedNewsGroups.map((group, index) => (
            <article 
              key={group.slug} 
              className="news__card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="news__card-header">
                <Link to={`/tin-tuc/${group.slug}`} className="news__card-title">
                  <span>{group.title}</span>
                </Link>
              </div>

              <div className="news__image-container">
                <Link to={`/tin-tuc/${group.featuredNews.postCategorySlugVi}/${group.featuredNews.slugVi}`}>
                  <img
                    src={group.featuredNews.image}
                    alt={group.featuredNews.titleVi}
                    className="news__image"
                    loading="lazy"
                  />
                </Link>
                <div className="news__date-badge">
                  <i className="far fa-clock"></i>
                  <span>{formatDate(group.featuredNews.timePosted)}</span>
                </div>
              </div>

              <div className="news__content">
                <Link to={`/tin-tuc/${group.featuredNews.postCategorySlugVi}/${group.featuredNews.slugVi}`} className="news__article-title">
                  <span>{group.featuredNews.titleVi}</span>
                </Link>
                <p className="news__excerpt">{group.featuredNews.descriptionVi}</p>
                <Link to={`/tin-tuc/${group.slug}`} className="news__read-more">
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