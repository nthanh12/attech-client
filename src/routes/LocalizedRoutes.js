import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useI18n } from '../hooks/useI18n';
import { getLanguageFromPath } from '../utils/routeHelpers';
import MainLayout from "../components/Shared/Layout/MainLayout";

// Lazy load pages for code splitting
const Home = lazy(() => import("../pages/Home/HomePage/HomePage"));
const Product = lazy(() => import("../pages/Product/ProductPage/ProductPage"));
const ProductList = lazy(() => import("../pages/Product/components/ProductList/ProductList"));
const ProductDetail = lazy(() => import("../pages/Product/ProductDetail/ProductDetail"));

const Service = lazy(() => import("../pages/Service/ServicePage/ServicePage"));
const ServiceList = lazy(() => import("../pages/Service/components/ServiceList/ServiceList"));
const ServiceDetail = lazy(() => import("../pages/Service/ServiceDetail/ServiceDetail"));

const NewsPage = lazy(() => import("../pages/News/NewsPage/NewsPage"));
const NewsListPage = lazy(() => import("../pages/News/NewsListPage/NewsListPage"));
const NewsDetailPage = lazy(() => import("../pages/News/NewsDetailPage/NewsDetailPage"));

const NotificationPage = lazy(() => import("../pages/Notification/NotificationPage/NotificationPage"));
const NotificationListPage = lazy(() => import("../pages/Notification/NotificationListPage/NotificationListPage"));
const NotificationDetailPage = lazy(() => import("../pages/Notification/NotificationDetailPage/NotificationDetailPage"));

const ContactPage = lazy(() => import("../pages/Contact/ContactPage/ContactPage"));
const Financial = lazy(() => import("../pages/CompanyInfo/components/Financial/Financial"));
const History = lazy(() => import("../pages/CompanyInfo/components/History/History"));
const Structure = lazy(() => import("../pages/CompanyInfo/components/Structure/Structure"));
const Leadership = lazy(() => import("../pages/CompanyInfo/components/Leadership/Leadership"));
const Business = lazy(() => import("../pages/CompanyInfo/components/Business/Business"));
const Iso = lazy(() => import("../pages/CompanyInfo/components/Iso/Iso"));
const Gallery = lazy(() => import("../pages/CompanyInfo/components/Gallery/Gallery"));
const GalleryDetail = lazy(() => import("../pages/CompanyInfo/components/Gallery/GalleryDetail"));

const NotFoundPage = lazy(() => import("../pages/NotFound/NotFoundPage"));
const UserLogin = lazy(() => import('../pages/Login/Login'));

// Minimal loading component to avoid double loading indicators
const PageLoader = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '20vh', // Smaller height
      opacity: 0.7 // More subtle
    }}>
      <div style={{
        width: '20px', // Smaller spinner
        height: '20px',
        border: '2px solid #f3f3f3',
        borderTop: '2px solid #2563eb',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
    </div>
  );
};

const LocalizedRoutes = () => {
  const location = useLocation();
  const { changeLanguage } = useI18n();
  
  // Sync language with URL (only on mount and language-related path changes)
  useEffect(() => {
    const langFromPath = getLanguageFromPath(location.pathname);
    const currentLang = localStorage.getItem('i18nextLng') || 'vi';
    
    // Only change language if it's different from current, and skip redirect
    if (langFromPath !== currentLang) {
      changeLanguage(langFromPath, true); // Skip redirect to prevent loops
    }
  }, [location.pathname, changeLanguage]);
  
  return (
    <MainLayout>
      <Suspense fallback={null}>
        <Routes>
          {/* Vietnamese Routes */}
          <Route path="/" element={<Home />} />
          
          {/* English Routes - with /en prefix */}
          <Route path="/en" element={<Home />} />
          <Route path="/en/" element={<Home />} />

          {/* Product Routes */}
          {/* Vietnamese */}
          <Route path="/san-pham" element={<Product />}>
            <Route index element={<ProductList />} />
            <Route path=":category" element={<ProductList />} />
            <Route path=":category/:slug" element={<ProductDetail />} />
          </Route>
          {/* English */}
          <Route path="/en/products" element={<Product />}>
            <Route index element={<ProductList />} />
            <Route path=":category" element={<ProductList />} />
            <Route path=":category/:slug" element={<ProductDetail />} />
          </Route>

          {/* Service Routes */}
          {/* Vietnamese */}
          <Route path="/dich-vu" element={<Service />}>
            <Route index element={<ServiceList />} />
            <Route path=":slug" element={<ServiceDetail />} />
          </Route>
          {/* English */}
          <Route path="/en/services" element={<Service />}>
            <Route index element={<ServiceList />} />
            <Route path=":slug" element={<ServiceDetail />} />
          </Route>

          {/* News Routes */}
          {/* Vietnamese */}
          <Route path="/tin-tuc" element={<NewsPage />} />
          <Route path="/tin-tuc/tat-ca" element={<NewsListPage />} />
          <Route path="/tin-tuc/:category" element={<NewsListPage />} />
          <Route path="/tin-tuc/:category/:slug" element={<NewsDetailPage />} />
          {/* English */}
          <Route path="/en/news" element={<NewsPage />} />
          <Route path="/en/news/all" element={<NewsListPage />} />
          <Route path="/en/news/:category" element={<NewsListPage />} />
          <Route path="/en/news/:category/:slug" element={<NewsDetailPage />} />

          {/* Notification Routes */}
          {/* Vietnamese */}
          <Route path="/thong-bao" element={<NotificationPage />} />
          <Route path="/thong-bao/:category" element={<NotificationListPage />} />
          <Route path="/thong-bao/:category/:slug" element={<NotificationDetailPage />} />
          {/* English */}
          <Route path="/en/notifications" element={<NotificationPage />} />
          <Route path="/en/notifications/:category" element={<NotificationListPage />} />
          <Route path="/en/notifications/:category/:slug" element={<NotificationDetailPage />} />

          {/* Company Info Routes */}
          {/* Vietnamese */}
          <Route path="/thong-tin-cong-ty" element={<Financial />} />
          <Route path="/thong-tin-cong-ty/thong-tin-tai-chinh" element={<Financial />} />
          <Route path="/thong-tin-cong-ty/lich-su-ra-doi" element={<History />} />
          <Route path="/thong-tin-cong-ty/co-cau-to-chuc" element={<Structure />} />
          <Route path="/thong-tin-cong-ty/ban-lanh-dao" element={<Leadership />} />
          <Route path="/thong-tin-cong-ty/nganh-nghe-kinh-doanh" element={<Business />} />
          <Route path="/thong-tin-cong-ty/he-thong-chung-chi-iso" element={<Iso />} />
          <Route path="/thong-tin-cong-ty/thu-vien-cong-ty" element={<Gallery />} />
          <Route path="/thong-tin-cong-ty/thu-vien-cong-ty/:albumId" element={<GalleryDetail />} />
          {/* English */}
          <Route path="/en/company" element={<Financial />} />
          <Route path="/en/company/finance" element={<Financial />} />
          <Route path="/en/company/history" element={<History />} />
          <Route path="/en/company/structure" element={<Structure />} />
          <Route path="/en/company/leadership" element={<Leadership />} />
          <Route path="/en/company/business" element={<Business />} />
          <Route path="/en/company/iso" element={<Iso />} />
          <Route path="/en/company/gallery" element={<Gallery />} />
          <Route path="/en/company/gallery/:albumId" element={<GalleryDetail />} />

          {/* Contact Routes */}
          <Route path="/lien-he" element={<ContactPage />} />
          <Route path="/en/contact" element={<ContactPage />} />

          {/* Login Routes */}
          <Route path="/dang-nhap" element={<UserLogin />} />
          <Route path="/en/login" element={<UserLogin />} />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
};

export default LocalizedRoutes;