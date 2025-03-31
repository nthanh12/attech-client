import AlertBox from "../components/AlertBox/AlertBox";
import Banner from "../components/Banner/Banner";
import Feature from "../components/Feature/Feature";
import NotificationList from "../components/NotificationList/NotificationList";
import About from "../components/About/About";
import Fact from "../components/Fact/Fact";
import Media from "../components/Media/Media";
import Map from "../components/Map/Map";
import Partner from "../components/Partner/Partner";
import Quotes from "../components/Quotes/Quotes";
import Carousel from "../../../components/Shared/Layout/Carousel/Carousel";
import PartNews from "../components/PartNews/PartNews";

const Home = () => {
  return (
    <>
      <Carousel />
      <Feature />
      <Banner />
      <AlertBox />
      <About />
      <PartNews />
      {/* <NotificationList /> */}
      <Map />
      <Fact />
      <Media />
      {/* <Partner /> */}
      <Quotes />
    </>
  );
};

export default Home;
