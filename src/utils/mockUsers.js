// Mock data cho users - quản lý người dùng admin
export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@attech.com',
    fullName: 'Super Admin',
    phone: '0123456789',
    role: 'Super Admin',
    userType: 'admin',
    status: 'active',
    avatar: 'https://picsum.photos/50/50?random=1',
    department: 'IT',
    position: 'Quản trị viên',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    permissions: ['view_dashboard', 'view_products', 'create_product', 'edit_product', 'delete_product', 'view_services', 'create_service', 'edit_service', 'delete_service', 'view_news', 'create_news', 'edit_news', 'delete_news', 'view_notifications', 'create_notification', 'edit_notification', 'delete_notification', 'view_users', 'create_user', 'edit_user', 'delete_user', 'view_routes', 'create_route', 'edit_route', 'delete_route', 'view_system_settings', 'edit_system_settings', 'view_banner_config', 'edit_banner_config', 'view_media', 'upload_media', 'delete_media', 'view_permissions', 'edit_permissions']
  },
  {
    id: 2,
    username: 'editor',
    email: 'editor@attech.com',
    fullName: 'Nguyễn Văn Editor',
    phone: '0123456790',
    role: 'Editor',
    userType: 'admin',
    status: 'active',
    avatar: 'https://picsum.photos/50/50?random=2',
    department: 'Marketing',
    position: 'Biên tập viên',
    lastLogin: '2024-01-14T15:20:00Z',
    createdAt: '2024-01-05T00:00:00Z',
    permissions: ['view_dashboard', 'view_products', 'edit_product', 'view_services', 'edit_service', 'view_news', 'create_news', 'edit_news', 'view_notifications', 'create_notification', 'edit_notification', 'view_product_categories', 'view_news_categories', 'view_notification_categories', 'view_media', 'upload_media']
  },
  {
    id: 3,
    username: 'author',
    email: 'author@attech.com',
    fullName: 'Trần Thị Author',
    phone: '0123456791',
    role: 'Author',
    userType: 'user',
    status: 'active',
    avatar: 'https://picsum.photos/50/50?random=3',
    department: 'Content',
    position: 'Tác giả',
    lastLogin: '2024-01-13T09:15:00Z',
    createdAt: '2024-01-10T00:00:00Z',
    permissions: ['view_dashboard', 'view_products', 'view_services', 'view_news', 'create_news', 'edit_news', 'view_notifications', 'create_notification', 'edit_notification', 'view_media', 'upload_media']
  },
  {
    id: 4,
    username: 'viewer',
    email: 'viewer@attech.com',
    fullName: 'Lê Văn Viewer',
    phone: '0123456792',
    role: 'Viewer',
    userType: 'user',
    status: 'active',
    avatar: 'https://picsum.photos/50/50?random=4',
    department: 'Sales',
    position: 'Nhân viên',
    lastLogin: '2024-01-12T14:45:00Z',
    createdAt: '2024-01-15T00:00:00Z',
    permissions: ['view_dashboard', 'view_products', 'view_services', 'view_news', 'view_notifications', 'view_media']
  },
  {
    id: 5,
    username: 'customer1',
    email: 'customer1@example.com',
    fullName: 'Phạm Thị Customer',
    phone: '0123456793',
    role: 'Customer',
    userType: 'user',
    status: 'active',
    avatar: 'https://picsum.photos/50/50?random=5',
    department: '',
    position: 'Khách hàng',
    lastLogin: '2024-01-11T11:30:00Z',
    createdAt: '2024-01-20T00:00:00Z',
    permissions: ['view_products', 'view_services', 'view_news']
  },
  {
    id: 6,
    username: 'manager',
    email: 'manager@attech.com',
    fullName: 'Hoàng Văn Manager',
    phone: '0123456794',
    role: 'Manager',
    userType: 'admin',
    status: 'active',
    avatar: 'https://picsum.photos/50/50?random=6',
    department: 'Operations',
    position: 'Quản lý vận hành',
    lastLogin: '2024-01-10T08:30:00Z',
    createdAt: '2024-01-08T00:00:00Z',
    permissions: ['view_dashboard', 'view_products', 'create_product', 'edit_product', 'view_services', 'create_service', 'edit_service', 'view_news', 'create_news', 'edit_news', 'view_notifications', 'create_notification', 'edit_notification', 'view_users', 'edit_user', 'view_media', 'upload_media']
  },
  {
    id: 7,
    username: 'analyst',
    email: 'analyst@attech.com',
    fullName: 'Vũ Thị Analyst',
    phone: '0123456795',
    role: 'Analyst',
    userType: 'user',
    status: 'inactive',
    avatar: 'https://picsum.photos/50/50?random=7',
    department: 'Analytics',
    position: 'Chuyên viên phân tích',
    lastLogin: '2024-01-09T16:45:00Z',
    createdAt: '2024-01-12T00:00:00Z',
    permissions: ['view_dashboard', 'view_products', 'view_services', 'view_news', 'view_notifications']
  },
  {
    id: 8,
    username: 'support',
    email: 'support@attech.com',
    fullName: 'Đỗ Văn Support',
    phone: '0123456796',
    role: 'Support',
    userType: 'user',
    status: 'active',
    avatar: 'https://picsum.photos/50/50?random=8',
    department: 'Customer Service',
    position: 'Nhân viên hỗ trợ',
    lastLogin: '2024-01-08T12:20:00Z',
    createdAt: '2024-01-18T00:00:00Z',
    permissions: ['view_dashboard', 'view_products', 'view_services', 'view_news', 'view_notifications', 'view_media']
  }
];

// Mock data cho departments
export const mockDepartments = [
  { id: 1, name: 'IT', description: 'Công nghệ thông tin' },
  { id: 2, name: 'Marketing', description: 'Marketing và truyền thông' },
  { id: 3, name: 'Content', description: 'Nội dung và biên tập' },
  { id: 4, name: 'Sales', description: 'Kinh doanh và bán hàng' },
  { id: 5, name: 'Operations', description: 'Vận hành và quản lý' },
  { id: 6, name: 'Analytics', description: 'Phân tích dữ liệu' },
  { id: 7, name: 'Customer Service', description: 'Chăm sóc khách hàng' },
  { id: 8, name: 'Finance', description: 'Tài chính và kế toán' },
  { id: 9, name: 'HR', description: 'Nhân sự' },
  { id: 10, name: 'Legal', description: 'Pháp chế' }
];

// Mock data cho positions
export const mockPositions = [
  { id: 1, name: 'Quản trị viên', department: 'IT' },
  { id: 2, name: 'Biên tập viên', department: 'Marketing' },
  { id: 3, name: 'Tác giả', department: 'Content' },
  { id: 4, name: 'Nhân viên', department: 'Sales' },
  { id: 5, name: 'Quản lý vận hành', department: 'Operations' },
  { id: 6, name: 'Chuyên viên phân tích', department: 'Analytics' },
  { id: 7, name: 'Nhân viên hỗ trợ', department: 'Customer Service' },
  { id: 8, name: 'Khách hàng', department: '' },
  { id: 9, name: 'Trưởng phòng', department: 'IT' },
  { id: 10, name: 'Phó phòng', department: 'Marketing' }
];

// Utility functions
export const getUserById = (id) => {
  return mockUsers.find(user => user.id === id);
};

export const getUsersByRole = (role) => {
  return mockUsers.filter(user => user.role === role);
};

export const getUsersByDepartment = (department) => {
  return mockUsers.filter(user => user.department === department);
};

export const getActiveUsers = () => {
  return mockUsers.filter(user => user.status === 'active');
};

export const getUserPermissions = (userId) => {
  const user = getUserById(userId);
  return user ? user.permissions : [];
};

export const hasUserPermission = (userId, permission) => {
  const user = getUserById(userId);
  return user ? user.permissions.includes(permission) : false;
}; 