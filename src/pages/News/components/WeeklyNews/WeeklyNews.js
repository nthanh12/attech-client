import React from "react";
import "./WeeklyNews.css";
import { Link } from "react-router-dom";
import ViewAllButton from "../../../../components/ViewAllButton/ViewAllButton";
import { useI18n } from "../../../../hooks/useI18n";
import LocalizedLink from "../../../../components/Shared/LocalizedLink";
import { mockNews } from "../../../../utils/mockNews";
import { mockNewsCategories } from "../../../../utils/mockNewsCategories";

// Dùng slug để xác định 3 danh mục con
const childCategorySlugs = {
  vi: [
    "dang-bo-cong-ty",
    "doan-thanh-nien-cong-ty",
    "cong-doan-cong-ty"
  ],
  en: [
    "company-party",
    "company-youth-union",
    "company-union"
  ]
};

const getChildCategories = (currentLanguage) => {
  const slugs = childCategorySlugs[currentLanguage];
  return mockNewsCategories.filter(cat => 
    currentLanguage === 'vi' 
      ? slugs.includes(cat.slugVi)
      : slugs.includes(cat.slugEn)
  );
};

// Group news by category slug for child categories
const getGroupedNews = (currentLanguage) => {
  const slugs = childCategorySlugs[currentLanguage];
  return mockNews.reduce((acc, news) => {
    const categorySlug = currentLanguage === 'vi' ? news.postCategorySlugVi : news.postCategorySlugEn;
    if (slugs.includes(categorySlug)) {
      if (!acc[categorySlug]) {
        acc[categorySlug] = [];
      }
      acc[categorySlug].push(news);
    }
    return acc;
  }, {});
};

const formatDate = (dateString, currentLanguage) => {
  const date = new Date(dateString);
  const locale = currentLanguage === 'vi' ? 'vi-VN' : 'en-US';
  return date.toLocaleDateString(locale);
};

const WeeklyNews = () => {
  const { currentLanguage } = useI18n();
  const childCategories = getChildCategories(currentLanguage);
  const groupedNews = getGroupedNews(currentLanguage);
  
  const getCategorySlug = (category) => currentLanguage === 'vi' ? category.slugVi : category.slugEn;
  const getCategoryName = (category) => currentLanguage === 'vi' ? category.nameVi : category.nameEn;
  const getNewsTitle = (news) => currentLanguage === 'vi' ? news.titleVi : news.titleEn;
  const getNewsSlug = (news) => currentLanguage === 'vi' ? news.slugVi : news.slugEn;
  const getNewsCategorySlug = (news) => currentLanguage === 'vi' ? news.postCategorySlugVi : news.postCategorySlugEn;
  
  return (
    <div className="weekly-news-area">
      <div className="container">
        <div className="weekly-news-child-categories">
          {childCategories.map((category) => {
            const categorySlug = getCategorySlug(category);
            const newsList = (groupedNews[categorySlug] || []).slice(0, 4);
            if (newsList.length === 0) return null;
            return (
              <div key={categorySlug} className="weekly-wrapper">
                <div className="section-tittle">
                  <h4 className="title-category">{getCategoryName(category)}</h4>
                  <ViewAllButton to={currentLanguage === 'vi' ? `/tin-tuc/${categorySlug}` : `/en/news/${categorySlug}`} />
                </div>
                <div className="weekly-news-active">
                  {newsList.map((news) => (
                    <div key={news.id} className="weekly-single">
                      <div className="weekly-img">
                        <img src={news.image} alt={getNewsTitle(news)} title={getNewsTitle(news)} />
                      </div>
                      <div className="weekly-caption">
                        <span className="time-news">{formatDate(news.timePosted, currentLanguage)}</span>
                        <h4>
                          <LocalizedLink
                            to={currentLanguage === 'vi' 
                              ? `/tin-tuc/${getNewsCategorySlug(news)}/${getNewsSlug(news)}`
                              : `/en/news/${getNewsCategorySlug(news)}/${getNewsSlug(news)}`
                            }
                            title={getNewsTitle(news)}
                            className="clamp-2-lines"
                          >
                            {getNewsTitle(news)}
                          </LocalizedLink>
                        </h4>
                      </div>
                    </div>
                  ))}
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
