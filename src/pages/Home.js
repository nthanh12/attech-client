import AlertBox from "../components/Shared/AlertBox";
import Banner from "../components/Shared/Banner";
import Feature from "../components/Shared/Feature";
import NotificationList from "../components/Shared/NotificationList";
import About from "../components/Shared/About";
import Fact from "../components/Shared/Fact";

const Home = () => {
  return (
    <>
      <Banner />
      <Feature />
      <AlertBox />
      <NotificationList />
      <About />
      <Fact />
    </>
  );
};

export default Home;
