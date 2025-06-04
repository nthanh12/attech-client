import React from "react";
import "../NewsSection/NewsSection.css";
import news_thumbnail3 from "../../../../assets/img/news_thumbnail3.jpg";
import news_thumbnail2 from "../../../../assets/img/news_thumbnail2.jpg";
import { Link } from "react-router-dom"; // Thêm Link nếu muốn dẫn đến trang chi tiết

const NewsSection = () => {
  const newsItems = [
    { title: "Tin tuyển dụng", image: news_thumbnail3, slug: "tin-tuyen-dung" },
    { title: "Thông báo", image: news_thumbnail3, slug: "thong-bao" },
    {
      title: "Thông tin tài chính",
      image: news_thumbnail3,
      slug: "thong-tin-tai-chinh",
    },
    {
      title: "Thông tin công ty",
      image: news_thumbnail3,
      slug: "thong-tin-cong-ty",
    },
    { title: "Ban lãnh đạo", image: news_thumbnail2, slug: "ban-lanh-dao" },
    {
      title: "Tin hàng không thế giới",
      image: news_thumbnail2,
      slug: "tin-hang-khong-the-gioi",
    },
    {
      title: "Cơ cấu tổ chức",
      image: news_thumbnail2,
      slug: "co-cau-to-chuc",
    },
  ];

  return (
    <section id="newsSection">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="latest_newsarea">
            <p>Tin nổi bật</p>
            <div id="ticker01">
              <ul className="news_sticker">
                {newsItems.map((item, index) => (
                  <li key={index}>
                    <Link to={`/news/${item.slug}`}>
                      <img src={item.image} alt={item.title} />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
