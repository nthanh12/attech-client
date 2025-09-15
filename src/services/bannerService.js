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

// ============================================================
// NEW BANNER SETTING API - Based on /api/setting endpoint
// ============================================================

/**
 * Get all banner settings from public endpoint (không cần authentication)
 */
export const getAllBannerSettings = async () => {
  try {
    console.log('🎌 Fetching all banner settings from public API...');
    const response = await api.get('/api/setting/public');
    
    if (response.data && typeof response.data === 'object') {
      console.log('✅ Banner settings fetched successfully from public API:', Object.keys(response.data));
      return response.data;
    } else {
      console.warn('⚠️ API returned invalid setting data, using fallback');
      return {
        Banner1: { url: null, description: null },
        Banner2: { url: null, description: null },
        Banner3: { url: null, description: null },
        Logo: { url: null, description: null }
      };
    }
  } catch (error) {
    console.warn('⚠️ Failed to fetch banner settings from public API:', error.message);
    return {
      Banner1: { url: null, description: null },
      Banner2: { url: null, description: null }, 
      Banner3: { url: null, description: null },
      Logo: { url: null, description: null }
    };
  }
};

/**
 * Get specific banner setting by key from public endpoint
 */
export const getBannerSetting = async (key) => {
  try {
    console.log(`🎌 Fetching banner setting from public API: ${key}`);
    // Lấy tất cả settings rồi filter theo key (efficient caching)
    const allSettings = await getAllBannerSettings();
    
    // Tìm setting theo key (case-insensitive)
    const settingValue = allSettings[key] || allSettings[key.toLowerCase()] || 
                        allSettings[key.charAt(0).toUpperCase() + key.slice(1)];
    
    if (settingValue && settingValue.url) {
      console.log(`✅ Banner setting ${key} fetched successfully from public API`);
      return {
        settingKey: key,
        url: settingValue.url,
        description: settingValue.description
      };
    } else {
      console.warn(`⚠️ Setting ${key} not found in public API, using fallback`);
      return { url: null, description: null };
    }
  } catch (error) {
    console.warn(`⚠️ Failed to fetch banner setting ${key}:`, error.message);
    return { url: null, description: null };
  }
};

/**
 * Upload banner file for specific key
 */
export const uploadBannerSetting = async (key, file) => {
  try {
    console.log(`🎌 Uploading banner ${key}:`, file.name);
    
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(`/api/setting/${key}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    // Handle direct response format from spec
    if (response.data && response.data.url) {
      console.log(`✅ Banner ${key} uploaded successfully:`, response.data);
      return {
        settingKey: response.data.settingKey || key,
        url: response.data.url,
        id: response.data.id,
        fileName: response.data.fileName,
        fileSize: response.data.fileSize,
        uploadDate: response.data.uploadDate
      };
    } else {
      throw new Error(response.data?.message || 'Upload failed');
    }
  } catch (error) {
    console.error(`❌ Failed to upload banner ${key}:`, error);
    throw new Error(`Upload banner ${key} thất bại: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Delete banner setting
 */
export const deleteBannerSetting = async (key) => {
  try {
    console.log(`🎌 Deleting banner setting: ${key}`);
    const response = await api.delete(`/api/setting/${key}`);
    
    if (response.data?.status === 1) {
      console.log(`✅ Banner setting ${key} deleted successfully`);
      return response.data.data;
    } else {
      throw new Error(response.data?.message || 'Delete failed');
    }
  } catch (error) {
    console.error(`❌ Failed to delete banner setting ${key}:`, error);
    throw new Error(`Xóa banner ${key} thất bại: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Get predefined banner keys and their display names
 */
export const getBannerKeys = () => {
  return [
    // === MAIN SETTINGS - Tab "Logo & Banner chính" ===
    { key: 'Banner1', label: 'Banner Carousel 1', description: 'Banner carousel đầu tiên trên trang chủ', category: 'settings' },
    { key: 'Banner2', label: 'Banner Carousel 2', description: 'Banner carousel thứ hai trên trang chủ', category: 'settings' },
    { key: 'Banner3', label: 'Banner Carousel 3', description: 'Banner carousel thứ ba trên trang chủ', category: 'settings' },
    { key: 'Logo', label: 'Logo website', description: 'Logo chính hiển thị trên header', category: 'settings' },
    
    // === HOME CONTENT - Tab "Ảnh trang chủ" ===
    // Feature service backgrounds  
    { key: 'HomeFeatCns', label: 'CNS/ATM Service Background', description: 'Ảnh nền dịch vụ CNS/ATM', category: 'homecontent' },
    { key: 'HomeFeatBhc', label: 'Bay hiệu chuẩn Background', description: 'Ảnh nền dịch vụ Bay hiệu chuẩn', category: 'homecontent' },
    { key: 'HomeFeatCnhk', label: 'CNHK Service Background', description: 'Ảnh nền dịch vụ Công nghệ hàng không', category: 'homecontent' },
    
    // Fact/Event image
    { key: 'HomeFactEvent', label: 'Ảnh sự kiện trang chủ', description: 'Ảnh thông tin sự kiện hiển thị trên trang chủ', category: 'homecontent' },
    
    // About CNS/ATM Gallery (6 ảnh)
    { key: 'AboutCns1', label: 'CNS/ATM Gallery 1', description: 'Ảnh thư viện CNS/ATM số 1', category: 'homecontent' },
    { key: 'AboutCns2', label: 'CNS/ATM Gallery 2', description: 'Ảnh thư viện CNS/ATM số 2', category: 'homecontent' },
    { key: 'AboutCns3', label: 'CNS/ATM Gallery 3', description: 'Ảnh thư viện CNS/ATM số 3', category: 'homecontent' },
    { key: 'AboutCns4', label: 'DVOR DME Đà Nẵng', description: 'Ảnh DVOR DME Đà Nẵng', category: 'homecontent' },
    { key: 'AboutCns5', label: 'DVOR DME Điện Biên', description: 'Ảnh DVOR DME Điện Biên', category: 'homecontent' },
    { key: 'AboutCns6', label: 'DVOR DME Vân Đồn', description: 'Ảnh DVOR DME Vân Đồn', category: 'homecontent' },
    
    // About BHC Gallery (5 ảnh)
    { key: 'AboutBhc1', label: 'Bay hiệu chuẩn Gallery 1', description: 'Ảnh bay kiểm tra hiệu chuẩn số 1', category: 'homecontent' },
    { key: 'AboutBhc2', label: 'Bay hiệu chuẩn Gallery 2', description: 'Ảnh bay kiểm tra hiệu chuẩn số 2', category: 'homecontent' },
    { key: 'AboutBhc3', label: 'Bay hiệu chuẩn Gallery 3', description: 'Ảnh bay kiểm tra hiệu chuẩn số 3', category: 'homecontent' },
    { key: 'AboutBhc4', label: 'Bay hiệu chuẩn Gallery 4', description: 'Ảnh bay kiểm tra hiệu chuẩn số 4', category: 'homecontent' },
    { key: 'AboutBhc5', label: 'Bay hiệu chuẩn Gallery 5', description: 'Ảnh bay kiểm tra hiệu chuẩn số 5', category: 'homecontent' },
    
    // About CNHK Gallery (8 ảnh)
    { key: 'AboutCnhk1', label: 'CNHK Gallery 1', description: 'Ảnh công nghệ hàng không số 1', category: 'homecontent' },
    { key: 'AboutCnhk2', label: 'CNHK Gallery 2', description: 'Ảnh công nghệ hàng không số 2', category: 'homecontent' },
    { key: 'AboutCnhk3', label: 'CNHK Gallery 3', description: 'Ảnh công nghệ hàng không số 3', category: 'homecontent' },
    { key: 'AboutCnhk4', label: 'CNHK Gallery 4', description: 'Ảnh công nghệ hàng không số 4', category: 'homecontent' },
    { key: 'AboutCnhk5', label: 'CNHK Gallery 5', description: 'Ảnh công nghệ hàng không số 5', category: 'homecontent' },
    { key: 'AboutCnhk6', label: 'CNHK Gallery 6', description: 'Ảnh công nghệ hàng không số 6', category: 'homecontent' },
    { key: 'AboutCnhk7', label: 'CNHK Gallery 7', description: 'Ảnh công nghệ hàng không số 7', category: 'homecontent' },
    { key: 'AboutCnhk8', label: 'CNHK Gallery 8', description: 'Ảnh công nghệ hàng không số 8', category: 'homecontent' }
  ];
};

export default {
  // Original banner management APIs
  fetchBanners,
  fetchBannersByPosition,
  fetchActiveBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  updateBannerStatus,
  updateBannerOrder,
  getBannerPositions,
  
  // New banner setting APIs
  getAllBannerSettings,
  getBannerSetting,
  uploadBannerSetting,
  deleteBannerSetting,
  getBannerKeys
};