import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "../pages/Admin/Layout/AdminLayout.js";
import AdminLogin from "../pages/Admin/Login/AdminLogin.js";
import AdminDashboard from "../pages/Admin/Dashboard/AdminDashboard.js";
import AdminProductList from "../pages/Admin/Product/AdminProductList.js";
import AdminServiceList from "../pages/Admin/Service/AdminServiceList.js";
import AdminNewsList from "../pages/Admin/News/AdminNewsList.js";
import AdminNotificationList from "../pages/Admin/Notification/AdminNotificationList.js";
import NewsCategory from "../pages/Admin/Menu/NewsCategory/NewsCategory.js";
import NotificationCategory from "../pages/Admin/Menu/NotificationCategory/NotificationCategory.js";
import ProductCategory from "../pages/Admin/Menu/ProductCategory/ProductCategory.js";

// Giả lập hàm kiểm tra đăng nhập
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin/login" />;
};

const Admin = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="" element={<AdminDashboard />} />
                <Route path="products" element={<AdminProductList />} />
                <Route path="services" element={<AdminServiceList />} />
                <Route path="news" element={<AdminNewsList />} />
                <Route
                  path="notifications"
                  element={<AdminNotificationList />}
                />
                <Route
                  path="menu/product-types"
                  element={<ProductCategory />}
                />
                <Route path="menu/news-types" element={<NewsCategory />} />
                <Route
                  path="menu/notification-types"
                  element={<NotificationCategory />}
                />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Admin;
