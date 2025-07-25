import RequireAdminAuth from './components/RequireAdminAuth';
import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/Dashboard.jsx';
import ProductsList from './pages/ProductsList.jsx';
import ServicesList from './pages/ServicesList.jsx';
import NewsList from './pages/NewsList.jsx';
import NotificationsList from './pages/NotificationsList.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound/NotFound';
import ProductCategory from './menu/ProductCategory/ProductCategory.js';
import NewsCategory from './menu/NewsCategory/NewsCategory.js';
import NotificationCategory from './menu/NotificationCategory/NotificationCategory.js';
import ConfigBanner from './pages/ConfigBanner.jsx';
import RouteManagement from './pages/RouteManagement/RouteManagement.js';
import SystemSettings from './pages/SystemSettings.jsx';
import UserManagement from './pages/UserManagement.jsx';
import MediaManagement from './pages/MediaManagement.jsx';
import PermissionManagement from './pages/PermissionManagement.jsx';

const adminRoutesConfig = [
  {
    path: 'login',
    element: Login,
    protected: false,
  },
  {
    path: '',
    layout: AdminLayout,
    guard: RequireAdminAuth,
    protected: true,
    children: [
      { index: true, element: Dashboard },
      { path: 'products', element: ProductsList },
      { path: 'services', element: ServicesList },
      { path: 'news', element: NewsList },
      { path: 'notifications', element: NotificationsList },
      { path: 'users', element: UserManagement },
      { path: 'routes', element: RouteManagement },
      { path: 'permissions', element: PermissionManagement },
      { path: 'product-category', element: ProductCategory },
      { path: 'news-category', element: NewsCategory },
      { path: 'notification-category', element: NotificationCategory },
      { path: 'config', element: ConfigBanner },
      { path: 'system-settings', element: SystemSettings },
      { path: 'media', element: MediaManagement },
      { path: '*', element: NotFound },
    ],
  },
];

export default adminRoutesConfig; 