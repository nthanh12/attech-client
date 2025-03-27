import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const newsData = [
  {
    id: 1,
    title: "Hội nghị ngành hàng không",
    category: "aviation",
    description: "Hội nghị đại biểu ngành hàng không năm 2025.",
    imgUrl: "https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025.jpg",
    link: "/pages/single_page.html",
  },
  {
    id: 2,
    title: "Công ty tổ chức tuyên truyền pháp luật",
    category: "law",
    description: "Buổi tuyên truyền về pháp luật lao động.",
    imgUrl: "https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025.jpg",
    link: "/pages/single_page.html",
  },
];

const NewsList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category"); // Lấy giá trị category từ URL

  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    if (category) {
      setFilteredNews(newsData.filter((news) => news.category === category));
    } else {
      setFilteredNews(newsData); // Hiển thị tất cả nếu không có category
    }
  }, [category]);

  return (
    <div>
      <h1>Danh sách tin tức</h1>
      <ul>
        {filteredNews.length > 0 ? (
          filteredNews.map((news) => (
            <li key={news.id}>
              <img src={news.imgUrl} alt={news.title} width="100" />
              <h3>{news.title}</h3>
              <p>{news.description}</p>
              <a href={news.link}>Xem chi tiết</a>
            </li>
          ))
        ) : (
          <p>Không có tin tức nào trong danh mục này.</p>
        )}
      </ul>
    </div>
  );
};

export default NewsList;
