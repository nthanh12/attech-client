import api from '../api';

// Mock data for fallback when backend is not available
const mockBanners = [
  {
    id: 1,
    titleVi: "Banner Chính Trang Chủ",
    titleEn: "Main Homepage Banner",
    descriptionVi: "Banner chính hiển thị trên trang chủ",
    descriptionEn: "Main banner displayed on homepage",
    imageUrl: "/images/banners/main-banner.jpg",
    linkUrl: "/products",
    position: "homepage_main",
    order: 1,
    status: 1,
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-06-01T00:00:00Z"
  },
  {
    id: 2,
    titleVi: "Banner Sản Phẩm",
    titleEn: "Product Banner",
    descriptionVi: "Banner quảng cáo sản phẩm mới",
    descriptionEn: "Banner for new product promotion",
    imageUrl: "/images/banners/product-banner.jpg",
    linkUrl: "/products/new",
    position: "products_top",
    order: 1,
    status: 1,
    startDate: "2024-02-01T00:00:00Z",
    endDate: "2024-08-31T23:59:59Z",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-05-15T00:00:00Z"
  },
  {
    id: 3,
    titleVi: "Banner Dịch Vụ",
    titleEn: "Service Banner",
    descriptionVi: "Banner giới thiệu dịch vụ",
    descriptionEn: "Banner introducing our services",
    imageUrl: "/images/banners/service-banner.jpg",
    linkUrl: "/services",
    position: "services_top",
    order: 1,
    status: 0,
    startDate: "2024-03-01T00:00:00Z",
    endDate: "2024-09-30T23:59:59Z",
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-04-10T00:00:00Z"
  }
];

// Get all banners with fallback to mock data
export const fetchBanners = async () => {
  try {
    console.log('🎌 Fetching banners from API...');
    const response = await api.get('/api/banners');
    
    if (response.data && response.data.length >= 0) {
      console.log('✅ Banners fetched successfully from API:', response.data.length, 'items');
      return response.data;
    } else {
      console.warn('⚠️ API returned invalid banner data, using mock data');
      return mockBanners;
    }
  } catch (error) {
    console.warn('⚠️ Failed to fetch banners from API, using mock data:', error.message);
    return mockBanners;
  }
};

// Get banners by position
export const fetchBannersByPosition = async (position) => {
  try {
    console.log(`🎌 Fetching banners for position: ${position}`);
    const response = await api.get(`/api/banners/position/${position}`);
    
    if (response.data && response.data.length >= 0) {
      console.log('✅ Position banners fetched successfully:', response.data.length, 'items');
      return response.data;
    } else {
      // Filter mock data by position
      const filtered = mockBanners.filter(banner => banner.position === position);
      console.warn(`⚠️ API failed, using mock data for position ${position}:`, filtered.length, 'items');
      return filtered;
    }
  } catch (error) {
    console.warn(`⚠️ Failed to fetch banners for position ${position}, using mock data:`, error.message);
    const filtered = mockBanners.filter(banner => banner.position === position);
    return filtered;
  }
};

// Get active banners only
export const fetchActiveBanners = async () => {
  try {
    console.log('🎌 Fetching active banners...');
    const response = await api.get('/api/banners/active');
    
    if (response.data && response.data.length >= 0) {
      console.log('✅ Active banners fetched successfully:', response.data.length, 'items');
      return response.data;
    } else {
      // Filter mock data for active banners
      const active = mockBanners.filter(banner => banner.status === 1);
      console.warn('⚠️ API failed, using mock active banners:', active.length, 'items');
      return active;
    }
  } catch (error) {
    console.warn('⚠️ Failed to fetch active banners, using mock data:', error.message);
    const active = mockBanners.filter(banner => banner.status === 1);
    return active;
  }
};

// Create new banner
export const createBanner = async (bannerData) => {
  try {
    console.log('🎌 Creating new banner:', bannerData);
    const response = await api.post('/api/banners', bannerData);
    
    if (response.data) {
      console.log('✅ Banner created successfully:', response.data);
      return response.data;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error('❌ Failed to create banner:', error);
    throw new Error(`Tạo banner thất bại: ${error.response?.data?.Message || error.message}`);
  }
};

// Update banner
export const updateBanner = async (id, bannerData) => {
  try {
    console.log(`🎌 Updating banner ${id}:`, bannerData);
    const response = await api.put(`/api/banners/${id}`, bannerData);
    
    if (response.data) {
      console.log('✅ Banner updated successfully:', response.data);
      return response.data;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error(`❌ Failed to update banner ${id}:`, error);
    throw new Error(`Cập nhật banner thất bại: ${error.response?.data?.Message || error.message}`);
  }
};

// Delete banner
export const deleteBanner = async (id) => {
  try {
    console.log(`🎌 Deleting banner ${id}`);
    const response = await api.delete(`/api/banners/${id}`);
    
    console.log('✅ Banner deleted successfully');
    return response.data;
  } catch (error) {
    console.error(`❌ Failed to delete banner ${id}:`, error);
    throw new Error(`Xóa banner thất bại: ${error.response?.data?.Message || error.message}`);
  }
};

// Update banner status
export const updateBannerStatus = async (id, status) => {
  try {
    console.log(`🎌 Updating banner ${id} status to:`, status);
    const response = await api.patch(`/api/banners/${id}/status`, { status });
    
    if (response.data) {
      console.log('✅ Banner status updated successfully');
      return response.data;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error(`❌ Failed to update banner ${id} status:`, error);
    throw new Error(`Cập nhật trạng thái banner thất bại: ${error.response?.data?.Message || error.message}`);
  }
};

// Update banner order
export const updateBannerOrder = async (id, order) => {
  try {
    console.log(`🎌 Updating banner ${id} order to:`, order);
    const response = await api.patch(`/api/banners/${id}/order`, { order });
    
    if (response.data) {
      console.log('✅ Banner order updated successfully');
      return response.data;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error(`❌ Failed to update banner ${id} order:`, error);
    throw new Error(`Cập nhật thứ tự banner thất bại: ${error.response?.data?.Message || error.message}`);
  }
};

// Get banner positions
export const getBannerPositions = () => {
  return [
    { value: 'homepage_main', label: 'Trang chủ - Banner chính' },
    { value: 'homepage_secondary', label: 'Trang chủ - Banner phụ' },
    { value: 'products_top', label: 'Trang sản phẩm - Đầu trang' },
    { value: 'products_sidebar', label: 'Trang sản phẩm - Sidebar' },
    { value: 'services_top', label: 'Trang dịch vụ - Đầu trang' },
    { value: 'services_sidebar', label: 'Trang dịch vụ - Sidebar' },
    { value: 'news_top', label: 'Trang tin tức - Đầu trang' },
    { value: 'news_sidebar', label: 'Trang tin tức - Sidebar' },
    { value: 'footer', label: 'Footer' }
  ];
};

export default {
  fetchBanners,
  fetchBannersByPosition,
  fetchActiveBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  updateBannerStatus,
  updateBannerOrder,
  getBannerPositions
};