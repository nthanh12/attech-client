import ContentSection from "../components/ContentSection/ContentSection";
import NewsSection from "../components/NewsSection/NewsSection";
import SliderSection from "../components/SliderSection/SliderSection";

const NewsPage = () => {
  return (
    <>
      <div className="news-page">
        <div className="container">
          <NewsSection />
          <SliderSection />
          <ContentSection />
        </div>
      </div>
    </>
  );
};

export default NewsPage;
