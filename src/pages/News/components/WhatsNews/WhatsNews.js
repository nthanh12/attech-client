import React, { useState, useEffect } from "react";
import { mockNews } from "../../../../utils/mockNews";
import { mockNewsCategories } from "../../../../utils/mockNewsCategories";
import { Link } from "react-router-dom";
import ViewAllButton from "../../../../components/ViewAllButton/ViewAllButton";
import { useI18n } from "../../../../hooks/useI18n";
import "./WhatsNews.css";

const WhatsNews = () => {
  const { currentLanguage, t } = useI18n();
  // Lấy category ngành hàng không từ mockNewsCategories
  const aviationCategory = mockNewsCategories.find((cat) =>
    currentLanguage === "vi"
      ? cat.slugVi === "tin-nganh-hang-khong"
      : cat.slugEn === "aviation-news"
  );
  const aviationSlug =
    currentLanguage === "vi"
      ? aviationCategory?.slugVi
      : aviationCategory?.slugEn;
  const aviationNews = mockNews
    .filter(
      (n) =>
        n.status === 1 &&
        (currentLanguage === "vi"
          ? n.postCategorySlugVi === aviationSlug
          : n.postCategorySlugEn === aviationSlug)
    )
    .sort((a, b) => new Date(b.timePosted) - new Date(a.timePosted));

  // Responsive: mobile chỉ hiển thị 2 bài, desktop 5 bài
  const [newsCount, setNewsCount] = useState(5);
  useEffect(() => {
    const handleResize = () => {
      setNewsCount(window.innerWidth <= 768 ? 2 : 5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const newsToShow = aviationNews.slice(0, newsCount);

  const getTitle = (news) =>
    currentLanguage === "vi" ? news.titleVi : news.titleEn;
  const getSlug = (news) =>
    currentLanguage === "vi" ? news.slugVi : news.slugEn;
  const getCategorySlug = (news) =>
    currentLanguage === "vi"
      ? news.postCategorySlugVi
      : news.postCategorySlugEn;
  const getDateLocale = () => (currentLanguage === "vi" ? "vi-VN" : "en-US");
  const getNewsLink = (news) =>
    currentLanguage === "vi"
      ? `/tin-tuc/${getCategorySlug(news)}/${getSlug(news)}`
      : `/en/news/${getCategorySlug(news)}/${getSlug(news)}`;

  // Lấy tên category ngành hàng không (ưu tiên i18n, fallback sang titleVi/titleEn nếu chưa có key i18n)
  const aviationCategoryName =
    t("frontend.home.newsCategories.aviationNews") ||
    (currentLanguage === "vi"
      ? aviationCategory?.titleVi
      : aviationCategory?.titleEn) ||
    "Tin ngành hàng không";

  return (
    <section className="whats-news-area pt-50 pb-20">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-lg-5 col-md-5 pd_0">
                <div className="section-tittle mb-20">
                  <h3>{aviationCategoryName}</h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 text-end d-none d-md-block">
                <ViewAllButton
                  to={
                    currentLanguage === "vi"
                      ? `/tin-tuc/${aviationSlug}`
                      : `/en/news/${aviationSlug}`
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 pd_0">
                <div className="whats-news-caption">
                  <div className="whats-news-grid">
                    {newsToShow.map((news, idx) => (
                      <div className="whats-news-card" key={news.id}>
                        <div className="what-img">
                          <img src={news.image} alt={getTitle(news)} />
                        </div>
                        <div className="what-cap">
                          <span className="title-news">
                            {new Date(news.timePosted).toLocaleDateString(
                              getDateLocale()
                            )}
                          </span>
                          <h4>
                            <Link to={getNewsLink(news)}>{getTitle(news)}</Link>
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Nút xem tất cả cho mobile */}
                  <div className="d-block d-md-none mt-3 text-center">
                    <ViewAllButton
                      to={
                        currentLanguage === "vi"
                          ? `/tin-tuc/${aviationSlug}`
                          : `/en/news/${aviationSlug}`
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNews;
