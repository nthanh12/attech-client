import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const RouteWrapper = ({ children }) => {
  const location = useLocation();
  const params = useParams();
  const prevParams = useRef();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Log route change for debugging (remove in production)// Store current params for next comparison
    prevParams.current = params;
  }, [location.pathname, params.slug, params.category]);

  // Create unique key from pathname and critical params
  const routeKey = `${location.pathname}-${params.slug || ''}-${params.category || ''}`;

  // Force re-mount when route changes by using unique key
  return (
    <div key={routeKey}>
      {children}
    </div>
  );
};

export default RouteWrapper;