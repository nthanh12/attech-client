/**
 * Role Utilities for UI/UX - Simple roleId system
 */

/**
 * Get color for role badge
 * @param {number} roleId - Role ID (1-4)
 * @returns {string} Color class
 */
export const getRoleColor = (roleId) => {
  switch (roleId) {
    case 1: return 'danger';    // Red for SuperAdmin
    case 2: return 'warning';   // Orange for Admin
    case 3: return 'info';      // Blue for Editor
    case 4: return 'success';   // Green for User
    default: return 'secondary';
  }
};

/**
 * Get display text for role
 * @param {number} roleId - Role ID (1-4)
 * @returns {string} Display text
 */
export const getRoleText = (roleId) => {
  switch (roleId) {
    case 1: return 'Super Admin';
    case 2: return 'Admin';
    case 3: return 'Editor';
    case 4: return 'User';
    default: return 'Unknown';
  }
};

/**
 * Get icon for role
 * @param {number} roleId - Role ID (1-4)
 * @returns {string} Icon emoji
 */
export const getRoleIcon = (roleId) => {
  switch (roleId) {
    case 1: return '👑';       // Crown for SuperAdmin
    case 2: return '⚡';      // Lightning for Admin
    case 3: return '📝';       // Pencil for Editor
    case 4: return '👤';       // Person for User
    default: return '❓';
  }
};

/**
 * Get CSS class for role styling
 * @param {number} roleId - Role ID
 * @returns {string} CSS class name
 */
export const getRoleClass = (roleId) => {
  switch (roleId) {
    case 1: return 'role-superadmin';
    case 2: return 'role-admin';
    case 3: return 'role-editor';
    case 4: return 'role-user';
    default: return 'role-unknown';
  }
};

/**
 * Get all available roles with their display info
 * @returns {Array} Array of role objects
 */
export const getAllRoles = () => {
  return [
    {
      id: 1,
      name: 'superadmin',
      label: 'Super Admin',
      icon: '👑',
      color: 'danger',
      description: 'Toàn quyền hệ thống'
    },
    {
      id: 2,
      name: 'admin',
      label: 'Admin',
      icon: '⚡',
      color: 'warning',
      description: 'Quản lý users và content'
    },
    {
      id: 3,
      name: 'editor',
      label: 'Editor',
      icon: '📝',
      color: 'info',
      description: 'Quản lý content'
    },
    {
      id: 4,
      name: 'user',
      label: 'User',
      icon: '👤',
      color: 'success',
      description: 'Người dùng cơ bản'
    }
  ];
};

/**
 * Get role info object
 * @param {number} roleId - Role ID
 * @returns {Object} Role info
 */
export const getRoleInfo = (roleId) => {
  const roles = getAllRoles();
  return roles.find(role => role.id === roleId) || roles[2]; // Default to editor
};

/**
 * Format role for display
 * @param {number} roleId - Role ID
 * @param {boolean} withIcon - Include icon
 * @returns {string} Formatted string
 */
export const formatRole = (roleId, withIcon = true) => {
  const icon = withIcon ? getRoleIcon(roleId) : '';
  const text = getRoleText(roleId);
  
  return withIcon ? `${icon} ${text}` : text;
};