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
import PermissionManagement from "../admin/pages/PermissionManagement";
import SEOManagement from "../admin/pages/SEOManagement";
import ConfigBanner from "../admin/pages/ConfigBanner";
import SystemSettings from "../admin/pages/SystemSettings";
import AlbumList from "../admin/pages/AlbumList";
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
            <ProtectedRoute requiredPermissions={["menu_view"]}>
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
            <ProtectedRoute requiredPermissions={["view_notifications"]}>
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

        {/* User Management */}
        <Route
          path="users"
          element={
            <ProtectedRoute requiredPermissions={["view_users"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="roles"
          element={
            <ProtectedRoute
              requiredPermissions={["menu_view"]}
              showMessage={true}
            >
              <RoleManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="permissions"
          element={
            <ProtectedRoute requiredPermissions={["view_roles"]}>
              <PermissionManagement />
            </ProtectedRoute>
          }
        />

        {/* System Management */}
        <Route
          path="seo"
          element={
            <ProtectedRoute requiredPermissions={["menu_view"]}>
              <SEOManagement />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="media"
          element={
            <ProtectedRoute requiredPermissions={["menu_view"]}>
              <NewMediaManagement />
            </ProtectedRoute>
          }
        /> */}

        {/* <Route
          path="documents"
          element={
            <ProtectedRoute requiredPermissions={["view_documents"]}>
              <NewDocumentManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="files"
          element={
            <ProtectedRoute requiredPermissions={["menu_view"]}>
              <NewFileManagement />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="config"
          element={
            <ProtectedRoute requiredPermissions={["menu_config"]}>
              <ConfigBanner />
            </ProtectedRoute>
          }
        />

        <Route
          path="banners"
          element={
            <ProtectedRoute requiredPermissions={["menu_view"]}>
              <ConfigBanner />
            </ProtectedRoute>
          }
        />

        <Route
          path="settings"
          element={
            <ProtectedRoute requiredPermissions={["menu_view"]}>
              <SystemSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="system-settings"
          element={
            <ProtectedRoute requiredPermissions={["menu_config"]}>
              <SystemSettings />
            </ProtectedRoute>
          }
        />

        {/* Account Management */}
        <Route
          path="account"
          element={
            <ProtectedRoute requiredPermissions={["menu_view"]}>
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
