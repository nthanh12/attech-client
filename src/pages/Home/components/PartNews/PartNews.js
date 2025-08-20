import React, { useEffect, useState } from "react";
import "./PartNews.css";
import { useI18n } from "../../../../hooks/useI18n";
import LocalizedLink from "../../../../components/Shared/LocalizedLink";
import { LocalizedTitle, LocalizedDescription } from "../../../../components/Shared/LocalizedContent";
import AOS from "aos";
import "aos/dist/aos.css";
import { getNews, getNewsByCategory, getNewsCategories, formatNewsForDisplay, CATEGORY_IDS } from "../../../../services/clientNewsService";

const getGroups = (t, currentLanguage) => [
  { 
    id: CATEGORY_IDS.COMPANY_ACTIVITIES,
    slugVi: "hoat-dong-cong-ty", 
    slugEn: "company-activities",
    titleKey: "frontend.home.newsCategories.companyActivities" 
  },
  { 
    id: CATEGORY_IDS.COMPANY_PARTY,
    slugVi: "dang-bo-cong-ty", 
    slugEn: "company-party",
    titleKey: "frontend.home.newsCategories.partyCommittee" 
  },
  { 
    id: CATEGORY_IDS.COMPANY_YOUTH_UNION,
    slugVi: "doan-thanh-nien-cong-ty", 
    slugEn: "company-youth-union",
    titleKey: "frontend.home.newsCategories.youthUnion" 
  },
  { 
    id: CATEGORY_IDS.COMPANY_UNION,
    slugVi: "cong-doan-cong-ty", 
    slugEn: "company-union",
    titleKey: "frontend.home.newsCategories.tradeUnion" 
  },
];

function formatDate(isoString, locale) {
  const d = new Date(isoString);
  return d.toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US');
}

const PartNews = () => {
  const { t, currentLanguage } = useI18n();
  const [newsGroups, setNewsGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNewsData = async () => {
      try {
        setLoading(true);
        const categories = await getNewsCategories();
        console.log("📋 Available categories:", categories.map(cat => ({
          id: cat.id,
          titleVi: cat.titleVi,
          slugVi: cat.slugVi
        })));
        
        const groups = getGroups(t, currentLanguage);
        console.log("🎯 Target groups:", groups.map(g => ({ id: g.id, title: g.titleKey })));
        
        // NEW STRATEGY: Load more news from all categories, then distribute
        console.log("🔄 Loading all recent news to distribute by category...");
        
        const allNewsData = await getNews({
          pageIndex: 1,
          pageSize: 50, // Get more items to ensure we have news for each category
          sortBy: "timePosted",
          sortDirection: "desc"
        });
        
        console.log(`📊 Total news loaded: ${allNewsData.items.length}`);
        
        // Group news by category
        const newsByCategory = {};
        allNewsData.items.forEach(item => {
          const catId = item.newsCategoryId;
          if (!newsByCategory[catId]) {
            newsByCategory[catId] = [];
          }
          newsByCategory[catId].push(item);
        });
        
        console.log("📈 News distribution by category:", 
          Object.keys(newsByCategory).map(catId => 
            `Category ${catId}: ${newsByCategory[catId].length} items`
          ).join(", ")
        );
        
        // Create groups with the most recent news from each category
        const newsGroupsWithData = groups.map(group => {
          const categoryNews = newsByCategory[group.id] || [];
          const featuredNews = categoryNews.length > 0 ? categoryNews[0] : null;
          
          console.log(`🎯 Category ${group.id} (${group.titleKey}):`, {
            totalInCategory: categoryNews.length,
            hasNews: !!featuredNews,
            featuredTitle: featuredNews?.titleVi?.substring(0, 50) + "..." || "No news"
          });
          
          // Find category data for display
          const category = categories.find(cat => cat.id === group.id);
          
          return {
            ...group,
            featuredNews,
            categoryData: category || { 
              id: group.id,
              slugVi: group.slugVi,
              slugEn: group.slugEn,
              titleVi: group.titleKey, // fallback
              titleEn: group.titleKey  // fallback
            },
            hasNews: !!featuredNews
          };
        });
        
        setNewsGroups(newsGroupsWithData);
        
        console.log("✅ Final news groups:", newsGroupsWithData.length, "cards");
        console.log("🔍 Check if each category shows different news:", 
          newsGroupsWithData.map(g => ({
            category: g.titleKey,
            newsId: g.featuredNews?.id || "none",
            title: g.featuredNews?.titleVi?.substring(0, 30) + "..." || "No news"
          }))
        );
        
      } catch (error) {
        console.error("Error loading news groups:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNewsData();
  }, [t, currentLanguage]);
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  if (loading) {
    return (
      <section className="part_news">
        <div className="part_news__container">
          <div className="news__grid">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="news__card loading-skeleton">
                <div className="skeleton-loader"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="part_news">
      <div className="part_news__container">
        <div className="news__grid">
          {newsGroups.map((group, index) => {
            const categorySlug = currentLanguage === 'vi' ? group.categoryData.slugVi : group.categoryData.slugEn;
            
            // Handle case when no news found for category
            if (!group.hasNews || !group.featuredNews) {
              return (
                <article 
                  key={group.slugVi} 
                  className="news__card news__card--no-content"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="news__card-header">
                    <LocalizedLink to={`${currentLanguage === 'vi' ? '/tin-tuc' : '/en/news'}/${categorySlug}`} className="news__card-title">
                      <span>{t(group.titleKey)}</span>
                    </LocalizedLink>
                  </div>

                  <div className="news__image-container">
                    <LocalizedLink to={`${currentLanguage === 'vi' ? '/tin-tuc' : '/en/news'}/${categorySlug}`}>
                      <img
                        src="/images/default-news.jpg"
                        alt={t(group.titleKey)}
                        className="news__image"
                        loading="lazy"
                      />
                    </LocalizedLink>
                    <div className="news__date-badge">
                      <i className="far fa-clock"></i>
                      <span>--</span>
                    </div>
                  </div>

                  <div className="news__content">
                    <div className="news__article-title news__no-content">
                      <span>{currentLanguage === 'vi' ? 'Chưa có tin tức' : 'No news available'}</span>
                    </div>
                    <p className="news__excerpt">{currentLanguage === 'vi' ? 'Chưa có tin tức trong danh mục này' : 'No news in this category yet'}</p>
                    <LocalizedLink to={`${currentLanguage === 'vi' ? '/tin-tuc' : '/en/news'}/${categorySlug}`} className="news__read-more">
                      {t('common.readMore')}
                      <i className="fas fa-arrow-right"></i>
                    </LocalizedLink>
                  </div>
                </article>
              );
            }

            // Normal case with news
            const formattedNews = formatNewsForDisplay(group.featuredNews, currentLanguage);
            
            return (
              <article 
                key={group.slugVi} 
                className="news__card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="news__card-header">
                  <LocalizedLink to={`${currentLanguage === 'vi' ? '/tin-tuc' : '/en/news'}/${categorySlug}`} className="news__card-title">
                    <span>{t(group.titleKey)}</span>
                  </LocalizedLink>
                </div>

                <div className="news__image-container">
                  <LocalizedLink to={`${currentLanguage === 'vi' ? '/tin-tuc' : '/en/news'}/${categorySlug}/${formattedNews.slug}`}>
                    <img
                      src={formattedNews.imageUrl || '/images/default-news.jpg'}
                      alt={formattedNews.title}
                      className="news__image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/images/default-news.jpg';
                      }}
                    />
                  </LocalizedLink>
                  <div className="news__date-badge">
                    <i className="far fa-clock"></i>
                    <span>{formattedNews.formattedDate}</span>
                  </div>
                </div>

                <div className="news__content">
                  <LocalizedLink to={`${currentLanguage === 'vi' ? '/tin-tuc' : '/en/news'}/${categorySlug}/${formattedNews.slug}`} className="news__article-title">
                    <span>{formattedNews.title}</span>
                  </LocalizedLink>
                  <p className="news__excerpt">{formattedNews.description}</p>
                  <LocalizedLink to={`${currentLanguage === 'vi' ? '/tin-tuc' : '/en/news'}/${categorySlug}`} className="news__read-more">
                    {t('common.readMore')}
                    <i className="fas fa-arrow-right"></i>
                  </LocalizedLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartNews;