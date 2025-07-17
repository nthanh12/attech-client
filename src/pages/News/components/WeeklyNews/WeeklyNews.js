import React from "react";
import "./WeeklyNews.css";
import { Link } from "react-router-dom";
import ViewAllButton from "../../../../components/ViewAllButton/ViewAllButton";
import { mockNews } from "../../../../utils/mockNews";
import { mockNewsCategories } from "../../../../utils/mockNewsCategories";

// Dùng slug để xác định 3 danh mục con
const childCategorySlugs = [
  "dang-bo-cong-ty",
  "doan-thanh-nien-cong-ty",
  "cong-doan-cong-ty"
];
const childCategories = mockNewsCategories.filter(cat => childCategorySlugs.includes(cat.slugVi));

// Group news by postCategorySlugVi for child categories
const groupedNews = mockNews.reduce((acc, news) => {
  if (childCategorySlugs.includes(news.postCategorySlugVi)) {
    if (!acc[news.postCategorySlugVi]) {
      acc[news.postCategorySlugVi] = [];
    }
    acc[news.postCategorySlugVi].push(news);
  }
  return acc;
}, {});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const WeeklyNews = () => {
  return (
    <div className="weekly-news-area">
      <div className="container">
        <div className="weekly-news-child-categories">
          {childCategories.map((category) => {
            const newsList = (groupedNews[category.slugVi] || []).slice(0, 4);
            if (newsList.length === 0) return null;
            return (
              <div key={category.slugVi} className="weekly-wrapper">
                <div className="section-tittle">
                  <h4 className="title-category">{category.nameVi}</h4>
                  <ViewAllButton to={`/tin-tuc/${category.slugVi}`} />
                </div>
                <div className="weekly-news-active">
                  {newsList.map((news) => (
                    <div key={news.id} className="weekly-single">
                      <div className="weekly-img">
                        <img src={news.image} alt={news.titleVi} title={news.titleVi} />
                      </div>
                      <div className="weekly-caption">
                        <span className="time-news">{formatDate(news.timePosted)}</span>
                        <h4>
                          <Link
                            to={`/tin-tuc/${news.postCategorySlugVi}/${news.slugVi}`}
                            title={news.titleVi}
                            className="clamp-2-lines"
                          >
                            {news.titleVi}
                          </Link>
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
