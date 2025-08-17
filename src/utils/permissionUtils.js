/**
 * Permission Utilities for Frontend
 * Based on FRONTEND_PERMISSION_GUIDE.md
 */

/**
 * Check if user has specific permission
 * @param {Object} user - Current user object
 * @param {string} permission - Permission to check
 * @returns {boolean}
 */
export const hasPermission = (user, permission) => {
  if (!user) return false;
  
  // SuperAdmin và Admin có toàn quyền (check cả userLevel và userType)
  if (user.userLevel === 'system' || user.userLevel === 'manager' || 
      user.userType === 'system' || user.userType === 'manager' || user.userType === 'admin') {
    return true;
  }
  
  // STAFF/Editor check permissions cụ thể
  return user.permissions?.includes(permission) || false;
};

/**
 * Check if user can manage users
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const canManageUsers = (user) => {
  return hasPermission(user, 'menu_user_manager');
};

/**
 * Check if user can create users
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const canCreateUser = (user) => {
  return hasPermission(user, 'create_user');
};

/**
 * Check if user can view users
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const canViewUsers = (user) => {
  return hasPermission(user, 'view_users');
};

/**
 * Check if user can edit users
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const canEditUser = (user) => {
  return hasPermission(user, 'edit_user');
};

/**
 * Check if user can delete users
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const canDeleteUser = (user) => {
  return hasPermission(user, 'delete_user');
};

/**
 * Check if user can manage roles
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const canManageRoles = (user) => {
  return hasPermission(user, 'menu_role_manager');
};

/**
 * Check if user can manage permissions
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export const canManagePermissions = (user) => {
  return hasPermission(user, 'menu_permission_manager');
};

/**
 * Get all permissions user has
 * @param {Object} user - Current user object
 * @returns {Array} Array of permission strings
 */
export const getUserPermissions = (user) => {
  if (!user) return [];
  
  // SuperAdmin và Admin có toàn quyền
  if (user.userLevel === 'system' || user.userLevel === 'manager') {
    // Return a comprehensive list of all possible permissions
    return [
      'menu_dashboard',
      'menu_config', 'menu_api_endpoint_manager', 'menu_permission_manager', 'menu_role_manager',
      'menu_service_manager', 'view_services', 'create_service', 'edit_service', 'delete_service',
      'menu_user_manager', 'view_users', 'create_user', 'edit_user', 'delete_user',
      'menu_product_manager', 'view_products', 'create_product', 'edit_product', 'delete_product',
      'view_product_category', 'create_product_category', 'edit_product_category', 'delete_product_category',
      'menu_notification_manager', 'view_notifications', 'create_notification', 'edit_notification', 'delete_notification',
      'view_notification_category', 'create_notification_category', 'edit_notification_category', 'delete_notification_category',
      'menu_news_manager', 'view_news', 'create_news', 'edit_news', 'delete_news',
      'view_news_category', 'create_news_category', 'edit_news_category', 'delete_news_category',
      'file_upload'
    ];
  }
  
  return user.permissions || [];
};