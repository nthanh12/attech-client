// System Configuration Permissions
export const SYSTEM_PERMISSIONS = {
  MENU_CONFIG: 'menu_config',
  API_ENDPOINT_MANAGER: 'menu_api_endpoint_manager',
  PERMISSION_MANAGER: 'menu_permission_manager',
  ROLE_MANAGER: 'menu_role_manager'
};

// Service Management Permissions
export const SERVICE_PERMISSIONS = {
  MENU_SERVICE_MANAGER: 'menu_service_manager',
  VIEW_SERVICES: 'view_services',
  CREATE_SERVICE: 'create_service',
  EDIT_SERVICE: 'edit_service',
  DELETE_SERVICE: 'delete_service'
};

// User Management Permissions
export const USER_PERMISSIONS = {
  MENU_USER_MANAGER: 'menu_user_manager',
  VIEW_USERS: 'view_users',
  CREATE_USER: 'create_user',
  EDIT_USER: 'edit_user',
  DELETE_USER: 'delete_user'
};

// Product Management Permissions
export const PRODUCT_PERMISSIONS = {
  MENU_PRODUCT_MANAGER: 'menu_product_manager',
  VIEW_PRODUCTS: 'view_products',
  CREATE_PRODUCT: 'create_product',
  EDIT_PRODUCT: 'edit_product',
  DELETE_PRODUCT: 'delete_product',
  VIEW_PRODUCT_CATEGORY: 'view_product_category',
  CREATE_PRODUCT_CATEGORY: 'create_product_category',
  EDIT_PRODUCT_CATEGORY: 'edit_product_category',
  DELETE_PRODUCT_CATEGORY: 'delete_product_category'
};

// Notification Management Permissions
export const NOTIFICATION_PERMISSIONS = {
  MENU_NOTIFICATION_MANAGER: 'menu_notification_manager',
  VIEW_NOTIFICATIONS: 'view_notifications',
  CREATE_NOTIFICATION: 'create_notification',
  EDIT_NOTIFICATION: 'edit_notification',
  DELETE_NOTIFICATION: 'delete_notification',
  VIEW_NOTIFICATION_CATEGORY: 'view_notification_category',
  CREATE_NOTIFICATION_CATEGORY: 'create_notification_category',
  EDIT_NOTIFICATION_CATEGORY: 'edit_notification_category',
  DELETE_NOTIFICATION_CATEGORY: 'delete_notification_category'
};

// News Management Permissions
export const NEWS_PERMISSIONS = {
  MENU_NEWS_MANAGER: 'menu_news_manager',
  VIEW_NEWS: 'view_news',
  CREATE_NEWS: 'create_news',
  EDIT_NEWS: 'edit_news',
  DELETE_NEWS: 'delete_news',
  VIEW_NEWS_CATEGORY: 'view_news_category',
  CREATE_NEWS_CATEGORY: 'create_news_category',
  EDIT_NEWS_CATEGORY: 'edit_news_category',
  DELETE_NEWS_CATEGORY: 'delete_news_category'
};

// File Management Permissions
export const FILE_PERMISSIONS = {
  FILE_UPLOAD: 'file_upload'
};

// Dashboard Permissions
export const DASHBOARD_PERMISSIONS = {
  MENU_DASHBOARD: 'menu_dashboard'
};

// All Permissions Combined
export const PERMISSIONS = {
  ...SYSTEM_PERMISSIONS,
  ...SERVICE_PERMISSIONS,
  ...USER_PERMISSIONS,
  ...PRODUCT_PERMISSIONS,
  ...NOTIFICATION_PERMISSIONS,
  ...NEWS_PERMISSIONS,
  ...FILE_PERMISSIONS,
  ...DASHBOARD_PERMISSIONS
};

// Permission Groups
export const PERMISSION_GROUPS = {
  SYSTEM: Object.values(SYSTEM_PERMISSIONS),
  SERVICES: Object.values(SERVICE_PERMISSIONS),
  USERS: Object.values(USER_PERMISSIONS),
  PRODUCTS: Object.values(PRODUCT_PERMISSIONS),
  NOTIFICATIONS: Object.values(NOTIFICATION_PERMISSIONS),
  NEWS: Object.values(NEWS_PERMISSIONS),
  FILES: Object.values(FILE_PERMISSIONS),
  DASHBOARD: Object.values(DASHBOARD_PERMISSIONS)
};

export default PERMISSIONS;