// Mock data cho permission system phù hợp với admin hiện tại
export const mockPermissions = [
  {
    "id": 1,
    "permissionKey": "dashboard",
    "permissionLabel": "Dashboard",
    "description": "Truy cập trang tổng quan",
    "parentId": null,
    "children": [
      {
        "id": 101,
        "permissionKey": "view_dashboard",
        "permissionLabel": "Xem Dashboard",
        "description": "Xem thống kê và báo cáo tổng quan",
        "parentId": 1,
        "children": []
      }
    ]
  },
  {
    "id": 2,
    "permissionKey": "content_management",
    "permissionLabel": "Quản lý nội dung",
    "description": "Quản lý các loại nội dung",
    "parentId": null,
    "children": [
      {
        "id": 201,
        "permissionKey": "view_products",
        "permissionLabel": "Xem sản phẩm",
        "description": "Xem danh sách và chi tiết sản phẩm",
        "parentId": 2,
        "children": []
      },
      {
        "id": 202,
        "permissionKey": "create_product",
        "permissionLabel": "Tạo sản phẩm",
        "description": "Thêm sản phẩm mới",
        "parentId": 2,
        "children": []
      },
      {
        "id": 203,
        "permissionKey": "edit_product",
        "permissionLabel": "Sửa sản phẩm",
        "description": "Chỉnh sửa thông tin sản phẩm",
        "parentId": 2,
        "children": []
      },
      {
        "id": 204,
        "permissionKey": "delete_product",
        "permissionLabel": "Xóa sản phẩm",
        "description": "Xóa sản phẩm khỏi hệ thống",
        "parentId": 2,
        "children": []
      },
      {
        "id": 205,
        "permissionKey": "view_services",
        "permissionLabel": "Xem dịch vụ",
        "description": "Xem danh sách và chi tiết dịch vụ",
        "parentId": 2,
        "children": []
      },
      {
        "id": 206,
        "permissionKey": "create_service",
        "permissionLabel": "Tạo dịch vụ",
        "description": "Thêm dịch vụ mới",
        "parentId": 2,
        "children": []
      },
      {
        "id": 207,
        "permissionKey": "edit_service",
        "permissionLabel": "Sửa dịch vụ",
        "description": "Chỉnh sửa thông tin dịch vụ",
        "parentId": 2,
        "children": []
      },
      {
        "id": 208,
        "permissionKey": "delete_service",
        "permissionLabel": "Xóa dịch vụ",
        "description": "Xóa dịch vụ khỏi hệ thống",
        "parentId": 2,
        "children": []
      },
      {
        "id": 209,
        "permissionKey": "view_news",
        "permissionLabel": "Xem tin tức",
        "description": "Xem danh sách và chi tiết tin tức",
        "parentId": 2,
        "children": []
      },
      {
        "id": 210,
        "permissionKey": "create_news",
        "permissionLabel": "Tạo tin tức",
        "description": "Thêm tin tức mới",
        "parentId": 2,
        "children": []
      },
      {
        "id": 211,
        "permissionKey": "edit_news",
        "permissionLabel": "Sửa tin tức",
        "description": "Chỉnh sửa thông tin tin tức",
        "parentId": 2,
        "children": []
      },
      {
        "id": 212,
        "permissionKey": "delete_news",
        "permissionLabel": "Xóa tin tức",
        "description": "Xóa tin tức khỏi hệ thống",
        "parentId": 2,
        "children": []
      },
      {
        "id": 213,
        "permissionKey": "view_notifications",
        "permissionLabel": "Xem thông báo",
        "description": "Xem danh sách và chi tiết thông báo",
        "parentId": 2,
        "children": []
      },
      {
        "id": 214,
        "permissionKey": "create_notification",
        "permissionLabel": "Tạo thông báo",
        "description": "Thêm thông báo mới",
        "parentId": 2,
        "children": []
      },
      {
        "id": 215,
        "permissionKey": "edit_notification",
        "permissionLabel": "Sửa thông báo",
        "description": "Chỉnh sửa thông tin thông báo",
        "parentId": 2,
        "children": []
      },
      {
        "id": 216,
        "permissionKey": "delete_notification",
        "permissionLabel": "Xóa thông báo",
        "description": "Xóa thông báo khỏi hệ thống",
        "parentId": 2,
        "children": []
      }
    ]
  },
  {
    "id": 3,
    "permissionKey": "category_management",
    "permissionLabel": "Quản lý danh mục",
    "description": "Quản lý các danh mục",
    "parentId": null,
    "children": [
      {
        "id": 301,
        "permissionKey": "view_product_categories",
        "permissionLabel": "Xem danh mục sản phẩm",
        "description": "Xem danh sách danh mục sản phẩm",
        "parentId": 3,
        "children": []
      },
      {
        "id": 302,
        "permissionKey": "create_product_category",
        "permissionLabel": "Tạo danh mục sản phẩm",
        "description": "Thêm danh mục sản phẩm mới",
        "parentId": 3,
        "children": []
      },
      {
        "id": 303,
        "permissionKey": "edit_product_category",
        "permissionLabel": "Sửa danh mục sản phẩm",
        "description": "Chỉnh sửa danh mục sản phẩm",
        "parentId": 3,
        "children": []
      },
      {
        "id": 304,
        "permissionKey": "delete_product_category",
        "permissionLabel": "Xóa danh mục sản phẩm",
        "description": "Xóa danh mục sản phẩm",
        "parentId": 3,
        "children": []
      },
      {
        "id": 305,
        "permissionKey": "view_news_categories",
        "permissionLabel": "Xem danh mục tin tức",
        "description": "Xem danh sách danh mục tin tức",
        "parentId": 3,
        "children": []
      },
      {
        "id": 306,
        "permissionKey": "create_news_category",
        "permissionLabel": "Tạo danh mục tin tức",
        "description": "Thêm danh mục tin tức mới",
        "parentId": 3,
        "children": []
      },
      {
        "id": 307,
        "permissionKey": "edit_news_category",
        "permissionLabel": "Sửa danh mục tin tức",
        "description": "Chỉnh sửa danh mục tin tức",
        "parentId": 3,
        "children": []
      },
      {
        "id": 308,
        "permissionKey": "delete_news_category",
        "permissionLabel": "Xóa danh mục tin tức",
        "description": "Xóa danh mục tin tức",
        "parentId": 3,
        "children": []
      },
      {
        "id": 309,
        "permissionKey": "view_notification_categories",
        "permissionLabel": "Xem danh mục thông báo",
        "description": "Xem danh sách danh mục thông báo",
        "parentId": 3,
        "children": []
      },
      {
        "id": 310,
        "permissionKey": "create_notification_category",
        "permissionLabel": "Tạo danh mục thông báo",
        "description": "Thêm danh mục thông báo mới",
        "parentId": 3,
        "children": []
      },
      {
        "id": 311,
        "permissionKey": "edit_notification_category",
        "permissionLabel": "Sửa danh mục thông báo",
        "description": "Chỉnh sửa danh mục thông báo",
        "parentId": 3,
        "children": []
      },
      {
        "id": 312,
        "permissionKey": "delete_notification_category",
        "permissionLabel": "Xóa danh mục thông báo",
        "description": "Xóa danh mục thông báo",
        "parentId": 3,
        "children": []
      }
    ]
  },
  {
    "id": 4,
    "permissionKey": "user_management",
    "permissionLabel": "Quản lý người dùng",
    "description": "Quản lý tài khoản người dùng",
    "parentId": null,
    "children": [
      {
        "id": 401,
        "permissionKey": "view_users",
        "permissionLabel": "Xem người dùng",
        "description": "Xem danh sách và chi tiết người dùng",
        "parentId": 4,
        "children": []
      },
      {
        "id": 402,
        "permissionKey": "create_user",
        "permissionLabel": "Tạo người dùng",
        "description": "Thêm người dùng mới",
        "parentId": 4,
        "children": []
      },
      {
        "id": 403,
        "permissionKey": "edit_user",
        "permissionLabel": "Sửa người dùng",
        "description": "Chỉnh sửa thông tin người dùng",
        "parentId": 4,
        "children": []
      },
      {
        "id": 404,
        "permissionKey": "delete_user",
        "permissionLabel": "Xóa người dùng",
        "description": "Xóa người dùng khỏi hệ thống",
        "parentId": 4,
        "children": []
      }
    ]
  },
  {
    "id": 5,
    "permissionKey": "system_management",
    "permissionLabel": "Quản lý hệ thống",
    "description": "Quản lý cấu hình hệ thống",
    "parentId": null,
    "children": [
      {
        "id": 501,
        "permissionKey": "view_routes",
        "permissionLabel": "Xem routes",
        "description": "Xem danh sách routes",
        "parentId": 5,
        "children": []
      },
      {
        "id": 502,
        "permissionKey": "create_route",
        "permissionLabel": "Tạo route",
        "description": "Thêm route mới",
        "parentId": 5,
        "children": []
      },
      {
        "id": 503,
        "permissionKey": "edit_route",
        "permissionLabel": "Sửa route",
        "description": "Chỉnh sửa route",
        "parentId": 5,
        "children": []
      },
      {
        "id": 504,
        "permissionKey": "delete_route",
        "permissionLabel": "Xóa route",
        "description": "Xóa route",
        "parentId": 5,
        "children": []
      },
      {
        "id": 505,
        "permissionKey": "view_system_settings",
        "permissionLabel": "Xem cài đặt hệ thống",
        "description": "Xem cấu hình hệ thống",
        "parentId": 5,
        "children": []
      },
      {
        "id": 506,
        "permissionKey": "edit_system_settings",
        "permissionLabel": "Sửa cài đặt hệ thống",
        "description": "Chỉnh sửa cấu hình hệ thống",
        "parentId": 5,
        "children": []
      },
      {
        "id": 507,
        "permissionKey": "view_banner_config",
        "permissionLabel": "Xem cấu hình banner",
        "description": "Xem cấu hình banner",
        "parentId": 5,
        "children": []
      },
      {
        "id": 508,
        "permissionKey": "edit_banner_config",
        "permissionLabel": "Sửa cấu hình banner",
        "description": "Chỉnh sửa cấu hình banner",
        "parentId": 5,
        "children": []
      }
    ]
  },
  {
    "id": 6,
    "permissionKey": "media_management",
    "permissionLabel": "Quản lý media",
    "description": "Quản lý file và media",
    "parentId": null,
    "children": [
      {
        "id": 601,
        "permissionKey": "view_media",
        "permissionLabel": "Xem media",
        "description": "Xem danh sách file media",
        "parentId": 6,
        "children": []
      },
      {
        "id": 602,
        "permissionKey": "upload_media",
        "permissionLabel": "Upload media",
        "description": "Tải file lên hệ thống",
        "parentId": 6,
        "children": []
      },
      {
        "id": 603,
        "permissionKey": "delete_media",
        "permissionLabel": "Xóa media",
        "description": "Xóa file media",
        "parentId": 6,
        "children": []
      }
    ]
  },
  {
    "id": 7,
    "permissionKey": "permission_management",
    "permissionLabel": "Quản lý quyền hạn",
    "description": "Quản lý phân quyền hệ thống",
    "parentId": null,
    "children": [
      {
        "id": 701,
        "permissionKey": "view_permissions",
        "permissionLabel": "Xem quyền hạn",
        "description": "Xem danh sách quyền hạn",
        "parentId": 7,
        "children": []
      },
      {
        "id": 702,
        "permissionKey": "edit_permissions",
        "permissionLabel": "Sửa quyền hạn",
        "description": "Chỉnh sửa phân quyền",
        "parentId": 7,
        "children": []
      }
    ]
  }
];

// Mock data cho roles với permissions phù hợp với admin hiện tại
export const mockRoles = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Quyền quản trị tối cao',
    userType: 'admin',
    permissions: mockPermissions.flatMap(parent => 
      parent.children.map(child => child.permissionKey)
    )
  },
  {
    id: 2,
    name: 'Admin',
    description: 'Quản trị viên',
    userType: 'admin',
    permissions: [
      'view_dashboard',
      'view_products', 'create_product', 'edit_product', 'delete_product',
      'view_services', 'create_service', 'edit_service', 'delete_service',
      'view_news', 'create_news', 'edit_news', 'delete_news',
      'view_notifications', 'create_notification', 'edit_notification', 'delete_notification',
      'view_product_categories', 'create_product_category', 'edit_product_category', 'delete_product_category',
      'view_news_categories', 'create_news_category', 'edit_news_category', 'delete_news_category',
      'view_notification_categories', 'create_notification_category', 'edit_notification_category', 'delete_notification_category',
      'view_users', 'create_user', 'edit_user', 'delete_user',
      'view_routes', 'create_route', 'edit_route', 'delete_route',
      'view_system_settings', 'edit_system_settings',
      'view_banner_config', 'edit_banner_config',
      'view_media', 'upload_media', 'delete_media',
      'view_permissions', 'edit_permissions'
    ]
  },
  {
    id: 3,
    name: 'Editor',
    description: 'Biên tập viên',
    userType: 'admin',
    permissions: [
      'view_dashboard',
      'view_products', 'edit_product',
      'view_services', 'edit_service',
      'view_news', 'create_news', 'edit_news',
      'view_notifications', 'create_notification', 'edit_notification',
      'view_product_categories',
      'view_news_categories',
      'view_notification_categories',
      'view_media', 'upload_media'
    ]
  },
  {
    id: 4,
    name: 'Author',
    description: 'Tác giả',
    userType: 'user',
    permissions: [
      'view_dashboard',
      'view_products',
      'view_services',
      'view_news', 'create_news',
      'view_notifications',
      'view_product_categories',
      'view_news_categories',
      'view_notification_categories',
      'view_media', 'upload_media'
    ]
  },
  {
    id: 5,
    name: 'Viewer',
    description: 'Người xem',
    userType: 'user',
    permissions: [
      'view_dashboard',
      'view_products',
      'view_services',
      'view_news',
      'view_notifications',
      'view_product_categories',
      'view_news_categories',
      'view_notification_categories',
      'view_media'
    ]
  },
  {
    id: 6,
    name: 'Customer',
    description: 'Khách hàng',
    userType: 'user',
    permissions: [
      'view_products',
      'view_services',
      'view_news',
      'view_notifications'
    ]
  },
  {
    id: 7,
    name: 'Partner',
    description: 'Đối tác',
    userType: 'user',
    permissions: [
      'view_products',
      'view_services',
      'view_news',
      'view_notifications'
    ]
  }
];

// Utility functions
export const getAllPermissions = () => {
  return mockPermissions.flatMap(parent => 
    parent.children.map(child => ({
      ...child,
      parentLabel: parent.permissionLabel
    }))
  );
};

export const getPermissionsByRole = (roleId) => {
  const role = mockRoles.find(r => r.id === roleId);
  return role ? role.permissions : [];
};

export const hasPermission = (userPermissions, requiredPermission) => {
  return userPermissions.includes(requiredPermission) || userPermissions.includes('all');
};

export const checkUserPermission = (user, permission) => {
  if (!user || !user.permissions) return false;
  return hasPermission(user.permissions, permission);
}; 