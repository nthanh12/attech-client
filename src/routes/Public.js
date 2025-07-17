import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/Shared/Layout/MainLayout";
import Home from "../pages/Home/HomePage/HomePage";

import Product from "../pages/Product/ProductPage/ProductPage";
import ProductList from "../pages/Product/components/ProductList/ProductList";
import ProductDetail from "../pages/Product/ProductDetail/ProductDetail";

import Service from "../pages/Service/ServicePage/ServicePage";
import ServiceList from "../pages/Service/components/ServiceList/ServiceList";
import ServiceDetail from "../pages/Service/ServiceDetail/ServiceDetail";

import NewsPage from "../pages/News/NewsPage/NewsPage";
import NewsListPage from "../pages/News/NewsListPage/NewsListPage";
import NewsDetailPage from "../pages/News/NewsDetailPage/NewsDetailPage";

import NotificationPage from "../pages/Notification/NotificationPage/NotificationPage";
import NotificationListPage from "../pages/Notification/NotificationListPage/NotificationListPage";
import NotificationDetailPage from "../pages/Notification/NotificationDetailPage/NotificationDetailPage";

import ContactPage from "../pages/Contact/ContactPage/ContactPage";
import CompanyInfoPage from "../pages/CompanyInfo/CompanyInfoPage/CompanyInfoPage";
import Financial from "../pages/CompanyInfo/components/Financial/Financial";
import History from "../pages/CompanyInfo/components/History/History";
import Structure from "../pages/CompanyInfo/components/Structure/Structure";
import Leadership from "../pages/CompanyInfo/components/Leadership/Leadership";
import Business from "../pages/CompanyInfo/components/Business/Business";
import Iso from "../pages/CompanyInfo/components/Iso/Iso";
import Gallery from "../pages/CompanyInfo/components/Gallery/Gallery";
import GalleryDetail from "../pages/CompanyInfo/components/Gallery/GalleryDetail";

import NotFoundPage from "../pages/NotFound/NotFoundPage";
import UserLogin from '../pages/Login/Login';

const Public = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/en" element={<Home />} />
        <Route path="/en/" element={<Home />} />

        {/* Product - Vietnamese */}
        <Route path="/san-pham/*" element={<Product />}>
          <Route path="" element={<ProductList />} />
          <Route path=":category" element={<ProductList />} />
          <Route path=":category/:slug" element={<ProductDetail />} />
        </Route>
        {/* Product - English */}
        <Route path="/products/*" element={<Product />}>
          <Route path="" element={<ProductList />} />
          <Route path=":category" element={<ProductList />} />
          <Route path=":productId/:slug" element={<ProductDetail />} />
        </Route>

        {/* Service - Vietnamese */}
        <Route path="/dich-vu/*" element={<Service />}>
          <Route path="" element={<ServiceList />} />
          <Route path=":serviceSlug" element={<ServiceDetail />} />
        </Route>
        {/* Service - English */}
        <Route path="/services/*" element={<Service />}>
          <Route path="" element={<ServiceList />} />
          <Route path=":serviceSlug" element={<ServiceDetail />} />
        </Route>

        {/* News - Vietnamese */}
        <Route path="/tin-tuc" element={<NewsPage />} />
        <Route path="/tin-tuc/tat-ca" element={<NewsListPage />} />
        <Route path="/tin-tuc/:category" element={<NewsListPage />} />
        <Route path="/tin-tuc/:categorySlug/:newsSlug" element={<NewsDetailPage />} />
        {/* News - English */}
        <Route path="/tin-tuc/all-act" element={<NewsListPage />} />
        <Route path="/tin-tuc/:category" element={<NewsListPage />} />
        <Route path="/tin-tuc/:categorySlug/:newsSlug" element={<NewsDetailPage />} />

        {/* Notification - Vietnamese */}
        <Route path="/thong-bao" element={<NotificationPage />} />
        <Route path="/thong-bao/:category" element={<NotificationListPage />} />
        <Route path="/thong-bao/:category/:slug" element={<NotificationDetailPage />} />
        {/* Notification - English */}
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/notifications/:category" element={<NotificationListPage />} />
        <Route path="/notifications/:id/:slug" element={<NotificationDetailPage />} />

        {/* Company info - Vietnamese */}
        <Route path="/thong-tin-cong-ty" element={<Financial />} />
        <Route path="/thong-tin-cong-ty/thong-tin-tai-chinh" element={<Financial />} />
        <Route path="/thong-tin-cong-ty/lich-su" element={<History />} />
        <Route path="/thong-tin-cong-ty/lich-su-ra-doi" element={<History />} />
        <Route path="/thong-tin-cong-ty/co-cau-to-chuc" element={<Structure />} />
        <Route path="/thong-tin-cong-ty/ban-lanh-dao" element={<Leadership />} />
        <Route path="/thong-tin-cong-ty/nganh-nghe-kinh-doanh" element={<Business />} />
        <Route path="/thong-tin-cong-ty/he-thong-chung-chi-iso" element={<Iso />} />
        <Route path="/thong-tin-cong-ty/thu-vien-cong-ty" element={<Gallery />} />
        <Route path="/thong-tin-cong-ty/thu-vien-cong-ty/:albumId" element={<GalleryDetail />} />
        {/* Company info - English */}
        <Route path="/company" element={<Financial />} />
        <Route path="/company/finance" element={<Financial />} />
        <Route path="/company/history" element={<History />} />
        <Route path="/company/structure" element={<Structure />} />
        <Route path="/company/leadership" element={<Leadership />} />
        <Route path="/company/business" element={<Business />} />
        <Route path="/company/iso" element={<Iso />} />
        <Route path="/company/gallery" element={<Gallery />} />
        <Route path="/company/gallery/:albumId" element={<GalleryDetail />} />

        {/* Contact - Vietnamese */}
        <Route path="/lien-he" element={<ContactPage />} />
        {/* Contact - English */}
        <Route path="/contact" element={<ContactPage />} />

        {/* Login */}
        <Route path="/login" element={<UserLogin />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
};

export default Public;
