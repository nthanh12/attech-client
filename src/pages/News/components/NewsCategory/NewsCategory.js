import React from "react";
import NewsList from "../NewsList/NewsList";

const NewsCategory = ({ selectedCategory, articles }) => {
  const filteredArticles = articles.filter(
    (article) => article.category === selectedCategory
  );

  return (
    <div className="news-category">
      <h2>
        Danh mục:{" "}
        {selectedCategory === "activity"
          ? "Tin hoạt động"
          : selectedCategory === "aviation"
          ? "Tin ngành hàng không"
          : "Tuyên truyền pháp luật"}
      </h2>
      <NewsList articles={filteredArticles} />
    </div>
  );
};

export default NewsCategory;
