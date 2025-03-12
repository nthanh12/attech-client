import logo from "./logo.svg";
import Header from "./components/Shared/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Footer from "./components/Shared/Footer";
import ProductList from "./components/Product/ProductList";
import Service from "./pages/Service";
import News from "./pages/News";
import Contact from "./pages/Contact";
import DetailAllCNSATM from "./components/Product/CNSATM/DetailCNSATM";

import GetAll from "./components/News/Recruitment/GetAll";
import Detail from "./components/News/Recruitment/Detail";
import Information from "./pages/Information";
import DetailBKTHC from "./components/Service/BKTHC/DetailBKTHC";
import GetAllNotification from "./components/News/Notification/GetAllNotification";
import DetailNotification from "./components/News/Notification/DetailNotification";
import GetAllActivity from "./components/News/Activity/GetAllActivity";
import DetailActivity from "./components/News/Activity/DetailActivity";
import GetAllTrain from "./components/News/Train/GetAllTrain";
import DetailTrain from "./components/News/Train/DetailTrain";
import DetailTNHC from "./components/Service/TNHC/DetailTNHC";
import DetailDVKTCNS from "./components/Service/DVKTCNS/DetailDVKTCNS";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/cns-atm" element={<Product />} />
          <Route path="/product/he-thong-den-hieu" element={<Product />} />
          <Route path="/product/co-khi-che-tao" element={<Product />} />

          <Route
            path="/product/cns-atm/detail/:id"
            element={<DetailAllCNSATM />}
          />

          <Route path="/service" element={<Service />} />
          <Route path="/service/bkthc" element={<DetailBKTHC />} />
          <Route path="/service/tnhc" element={<DetailTNHC />} />
          <Route path="/service/dvktcns" element={<DetailDVKTCNS />} />

          <Route path="/news" element={<News />} />

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

          <Route path="/information/*" element={<Information />} />
          <Route path="/contact" element={<Contact />} />

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
