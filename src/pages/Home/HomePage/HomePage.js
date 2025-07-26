import AlertBox from "../components/AlertBox/AlertBox";
import Feature from "../components/Feature/Feature";
import About from "../components/About/About";
import Fact from "../components/Fact/Fact";
import Media from "../components/Media/Media";
import Carousel from "../../../components/Shared/Layout/Carousel/Carousel";
import PartNews from "../components/PartNews/PartNews";
import SEO from "../../../components/SEO/SEO";
import { useI18n } from "../../../hooks/useI18n";

const Home = () => {
  const { t, currentLanguage } = useI18n();
  
  // SEO content based on language
  const seoContent = {
    vi: {
      title: "ATTECH - Công ty TNHH Kỹ thuật Quản lý bay | Trang chủ",
      description: "ATTECH là công ty hàng đầu trong lĩnh vực kỹ thuật hàng không tại Việt Nam, chuyên cung cấp dịch vụ CNS, bay kiểm tra hiệu chuẩn và sản xuất thiết bị hàng không chất lượng cao.",
      keywords: "ATTECH, kỹ thuật hàng không, CNS, quản lý bay, thiết bị hàng không, Vietnam aviation, VATM"
    },
    en: {
      title: "ATTECH - Air Traffic Management Technical Company | Home",
      description: "ATTECH is a leading aviation technology company in Vietnam, specializing in CNS services, flight inspection calibration and high-quality aviation equipment manufacturing.",
      keywords: "ATTECH, aviation technology, CNS, air traffic management, aviation equipment, Vietnam aviation, VATM"
    }
  };
  
  const currentSEO = seoContent[currentLanguage] || seoContent.vi;
  
  return (
    <>
      <SEO 
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        url="/"
        lang={currentLanguage}
      />
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
