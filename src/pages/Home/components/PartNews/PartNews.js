import React, { useEffect } from "react";
import "./PartNews.css";
import { useI18n } from "../../../../hooks/useI18n";
import LocalizedLink from "../../../../components/Shared/LocalizedLink";
import { LocalizedTitle, LocalizedDescription } from "../../../../components/Shared/LocalizedContent";
import AOS from "aos";
import "aos/dist/aos.css";
import { mockNews } from "../../../../utils/mockNews";

const getGroups = (t, currentLanguage) => [
  { 
    slugVi: "hoat-dong-cong-ty", 
    slugEn: "company-activities",
    titleKey: "frontend.home.newsCategories.companyActivities" 
  },
  { 
    slugVi: "dang-bo-cong-ty", 
    slugEn: "party-committee",
    titleKey: "frontend.home.newsCategories.partyCommittee" 
  },
  { 
    slugVi: "doan-thanh-nien-cong-ty", 
    slugEn: "youth-union",
    titleKey: "frontend.home.newsCategories.youthUnion" 
  },
  { 
    slugVi: "cong-doan-cong-ty", 
    slugEn: "trade-union",
    titleKey: "frontend.home.newsCategories.tradeUnion" 
  },
];

const getLatestBySlug = (slugVi) =>
  mockNews
    .filter(item => item.postCategorySlugVi === slugVi)
    .sort((a, b) => new Date(b.timePosted) - new Date(a.timePosted))[0];

const getOrderedNewsGroups = (groups) => groups
  .map(group => {
    const featuredNews = getLatestBySlug(group.slugVi);
    return featuredNews ? { ...group, featuredNews } : null;
  })
  .filter(Boolean);

function formatDate(isoString, locale) {
  const d = new Date(isoString);
  return d.toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US');
}

const PartNews = () => {
  const { t, currentLanguage } = useI18n();
  const groups = getGroups(t, currentLanguage);
  const orderedNewsGroups = getOrderedNewsGroups(groups);
  
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
                <LocalizedLink to={`${currentLanguage === 'vi' ? '/tin-tuc' : '/en/news'}/${currentLanguage === 'vi' ? group.slugVi : group.slugEn}`} className="news__card-title">
                  <span>{t(group.titleKey)}</span>
                </LocalizedLink>
              </div>

              <div className="news__image-container">
                <LocalizedLink to={`${currentLanguage === 'vi' ? '/tin-tuc' : '/en/news'}/${currentLanguage === 'vi' ? group.featuredNews.postCategorySlugVi : group.featuredNews.postCategorySlugEn}/${currentLanguage === 'vi' ? group.featuredNews.slugVi : group.featuredNews.slugEn}`}>
                  <img
                    src={group.featuredNews.image}
                    alt={currentLanguage === 'vi' ? group.featuredNews.titleVi : group.featuredNews.titleEn}
                    className="news__image"
                    loading="lazy"
                  />
                </LocalizedLink>
                <div className="news__date-badge">
                  <i className="far fa-clock"></i>
                  <span>{formatDate(group.featuredNews.timePosted, currentLanguage)}</span>
                </div>
              </div>

              <div className="news__content">
                <LocalizedLink to={`${currentLanguage === 'vi' ? '/tin-tuc' : '/en/news'}/${currentLanguage === 'vi' ? group.featuredNews.postCategorySlugVi : group.featuredNews.postCategorySlugEn}/${currentLanguage === 'vi' ? group.featuredNews.slugVi : group.featuredNews.slugEn}`} className="news__article-title">
                  <span>{currentLanguage === 'vi' ? group.featuredNews.titleVi : group.featuredNews.titleEn}</span>
                </LocalizedLink>
                <p className="news__excerpt">{currentLanguage === 'vi' ? group.featuredNews.descriptionVi : group.featuredNews.descriptionEn}</p>
                <LocalizedLink to={`${currentLanguage === 'vi' ? '/tin-tuc' : '/en/news'}/${currentLanguage === 'vi' ? group.slugVi : group.slugEn}`} className="news__read-more">
                  {t('common.readMore')}
                  <i className="fas fa-arrow-right"></i>
                </LocalizedLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartNews;