# AdminFilter Component

Component bộ lọc thống nhất cho tất cả trang admin, đảm bảo giao diện và trải nghiệm người dùng nhất quán.

## Tính năng

- ✅ Giao diện thống nhất với thiết kế gradient đẹp mắt
- ✅ Responsive design cho tất cả thiết bị
- ✅ Hỗ trợ nhiều loại filter: search, select, date, daterange
- ✅ Loading state cho search với debounce
- ✅ Tích hợp sẵn reset filters
- ✅ Z-index được tối ưu cho modal compatibility

## Cách sử dụng

### 1. Import component
```jsx
import AdminFilter from "../components/AdminFilter";
```

### 2. Định nghĩa filterConfig
```jsx
const filterConfig = [
  {
    key: "search",
    type: "search",
    label: "Tìm kiếm", 
    placeholder: "Nhập từ khóa...",
    icon: "fas fa-search"
  },
  {
    key: "category",
    type: "select",
    label: "Danh mục",
    icon: "fas fa-tags",
    options: categories.map(cat => ({
      value: cat.id,
      label: cat.titleVi
    }))
  },
  {
    key: "status",
    type: "select", 
    label: "Trạng thái",
    icon: "fas fa-flag",
    options: [
      { value: "active", label: "Hoạt động" },
      { value: "inactive", label: "Không hoạt động" }
    ]
  },
  {
    type: "daterange",
    fromKey: "dateFrom", 
    toKey: "dateTo",
    icon: "fas fa-calendar"
  }
];
```

### 3. Sử dụng component
```jsx
<AdminFilter
  filters={filters}
  onFiltersChange={handleFiltersChange}
  onPageChange={setCurrentPage}
  filterConfig={filterConfig}
  isSearching={isSearching}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `filters` | Object | ✅ | Object chứa các giá trị filter hiện tại |
| `onFiltersChange` | Function | ✅ | Callback khi filter thay đổi |
| `onPageChange` | Function | ❌ | Callback khi cần reset trang về 1 |
| `filterConfig` | Array | ✅ | Cấu hình các trường filter cần hiển thị |
| `isSearching` | Boolean | ❌ | Có đang search không (hiển thị loading icon) |
| `onReset` | Function | ❌ | Callback tùy chỉnh khi reset filters |

## Filter Types

### Search Filter
```jsx
{
  key: "search",
  type: "search",
  label: "Tìm kiếm",
  placeholder: "Nhập từ khóa...",
  icon: "fas fa-search"
}
```

### Select Filter  
```jsx
{
  key: "category",
  type: "select", 
  label: "Danh mục",
  icon: "fas fa-tags",
  options: [
    { value: "1", label: "Danh mục 1" },
    { value: "2", label: "Danh mục 2" }
  ]
}
```

### Date Filter
```jsx
{
  key: "createDate",
  type: "date",
  label: "Ngày tạo",
  icon: "fas fa-calendar"
}
```

### Date Range Filter
```jsx
{
  type: "daterange",
  fromKey: "dateFrom",
  toKey: "dateTo", 
  icon: "fas fa-calendar"
}
```

## Styling

Component sử dụng CSS Module `AdminFilter.css` với:

- 🎨 Gradient background đẹp mắt
- 🎯 Focus states rõ ràng
- 📱 Responsive grid layout
- 🌙 Dark mode support
- ⚡ Smooth animations

## Migration từ filter cũ

1. Thay thế import ContactList.css bằng AdminFilter
2. Định nghĩa filterConfig theo format mới
3. Thay thế JSX filter section cũ bằng `<AdminFilter />`
4. Cập nhật handlers để sử dụng `onFiltersChange`

## Ví dụ hoàn chỉnh

```jsx
import React, { useState } from "react";
import AdminFilter from "../components/AdminFilter";

const MyAdminPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    dateFrom: "",
    dateTo: ""
  });
  
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filterConfig = [
    {
      key: "search",
      type: "search",
      label: "Tìm kiếm",
      placeholder: "Tìm kiếm theo tên...",
      icon: "fas fa-search"
    },
    {
      key: "status",
      type: "select",
      label: "Trạng thái", 
      icon: "fas fa-flag",
      options: [
        { value: "active", label: "Hoạt động" },
        { value: "inactive", label: "Không hoạt động" }
      ]
    },
    {
      type: "daterange",
      fromKey: "dateFrom",
      toKey: "dateTo",
      icon: "fas fa-calendar"
    }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <AdminFilter
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onPageChange={setCurrentPage}
        filterConfig={filterConfig}
        isSearching={isSearching}
      />
      {/* Rest of your page */}
    </div>
  );
};
```