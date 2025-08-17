import { useAuth } from '../../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAdminAuth({ children }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();
  


  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
  }
  return children;
} 