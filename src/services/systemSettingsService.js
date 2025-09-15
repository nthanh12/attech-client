import api from '../api';

// Mock data for fallback when backend is not available
const mockSystemSettings = {
  general: {
    siteName: "ATTECH Corporation",
    siteDescription: "Công ty công nghệ hàng đầu Việt Nam",
    siteKeywords: "công nghệ, phần mềm, website, ứng dụng",
    contactEmail: "contact@attech.vn",
    contactPhone: "+84 24 3123 4567",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    timezone: "Asia/Ho_Chi_Minh",
    language: "vi",
    currency: "VND"
  },
  seo: {
    metaTitle: "ATTECH - Công ty công nghệ hàng đầu",
    metaDescription: "ATTECH cung cấp các giải pháp công nghệ toàn diện cho doanh nghiệp",
    metaKeywords: "attech, công nghệ, phần mềm, website",
    ogTitle: "ATTECH Corporation",
    ogDescription: "Giải pháp công nghệ toàn diện",
    ogImage: "/images/og-image.jpg",
    twitterCard: "summary_large_image",
    robotsTxt: "User-agent: *\nDisallow: /admin/\nAllow: /",
    googleAnalytics: "G-XXXXXXXXXX",
    facebookPixel: "123456789",
    googleTagManager: "GTM-XXXXXXX"
  },
  email: {
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "noreply@attech.vn",
    smtpPassword: "********",
    smtpSecure: true,
    fromEmail: "noreply@attech.vn",
    fromName: "ATTECH Corporation",
    replyToEmail: "support@attech.vn"
  },
  social: {
    facebook: "https://facebook.com/attech",
    twitter: "https://twitter.com/attech",
    linkedin: "https://linkedin.com/company/attech",
    youtube: "https://youtube.com/c/attech",
    instagram: "https://instagram.com/attech",
    zalo: "https://zalo.me/attech",
    website: "https://attech.vn"
  },
  maintenance: {
    enabled: false,
    message: "Website đang được bảo trì. Vui lòng quay lại sau.",
    allowedIps: ["127.0.0.1", "::1"],
    startTime: null,
    endTime: null
  },
  security: {
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    sessionTimeout: 1440,
    forceHttps: false,
    enableCaptcha: false,
    captchaProvider: "recaptcha",
    recaptchaSiteKey: "",
    recaptchaSecretKey: ""
  },
  backup: {
    enabled: true,
    frequency: "daily",
    retention: 30,
    location: "local",
    s3Bucket: "",
    s3Region: "",
    s3AccessKey: "",
    s3SecretKey: ""
  }
};

// Get all system settings
export const fetchSystemSettings = async () => {
  try {const response = await api.get('/api/settings');
    
    if (response.data) {return response.data;
    } else {return mockSystemSettings;
    }
  } catch (error) {return mockSystemSettings;
  }
};

// Get settings by category
export const fetchSettingsByCategory = async (category) => {
  try {const response = await api.get(`/api/settings/${category}`);
    
    if (response.data) {return response.data;
    } else {return mockSystemSettings[category] || {};
    }
  } catch (error) {return mockSystemSettings[category] || {};
  }
};

// Update system settings
export const updateSystemSettings = async (category, settings) => {
  try {const response = await api.put(`/api/settings/${category}`, settings);
    
    if (response.data) {return response.data;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {throw new Error(`Cập nhật cài đặt ${category} thất bại: ${error.response?.data?.Message || error.message}`);
  }
};

// Update specific setting
export const updateSetting = async (key, value) => {
  try {const response = await api.patch('/api/settings', { key, value });
    
    if (response.data) {return response.data;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {throw new Error(`Cập nhật cài đặt thất bại: ${error.response?.data?.Message || error.message}`);
  }
};

// Reset settings to default
export const resetSettingsToDefault = async (category) => {
  try {const response = await api.post(`/api/settings/${category}/reset`);
    
    if (response.data) {return response.data;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {throw new Error(`Khôi phục cài đặt ${category} thất bại: ${error.response?.data?.Message || error.message}`);
  }
};

// Export settings
export const exportSettings = async () => {
  try {const response = await api.get('/api/settings/export', {
      responseType: 'blob'
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `system-settings-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);return true;
  } catch (error) {throw new Error(`Xuất cài đặt thất bại: ${error.response?.data?.Message || error.message}`);
  }
};

// Import settings
export const importSettings = async (file) => {
  try {const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/api/settings/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (response.data) {return response.data;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {throw new Error(`Nhập cài đặt thất bại: ${error.response?.data?.Message || error.message}`);
  }
};

// Test email configuration
export const testEmailConfiguration = async (emailSettings) => {
  try {const response = await api.post('/api/settings/test-email', emailSettings);
    
    if (response.data) {return response.data;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {throw new Error(`Kiểm tra email thất bại: ${error.response?.data?.Message || error.message}`);
  }
};

// Clear cache
export const clearSystemCache = async () => {
  try {const response = await api.post('/api/settings/clear-cache');
    
    if (response.data) {return response.data;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {throw new Error(`Xóa cache thất bại: ${error.response?.data?.Message || error.message}`);
  }
};

// Get available timezones
export const getTimezones = () => {
  return [
    { value: 'Asia/Ho_Chi_Minh', label: 'Việt Nam (UTC+7)' },
    { value: 'Asia/Bangkok', label: 'Bangkok (UTC+7)' },
    { value: 'Asia/Singapore', label: 'Singapore (UTC+8)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (UTC+9)' },
    { value: 'Europe/London', label: 'London (UTC+0)' },
    { value: 'America/New_York', label: 'New York (UTC-5)' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (UTC-8)' }
  ];
};

// Get available languages
export const getLanguages = () => {
  return [
    { value: 'vi', label: 'Tiếng Việt' },
    { value: 'en', label: 'English' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'zh', label: '中文' }
  ];
};

// Get available currencies
export const getCurrencies = () => {
  return [
    { value: 'VND', label: 'Việt Nam Đồng (₫)' },
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'JPY', label: 'Japanese Yen (¥)' },
    { value: 'KRW', label: 'Korean Won (₩)' }
  ];
};

export default {
  fetchSystemSettings,
  fetchSettingsByCategory,
  updateSystemSettings,
  updateSetting,
  resetSettingsToDefault,
  exportSettings,
  importSettings,
  testEmailConfiguration,
  clearSystemCache,
  getTimezones,
  getLanguages,
  getCurrencies
};