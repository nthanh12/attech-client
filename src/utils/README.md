# Mock Data Utilities

Thư mục này chứa tất cả mock data và utilities cho ứng dụng bilingual React.

## Cấu trúc thư mục

```
src/utils/
├── mockData.js              # Index file - export tất cả mock data
├── mockNewsCategories.js    # Categories cho tin tức
├── mockProductCategories.js # Categories cho sản phẩm
├── mockServiceCategories.js # Categories cho dịch vụ
├── mockNotificationCategories.js # Categories cho thông báo
├── mockNews.js             # Mock data tin tức
├── mockProducts.js         # Mock data sản phẩm
├── mockServices.js         # Mock data dịch vụ
├── mockNotifications.js    # Mock data thông báo
├── mockRoutes.js           # Mock data routes
├── mockUsers.js            # Mock data users và quản lý
├── mockSystemSettings.js   # Mock data system settings
├── mockPermissions.js      # Mock data permissions và roles
├── slugGenerator.js        # Utility tạo slug
├── slugHelper.js           # Helper functions cho slug
├── routeGenerator.js       # Generator cho routes
└── README.md              # File này
```

## Cách sử dụng

### Import mock data

```javascript
// Import từng file riêng lẻ
import { mockNews } from './utils/mockNews.js';
import { mockProducts } from './utils/mockProducts.js';

// Hoặc import từ index file
import { 
  mockNews, 
  mockProducts, 
  mockServices,
  mockUsers,
  mockSystemSettings,
  mockPermissions,
  mockNewsCategories,
  mockProductCategories 
} from './utils/mockData.js';
```

### Cấu trúc dữ liệu

#### 1. Categories (mock*Categories)

```javascript
{
  id: 1,
  nameVi: "Tin hoạt động",
  nameEn: "Activities", 
  slugVi: "tin-hoat-dong",
  slugEn: "activities",
  descriptionVi: "Tin tức về các hoạt động của công ty",
  descriptionEn: "News about company activities",
  status: 1 // 1 = active, 0 = inactive
}
```

#### 2. Main Data (mockNews, mockProducts, mockServices, mockNotifications)

```javascript
{
  id: 1,
  titleVi: "Hội nghị Công đoàn năm 2024",
  titleEn: "Union Conference 2024",
  slugVi: "hoi-nghi-cong-doan-nam-2024",
  slugEn: "union-conference-2024",
  descriptionVi: "Hội nghị Công đoàn công ty đã diễn ra thành công...",
  descriptionEn: "The company's union conference was successfully held...",
  contentVi: "Nội dung chi tiết bằng tiếng Việt...",
  contentEn: "Detailed content in English...",
  timePosted: "2024-01-15T00:00:00Z",
  status: 1,
  postCategoryId: 14,
  postCategoryNameVi: "Công đoàn công ty",
  postCategoryNameEn: "Company Union",
  postCategorySlugVi: "cong-doan-cong-ty",
  postCategorySlugEn: "company-union",
  image: "https://picsum.photos/300/200?random=1"
}
```

#### 3. Routes (mockRoutes)

```javascript
{
  id: 1,
  path: '/',
  component: 'Home',
  layout: 'MainLayout',
  protected: false,
  parent_id: null,
  order_index: 1,
  is_active: true,
  labelVi: 'Trang chủ',
  labelEn: 'Home',
  icon: 'bi bi-house',
  descriptionVi: 'Trang chủ của website',
  descriptionEn: 'Website homepage'
}
```

#### 4. Users (mockUsers)

```javascript
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
  permissions: ['view_dashboard', 'view_products', 'create_product', ...]
}
```

#### 5. System Settings (mockSystemSettings)

```javascript
{
  general: {
    siteName: {
      vi: 'ATTECH - Công ty TNHH Công nghệ Hàng không',
      en: 'ATTECH - Aviation Technology Company Limited'
    },
    defaultLanguage: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    maintenanceMode: false
  },
  company: {
    name: {
      vi: 'Công ty TNHH Công nghệ Hàng không',
      en: 'Aviation Technology Company Limited'
    },
    address: {
      vi: 'Số 1 Đường Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh',
      en: '1 Tran Hung Dao Street, District 1, Ho Chi Minh City'
    }
  },
  // ... các cài đặt khác
}
```

#### 6. Permissions (mockPermissions)

```javascript
{
  id: 1,
  permissionKey: "dashboard",
  permissionLabel: "Dashboard",
  description: "Truy cập trang tổng quan",
  parentId: null,
  children: [
    {
      id: 101,
      permissionKey: "view_dashboard",
      permissionLabel: "Xem Dashboard",
      description: "Xem thống kê và báo cáo tổng quan",
      parentId: 1,
      children: []
    }
  ]
}
```

## Utilities

### Slug Generator

```javascript
import { generateSlug } from './utils/slugGenerator.js';

const slug = generateSlug("Hội nghị Công đoàn năm 2024");
// Kết quả: "hoi-nghi-cong-doan-nam-2024"
```

### Slug Helper

```javascript
import { createSlug } from './utils/slugHelper.js';

const slug = createSlug("Company Activities", "en");
// Kết quả: "company-activities"
```

### Route Generator

```javascript
import { generateRoutes } from './utils/routeGenerator.js';

const routes = generateRoutes(mockRoutes);
// Tạo routes từ mock data
```

### User Management

```javascript
import { 
  getUserById, 
  getUsersByRole, 
  getActiveUsers,
  hasUserPermission 
} from './utils/mockUsers.js';

const user = getUserById(1);
const adminUsers = getUsersByRole('Super Admin');
const activeUsers = getActiveUsers();
const canEdit = hasUserPermission(1, 'edit_product');
```

### System Settings

```javascript
import { 
  getSystemSetting, 
  updateSystemSetting,
  getBannerConfig 
} from './utils/mockSystemSettings.js';

const siteName = getSystemSetting('general.siteName.vi');
const bannerConfig = getBannerConfig('homepage');
updateSystemSetting('general.maintenanceMode', true);
```

## Quy tắc đặt tên

### Fields bilingual
- `nameVi` / `nameEn`: Tên tiếng Việt / Anh
- `titleVi` / `titleEn`: Tiêu đề tiếng Việt / Anh  
- `descriptionVi` / `descriptionEn`: Mô tả tiếng Việt / Anh
- `contentVi` / `contentEn`: Nội dung tiếng Việt / Anh
- `slugVi` / `slugEn`: Slug tiếng Việt / Anh
- `labelVi` / `labelEn`: Nhãn tiếng Việt / Anh

### Category fields
- `*CategoryId`: ID của category
- `*CategoryNameVi` / `*CategoryNameEn`: Tên category
- `*CategorySlugVi` / `*CategorySlugEn`: Slug category

### Status fields
- `status`: 1 = active, 0 = inactive (cho categories)
- `status`: 'active' | 'inactive' | 'suspended' (cho users)
- `is_active`: true = active, false = inactive (cho routes)

### User fields
- `userType`: 'admin' | 'user'
- `role`: 'Super Admin' | 'Admin' | 'Editor' | 'Author' | 'Viewer' | 'Customer' | 'Manager' | 'Analyst' | 'Support'

## Lưu ý quan trọng

1. **Tính nhất quán**: Tất cả mock data đều tuân theo cấu trúc bilingual nhất quán
2. **Validation**: Luôn kiểm tra Array.isArray() trước khi map
3. **Fallback**: Sử dụng fallback cho các trường hợp data không đầy đủ
4. **Performance**: Mock data được tối ưu cho development, production sẽ dùng API
5. **Documentation**: Mỗi file đều có comment mô tả cấu trúc
6. **Permissions**: Users có permissions array để quản lý quyền
7. **System Settings**: Cấu trúc nested object cho các cài đặt hệ thống

## Ví dụ sử dụng trong components

```javascript
import React, { useState, useEffect } from 'react';
import { 
  mockNews, 
  mockNewsCategories,
  mockUsers,
  getSystemSetting 
} from '../utils/mockData.js';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [siteName, setSiteName] = useState('');

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // Mock API response
        const newsData = mockNews.filter(item => item.status === 1);
        const categoriesData = mockNewsCategories.filter(item => item.status === 1);
        const siteNameSetting = getSystemSetting('general.siteName.vi');
        
        setNews(newsData);
        setCategories(categoriesData);
        setSiteName(siteNameSetting);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{siteName}</h1>
      
      {Array.isArray(categories) && categories.map(category => (
        <div key={category.id}>
          <h3>{category.nameVi}</h3>
          <p>{category.descriptionVi}</p>
        </div>
      ))}
      
      {Array.isArray(news) && news.map(item => (
        <div key={item.id}>
          <h2>{item.titleVi}</h2>
          <p>{item.descriptionVi}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
```

## Migration từ API

Khi chuyển từ mock data sang API thực:

1. Thay thế import mock data bằng API calls
2. Giữ nguyên cấu trúc data để không phải sửa components
3. Thêm error handling và loading states
4. Cập nhật documentation

```javascript
// Thay vì:
import { mockNews } from '../utils/mockData.js';

// Sử dụng:
const fetchNews = async () => {
  const response = await fetch('/api/news');
  const data = await response.json();
  return data;
};
```

## Mock Data Summary

### Categories (4 files)
- **mockNewsCategories.js**: 7 categories cho tin tức
- **mockProductCategories.js**: 8 categories cho sản phẩm  
- **mockServiceCategories.js**: 8 categories cho dịch vụ
- **mockNotificationCategories.js**: 7 categories cho thông báo

### Main Data (4 files)
- **mockNews.js**: 10 tin tức mẫu
- **mockProducts.js**: 8 sản phẩm mẫu
- **mockServices.js**: 8 dịch vụ mẫu
- **mockNotifications.js**: 8 thông báo mẫu

### Management (3 files)
- **mockUsers.js**: 8 users mẫu + departments + positions
- **mockSystemSettings.js**: System settings + banner config
- **mockPermissions.js**: Permissions + roles

### Routes (1 file)
- **mockRoutes.js**: 50+ routes cho website

### Utilities (3 files)
- **slugGenerator.js**: Tạo slug từ text
- **slugHelper.js**: Helper functions cho slug
- **routeGenerator.js**: Generator cho routes

**Tổng cộng**: 15 files mock data với đầy đủ tính năng cho admin management system. 