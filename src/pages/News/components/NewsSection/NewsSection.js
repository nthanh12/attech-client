import React from "react";
import "../NewsSection/NewsSection.css";
import { useI18n } from "../../../../hooks/useI18n";
import LocalizedLink from "../../../../components/Shared/LocalizedLink";
import { LocalizedTitle } from "../../../../components/Shared/LocalizedContent";
import { mockNews } from "../../../../utils/mockNews";
import ViewAllButton from "../../../../components/ViewAllButton/ViewAllButton";

const NewsSection = () => {
  const { t, currentLanguage } = useI18n();
  // Lấy 7 tin nổi bật đầu tiên
  const trendingNews = mockNews.slice(0, 7);

  return (
    <section id="newsSection">
      <div className="row">
        <div className="col-lg-12 col-md-12 p-0">
          <div className="news-section-container">
            <div className="news-section-header" style={{ justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="trend-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 12l4-4 4 4 4-8"
                      stroke="#002a5c"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="trend-label">{t('frontend.news.trending')}</span>
              </div>
              <ViewAllButton to={currentLanguage === "vi" ? "/tin-tuc" : "/en/news"} />
            </div>
            <div className="trend-ticker">
              <div className="trend-list">
                {[...trendingNews, ...trendingNews].map((item, idx) => (
                  <LocalizedLink
                    key={item.id + "-" + idx}
                    to={`${currentLanguage === 'vi' ? '/tin-tuc' : '/en/news'}/${currentLanguage === 'vi' ? item.postCategorySlugVi : item.postCategorySlugEn}/${currentLanguage === 'vi' ? item.slugVi : item.slugEn}`}
                    className="trend-link"
                  >
                    #{currentLanguage === 'vi' ? item.titleVi : item.titleEn}
                  </LocalizedLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
