import React, { useState, useEffect } from "react";
import "./WeeklyNews.css";
import ViewAllButton from "../../../../components/ViewAllButton/ViewAllButton";
import { useI18n } from "../../../../hooks/useI18n";
import LocalizedLink from "../../../../components/Shared/LocalizedLink";
import {
  getNews,
  getNewsCategories,
  formatNewsForDisplay,
  CATEGORY_IDS,
} from "../../../../services/clientNewsService";

// Dùng ID thực từ database cho các danh mục con
const childCategoryIds = [
  CATEGORY_IDS.COMPANY_PARTY, // Đảng bộ công ty
  CATEGORY_IDS.COMPANY_YOUTH_UNION, // Đoàn thanh niên công ty
  CATEGORY_IDS.COMPANY_UNION, // Công đoàn công ty
];

// Helper functions for fallback data
const getCategorySlugById = (id, lang) => {
  const mapping = {
    [CATEGORY_IDS.COMPANY_ACTIVITIES]:
      lang === "vi" ? "hoat-dong-cong-ty" : "company-activities",
    [CATEGORY_IDS.COMPANY_PARTY]:
      lang === "vi" ? "dang-bo-cong-ty" : "party-committee",
    [CATEGORY_IDS.COMPANY_UNION]:
      lang === "vi" ? "cong-doan-cong-ty" : "company-union",
    [CATEGORY_IDS.COMPANY_YOUTH_UNION]:
      lang === "vi" ? "doan-thanh-nien-cong-ty" : "company-youth-union",
  };
  return mapping[id] || "";
};

const getCategoryTitleById = (id, lang) => {
  const mapping = {
    [CATEGORY_IDS.COMPANY_PARTY]:
      lang === "vi" ? "Đảng bộ công ty" : "Company Party",
    [CATEGORY_IDS.COMPANY_YOUTH_UNION]:
      lang === "vi" ? "Đoàn thanh niên công ty" : "Company Youth Union",
    [CATEGORY_IDS.COMPANY_UNION]:
      lang === "vi" ? "Công đoàn công ty" : "Company Union",
  };
  return mapping[id] || "";
};

const WeeklyNews = () => {
  const { currentLanguage } = useI18n();
  const [groupedNews, setGroupedNews] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const categoriesData = await getNewsCategories();// NEW STRATEGY: Load all news first, then distribute by category
        const allNewsData = await getNews({
          pageIndex: 1,
          pageSize: 100, // Get more items to ensure coverage for all 3 categories
          sortBy: "timePosted",
          sortDirection: "desc",
        });
        // Processing all news items

        // Group news by category
        const newsByCategory = {};
        allNewsData.items.forEach((item) => {
          const catId = item.newsCategoryId;
          if (!newsByCategory[catId]) {
            newsByCategory[catId] = [];
          }
          newsByCategory[catId].push(item);
        });

        // Analyzing news distribution by category

        // Create grouped news for each target category
        const grouped = {};

        childCategoryIds.forEach((categoryId) => {
          const categoryNews = newsByCategory[categoryId] || [];
          const newsToShow = categoryNews.slice(0, 5); // Take first 5 news items

          // Processing category news

          // Find category data from API or use fallback
          const category = categoriesData.find(
            (cat) => cat.id === categoryId
          ) || {
            id: categoryId,
            slugVi: getCategorySlugById(categoryId, "vi"),
            slugEn: getCategorySlugById(categoryId, "en"),
            titleVi: getCategoryTitleById(categoryId, "vi"),
            titleEn: getCategoryTitleById(categoryId, "en"),
          };

          const categorySlug =
            currentLanguage === "vi" ? category.slugVi : category.slugEn;

          // Only add to grouped if we have news OR want to show placeholder
          if (newsToShow.length > 0) {
            grouped[categorySlug] = {
              category: category,
              news: newsToShow,
            };
          } else {}
        });

        setGroupedNews(grouped);

        // Final grouped categories processed
        const processedCategories = Object.keys(grouped).map((slug) => ({
          slug,
          newsCount: grouped[slug].news.length,
          firstNewsId: grouped[slug].news[0]?.id,
          title: grouped[slug].news[0]?.titleVi?.substring(0, 40) + "...",
        }));
      } catch (error) {} finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentLanguage]);

  if (loading) {
    return (
      <div className="weekly-news-area">
        <div className="container">
          <div>Loading weekly news...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="weekly-news-area">
      <div className="container">
        <div className="weekly-news-child-categories">
          {Object.keys(groupedNews).map((categorySlug) => {
            const categoryData = groupedNews[categorySlug];
            const newsList = categoryData.news.slice(0, 4);
            if (newsList.length === 0) return null;

            const categoryName =
              currentLanguage === "vi"
                ? categoryData.category.titleVi
                : categoryData.category.titleEn;

            return (
              <div key={categorySlug} className="weekly-wrapper">
                <div className="section-tittle">
                  <h4 className="title-category">{categoryName}</h4>
                  <ViewAllButton
                    to={
                      currentLanguage === "vi"
                        ? `/tin-tuc/${categorySlug}`
                        : `/en/news/${categorySlug}`
                    }
                  />
                </div>
                <div className="weekly-news-active">
                  {newsList.map((news) => {
                    const formattedItem = formatNewsForDisplay(
                      news,
                      currentLanguage
                    );
                    return (
                      <div key={news.id} className="weekly-single">
                        <div className="weekly-img">
                          <img
                            src={
                              formattedItem.imageUrl ||
                              "/images/default-news.jpg"
                            }
                            alt={formattedItem.title}
                            title={formattedItem.title}
                            onError={(e) => {
                              e.target.src = "/images/default-news.jpg";
                            }}
                          />
                        </div>
                        <div className="weekly-caption">
                          <span className="time-news">
                            {formattedItem.formattedDate}
                          </span>
                          <h4>
                            <LocalizedLink
                              to={
                                currentLanguage === "vi"
                                  ? `/tin-tuc/${formattedItem.slug}.html`
                                  : `/en/news/${formattedItem.slug}.html`
                              }
                              title={formattedItem.title}
                              className="clamp-2-lines"
                            >
                              {formattedItem.title}
                            </LocalizedLink>
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeeklyNews;
