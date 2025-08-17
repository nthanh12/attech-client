import { useParams } from "react-router-dom";
import NewsSection from "../components/NewsSection/NewsSection";
import TrendingArea from "../components/TrendingArea/TrendingArea";
import WeeklyNews from "../components/WeeklyNews/WeeklyNews";
import "./NewsPage.css";
import WhatsNews from "../components/WhatsNews/WhatsNews";

const NewsPage = () => {
  const { category } = useParams();

  return (
    <div className="news-page">
      <div className="news-container">
        <NewsSection />
        <TrendingArea category="activities" />
        <WeeklyNews />
        <WhatsNews />
      </div>
    </div>
  );
};

export default NewsPage;
