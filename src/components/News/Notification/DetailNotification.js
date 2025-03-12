import React, { useState, useEffect } from "react";
import "../../../assets/css/News/Recruitment/Detail.css";

// API giả lập
const articleData = {
  title:
    "Thiết kế siêu mỏng của Galaxy S25 Edge có thể là một vấn đề nếu Samsung không làm được điều này",
  time: "3 giờ trước",
  category: "Thể Duyệt",
  content:
    'Thông tin mới nhất cho thấy Galaxy S25 Edge sẽ sở hữu viên pin dung lượng rất "khiêm tốn". Cả Samsung và Apple đều đang chuẩn bị ra mắt những mẫu smartphone siêu mỏng trong năm nay...',
  imageUrl:
    "https://genk.mediacdn.vn/thumb_w/640/139269124445442048/2025/3/11/samsung-battery-certification-s25-edge-1741690000131-1741690001036816306912.jpg",
  source: "GSM Arena",
};

const DetailNotification = () => {
  const article = articleData;
  return (
    <div className="article-container">
      <h2 className="article-title">{article.title}</h2>
      <p className="article-meta">
        {article.category} • {article.time}
      </p>
      <img src={article.imageUrl} alt="article" className="article-image" />
      <p className="article-content">{article.content}</p>
      <p className="article-source">Nguồn: {article.source}</p>
    </div>
  );
};

export default DetailNotification;
