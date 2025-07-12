# Frontend Integration with C# Backend

## Overview

Frontend đã được điều chỉnh để khớp với cấu trúc dữ liệu và API từ backend C#. Dưới đây là những thay đổi chính:

## 1. Cấu trúc dữ liệu từ Backend

### PostDto (News/Notifications)
```csharp
// Backend C#
public class PostDto
{
    public int Id { get; set; }
    public string Slug { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime TimePosted { get; set; }
    public int Status { get; set; }
    public int PostCategoryId { get; set; }
    public string PostCategoryName { get; set; }
    public string PostCategorySlug { get; set; }
}
```

### Frontend Mock Data
```javascript
// Frontend - src/utils/mockNews.js
{
  id: 1,
  title: "Hội nghị Công đoàn năm 2024",
  slug: "hoi-nghi-cong-doan-nam-2024",
  description: "Hội nghị Công đoàn công ty đã diễn ra thành công...",
  content: "Nội dung chi tiết...",
  timePosted: "2024-01-15T00:00:00Z",
  status: 1, // ACTIVE
  postCategoryId: 1,
  postCategoryName: "Công đoàn",
  postCategorySlug: "union",
  image: "https://picsum.photos/300/200?random=1"
}
```

## 2. Thay đổi chính trong Frontend

### A. Cấu trúc dữ liệu
- `category` → `postCategorySlug`
- `date` → `timePosted`
- `summary` → `description`
- Thêm `postCategoryName`, `postCategoryId`, `status`

### B. API Functions
```javascript
// src/api.js
export const getNews = async (params = {}) => {
  // Filter by category if provided
  let filteredNews = mockNews;
  if (params.category) {
    filteredNews = mockNews.filter(news => news.postCategorySlug === params.category);
  }
  
  // Pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  // ... pagination logic
  
  return {
    data: paginatedNews,
    pagination: {
      page,
      limit,
      total: filteredNews.length,
      totalPages: Math.ceil(filteredNews.length / limit)
    },
    success: true
  };
};
```

### C. Components Updates

#### NewsListPage
- Sử dụng `postCategorySlug` thay vì `category`
- Format `timePosted` thành ngày tháng
- Hiển thị `description` thay vì `summary`

#### NewsDetailPage
- Hiển thị chi tiết bài viết với cấu trúc mới
- Breadcrumb navigation với category
- Meta information (date, category)

#### NewsSection
- Hiển thị tin tức mới nhất
- Link đến category pages
- Format date từ `timePosted`

## 3. Slug Management

### SlugHelper Utility
```javascript
// src/utils/slugHelper.js
export const generateSlug = (title) => {
  // Convert Vietnamese characters
  // Remove special characters
  // Replace spaces with hyphens
};

export const generateUniqueSlug = (title, existingSlugs = []) => {
  const baseSlug = generateSlug(title);
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }
  return `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;
};
```

## 4. Routing Structure

### News Routes
```
/news                    # Tất cả tin tức
/news/:category          # Tin tức theo danh mục
/news/:id/:slug          # Chi tiết bài viết
```

### Category Navigation
```javascript
// Link đến category
<Link to={`/news/${item.postCategorySlug}`}>
  {item.postCategoryName}
</Link>

// Link đến bài viết
<Link to={`/news/${item.id}/${item.slug}`}>
  {item.title}
</Link>
```

## 5. Status Management

### Status Values
```javascript
const STATUS = {
  ACTIVE: 1,
  INACTIVE: 0,
  DRAFT: 2,
  ARCHIVED: 3
};
```

### Filter by Status
```javascript
// Chỉ hiển thị bài viết active
const activeNews = mockNews.filter(news => news.status === 1);
```

## 6. Date Formatting

### Vietnamese Date Format
```javascript
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN');
};

// Usage
formatDate("2024-01-15T00:00:00Z") // "15/01/2024"
```

## 7. Pagination

### API Response Structure
```javascript
{
  data: [...], // Array of items
  pagination: {
    page: 1,
    limit: 10,
    total: 100,
    totalPages: 10
  },
  success: true
}
```

## 8. Error Handling

### Consistent Error Response
```javascript
{
  data: null,
  success: false,
  error: "Error message"
}
```

## 9. Loading States

### Loading Components
```javascript
if (loading) {
  return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <p>Đang tải...</p>
    </div>
  );
}
```

## 10. Backend Integration Points

### API Endpoints (Future)
```javascript
// TODO: Replace mock with real API calls
const response = await fetch(`/api/news?${queryString}`);
const response = await fetch(`/api/news/${id}`);
const response = await fetch(`/api/news/category/${category}`);
```

### Authentication
```javascript
// TODO: Add authentication headers
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

## 11. SEO Optimization

### Meta Tags
```javascript
// TODO: Add meta tags for SEO
<meta name="description" content={newsItem.description} />
<meta property="og:title" content={newsItem.title} />
<meta property="og:description" content={newsItem.description} />
```

## 12. File Structure

```
src/
├── utils/
│   ├── mockNews.js           # Updated mock data
│   ├── mockNewsCategories.js # Category data
│   └── slugHelper.js         # Slug utilities
├── api.js                    # API functions
├── pages/News/
│   ├── NewsListPage/         # Updated list page
│   └── NewsDetailPage/       # New detail page
└── components/NewsSection/    # Updated news section
```

## 13. Testing

### Mock Data Testing
```javascript
// Test slug generation
const slug = generateSlug("Hội nghị Công đoàn năm 2024");
console.log(slug); // "hoi-nghi-cong-doan-nam-2024"

// Test unique slug
const uniqueSlug = generateUniqueSlug("Test Title", ["test-title"]);
console.log(uniqueSlug); // "test-title-abc1"
```

## 14. Migration Notes

### Breaking Changes
- `news.category` → `news.postCategorySlug`
- `news.date` → `news.timePosted`
- `news.summary` → `news.description`

### Backward Compatibility
- Old components may need updates
- Check all news-related components
- Update all hardcoded field names

## 15. Performance Considerations

### Optimizations
- Lazy loading for images
- Pagination for large lists
- Caching for frequently accessed data
- Debounced search functionality

### Bundle Size
- Tree-shaking for unused utilities
- Code splitting for large components
- Optimized imports

## 16. Security

### Input Validation
```javascript
// Validate slug format
if (!isValidSlug(slug)) {
  throw new Error("Invalid slug format");
}

// Sanitize HTML content
const sanitizedContent = sanitizeHtml(content);
```

## 17. Accessibility

### ARIA Labels
```javascript
<img 
  src={item.image} 
  alt={item.title}
  title={item.title}
  loading="lazy"
/>
```

### Keyboard Navigation
- Focus management
- Skip links
- Screen reader support

## 18. Future Enhancements

### Planned Features
- Real-time updates
- Search functionality
- Advanced filtering
- Social sharing
- Comments system
- Related articles
- Newsletter subscription

### Backend Integration
- Replace all mock data with real API calls
- Add authentication
- Implement caching
- Add error boundaries
- Add retry logic

## 19. Deployment

### Environment Variables
```javascript
// .env
REACT_APP_API_BASE_URL=https://api.attech.com
REACT_APP_ENVIRONMENT=production
```

### Build Optimization
```bash
npm run build
# Optimized for production
```

## 20. Monitoring

### Error Tracking
```javascript
// TODO: Add error tracking
console.error('Error fetching news:', error);
// Send to monitoring service
```

### Analytics
```javascript
// TODO: Add analytics
// Track page views, user interactions
```

---

**Note**: Frontend hiện tại sử dụng mock data để development. Khi backend sẵn sàng, chỉ cần thay thế các mock API calls bằng real API calls. 