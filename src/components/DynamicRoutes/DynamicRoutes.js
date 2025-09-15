import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getRoutes } from '../../api';
import { generateRoutes } from '../../utils/routeGenerator';
import LoadingSpinner from '../../admin/components/LoadingSpinner';
import { mockRoutes } from '../../utils/mockRoutes';

const DynamicRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch routes from API
        const routesData = await getRoutes();
        setRoutes(routesData);
        
      } catch (err) {setError('Không thể tải cấu hình routes');
        
        // Fallback to static routes if API fails
        setRoutes(getStaticRoutes());
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  // Static routes as fallback - sử dụng mock data
  const getStaticRoutes = () => {
    return mockRoutes;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Lỗi tải cấu hình</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Thử lại
        </button>
      </div>
    );
  }

  const generatedRoutes = generateRoutes(routes);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {generatedRoutes}
      </Routes>
    </Suspense>
  );
};

export default DynamicRoutes; 