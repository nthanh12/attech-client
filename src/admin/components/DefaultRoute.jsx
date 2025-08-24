import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const DefaultRoute = () => {
  const { user, ROLES } = useAuth();
  
  if (!user) {
    return <Navigate to="/dang-nhap" replace />;
  }

  // Role-based default route - simple and flexible
  const getDefaultRoute = () => {
    if (user.roleId <= ROLES.ADMIN) {
      return '/admin/dashboard'; // SuperAdmin & Admin go to dashboard
    } else {
      return '/admin/news'; // Editor goes to content management
    }
  };
  
  return <Navigate to={getDefaultRoute()} replace />;
};

export default DefaultRoute;