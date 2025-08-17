/**
 * Hierarchy Utilities for User Management
 * Based on FRONTEND_PERMISSION_GUIDE.md
 */

/**
 * Check what actions current user can perform on target user
 * @param {Object} currentUser - Current logged in user
 * @param {Object} targetUser - User being acted upon
 * @returns {Object} Object with permission flags
 */
export const canModifyUser = (currentUser, targetUser) => {
  if (!currentUser || !targetUser) {
    return {
      canEdit: false,
      canDelete: false,
      canChangeRoles: false,
      canPromote: false,
      canViewDetails: false
    };
  }

  // Map userType to userLevel if userLevel is missing
  const getCurrentUserLevel = (user) => {
    if (user.userLevel) return user.userLevel;
    // Check various userType formats
    if (user.userType === 'system' || user.userType === 1 || user.userType === 'superadmin') return 'system';
    if (user.userType === 'manager' || user.userType === 2 || user.userType === 'admin') return 'manager';
    if (user.userType === 'staff' || user.userType === 3 || user.userType === 'editor') return 'staff';
    
    return 'staff';
  };

  const getTargetUserLevel = (user) => {
    if (user.userLevel) return user.userLevel;
    // Check various userType formats
    if (user.userType === 'system' || user.userType === 1 || user.userType === 'superadmin') return 'system';
    if (user.userType === 'manager' || user.userType === 2 || user.userType === 'admin') return 'manager';
    if (user.userType === 'staff' || user.userType === 3 || user.userType === 'editor') return 'staff';
    
    return 'staff';
  };

  const currentUserLevel = getCurrentUserLevel(currentUser);
  const targetUserLevel = getTargetUserLevel(targetUser);

  // SuperAdmin có thể làm tất cả
  if (currentUserLevel === 'system') {
    return {
      canEdit: true,
      canDelete: targetUser.id !== currentUser.id, // Không tự xóa mình
      canChangeRoles: true,
      canPromote: true,
      canViewDetails: true
    };
  }
  
  // Admin chỉ quản lý STAFF
  if (currentUserLevel === 'manager') {
    const isTargetStaff = targetUserLevel === 'staff';
    const isSelf = targetUser.id === currentUser.id;
    
    return {
      canEdit: isTargetStaff || isSelf, // Admin có thể edit chính mình
      canDelete: isTargetStaff && !isSelf, // Không thể xóa chính mình
      canChangeRoles: isTargetStaff,
      canPromote: false, // Admin không thể promote lên Admin/SuperAdmin
      canViewDetails: isTargetStaff || isSelf
    };
  }
  
  // STAFF không quản lý ai, chỉ có thể xem và edit thông tin của chính mình
  const isSelf = targetUser.id === currentUser.id;
  return {
    canEdit: isSelf, // STAFF chỉ edit được chính mình
    canDelete: false,
    canChangeRoles: false,
    canPromote: false,
    canViewDetails: isSelf
  };
};

/**
 * Get available user levels that current user can assign
 * @param {Object} currentUser - Current logged in user
 * @returns {Array} Array of available user levels
 */
export const getAvailableUserLevels = (currentUser) => {
  if (!currentUser) return [];

  // Map userType to userLevel if userLevel is missing
  const getCurrentUserLevel = (user) => {
    if (user.userLevel) return user.userLevel;
    if (user.userType === 'system' || user.userType === 1 || user.userType === 'superadmin') return 'system';
    if (user.userType === 'manager' || user.userType === 2 || user.userType === 'admin') return 'manager';
    if (user.userType === 'staff' || user.userType === 3 || user.userType === 'editor') return 'staff';
    return 'staff';
  };

  const currentUserLevel = getCurrentUserLevel(currentUser);

  if (currentUserLevel === 'system') {
    return [
      { value: 1, label: 'SuperAdmin', key: 'system', icon: '👑' },
      { value: 2, label: 'Admin', key: 'manager', icon: '⚡' },
      { value: 3, label: 'Staff', key: 'staff', icon: '👤' }
    ];
  }
  
  if (currentUserLevel === 'manager') {
    return [
      { value: 3, label: 'Staff', key: 'staff', icon: '👤' }
    ];
  }
  
  return []; // STAFF không tạo được user
};

/**
 * Check if current user can create users with specific level
 * @param {Object} currentUser - Current logged in user
 * @param {string} targetUserLevel - Target user level to create
 * @returns {boolean}
 */
export const canCreateUserWithLevel = (currentUser, targetUserLevel) => {
  if (!currentUser) return false;

  // SuperAdmin có thể tạo tất cả
  if (currentUser.userLevel === 'system') {
    return true;
  }
  
  // Admin chỉ tạo được STAFF
  if (currentUser.userLevel === 'manager') {
    return targetUserLevel === 'staff' || targetUserLevel === 3;
  }
  
  // STAFF không tạo được user nào
  return false;
};

/**
 * Check if current user can assign specific role to target user
 * @param {Object} currentUser - Current logged in user
 * @param {Object} targetUser - User being assigned role
 * @param {Object} role - Role to be assigned
 * @returns {boolean}
 */
export const canAssignRole = (currentUser, targetUser, role) => {
  if (!currentUser || !targetUser || !role) return false;

  // SuperAdmin có thể assign tất cả roles
  if (currentUser.userLevel === 'system') {
    return true;
  }
  
  // Admin chỉ assign roles cho STAFF và không thể assign admin roles
  if (currentUser.userLevel === 'manager') {
    const isTargetStaff = targetUser.userLevel === 'staff';
    const isAdminRole = ['SuperAdmin', 'Admin'].includes(role.name);
    
    return isTargetStaff && !isAdminRole;
  }
  
  // STAFF không assign được role
  return false;
};

/**
 * Get hierarchy level number for comparison
 * @param {string} userLevel - User level string
 * @returns {number} Hierarchy level (lower number = higher authority)
 */
export const getHierarchyLevel = (userLevel) => {
  switch (userLevel) {
    case 'system': return 1;
    case 'manager': return 2;
    case 'staff': return 3;
    default: return 999;
  }
};

/**
 * Check if user A has higher authority than user B
 * @param {Object} userA - First user
 * @param {Object} userB - Second user
 * @returns {boolean}
 */
export const hasHigherAuthority = (userA, userB) => {
  if (!userA || !userB) return false;
  
  const levelA = getHierarchyLevel(userA.userLevel);
  const levelB = getHierarchyLevel(userB.userLevel);
  
  return levelA < levelB; // Lower number = higher authority
};

/**
 * Get error message for unauthorized action
 * @param {Object} currentUser - Current user
 * @param {Object} targetUser - Target user
 * @param {string} action - Action being attempted
 * @returns {string} Error message
 */
export const getUnauthorizedMessage = (currentUser, targetUser, action) => {
  if (!currentUser) return 'Bạn chưa đăng nhập';
  
  if (currentUser.userLevel === 'staff') {
    return 'Staff không có quyền quản lý người dùng khác';
  }
  
  if (currentUser.userLevel === 'manager' && targetUser?.userLevel !== 'staff') {
    return 'Admin chỉ được quản lý STAFF, không thể thay đổi Admin/SuperAdmin khác';
  }
  
  return `Bạn không có quyền ${action} người dùng này`;
};