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

const Public = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Product */}
        <Route path="/products/*" element={<Product />}>
          <Route path="" element={<ProductList />} />
          <Route path=":category" element={<ProductList />} />
          <Route path=":productId/:slug" element={<ProductDetail />} />
        </Route>

        {/* Service */}
        <Route path="/services/*" element={<Service />}>
          <Route path="" element={<ServiceList />} />
          <Route path=":serviceSlug" element={<ServiceDetail />} />
        </Route>

        {/* News */}
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/all-act" element={<NewsListPage />} />
        <Route path="/news/:category" element={<NewsListPage />} />
        <Route path="/news/:id/:slug" element={<NewsDetailPage />} />

        {/* Notification */}
        <Route path="/notifications" element={<NotificationPage />} />
        <Route
          path="/notifications/:category"
          element={<NotificationListPage />}
        />
        <Route
          path="/notifications/:id/:slug"
          element={<NotificationDetailPage />}
        />

        {/* Company info */}
        <Route path="/company" element={<Financial />} />
        <Route path="/company/finance" element={<Financial />} />
        <Route path="/company/history" element={<History />} />
        <Route path="/company/structure" element={<Structure />} />
        <Route path="/company/leadership" element={<Leadership />} />
        <Route path="/company/business" element={<Business />} />
        <Route path="/company/iso" element={<Iso />} />
        
        {/* Gallery - Changed from nested routes to flat routes */}
        <Route path="/company/gallery" element={<Gallery />} />
        <Route path="/company/gallery/:albumId" element={<GalleryDetail />} />

        {/* Contact */}
        <Route path="/contact" element={<ContactPage />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
};

export default Public;
