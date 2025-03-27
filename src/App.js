import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home/HomePage/HomePage";
import Header from "./components/Shared/Layout/Header/Header";
import Footer from "./components/Shared/Layout/Footer/Footer";
import ProductList from "./components/Product/Content/ProductList/ProductList";
import Product from "./pages/Product/ProductPage/ProductPage";
import Service from "./pages/Service/ServicePage/ServicePage";
import DetailAllCNSATM from "./components/Product/CNSATM/DetailCNSATM";
import NewsPage from "./pages/News/NewsPage/NewsPage";
import NotificationPage from "./pages/Notification/NotificationPage/NotificationPage";
import ContactPage from "./pages/Contact/ContactPage/ContactPage";
import CompanyInfoPage from "./pages/CompanyInfo/CompanyInfoPage/CompanyInfoPage";

import NewsListPage from "./pages/News/NewsListPage/NewsListPage";
import GetAll from "./components/News/Recruitment/GetAll";
import Detail from "./components/News/Recruitment/Detail";
import DetailBKTHC from "./components/Service/BKTHC/DetailBKTHC";
import GetAllNotification from "./components/News/Notification/GetAllNotification";
import DetailNotification from "./components/News/Notification/DetailNotification";
import GetAllActivity from "./components/News/Activity/GetAllActivity";
import DetailActivity from "./components/News/Activity/DetailActivity";
import GetAllTrain from "./components/News/Train/GetAllTrain";
import DetailTrain from "./components/News/Train/DetailTrain";
import DetailTNHC from "./components/Service/TNHC/DetailTNHC";
import DetailDVKTCNS from "./components/Service/DVKTCNS/DetailDVKTCNS";
import DetailHLDT from "./components/Service/HLDT/DetailHLDT";
import DetailKTDD from "./components/Service/KTDD/DetailKTDD";
import DetailXDQLDA from "./components/Service/XDQLDA/DetailXDQLDA";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/cns-atm" element={<Product />} />
          <Route path="/product/he-thong-den-hieu" element={<Product />} />
          <Route path="/product/co-khi-che-tao" element={<Product />} />

          <Route
            path="/product/cns-atm/detail/:id"
            element={<DetailAllCNSATM />}
          />

          <Route path="/products/*" element={<Product />} />
          <Route path="/services/*" element={<Service />} />

          {/* <Route path="/news" element={<NewsPage />} /> */}
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/list" element={<NewsListPage />} />

          <Route path="/notifications" element={<NotificationPage />} />

          <Route
            path="/news/notification/all"
            element={<GetAllNotification />}
          />
          <Route
            path="/news/notification/detail/:id"
            element={<DetailNotification />}
          />
          <Route path="/news/recruitment/all" element={<GetAll />} />
          <Route path="/news/recruitment/detail/:id" element={<Detail />} />

          <Route path="/news/activity/all" element={<GetAllActivity />} />
          <Route
            path="/news/activity/detail/:id"
            element={<DetailActivity />}
          />
          <Route path="/news/train/all" element={<GetAllTrain />} />
          <Route path="/news/train/detail/:id" element={<DetailTrain />} />

          <Route path="/company-info/*" element={<CompanyInfoPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route
            path="/product-category/product-list"
            element={<ProductList />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
