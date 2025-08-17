/**
 * User Level Utilities for UI/UX
 * Based on FRONTEND_PERMISSION_GUIDE.md
 */

/**
 * Get color for user level badge
 * @param {string} userLevel - User level string
 * @returns {string} Color class
 */
export const getUserLevelColor = (userLevel) => {
  switch (userLevel) {
    case 'system': return 'danger';    // Red for SuperAdmin
    case 'manager': return 'warning';  // Orange for Admin  
    case 'staff': return 'success';    // Green for Staff
    default: return 'secondary';
  }
};

/**
 * Get display text for user level
 * @param {string|number} userLevel - User level string or number
 * @returns {string} Display text
 */
export const getUserLevelText = (userLevel) => {
  // Handle both string and number inputs
  if (typeof userLevel === 'number') {
    switch (userLevel) {
      case 1: return 'SuperAdmin';
      case 2: return 'Admin';
      case 3: return 'Staff';
      default: return 'Unknown';
    }
  }
  
  switch (userLevel) {
    case 'system': return 'SuperAdmin';
    case 'manager': return 'Admin';
    case 'staff': return 'Staff';
    default: return 'Unknown';
  }
};

/**
 * Get icon for user level
 * @param {string|number} userLevel - User level string or number
 * @returns {string} Icon emoji or class
 */
export const getUserLevelIcon = (userLevel) => {
  // Handle both string and number inputs
  if (typeof userLevel === 'number') {
    switch (userLevel) {
      case 1: return '👑';       // Crown for SuperAdmin
      case 2: return '⚡';      // Lightning for Admin
      case 3: return '👤';       // Person for Staff
      default: return '❓';
    }
  }
  
  switch (userLevel) {
    case 'system': return '👑';       // Crown for SuperAdmin
    case 'manager': return '⚡';      // Lightning for Admin
    case 'staff': return '👤';       // Person for Staff
    default: return '❓';
  }
};

/**
 * Get CSS class for user level styling
 * @param {string|number} userLevel - User level
 * @returns {string} CSS class name
 */
export const getUserLevelClass = (userLevel) => {
  const levelStr = typeof userLevel === 'number' 
    ? (userLevel === 1 ? 'system' : userLevel === 2 ? 'manager' : 'staff')
    : userLevel;
    
  switch (levelStr) {
    case 'system': return 'user-level-system';
    case 'manager': return 'user-level-manager';
    case 'staff': return 'user-level-staff';
    default: return 'user-level-unknown';
  }
};

/**
 * Convert userLevel string to number
 * @param {string} userLevel - User level string
 * @returns {number} User level number
 */
export const userLevelToNumber = (userLevel) => {
  switch (userLevel) {
    case 'system': return 1;
    case 'manager': return 2;
    case 'staff': return 3;
    default: return 3; // Default to staff
  }
};

/**
 * Convert userLevel number to string
 * @param {number} userLevel - User level number
 * @returns {string} User level string
 */
export const userLevelToString = (userLevel) => {
  switch (userLevel) {
    case 1: return 'system';
    case 2: return 'manager';
    case 3: return 'staff';
    default: return 'staff'; // Default to staff
  }
};

/**
 * Get all available user levels with their display info
 * @returns {Array} Array of user level objects
 */
export const getAllUserLevels = () => {
  return [
    {
      value: 1,
      key: 'system',
      label: 'SuperAdmin',
      icon: '👑',
      color: 'danger',
      description: 'Toàn quyền hệ thống'
    },
    {
      value: 2,
      key: 'manager',
      label: 'Admin',
      icon: '⚡',
      color: 'warning',
      description: 'Quản lý STAFF'
    },
    {
      value: 3,
      key: 'staff',
      label: 'Staff',
      icon: '👤',
      color: 'success',
      description: 'Nhân viên thực hiện công việc'
    }
  ];
};

/**
 * Get user level info object
 * @param {string|number} userLevel - User level
 * @returns {Object} User level info
 */
export const getUserLevelInfo = (userLevel) => {
  const levels = getAllUserLevels();
  
  if (typeof userLevel === 'number') {
    return levels.find(level => level.value === userLevel) || levels[2]; // Default to staff
  }
  
  return levels.find(level => level.key === userLevel) || levels[2]; // Default to staff
};

/**
 * Format user level for display
 * @param {string|number} userLevel - User level
 * @param {boolean} withIcon - Include icon
 * @returns {string} Formatted string
 */
export const formatUserLevel = (userLevel, withIcon = true) => {
  const icon = withIcon ? getUserLevelIcon(userLevel) : '';
  const text = getUserLevelText(userLevel);
  
  return withIcon ? `${icon} ${text}` : text;
};

/**
 * Get hierarchy order number (for sorting)
 * @param {string|number} userLevel - User level
 * @returns {number} Order number (lower = higher priority)
 */
export const getUserLevelOrder = (userLevel) => {
  if (typeof userLevel === 'number') {
    return userLevel;
  }
  
  switch (userLevel) {
    case 'system': return 1;
    case 'manager': return 2;
    case 'staff': return 3;
    default: return 999;
  }
};