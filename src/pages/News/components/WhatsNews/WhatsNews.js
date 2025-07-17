import React from "react";
import "./WhatsNews.css";

const newsData = {
  all: [
    {
      date: "26/03/2025",
      title: "Hãng hàng không mở thêm nhiều đường bay quốc tế",
      image:
        "https://i1-vnexpress.vnecdn.net/2025/03/26/dscf2195-jpeg-1742964488-9432-1742964646.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=rdW-ecy_PkZfo0BvWIhEYw",
      link: "#",
    },
    {
      date: "29/03/2025",
      title: "Vietnam Airlines đặt mục tiêu thu hơn 3,7 tỷ USD",
      image:
        "https://i1-kinhdoanh.vnecdn.net/2025/02/24/vietnamairlinesxacdinhconnguoi-6915-5590-1740372946.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=zOeTryNAHMk0b1tAzVw-Zw",
      link: "#",
    },
    {
      date: "26/03/2025",
      title: "Công ty Trung Quốc phát triển máy bay siêu thanh 5.000 km/h",
      image:
        "https://i1-vnexpress.vnecdn.net/2025/01/21/may-bay-sieu-thanh-moi-1737460-3193-1420-1737460593.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=iz_0y1tc-sAmjaNAOr5kzg",
      link: "#",
    },
    {
      date: "31/03/2025",
      title: "7 máy bay thay đổi lịch sử hàng không",
      image:
        "https://i1-vnexpress.vnecdn.net/2024/12/22/VNE-Plane-3-1734830968-9113-1734831213.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=WEE5lOSxNzRs8E9EH4O5fA",
      link: "#",
    },
    {
      date: "31/03/2025",
      title: "Vietnam Airlines dứt mạch thua lỗ 4 năm liên tiếp",
      image:
        "https://i1-kinhdoanh.vnecdn.net/2024/12/13/ic3a9923-1734103107-1770-1734103117.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=RMWTo32rrFuDezw_GCfI6g",
      link: "#",
    },
  ],
  domestic: [
    {
      date: "01/04/2025",
      title: "Vietnam Airlines dứt mạch thua lỗ 4 năm liên tiếp",
      link: "#",
    },
    {
      date: "01/04/2025",
      title: "Welcome To The Best Model Winner Contest",
      link: "#",
    },
    {
      date: "01/04/2025",
      title: "Welcome To The Best Model Winner Contest",
      link: "#",
    },
    {
      date: "01/04/2025",
      title: "Welcome To The Best Model Winner Contest",
      link: "#",
    },
  ],
  international: [
    {
      date: "01/04/2025",
      title: "Welcome To The Best Model Winner Contest",
      link: "#",
    },
    {
      date: "01/04/2025",
      title: "Welcome To The Best Model Winner Contest",
      link: "#",
    },
    {
      date: "01/04/2025",
      title: "Welcome To The Best Model Winner Contest",
      link: "#",
    },
    {
      date: "01/04/2025",
      title: "Welcome To The Best Model Winner Contest",
      link: "#",
    },
  ],
};

const WhatsNews = () => {
  const newsToShow = newsData.all.slice(0, 5);
  return (
    <section className="whats-news-area pt-50 pb-20">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-lg-5 col-md-5">
                <div className="section-tittle mb-20">
                  <h3>Tin ngành hàng không</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="tab-content" id="nav-tabContent">
                  {["all", "domestic", "international"].map(
                    (category, index) => (
                      <div
                        className={`tab-pane fade ${
                          category === "all" ? "show active" : ""
                        }`}
                        id={`nav-${
                          category === "all"
                            ? "home"
                            : category === "domestic"
                            ? "profile"
                            : "techno"
                        }`}
                        role="tabpanel"
                        aria-labelledby={`nav-${
                          category === "all"
                            ? "home"
                            : category === "domestic"
                            ? "profile"
                            : "technology"
                        }-tab`}
                        key={index}
                      >
                        <div className="whats-news-caption">
                          <div className="whats-news-grid">
                            {newsToShow.map((news, idx) => (
                              <div className="whats-news-card" key={idx}>
                                <div className="what-img">
                                  <img src={news.image} alt={news.title} />
                                </div>
                                <div className="what-cap">
                                  <span className="title-news">
                                    {news.date}
                                  </span>
                                  <h4>
                                    <a href={news.link}>{news.title}</a>
                                  </h4>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Dữ liệu mẫu đúng chuẩn mockNews
export const mockNews = [
  {
    id: 1,
    titleVi: "Hãng hàng không mở thêm nhiều đường bay quốc tế",
    slugVi: "hang-hang-khong-mo-them-nhieu-duong-bay-quoc-te",
    descriptionVi: "Nhiều hãng hàng không Việt Nam mở rộng các đường bay quốc tế trong năm 2025.",
    contentVi: "<p>Nhiều hãng hàng không Việt Nam đã công bố kế hoạch mở thêm các đường bay quốc tế nhằm đáp ứng nhu cầu đi lại tăng cao sau đại dịch.</p>",
    titleEn: "Airlines open more international routes",
    slugEn: "airlines-open-more-international-routes",
    descriptionEn: "Vietnamese airlines expand international routes in 2025.",
    contentEn: "<p>Vietnamese airlines have announced plans to open more international routes to meet the growing travel demand post-pandemic.</p>",
    timePosted: "2025-03-26T00:00:00Z",
    status: 1,
    postCategoryId: 1,
    postCategoryNameVi: "Tin quốc tế",
    postCategoryNameEn: "International News",
    postCategorySlugVi: "tin-quoc-te",
    postCategorySlugEn: "international-news",
    image: "https://i1-vnexpress.vnecdn.net/2025/03/26/dscf2195-jpeg-1742964488-9432-1742964646.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=rdW-ecy_PkZfo0BvWIhEYw"
  },
  {
    id: 2,
    titleVi: "Vietnam Airlines đặt mục tiêu thu hơn 3,7 tỷ USD",
    slugVi: "vietnam-airlines-dat-muc-tieu-thu-hon-3-7-ty-usd",
    descriptionVi: "Vietnam Airlines đặt mục tiêu doanh thu vượt 3,7 tỷ USD trong năm 2025.",
    contentVi: "<p>Vietnam Airlines công bố kế hoạch tăng trưởng mạnh mẽ với mục tiêu doanh thu vượt 3,7 tỷ USD.</p>",
    titleEn: "Vietnam Airlines targets over $3.7 billion revenue",
    slugEn: "vietnam-airlines-targets-over-3-7-billion-revenue",
    descriptionEn: "Vietnam Airlines sets a revenue target of over $3.7 billion for 2025.",
    contentEn: "<p>Vietnam Airlines announces an ambitious growth plan with a revenue target exceeding $3.7 billion.</p>",
    timePosted: "2025-03-29T00:00:00Z",
    status: 1,
    postCategoryId: 1,
    postCategoryNameVi: "Tin trong nước",
    postCategoryNameEn: "Domestic News",
    postCategorySlugVi: "tin-trong-nuoc",
    postCategorySlugEn: "domestic-news",
    image: "https://i1-kinhdoanh.vnecdn.net/2025/02/24/vietnamairlinesxacdinhconnguoi-6915-5590-1740372946.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=zOeTryNAHMk0b1tAzVw-Zw"
  },
  {
    id: 3,
    titleVi: "Công ty Trung Quốc phát triển máy bay siêu thanh 5.000 km/h",
    slugVi: "cong-ty-trung-quoc-phat-trien-may-bay-sieu-thanh-5000-km-h",
    descriptionVi: "Một công ty Trung Quốc vừa phát triển thành công máy bay siêu thanh có tốc độ 5.000 km/h.",
    contentVi: "<p>Công ty Trung Quốc công bố máy bay siêu thanh mới, có thể di chuyển với tốc độ lên tới 5.000 km/h.</p>",
    titleEn: "Chinese company develops 5,000 km/h hypersonic plane",
    slugEn: "chinese-company-develops-5000-kmh-hypersonic-plane",
    descriptionEn: "A Chinese company has developed a hypersonic plane capable of 5,000 km/h.",
    contentEn: "<p>A Chinese company unveils a new hypersonic plane capable of speeds up to 5,000 km/h.</p>",
    timePosted: "2025-03-26T00:00:00Z",
    status: 1,
    postCategoryId: 2,
    postCategoryNameVi: "Tin quốc tế",
    postCategoryNameEn: "International News",
    postCategorySlugVi: "tin-quoc-te",
    postCategorySlugEn: "international-news",
    image: "https://i1-vnexpress.vnecdn.net/2025/01/21/may-bay-sieu-thanh-moi-1737460-3193-1420-1737460593.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=iz_0y1tc-sAmjaNAOr5kzg"
  },
  {
    id: 4,
    titleVi: "7 máy bay thay đổi lịch sử hàng không",
    slugVi: "7-may-bay-thay-doi-lich-su-hang-khong",
    descriptionVi: "Bảy mẫu máy bay đã làm thay đổi lịch sử ngành hàng không thế giới.",
    contentVi: "<p>Bảy mẫu máy bay nổi bật đã góp phần thay đổi ngành hàng không toàn cầu.</p>",
    titleEn: "7 planes that changed aviation history",
    slugEn: "7-planes-that-changed-aviation-history",
    descriptionEn: "Seven aircraft models that changed the history of aviation.",
    contentEn: "<p>Seven outstanding aircraft models have contributed to changing the global aviation industry.</p>",
    timePosted: "2025-03-31T00:00:00Z",
    status: 1,
    postCategoryId: 2,
    postCategoryNameVi: "Tin quốc tế",
    postCategoryNameEn: "International News",
    postCategorySlugVi: "tin-quoc-te",
    postCategorySlugEn: "international-news",
    image: "https://i1-vnexpress.vnecdn.net/2024/12/22/VNE-Plane-3-1734830968-9113-1734831213.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=WEE5lOSxNzRs8E9EH4O5fA"
  },
  {
    id: 5,
    titleVi: "Vietnam Airlines dứt mạch thua lỗ 4 năm liên tiếp",
    slugVi: "vietnam-airlines-dut-mach-thua-lo-4-nam-lien-tiep",
    descriptionVi: "Vietnam Airlines đã có lãi trở lại sau 4 năm liên tục thua lỗ.",
    contentVi: "<p>Vietnam Airlines công bố kết quả kinh doanh khả quan, chấm dứt chuỗi thua lỗ kéo dài 4 năm.</p>",
    titleEn: "Vietnam Airlines ends 4-year losing streak",
    slugEn: "vietnam-airlines-ends-4-year-losing-streak",
    descriptionEn: "Vietnam Airlines returns to profitability after 4 consecutive years of losses.",
    contentEn: "<p>Vietnam Airlines reports positive business results, ending a 4-year losing streak.</p>",
    timePosted: "2025-03-31T00:00:00Z",
    status: 1,
    postCategoryId: 1,
    postCategoryNameVi: "Tin trong nước",
    postCategoryNameEn: "Domestic News",
    postCategorySlugVi: "tin-trong-nuoc",
    postCategorySlugEn: "domestic-news",
    image: "https://i1-kinhdoanh.vnecdn.net/2024/12/13/ic3a9923-1734103107-1770-1734103117.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=RMWTo32rrFuDezw_GCfI6g"
  }
];

export default WhatsNews;
