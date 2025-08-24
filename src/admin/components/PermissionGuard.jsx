import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const PermissionGuard = ({ 
  children, 
  requiredRoleId = null, // roleId required (1-3)
  fallback = null,
  showMessage = false 
}) => {
  const { hasPermission, ROLES } = useAuth();

  // Use roleId system
  if (requiredRoleId !== null) {
    if (!hasPermission(requiredRoleId)) {
      if (showMessage) {
        const getRoleName = (roleId) => {
          switch (roleId) {
            case ROLES.SUPERADMIN: return 'Super Admin';
            case ROLES.ADMIN: return 'Admin';
            case ROLES.EDITOR: return 'Editor';
            default: return 'Unknown';
          }
        };

        return (
          <div className="permission-denied">
            <div className="alert alert-warning">
              <i className="bi bi-exclamation-triangle"></i>
              <span>Bạn không có quyền truy cập. Yêu cầu: {getRoleName(requiredRoleId)}</span>
            </div>
          </div>
        );
      }
      return fallback;
    }
  }

  return children;
};

export default PermissionGuard;