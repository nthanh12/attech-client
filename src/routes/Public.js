import { Route, Routes } from "react-router-dom";

import Header from "../components/Shared/Layout/Header/Header";
import Home from "../pages/Home/HomePage/HomePage";
import Footer from "../components/Shared/Layout/Footer/Footer";

import Product from "../pages/Product/ProductPage/ProductPage";
import ProductList from "../pages/Product/components/ProductList/ProductList";
import ProductDetail from "../pages/Product/ProductDetail/ProductDetail";

import Service from "../pages/Service/ServicePage/ServicePage";
import ServiceList from "../pages/Service/components/ServiceList/ServiceList";
import ServiceDetail from "../pages/Service/ServiceDetail/ServiceDetail";

import NewsPage from "../pages/News/NewsPage/NewsPage";
import NewsListPage from "../pages/News/NewsListPage/NewsListPage";

import NotificationPage from "../pages/Notification/NotificationPage/NotificationPage";
import ContactPage from "../pages/Contact/ContactPage/ContactPage";
import CompanyInfoPage from "../pages/CompanyInfo/CompanyInfoPage/CompanyInfoPage";

const Public = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Product */}
        <Route path="/products/*" element={<Product />}>
          <Route path="" element={<ProductList />} />
          <Route path=":productId" element={<ProductDetail />} />
        </Route>

        <Route path="/services/*" element={<Service />}>
          <Route path="" element={<ServiceList />} />
          <Route path=":serviceId" element={<ServiceDetail />} />
        </Route>

        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/list" element={<NewsListPage />} />

        <Route path="/notifications" element={<NotificationPage />} />

        <Route path="/company-info/*" element={<CompanyInfoPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* <Route
            path="/product-category/product-list"
            element={<ProductList />}
          /> */}
      </Routes>
      <Footer />
    </>
  );
};

export default Public;
