import { Routes, Route } from 'react-router-dom';
import adminRoutesConfig from './adminRoutesConfig';

export default function AdminRoutes() {
  // console.log('🚦 Render AdminRoutes, config:', adminRoutesConfig);
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