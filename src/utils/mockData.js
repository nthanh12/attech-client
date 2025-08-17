// Mock Data Index - Tổng hợp tất cả mock data cho ứng dụng
// This file serves as a central export point for all mock data

// Import all mock data
import { mockNews } from "./mockNews.js";
import { mockProducts } from "./mockProducts.js";
import { mockServices } from "./mockServices.js";
import { mockNotifications } from "./mockNotifications.js";
import { mockRoutes } from "./mockRoutes.js";
import { mockSystemSettings } from "./mockSystemSettings.js";

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
  mockSystemSettings,

  // Categories
  mockNewsCategories,
  mockProductCategories,
  mockNotificationCategories,

  // Utilities
  generateSlug,
  validateSlug,
  generateRoutes,
};

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
  fields = ["titleVi", "titleEn", "titleVi", "titleEn"]
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
   - titleVi: string (tên tiếng Việt)
   - titleEn: string (tên tiếng Anh)
   - slugVi: string (slug tiếng Việt)
   - slugEn: string (slug tiếng Anh)
   - descriptionVi: string (mô tả tiếng Việt)
   - descriptionEn: string (mô tả tiếng Anh)
   - status: number (1 = active, 0 = inactive)

2. Main Data (mockNews, mockProducts, mockServices, mockNotifications):
   - id: number
   - titleVi/titleVi: string (tiêu đề/ tên tiếng Việt)
   - titleEn/titleEn: string (tiêu đề/ tên tiếng Anh)
   - slugVi: string (slug tiếng Việt)
   - slugEn: string (slug tiếng Anh)
   - descriptionVi: string (mô tả tiếng Việt)
   - descriptionEn: string (mô tả tiếng Anh)
   - contentVi: string (nội dung tiếng Việt)
   - contentEn: string (nội dung tiếng Anh)
   - timePosted: string (ISO date string)
   - status: number (1 = active, 0 = inactive)
   - *CategoryId: number (ID của category)
   - *CategorytitleVi: string (tên category tiếng Việt)
   - *CategorytitleEn: string (tên category tiếng Anh)
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
