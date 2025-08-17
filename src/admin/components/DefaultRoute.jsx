import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getDefaultRouteForUser } from '../../utils/routeUtils';

const DefaultRoute = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/dang-nhap" replace />;
  }

  const defaultRoute = getDefaultRouteForUser(user);
  
  return <Navigate to={defaultRoute} replace />;
};

export default DefaultRoute;