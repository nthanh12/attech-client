import React from 'react';
import { usePermissions } from '../hooks/usePermissions';

const PermissionGuard = ({ 
  children, 
  requiredPermissions, 
  fallback = null,
  showMessage = false 
}) => {
  const { canAccess } = usePermissions();

  if (!canAccess(requiredPermissions)) {
    if (showMessage) {
      return (
        <div className="permission-denied">
          <div className="alert alert-warning">
            <i className="bi bi-exclamation-triangle"></i>
            <span>Bạn không có quyền truy cập trang này</span>
          </div>
        </div>
      );
    }
    return fallback;
  }

  return children;
};

export default PermissionGuard; 