import { useParams } from "react-router-dom";
import ContentSection from "../components/ContentSection/ContentSection";
import NewsSection from "../components/NewsSection/NewsSection";
import SliderSection from "../components/SliderSection/SliderSection";

const NewsPage = () => {
  const { category } = useParams();

  return (
    <div className="news-page">
      <div className="container">
        <NewsSection category={category || "aviation"} />
        <SliderSection category="tech" />
        <ContentSection category="law" />
      </div>
    </div>
  );
};

export default NewsPage;
