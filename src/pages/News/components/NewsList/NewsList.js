import React from "react";
import NewsItem from "../NewsItem/NewsItem";

const NewsList = ({ articles }) => {
  return (
    <div className="news-list">
      {articles.map((article) => (
        <NewsItem key={article.id} article={article} />
      ))}
    </div>
  );
};

export default NewsList;
