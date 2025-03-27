import "../ContentSection/ContentSection.css";
import sliderImg1 from "../../../../assets/img/featured_img1.jpg";
import { Link } from "react-router-dom";

const newsData = [
  {
    id: 1,
    category: "Hàng không",
    title:
      "Công ty TNHH Kỹ thuật Quản lý bay tổ chức Hội nghị đại biểu Người lao động năm 2025",
    description:
      "Chiều ngày 28/02/2025, Công ty TNHH Kỹ thuật Quản lý bay (ATTECH) đã tổ chức Hội nghị đại biểu Người lao động năm 2025.",
    imgUrl:
      "https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg",
    link: "/pages/single_page.html",
  },
  {
    id: 2,
    category: "Pháp luật",
    title:
      "Hội nghị tuyên dương điển hình tiên tiến giai đoạn 2020-2024 và phát động phong trào thi đua giai đoạn 2025-2030",
    description:
      "Nhân dịp năm mới 2022 và đón Tết cổ truyền Nhâm Dần, Bộ trưởng gửi lời thăm hỏi và chúc mừng đến các đồng chí cán bộ, công chức, viên chức, người lao động ngành GTVT ",
    imgUrl: "https://attech.com.vn/wp-content/uploads/2025/03/phapluat.jpg",
    link: "/pages/single_page.html",
  },
  {
    id: 3,
    category: "Hàng không",
    title: "Thư chúc mừng năm mới của Bộ trưởng Bộ Giao thông Vận tải",
    description:
      "Nhân dịp năm mới 2022 và đón Tết cổ truyền Nhâm Dần, Bộ trưởng gửi lời thăm hỏi và chúc mừng đến các đồng chí cán bộ, công chức, viên chức, người lao động ngành GTVT ",
    imgUrl:
      "https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg",
    link: "/pages/single_page.html",
  },
  {
    id: 4,
    category: "Hàng không",
    title:
      "Quản lý bay thời Covid-19: Kiểm soát tốt không lưu, tăng phòng dịch",
    description:
      "Vừa đảm bảo an toàn tuyệt đối cho các chuyến bay, Quản lý bay miền Trung nỗ lực phòng chống dịch Covid-19.",
    imgUrl: "https://attech.com.vn/wp-content/uploads/2021/08/qlb-170x130.jpg",
    link: "/pages/single_page.html",
  },
  {
    id: 5,
    category: "Pháp luật",
    title: "Quy định số 232-QĐ/TW",
    description:
      "Quy định số 232-QĐ/TW ngày 20/01/2025 của Ban Chấp hành Trung ương về thi hành Điều lệ Đảng.",
    imgUrl: "https://attech.com.vn/wp-content/uploads/2025/03/phapluat.jpg",
    link: "/pages/single_page.html",
  },
];

const ContentSection = () => {
  // Lọc tin tức theo từng chủ đề
  const aviationNews = newsData.filter(
    (news) => news.category === "Hàng không"
  );
  const lawNews = newsData.filter((news) => news.category === "Pháp luật");

  return (
    <section id="contentSection">
      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
          <div className="left_content">
            <div className="single_post_content">
              <div className="d-flex justify-content-between align-items-center">
                <p className="d-flex-text-bg">Tin ngành hàng không</p>
                <Link to={`/news/list?category=aviation`} className="more-btn">
                  <span>Xem tất cả</span>
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                </Link>
              </div>

              {/* Bài viết nổi bật */}
              {aviationNews.length > 0 && (
                <div className="single_post_content_left">
                  <ul className="business_catgnav wow fadeInDown">
                    <li>
                      <figure className="bsbig_fig">
                        <a href={aviationNews[0].link} className="featured_img">
                          <img
                            alt=""
                            src={sliderImg1}
                          />
                          <span className="overlay"></span>
                        </a>
                        <div className="col2 featured_text">
                          <figcaption>
                            <a href={aviationNews[0].link}>
                              {aviationNews[0].title}
                            </a>
                          </figcaption>
                          <p>{aviationNews[0].description}</p>
                        </div>
                      </figure>
                    </li>
                  </ul>
                </div>
              )}

              {/* Danh sách tin hàng không */}
              <div className="single_post_content_right">
                <ul className="spost_nav">
                  {aviationNews.slice(1).map((news, index) => (
                    <li key={news.id}>
                      <div
                        className={`media wow ${
                          index === 0 ? "fadeInDown" : "fadeInUp"
                        }`}
                      >
                        <a href={news.link} className="media-left">
                          <img alt="" src={news.imgUrl} />
                        </a>
                        <div className="media-body">
                          <a href={news.link} className="catg_title">
                            {news.title}
                          </a>
                          {news.description && (
                            <p className="media-content">{news.description}</p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tuyên truyền pháp luật */}
        <div className="col-lg-4 col-md-12 col-sm-12 col-12">
          <aside className="right_content">
            <div className="single_sidebar">
              <div className="d-flex justify-content-between align-items-center">
                <p className="d-flex-text">Tuyên truyền pháp luật</p>
                <Link to="/news/law/all" className="more-btn">
                  <span>Xem tất cả</span>
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                </Link>
              </div>
              <ul className="spost_nav">
                {lawNews.map((news, index) => (
                  <li key={news.id}>
                    <div
                      className={`media wow ${
                        index === 0 ? "fadeInDown" : "fadeInUp"
                      }`}
                    >
                      <a href={news.link} className="media-left">
                        <img alt="" src={news.imgUrl} />
                      </a>
                      <div className="media-body">
                        <a href={news.link} className="catg_title">
                          {news.title}
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
