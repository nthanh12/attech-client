import ContentSection from "../components/News/ContentSection";
import NewsSection from "../components/News/NewsSection";
import SliderSection from "../components/News/SliderSection";

const News = () => {
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

export default News;
