import AlertBox from "../components/AlertBox/AlertBox";
import Feature from "../components/Feature/Feature";
import About from "../components/About/About";
import Fact from "../components/Fact/Fact";
import Media from "../components/Media/Media";
import Carousel from "../../../components/Shared/Layout/Carousel/Carousel";
import PartNews from "../components/PartNews/PartNews";

const Home = () => {
  return (
    <>
      <Carousel />
      <Feature />
      <Fact />
      <AlertBox />
      <PartNews />
      <About />
      <Media />
    </>
  );
};

export default Home;
