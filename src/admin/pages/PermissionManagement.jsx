import React, { useState, useEffect } from 'react';
import { usePermissions } from '../hooks/usePermissions';
import PermissionGuard from '../components/PermissionGuard';
import ToastMessage from '../components/ToastMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import './PermissionManagement.css';

const PermissionManagement = () => {
  const { permissions, roles, getAllPermissions, getPermissionsByRole } = usePermissions();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderPermissionTree = (nodes, level = 0) => {
    return nodes.map(node => (
      <div key={node.id} className={`permission-node level-${level}`}>
        <div className="permission-header">
          <button
            className={`expand-btn ${expandedNodes.has(node.id) ? 'expanded' : ''}`}
            onClick={() => toggleNode(node.id)}
            disabled={!node.children || node.children.length === 0}
          >
            <i className={`bi ${expandedNodes.has(node.id) ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
          </button>
          <div className="permission-info">
            <div className="permission-label">{node.permissionLabel}</div>
            <div className="permission-key">{node.permissionKey}</div>
            <div className="permission-description">{node.description}</div>
          </div>
          <div className="permission-actions">
            <button className="btn btn-sm btn-outline-primary" title="Chỉnh sửa">
              <i className="bi bi-pencil"></i>
            </button>
            <button className="btn btn-sm btn-outline-danger" title="Xóa">
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
        {expandedNodes.has(node.id) && node.children && node.children.length > 0 && (
          <div className="permission-children">
            {renderPermissionTree(node.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const renderRolePermissions = () => {
    if (!selectedRole) return null;

    const rolePermissions = getPermissionsByRole(selectedRole.id);
    const allPermissions = getAllPermissions();

    return (
      <div className="role-permissions">
        <h4>Quyền của vai trò: {selectedRole.name}</h4>
        <div className="permissions-grid">
          {allPermissions.map(permission => (
            <div key={permission.id} className="permission-item">
              <label className="permission-checkbox">
                <input
                  type="checkbox"
                  checked={rolePermissions.includes(permission.permissionKey)}
                  onChange={() => handlePermissionToggle(permission.permissionKey)}
                />
                <span className="checkmark"></span>
                <div className="permission-details">
                  <div className="permission-name">{permission.permissionLabel}</div>
                  <div className="permission-category">{permission.parentLabel}</div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handlePermissionToggle = (permissionKey) => {
    // TODO: Implement permission toggle logic
    setToast({
      show: true,
      message: `Đã cập nhật quyền: ${permissionKey}`,
      type: 'success'
    });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  return (
    <PermissionGuard requiredPermissions={['view_permissions']}>
      <div className="permission-management">
        <div className="page-header">
          <h1>Quản lý Quyền hạn</h1>
          <p>Quản lý hệ thống phân quyền và vai trò người dùng</p>
        </div>

        <div className="permission-content">
          <div className="permission-sections">
            {/* Permission Tree Section */}
            <div className="permission-section">
              <div className="section-header">
                <h3>Cấu trúc Quyền hạn</h3>
                <button className="btn btn-primary btn-sm">
                  <i className="bi bi-plus"></i>
                  Thêm quyền mới
                </button>
              </div>
              <div className="permission-tree">
                {renderPermissionTree(permissions)}
              </div>
            </div>

            {/* Role Permissions Section */}
            <div className="permission-section">
              <div className="section-header">
                <h3>Phân quyền theo Vai trò</h3>
              </div>
              
              <div className="role-selector">
                <label>Chọn vai trò:</label>
                <select
                  value={selectedRole?.id || ''}
                  onChange={(e) => {
                    const role = roles.find(r => r.id === parseInt(e.target.value));
                    handleRoleSelect(role);
                  }}
                  className="form-control"
                >
                  <option value="">Chọn vai trò</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.name} ({role.userType})
                    </option>
                  ))}
                </select>
              </div>

              {renderRolePermissions()}
            </div>
          </div>
        </div>

        {toast.show && (
          <ToastMessage
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ show: false, message: '', type: 'success' })}
          />
        )}
      </div>
    </PermissionGuard>
  );
};

export default PermissionManagement; 