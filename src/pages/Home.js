import AlertBox from "../components/Shared/AlertBox";
import Banner from "../components/Shared/Banner";
import Feature from "../components/Shared/Feature";
import NotificationList from "../components/Shared/NotificationList";
import About from "../components/Shared/About";
import Fact from "../components/Shared/Fact";
import Media from "../components/Shared/Media";
import Map from "../components/Shared/Map";
import Partner from "../components/Shared/Partner";
import Quotes from "../components/Shared/Quotes";

const Home = () => {
  return (
    <>
      <Banner />
      <Feature />
      <AlertBox />
      <About />
      <NotificationList />
      <Map />
      <Fact />
      <Media />
      {/* <Partner /> */}
      <Quotes />
    </>
  );
};

export default Home;
