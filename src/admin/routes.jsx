import { Routes, Route } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/Dashboard.jsx';
import ProductsList from './pages/ProductsList.jsx';
import ServicesList from './pages/ServicesList.jsx';
import NewsList from './pages/NewsList.jsx';
import NotificationsList from './pages/NotificationsList.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound/NotFound';
import RequireAdminAuth from './components/RequireAdminAuth';
import adminRoutesConfig from './adminRoutesConfig';

export default function AdminRoutes() {
  console.log('Render AdminRoutes');
  return (
    <Routes>
      {adminRoutesConfig.map((route, idx) =>
        route.protected ? (
          <Route
            key={idx}
            path={route.path}
            element={
              <route.guard>
                <route.layout />
              </route.guard>
            }
          >
            {route.children &&
              route.children.map((child, cidx) => (
                <Route
                  key={cidx}
                  index={child.index}
                  path={child.path}
                  element={<child.element />}
                />
              ))}
          </Route>
        ) : (
          <Route key={idx} path={route.path} element={<route.element />} />
        )
      )}
    </Routes>
  );
} 