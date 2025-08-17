import { useContext, createContext, useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../contexts/AuthContext';

const PermissionContext = createContext();

export function PermissionProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  // Fetch permissions từ API
  const fetchPermissions = async () => {
    try {
      const response = await api.get('/api/permission/list');
      if (response.data.status === 1 && response.data.data) {
        setPermissions(response.data.data);
      }
    } catch (error) {
      console.error('❌ Failed to fetch permissions:', error);
    }
  };

  // Fetch user permissions từ API
  const fetchUserPermissions = async (userId) => {
    try {
      // TODO: Thay bằng endpoint lấy permissions của user
      // const response = await api.get(`/api/user/${userId}/permissions`);
      
      // Tạm thời: Nếu là admin thì có tất cả permissions
      if (user?.userType === 'admin') {
        const flatPermissions = permissions.flatMap(parent => 
          parent.children.map(child => child.permissionKey)
        );
        setUserPermissions(flatPermissions);
      } else {
        setUserPermissions([]);
      }
    } catch (error) {
      console.error('❌ Failed to fetch user permissions:', error);
      setUserPermissions([]);
    }
  };

  useEffect(() => {
    const loadPermissionsData = async () => {
      setLoading(true);
      
      try {
        // Fetch permissions list trước
        const permissionsResponse = await api.get('/api/permission/list');
        let permissionsData = [];
        
        if (permissionsResponse.data.status === 1 && permissionsResponse.data.data) {
          permissionsData = permissionsResponse.data.data;
          setPermissions(permissionsData);
        }
        
        // Fetch user permissions từ /api/auth/me
        if (isAuthenticated() && user) {
          try {
            const userResponse = await api.get('/api/auth/me');
            if (userResponse.data.status === 1 && userResponse.data.data) {
              const userData = userResponse.data.data;
              setCurrentUser(userData);
              
              // Lấy permissions từ user data
              const userPermissions = userData.permissions || [];
              setUserPermissions(userPermissions);
              
              console.log('👤 Current user data:', userData);
              console.log('🔑 User permissions loaded:', userPermissions);
            }
          } catch (userError) {
            console.error('❌ Error fetching user data:', userError);
            // Fallback: sử dụng user data từ context
            setCurrentUser(user);
            setUserPermissions(user.permissions || []);
          }
        }
      } catch (error) {
        console.error('❌ Error loading permissions:', error);
        // Fallback: chỉ cho truy cập dashboard nếu có lỗi
        if (isAuthenticated() && user) {
          setCurrentUser(user);
          setUserPermissions(['menu_dashboard']);
        }
      }
      
      setLoading(false);
    };

    loadPermissionsData();
  }, [user, isAuthenticated]);

  const hasUserPermission = (permission) => {
    if (!Array.isArray(userPermissions)) return false;
    return userPermissions.includes(permission);
  };

  const checkPermission = (permission) => {
    return hasUserPermission(permission);
  };

  const canAccess = (requiredPermissions) => {
    if (!requiredPermissions || requiredPermissions.length === 0) return true;
    if (Array.isArray(requiredPermissions)) {
      return requiredPermissions.some(permission => hasUserPermission(permission));
    }
    return hasUserPermission(requiredPermissions);
  };

  const getPermissionsByRole = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.permissions : [];
  };

  const getAllPermissions = () => {
    return permissions.flatMap(parent => 
      parent.children.map(child => ({
        ...child,
        parentLabel: parent.permissionLabel
      }))
    );
  };

  const updateUserPermissions = (newPermissions) => {
    setUserPermissions(newPermissions);
  };

  return (
    <PermissionContext.Provider value={{
      currentUser,
      userPermissions,
      permissions,
      roles,
      loading,
      hasUserPermission,
      checkPermission,
      canAccess,
      getPermissionsByRole,
      getAllPermissions,
      updateUserPermissions,
      setCurrentUser,
      fetchPermissions,
      fetchUserPermissions
    }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions() {
  return useContext(PermissionContext);
} 