import React from 'react';
import { Route } from 'react-router-dom';

// Component mapping
const componentMap = {
  'Home': React.lazy(() => import('../pages/Home/HomePage/HomePage')),
  'NewsPage': React.lazy(() => import('../pages/News/NewsPage/NewsPage')),
  'NewsListPage': React.lazy(() => import('../pages/News/NewsListPage/NewsListPage')),
  'NewsDetailPage': React.lazy(() => import('../pages/News/NewsDetailPage/NewsDetailPage')),
  'ProductPage': React.lazy(() => import('../pages/Product/ProductPage/ProductPage')),
  'ProductList': React.lazy(() => import('../pages/Product/components/ProductList/ProductList')),
  'ProductDetail': React.lazy(() => import('../pages/Product/ProductDetail/ProductDetail')),
  'ServicePage': React.lazy(() => import('../pages/Service/ServicePage/ServicePage')),
  'ServiceList': React.lazy(() => import('../pages/Service/components/ServiceList/ServiceList')),
  'ServiceDetail': React.lazy(() => import('../pages/Service/ServiceDetail/ServiceDetail')),
  'NotificationPage': React.lazy(() => import('../pages/Notification/NotificationPage/NotificationPage')),
  'NotificationListPage': React.lazy(() => import('../pages/Notification/NotificationListPage/NotificationListPage')),
  'NotificationDetailPage': React.lazy(() => import('../pages/Notification/NotificationDetailPage/NotificationDetailPage')),
  'ContactPage': React.lazy(() => import('../pages/Contact/ContactPage/ContactPage')),
  'CompanyInfoPage': React.lazy(() => import('../pages/CompanyInfo/CompanyInfoPage/CompanyInfoPage')),
  'Financial': React.lazy(() => import('../pages/CompanyInfo/components/Financial/Financial')),
  'History': React.lazy(() => import('../pages/CompanyInfo/components/History/History')),
  'Structure': React.lazy(() => import('../pages/CompanyInfo/components/Structure/Structure')),
  'Leadership': React.lazy(() => import('../pages/CompanyInfo/components/Leadership/Leadership')),
  'Business': React.lazy(() => import('../pages/CompanyInfo/components/Business/Business')),
  'Iso': React.lazy(() => import('../pages/CompanyInfo/components/Iso/Iso')),
  'Gallery': React.lazy(() => import('../pages/CompanyInfo/components/Gallery/Gallery')),
  'GalleryDetail': React.lazy(() => import('../pages/CompanyInfo/components/Gallery/GalleryDetail')),
  'UserLogin': React.lazy(() => import('../pages/Login/Login')),
  'NotFoundPage': React.lazy(() => import('../pages/NotFound/NotFoundPage')),
};

// Layout mapping
const layoutMap = {
  'MainLayout': React.lazy(() => import('../components/Shared/Layout/MainLayout')),
  'AdminLayout': React.lazy(() => import('../admin/layout/AdminLayout')),
};

export const generateRoutes = (routesData) => {
  const buildRouteTree = (routes, parentId = null) => {
    return routes
      .filter(route => route.parent_id === parentId && route.is_active)
      .sort((a, b) => a.order_index - b.order_index)
      .map(route => {
        const Component = componentMap[route.component];
        const Layout = route.layout ? layoutMap[route.layout] : null;
        
        const children = buildRouteTree(routes, route.id);
        
        if (!Component) {
          console.warn(`Component ${route.component} not found`);
          return null;
        }

        const routeElement = (
          <Route
            key={route.id}
            path={route.path}
            element={
              Layout ? (
                <Layout>
                  <Component />
                </Layout>
              ) : (
                <Component />
              )
            }
          >
            {children.length > 0 && children}
          </Route>
        );

        return routeElement;
      })
      .filter(Boolean);
  };

  return buildRouteTree(routesData);
};

export const generateMenuItems = (routesData) => {
  const buildMenuTree = (routes, parentId = null) => {
    return routes
      .filter(route => route.parent_id === parentId && route.is_active)
      .sort((a, b) => a.order_index - b.order_index)
      .map(route => {
        const children = buildMenuTree(routes, route.id);
        
        return {
          id: route.id,
          path: route.path,
          label: route.label,
          icon: route.icon,
          children: children.length > 0 ? children : undefined
        };
      });
  };

  return buildMenuTree(routesData);
}; 