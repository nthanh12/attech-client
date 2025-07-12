# Hệ thống Quản lý Routes Động

## Tổng quan
Hệ thống này cho phép quản lý routes động từ database thay vì hard-code trong code. Hiện tại đang sử dụng mock data, sau này có thể dễ dàng chuyển sang API thật.

## Cấu trúc Files

### 1. Mock Data
- `src/utils/mockRoutes.js` - Chứa mock data cho routes
- `src/api.js` - API functions với mock responses

### 2. Core Components
- `src/utils/routeGenerator.js` - Utility để generate routes từ data
- `src/components/DynamicRoutes/DynamicRoutes.js` - Component render routes động

### 3. Admin Management
- `src/admin/pages/RouteManagement/RouteManagement.js` - Giao diện quản lý routes
- `src/admin/pages/RouteManagement/RouteManagement.css` - Styles cho admin

## Cách sử dụng

### 1. Thay thế Static Routes
Thay thế routes cũ trong `src/routes/Public.js`:

```javascript
// Thay vì:
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/news" element={<NewsPage />} />
  // ... nhiều routes khác
</Routes>

// Sử dụng:
<DynamicRoutes />
```

### 2. Cấu hình trong App.js
```javascript
import DynamicRoutes from './components/DynamicRoutes/DynamicRoutes';

// Trong Public component:
return (
  <MainLayout>
    <DynamicRoutes />
  </MainLayout>
);
```

### 3. Quản lý Routes qua Admin
- Truy cập `/admin/routes`
- Thêm/sửa/xóa routes
- Cấu hình component, layout, permissions

## Database Schema (Khi có API thật)

```sql
CREATE TABLE routes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  path VARCHAR(255) NOT NULL,
  component VARCHAR(255) NOT NULL,
  layout VARCHAR(255),
  protected BOOLEAN DEFAULT false,
  parent_id INT,
  order_index INT DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  label VARCHAR(255),
  icon VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES routes(id) ON DELETE SET NULL
);

CREATE TABLE route_permissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  route_id INT,
  role_id INT,
  can_access BOOLEAN DEFAULT true,
  FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
);
```

## API Endpoints (Khi có Backend)

```javascript
// GET /api/routes/find-all
// POST /api/routes/create
// PUT /api/routes/update
// DELETE /api/routes/delete/{id}
// GET /api/routes/find-by-role/{roleId}
```

## Chuyển từ Mock sang API thật

### 1. Cập nhật api.js
```javascript
// Thay thế mock functions bằng API calls thật
export const getRoutes = async () => {
  const response = await api.get("/routes/find-all");
  return response.data.data.items || [];
};
```

### 2. Xóa mock data
- Xóa `src/utils/mockRoutes.js`
- Xóa import trong `api.js`

### 3. Cập nhật backend
- Implement các API endpoints
- Tạo database tables
- Thêm authentication/authorization

## Ưu điểm

1. **Linh hoạt**: Thêm/sửa routes mà không cần deploy
2. **Phân quyền**: Routes có thể được phân quyền theo role
3. **Admin UI**: Giao diện quản lý trực quan
4. **Fallback**: Có static routes backup khi API fail
5. **Validation**: Kiểm tra component tồn tại trước khi render

## Lưu ý

- Hiện tại đang sử dụng mock data
- Cần implement backend API để sử dụng thật
- Có thể thêm caching để tối ưu performance
- Nên có validation cho component names
- Có thể thêm route analytics/tracking

## Troubleshooting

### Lỗi "Component not found"
- Kiểm tra component name trong database
- Đảm bảo component đã được import trong `routeGenerator.js`

### Routes không load
- Kiểm tra API endpoint
- Xem console logs
- Kiểm tra network requests

### Admin không thể edit routes
- Kiểm tra permissions
- Đảm bảo user có quyền admin
- Kiểm tra form validation 