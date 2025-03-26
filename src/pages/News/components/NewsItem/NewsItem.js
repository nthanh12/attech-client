import React from "react";

const NewsItem = ({ article }) => {
  return (
    <div className="news-item">
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <small>{article.date}</small>
      <button>Đọc thêm</button>
    </div>
  );
};

export default NewsItem;
