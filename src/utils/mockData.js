// Mock Data Index - Tổng hợp tất cả mock data cho ứng dụng
// This file serves as a central export point for all mock data

// Import all mock data
import { mockNews } from "./mockNews.js";
import { mockProducts } from "./mockProducts.js";
import { mockServices } from "./mockServices.js";
import { mockNotifications } from "./mockNotifications.js";
import { mockRoutes } from "./mockRoutes.js";
import { mockUsers } from "./mockUsers.js";
import { mockSystemSettings } from "./mockSystemSettings.js";
import { mockPermissions } from "./mockPermissions.js";
import { mockMedia } from "./mockMedia.js";

// Import categories
import { mockNewsCategories } from "./mockNewsCategories.js";
import { mockProductCategories } from "./mockProductCategories.js";
import { mockNotificationCategories } from "./mockNotificationCategories.js";

// Import utilities
import { generateSlug, validateSlug } from "./slugGenerator.js";
import { generateRoutes } from "./routeGenerator.js";

// Export all mock data
export {
  // Main data
  mockNews,
  mockProducts,
  mockServices,
  mockNotifications,
  mockRoutes,
  mockUsers,
  mockSystemSettings,
  mockPermissions,
  mockMedia,

  // Categories
  mockNewsCategories,
  mockProductCategories,
  mockNotificationCategories,

  // Utilities
  generateSlug,
  validateSlug,
  generateRoutes,
};

// Mock roles
export const mockRoles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Quản trị viên cao cấp",
    permissions: ["*"],
  },
  {
    id: 2,
    name: "Admin",
    description: "Quản trị viên",
    permissions: ["dashboard", "content", "users", "settings"],
  },
  {
    id: 3,
    name: "Editor",
    description: "Biên tập viên",
    permissions: ["dashboard", "content"],
  },
  {
    id: 4,
    name: "Author",
    description: "Tác giả",
    permissions: ["dashboard", "content.create", "content.edit"],
  },
  {
    id: 5,
    name: "User",
    description: "Người dùng",
    permissions: ["dashboard"],
  },
];

// Mock departments
export const mockDepartments = [
  { id: 1, name: "IT", description: "Phòng Công nghệ thông tin" },
  { id: 2, name: "Marketing", description: "Phòng Marketing" },
  { id: 3, name: "Sales", description: "Phòng Kinh doanh" },
  { id: 4, name: "HR", description: "Phòng Nhân sự" },
  { id: 5, name: "Finance", description: "Phòng Tài chính" },
  { id: 6, name: "Operations", description: "Phòng Vận hành" },
  { id: 7, name: "Legal", description: "Phòng Pháp chế" },
  { id: 8, name: "Customer Service", description: "Phòng Chăm sóc khách hàng" },
];

export const mockPositions = [
  { id: 1, name: "Quản trị viên", description: "Quản trị hệ thống" },
  { id: 2, name: "Biên tập viên", description: "Biên tập nội dung" },
  { id: 3, name: "Tác giả", description: "Viết nội dung" },
  { id: 4, name: "Nhân viên", description: "Nhân viên thường" },
  { id: 5, name: "Trưởng phòng", description: "Quản lý phòng ban" },
  { id: 6, name: "Phó phòng", description: "Phó trưởng phòng" },
  { id: 7, name: "Chuyên viên", description: "Chuyên viên kỹ thuật" },
  { id: 8, name: "Thực tập sinh", description: "Thực tập sinh" },
];

// Mock banner config
export const mockBannerConfig = {
  homepage: {
    slides: [
      {
        id: 1,
        titleVi: "Banner chính trang chủ",
        titleEn: "Main homepage banner",
        descriptionVi: "Banner giới thiệu công ty",
        descriptionEn: "Company introduction banner",
        imageUrl: "https://picsum.photos/1200/400?random=1",
        link: "/about",
        order: 1,
        isActive: true,
      },
      {
        id: 2,
        titleVi: "Banner sản phẩm",
        titleEn: "Product banner",
        descriptionVi: "Banner giới thiệu sản phẩm",
        descriptionEn: "Product introduction banner",
        imageUrl: "https://picsum.photos/1200/400?random=2",
        link: "/products",
        order: 2,
        isActive: true,
      },
      {
        id: 3,
        titleVi: "Banner dịch vụ",
        titleEn: "Service banner",
        descriptionVi: "Banner giới thiệu dịch vụ",
        descriptionEn: "Service introduction banner",
        imageUrl: "https://picsum.photos/1200/400?random=3",
        link: "/services",
        order: 3,
        isActive: true,
      },
    ],
  },
  about: {
    slides: [
      {
        id: 4,
        titleVi: "Banner giới thiệu",
        titleEn: "About banner",
        descriptionVi: "Banner trang giới thiệu",
        descriptionEn: "About page banner",
        imageUrl: "https://picsum.photos/1200/400?random=4",
        link: "/about",
        order: 1,
        isActive: true,
      },
    ],
  },
};

// Utility functions
export const getSystemSetting = (key) => {
  return mockSystemSettings[key] || null;
};

export const getCategoryById = (categories, id) => {
  return categories.find((cat) => cat.id === id);
};

export const getCategoryBySlug = (categories, slug, lang = "vi") => {
  const slugKey = lang === "en" ? "slugEn" : "slugVi";
  return categories.find((cat) => cat[slugKey] === slug);
};

export const filterByStatus = (items, status = 1) => {
  return items.filter((item) => item.status === status);
};

export const sortByTimePosted = (items, direction = "desc") => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.timePosted);
    const dateB = new Date(b.timePosted);
    return direction === "desc" ? dateB - dateA : dateA - dateB;
  });
};

export const searchItems = (
  items,
  searchTerm,
  fields = ["titleVi", "titleEn", "nameVi", "nameEn"]
) => {
  if (!searchTerm) return items;
  const term = searchTerm.toLowerCase();
  return items.filter((item) =>
    fields.some(
      (field) => item[field] && item[field].toLowerCase().includes(term)
    )
  );
};

// Mock Data Structure Documentation:
/*
Tất cả mock data đều tuân theo cấu trúc bilingual nhất quán:

1. Categories (mock*Categories):
   - id: number
   - nameVi: string (tên tiếng Việt)
   - nameEn: string (tên tiếng Anh)
   - slugVi: string (slug tiếng Việt)
   - slugEn: string (slug tiếng Anh)
   - descriptionVi: string (mô tả tiếng Việt)
   - descriptionEn: string (mô tả tiếng Anh)
   - status: number (1 = active, 0 = inactive)

2. Main Data (mockNews, mockProducts, mockServices, mockNotifications):
   - id: number
   - titleVi/nameVi: string (tiêu đề/ tên tiếng Việt)
   - titleEn/nameEn: string (tiêu đề/ tên tiếng Anh)
   - slugVi: string (slug tiếng Việt)
   - slugEn: string (slug tiếng Anh)
   - descriptionVi: string (mô tả tiếng Việt)
   - descriptionEn: string (mô tả tiếng Anh)
   - contentVi: string (nội dung tiếng Việt)
   - contentEn: string (nội dung tiếng Anh)
   - timePosted: string (ISO date string)
   - status: number (1 = active, 0 = inactive)
   - *CategoryId: number (ID của category)
   - *CategoryNameVi: string (tên category tiếng Việt)
   - *CategoryNameEn: string (tên category tiếng Anh)
   - *CategorySlugVi: string (slug category tiếng Việt)
   - *CategorySlugEn: string (slug category tiếng Anh)
   - image: string (URL hình ảnh)

3. Routes (mockRoutes):
   - id: number
   - path: string (đường dẫn)
   - component: string (tên component)
   - layout: string (tên layout)
   - protected: boolean (có cần auth không)
   - parent_id: number|null (ID route cha)
   - order_index: number (thứ tự hiển thị)
   - is_active: boolean (có active không)
   - labelVi: string (nhãn tiếng Việt)
   - labelEn: string (nhãn tiếng Anh)
   - icon: string (icon class)
   - descriptionVi: string (mô tả tiếng Việt)
   - descriptionEn: string (mô tả tiếng Anh)

4. Users (mockUsers):
   - id: number
   - username: string (tên đăng nhập)
   - email: string (email)
   - fullName: string (họ tên)
   - phone: string (số điện thoại)
   - role: string (vai trò)
   - userType: string (admin/user)
   - status: string (active/inactive/suspended)
   - avatar: string (URL avatar)
   - department: string (phòng ban)
   - position: string (chức vụ)
   - lastLogin: string (ISO date string)
   - createdAt: string (ISO date string)
   - permissions: array (danh sách quyền)

5. System Settings (mockSystemSettings):
   - general: object (cài đặt chung)
   - company: object (thông tin công ty)
   - contact: object (thông tin liên hệ)
   - seo: object (cài đặt SEO)
   - email: object (cài đặt email)
   - social: object (mạng xã hội)
   - security: object (bảo mật)
   - performance: object (hiệu suất)
   - notification: object (thông báo)

6. Permissions (mockPermissions):
   - id: number
   - permissionKey: string (key của permission)
   - permissionLabel: string (nhãn hiển thị)
   - description: string (mô tả)
   - parentId: number|null (ID permission cha)
   - children: array (danh sách permission con)

Lưu ý:
- Tất cả mock data đều có cấu trúc bilingual (Vi/En)
- Các field có suffix Vi/En để phân biệt ngôn ngữ
- Status field để quản lý trạng thái active/inactive
- Categories có description để mô tả chi tiết
- Main data có timePosted để quản lý thời gian
- Routes có order_index để sắp xếp thứ tự hiển thị
- Users có permissions array để quản lý quyền
- System settings có cấu trúc nested object
- Permissions có cấu trúc tree với parent-child relationship
*/
