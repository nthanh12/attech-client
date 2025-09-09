import React, { useEffect, useState } from "react";
import "./PartNews.css";
import { useI18n } from "../../../../hooks/useI18n";
import LocalizedLink from "../../../../components/Shared/LocalizedLink";
import {
  LocalizedTitle,
  LocalizedDescription,
} from "../../../../components/Shared/LocalizedContent";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  getNews,
  getNewsByCategory,
  getNewsCategories,
  formatNewsForDisplay,
  CATEGORY_IDS,
} from "../../../../services/clientNewsService";

// Dynamic category mapping based on slug
const getCategoryTitleKey = (slug) => {
  const mapping = {
    "hoat-dong-cong-ty": "frontend.home.newsCategories.companyActivities",
    "company-activities": "frontend.home.newsCategories.companyActivities",
    "dang-bo-cong-ty": "frontend.home.newsCategories.partyCommittee",
    "company-party": "frontend.home.newsCategories.partyCommittee",
    "doan-thanh-nien-cong-ty": "frontend.home.newsCategories.youthUnion",
    "company-youth-union": "frontend.home.newsCategories.youthUnion",
    "cong-doan-cong-ty": "frontend.home.newsCategories.tradeUnion",
    "company-union": "frontend.home.newsCategories.tradeUnion",
    "tin-nganh-hang-khong": "frontend.home.newsCategories.aviationNews",
    "aviation-news": "frontend.home.newsCategories.aviationNews",
  };
  return mapping[slug] || `category.${slug}`;
};

function formatDate(isoString, locale) {
  const d = new Date(isoString);
  return d.toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US");
}

const PartNews = () => {
  const { t, currentLanguage } = useI18n();
  const [newsGroups, setNewsGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNewsData = async () => {
      try {
        setLoading(true);

        // Step 1: Load all available categories from API
        const categories = await getNewsCategories();
        console.log(
          "📋 Available categories:",
          categories.map((cat) => ({
            id: cat.id,
            titleVi: cat.titleVi,
            slugVi: cat.slugVi,
          }))
        );

        if (categories.length === 0) {
          console.warn("⚠️ No categories found from API");
          setNewsGroups([]);
          return;
        }

        // Step 2: Load all recent news to distribute by category
        console.log("🔄 Loading all recent news to distribute by category...");

        const allNewsData = await getNews({
          pageIndex: 1,
          pageSize: 8, // Chỉ cần 8 tin cho 4 categories (dự phòng)
          sortBy: "timePosted",
          sortDirection: "desc",
        });

        console.log(`📊 Total news loaded: ${allNewsData.items.length}`);

        // Step 3: Group news by category
        const newsByCategory = {};
        allNewsData.items.forEach((item) => {
          const catId = item.newsCategoryId;
          if (!newsByCategory[catId]) {
            newsByCategory[catId] = [];
          }
          newsByCategory[catId].push(item);
        });

        console.log(
          "📈 News distribution by category:",
          Object.keys(newsByCategory)
            .map(
              (catId) =>
                `Category ${catId}: ${newsByCategory[catId].length} items`
            )
            .join(", ")
        );

        // Step 4: Lấy 4 categories cố định cho trang chủ (ID: 2,3,4,5)
        const featuredCategoryIds = [2, 3, 4, 5]; // Hoạt động công ty, Đảng bộ, Công đoàn, Đoàn TN

        const newsGroupsWithData = featuredCategoryIds
          .map((categoryId) => categories.find((cat) => cat.id === categoryId))
          .filter((category) => category) // Loại bỏ nếu không tìm thấy category
          .map((category) => {
            const categoryNews = newsByCategory[category.id] || [];
            const featuredNews =
              categoryNews.length > 0 ? categoryNews[0] : null;

            console.log(`🎯 Category ${category.id} (${category.titleVi}):`, {
              totalInCategory: categoryNews.length,
              hasNews: !!featuredNews,
              featuredTitle:
                featuredNews?.titleVi?.substring(0, 50) + "..." || "No news",
            });

            // Get title key for translation
            const titleKey =
              getCategoryTitleKey(category.slugVi) ||
              getCategoryTitleKey(category.slugEn);

            return {
              id: category.id,
              slugVi: category.slugVi,
              slugEn: category.slugEn,
              titleKey,
              featuredNews,
              categoryData: category,
              hasNews: !!featuredNews,
            };
          });

        setNewsGroups(newsGroupsWithData);

        console.log(
          "✅ Final news groups:",
          newsGroupsWithData.length,
          "cards"
        );
        console.log(
          "🔍 Categories with news:",
          newsGroupsWithData.map((g) => ({
            categoryId: g.id,
            categoryTitle: g.categoryData.titleVi,
            newsId: g.featuredNews?.id || "none",
            title:
              g.featuredNews?.titleVi?.substring(0, 30) + "..." || "No news",
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
      offset: 100,
    });
  }, []);

  if (loading) {
    return (
      <section className="part_news">
        <div className="part_news__container">
          <div className="news__grid">
            {[1, 2, 3, 4].map((i) => (
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
            const categorySlug =
              currentLanguage === "vi"
                ? group.categoryData.slugVi
                : group.categoryData.slugEn;

            // Handle case when no news found for category
            if (!group.hasNews || !group.featuredNews) {
              return (
                <article
                  key={group.id}
                  className="news__card news__card--no-content"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="news__card-header">
                    <LocalizedLink
                      to={`${
                        currentLanguage === "vi" ? "/tin-tuc" : "/en/news"
                      }/${categorySlug}`}
                      className="news__card-title"
                    >
                      <span>{t(group.titleKey)}</span>
                    </LocalizedLink>
                  </div>

                  <div className="news__image-container">
                    <LocalizedLink
                      to={`${
                        currentLanguage === "vi" ? "/tin-tuc" : "/en/news"
                      }/${categorySlug}`}
                    >
                      <div className="news__image news__image--placeholder">
                        <i
                          className="fas fa-newspaper"
                          style={{ fontSize: "3rem", color: "#cbd5e1" }}
                        ></i>
                      </div>
                    </LocalizedLink>
                    <div className="news__date-badge">
                      <i className="far fa-clock"></i>
                      <span>--</span>
                    </div>
                  </div>

                  <div className="news__content">
                    <div className="news__article-title news__no-content">
                      <span>
                        {currentLanguage === "vi"
                          ? "Chưa có tin tức"
                          : "No news available"}
                      </span>
                    </div>
                    <p className="news__excerpt">
                      {currentLanguage === "vi"
                        ? "Chưa có tin tức trong danh mục này"
                        : "No news in this category yet"}
                    </p>
                    <LocalizedLink
                      to={`${
                        currentLanguage === "vi" ? "/tin-tuc" : "/en/news"
                      }/${categorySlug}`}
                      className="news__read-more"
                    >
                      {t("common.readMore")}
                      <i className="fas fa-arrow-right"></i>
                    </LocalizedLink>
                  </div>
                </article>
              );
            }

            // Normal case with news
            const formattedNews = formatNewsForDisplay(
              group.featuredNews,
              currentLanguage
            );

            return (
              <article
                key={group.slugVi}
                className="news__card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="news__card-header">
                  <LocalizedLink
                    to={`${
                      currentLanguage === "vi" ? "/tin-tuc" : "/en/news"
                    }/${categorySlug}`}
                    className="news__card-title"
                  >
                    <span>{t(group.titleKey)}</span>
                  </LocalizedLink>
                </div>

                <div className="news__image-container">
                  <LocalizedLink
                    to={`${
                      currentLanguage === "vi"
                        ? `/tin-tuc/${formattedNews.slug}.html`
                        : `/en/news/${formattedNews.slug}.html`
                    }`}
                  >
                    {formattedNews.imageUrl ? (
                      <img
                        src={formattedNews.imageUrl}
                        alt={formattedNews.title}
                        className="news__image"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentNode.innerHTML =
                            '<div class="news__image news__image--placeholder" style="display: flex; align-items: center; justify-content: center; background: #f8fafc;"><i class="fas fa-newspaper" style="font-size: 3rem; color: #cbd5e1;"></i></div>';
                        }}
                      />
                    ) : (
                      <div className="news__image news__image--placeholder">
                        <i
                          className="fas fa-newspaper"
                          style={{ fontSize: "3rem", color: "#cbd5e1" }}
                        ></i>
                      </div>
                    )}
                  </LocalizedLink>
                  <div className="news__date-badge">
                    <i className="far fa-clock"></i>
                    <span>{formattedNews.formattedDate}</span>
                  </div>
                </div>

                <div className="news__content">
                  <LocalizedLink
                    to={`${
                      currentLanguage === "vi"
                        ? `/tin-tuc/${formattedNews.slug}.html`
                        : `/en/news/${formattedNews.slug}.html`
                    }`}
                    className="news__article-title"
                  >
                    <span>{formattedNews.title}</span>
                  </LocalizedLink>
                  <p className="news__excerpt">{formattedNews.description}</p>
                  <LocalizedLink
                    to={`${
                      currentLanguage === "vi" ? "/tin-tuc" : "/en/news"
                    }/${categorySlug}`}
                    className="news__read-more"
                  >
                    {t("common.readMore")}
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
