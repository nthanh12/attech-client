import React from "react";

const NewsDetail = ({ article }) => {
  if (!article) {
    return <div>Không tìm thấy bài viết</div>;
  }

  return (
    <div className="news-detail">
      <h1>{article.title}</h1>
      <p>
        <strong>Ngày đăng:</strong> {article.date}
      </p>
      <img src={article.image} alt={article.title} />
      <p>{article.content}</p>
    </div>
  );
};

export default NewsDetail;
