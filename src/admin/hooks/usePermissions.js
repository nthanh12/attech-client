import { useContext, createContext, useState, useEffect } from 'react';
import { mockPermissions, mockRoles, hasPermission, checkUserPermission } from '../../utils/mockPermissions';

const PermissionContext = createContext();

export function PermissionProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Load permissions và roles từ mock data
    setPermissions(mockPermissions);
    setRoles(mockRoles);
    
    // Mock current user (Super Admin)
    const mockUser = {
      id: 1,
      username: 'admin',
      fullName: 'Super Admin',
      role: 'Super Admin',
      userType: 'admin',
      permissions: mockRoles.find(r => r.name === 'Super Admin')?.permissions || []
    };
    
    setCurrentUser(mockUser);
    setUserPermissions(mockUser.permissions);
  }, []);

  const hasUserPermission = (permission) => {
    return hasPermission(userPermissions, permission);
  };

  const checkPermission = (permission) => {
    return checkUserPermission(currentUser, permission);
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
      hasUserPermission,
      checkPermission,
      canAccess,
      getPermissionsByRole,
      getAllPermissions,
      updateUserPermissions,
      setCurrentUser
    }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions() {
  return useContext(PermissionContext);
} 