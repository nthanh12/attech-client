import { useParams } from "react-router-dom";
import ContentSection from "../components/ContentSection/ContentSection";
import NewsSection from "../components/NewsSection/NewsSection";
import SliderSection from "../components/SliderSection/SliderSection";
import TrendingArea from "../components/TrendingArea/TrendingArea";
import WeeklyNews from "../components/WeeklyNews/WeeklyNews";
import "./NewsPage.css";
import WhatsNews from "../components/WhatsNews/WhatsNews";

const NewsPage = () => {
  const { category } = useParams();

  return (
    <div className="news-page">
      <div className="container">
        <NewsSection />
        <TrendingArea category="activities" />
        <WeeklyNews />
        <WhatsNews />
      </div>
    </div>
  );
};

export default NewsPage;
