import { useAdminAuth } from '../hooks/useAdminAuth';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAdminAuth({ children }) {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
} 