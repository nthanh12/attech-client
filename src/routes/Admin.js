import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../admin/layout/AdminLayout";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import DefaultRoute from "../admin/components/DefaultRoute";

// Import admin pages
import Dashboard from "../admin/pages/Dashboard";
import NewsList from "../admin/pages/NewsList";
import ProductsList from "../admin/pages/ProductsList";
import ServicesList from "../admin/pages/ServicesList";
import NotificationsList from "../admin/pages/NotificationsList";
import UserManagement from "../admin/pages/UserManagement";
import RoleManagement from "../admin/pages/RoleManagement";
// PermissionManagement removed - using UserLevel system only
import SEOManagement from "../admin/pages/SEOManagement";
import ConfigBanner from "../admin/pages/ConfigBanner";
import SystemSettings from "../admin/pages/SystemSettings";
import AlbumList from "../admin/pages/AlbumList";
import DocumentsList from "../admin/pages/DocumentsList";
import ContactList from "../admin/pages/ContactList";
import AccountManagement from "../admin/pages/AccountManagement";

// Import category pages
import ProductCategory from "../admin/menu/ProductCategory/ProductCategory";
import NewsCategory from "../admin/menu/NewsCategory/NewsCategory";
import NotificationCategory from "../admin/menu/NotificationCategory/NotificationCategory";

const Admin = () => {
  return (
    <Routes>
      {/* Protected admin routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DefaultRoute />} />

        {/* Dashboard */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute requiredLevel={2}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Content Management */}
        <Route path="news" element={<NewsList />} />

        <Route path="products" element={<ProductsList />} />

        <Route path="services" element={<ServicesList />} />

        <Route
          path="notifications"
          element={
            <ProtectedRoute requiredLevel={3}>
              <NotificationsList />
            </ProtectedRoute>
          }
        />

        {/* Categories */}
        <Route path="news-category" element={<NewsCategory />} />

        <Route path="product-category" element={<ProductCategory />} />

        <Route
          path="notification-category"
          element={<NotificationCategory />}
        />


        <Route path="albums" element={<AlbumList />} />

        <Route path="documents" element={<DocumentsList />} />

        <Route path="contacts" element={<ContactList />} />

        {/* User Management */}
        <Route
          path="users"
          element={
            <ProtectedRoute requiredLevel={2}>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="roles"
          element={
            <ProtectedRoute
              requiredLevel={2}
              showMessage={true}
            >
              <RoleManagement />
            </ProtectedRoute>
          }
        />

        {/* PermissionManagement removed - UserLevel system doesn't need permission management UI */}

        {/* System Management */}
        <Route
          path="seo"
          element={
            <ProtectedRoute requiredLevel={3}>
              <SEOManagement />
            </ProtectedRoute>
          }
        />


        <Route
          path="config"
          element={
            <ProtectedRoute requiredLevel={2}>
              <ConfigBanner />
            </ProtectedRoute>
          }
        />

        <Route
          path="banners"
          element={
            <ProtectedRoute requiredLevel={3}>
              <ConfigBanner />
            </ProtectedRoute>
          }
        />

        <Route
          path="settings"
          element={
            <ProtectedRoute requiredLevel={3}>
              <SystemSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="system-settings"
          element={
            <ProtectedRoute requiredLevel={2}>
              <SystemSettings />
            </ProtectedRoute>
          }
        />

        {/* Account Management */}
        <Route
          path="account"
          element={
            <ProtectedRoute requiredLevel={3}>
              <AccountManagement />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default Admin;
