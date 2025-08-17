/**
 * Utility functions for route management based on user permissions
 */

/**
 * Get the first accessible route for a user based on their permissions
 * @param {Object} user - Current user object
 * @returns {string} Route path
 */
export const getDefaultRouteForUser = (user) => {
  if (!user || !user.permissions) {
    return '/dang-nhap';
  }

  const permissions = user.permissions;

  // Admin routes (in priority order)
  if (permissions.includes('menu_user_manager')) {
    return '/admin/users';
  }

  if (permissions.includes('menu_role_manager')) {
    return '/admin/roles';
  }

  if (permissions.includes('menu_news_manager')) {
    return '/admin/news';
  }

  if (permissions.includes('view_news') || permissions.includes('create_news')) {
    return '/admin/news';
  }

  if (permissions.includes('view_products') || permissions.includes('create_product')) {
    return '/admin/products';
  }

  if (permissions.includes('view_services') || permissions.includes('create_service')) {
    return '/admin/services';
  }

  if (permissions.includes('view_notifications') || permissions.includes('create_notification')) {
    return '/admin/notifications';
  }

  // If user has any admin-related permission, try dashboard
  if (permissions.includes('menu_view')) {
    return '/admin/dashboard';
  }

  // Default fallback to first accessible admin page
  return '/admin/news'; // Since editor has news permissions
};

/**
 * Check if user can access a specific route
 * @param {Object} user - Current user object
 * @param {string} route - Route to check
 * @returns {boolean}
 */
export const canAccessRoute = (user, route) => {
  if (!user || !user.permissions) {
    return false;
  }

  const permissions = user.permissions;

  switch (route) {
    case '/admin/users':
      return permissions.includes('menu_user_manager');
    case '/admin/roles':
      return permissions.includes('menu_role_manager');
    case '/admin/news':
      return permissions.includes('menu_news_manager') || 
             permissions.includes('view_news') || 
             permissions.includes('create_news');
    case '/admin/products':
      return permissions.includes('view_products') || 
             permissions.includes('create_product');
    case '/admin/services':
      return permissions.includes('view_services') || 
             permissions.includes('create_service');
    case '/admin/notifications':
      return permissions.includes('view_notifications') || 
             permissions.includes('create_notification');
    case '/admin/dashboard':
      return permissions.includes('menu_view');
    default:
      return false;
  }
};