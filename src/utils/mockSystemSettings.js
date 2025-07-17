// Mock data cho system settings
export const mockSystemSettings = {
  general: {
    siteName: {
      vi: 'ATTECH - Công ty TNHH Kỹ thuật Quản lý bay',
      en: 'ATTECH - Aviation Technology Company Limited'
    },
    siteDescription: {
      vi: 'Chuyên cung cấp giải pháp CNS/ATM và dịch vụ hàng không',
      en: 'Specialized in CNS/ATM solutions and aviation services'
    },
    siteKeywords: {
      vi: 'CNS/ATM, hàng không, thiết bị bay, giám sát không lưu',
      en: 'CNS/ATM, aviation, flight equipment, air traffic surveillance'
    },
    defaultLanguage: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm:ss',
    maintenanceMode: false,
    maintenanceMessage: {
      vi: 'Hệ thống đang bảo trì. Vui lòng thử lại sau.',
      en: 'System is under maintenance. Please try again later.'
    }
  },
  company: {
    name: {
      vi: 'Công ty TNHH Kỹ thuật Quản lý bay',
      en: 'Aviation Technology Company Limited'
    },
    shortName: {
      vi: 'ATTECH',
      en: 'ATTECH'
    },
    address: {
      vi: 'Số 5/200 đường Nguyễn Sơn, phường Bồ Đề, thành phố Hà Nội',
      en: '5/200 Nguyen Son Street, Bo De Ward, Ha Noi City'
    },
    phone: '(84.4) 38271914',
    fax: '(84.4) 38730398',
    email: 'attech@attech.com.vn',
    website: 'https://attech.com.vn',
    taxCode: '0123456789',
    businessLicense: 'GP123456789',
    establishedDate: '2010-01-01',
    ceo: {
      vi: 'Nguyễn Văn A',
      en: 'Nguyen Van A'
    },
    description: {
      vi: 'Công ty chuyên về Kỹ thuật Quản lý bay và CNS/ATM',
      en: 'Company specialized in aviation technology and CNS/ATM'
    }
  },
  contact: {
    officeAddress: {
      vi: 'Số 5/200 đường Nguyễn Sơn, phường Bồ Đề, thành phố Hà Nội',
      en: '5/200 Nguyen Son Street, Bo De Ward, Ha Noi City'
    },
    phone: '(84.4) 38271914',
    fax: '(84.4) 38730398',
    email: 'attech@attech.com.vn',
    hotline: '1900 1234',
    workingHours: {
      vi: 'Thứ 2 - Thứ 6: 8:00 - 17:30',
      en: 'Monday - Friday: 8:00 AM - 5:30 PM'
    },
    emergencyContact: '+84 912 345 678'
  },
  seo: {
    metaTitle: {
      vi: 'ATTECH - Giải pháp CNS/ATM và Dịch vụ Hàng không',
      en: 'ATTECH - CNS/ATM Solutions and Aviation Services'
    },
    metaDescription: {
      vi: 'Chuyên cung cấp giải pháp CNS/ATM, thiết bị hàng không, dịch vụ bay kiểm tra và hiệu chuẩn',
      en: 'Specialized in CNS/ATM solutions, aviation equipment, flight inspection and calibration services'
    },
    metaKeywords: {
      vi: 'CNS/ATM, hàng không, thiết bị bay, giám sát không lưu, hiệu chuẩn',
      en: 'CNS/ATM, aviation, flight equipment, air traffic surveillance, calibration'
    },
    googleAnalytics: 'GA-123456789',
    googleTagManager: 'GTM-ABCDEF',
    facebookPixel: '123456789',
    robotsTxt: 'User-agent: *\nAllow: /',
    sitemapUrl: 'https://attech.com.vn/sitemap.xml'
  },
  email: {
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: 'noreply@attech.com.vn',
    smtpPassword: 'encrypted_password',
    smtpEncryption: 'tls',
    fromName: {
      vi: 'ATTECH',
      en: 'ATTECH'
    },
    fromEmail: 'noreply@attech.com.vn',
    replyTo: 'info@attech.com.vn',
    emailTemplates: {
      contact: {
        subject: {
          vi: 'Thông báo liên hệ từ website ATTECH',
          en: 'Contact notification from ATTECH website'
        },
        body: {
          vi: 'Có liên hệ mới từ website. Chi tiết: {details}',
          en: 'New contact from website. Details: {details}'
        }
      },
      newsletter: {
        subject: {
          vi: 'Bản tin ATTECH - {date}',
          en: 'ATTECH Newsletter - {date}'
        },
        body: {
          vi: 'Nội dung bản tin: {content}',
          en: 'Newsletter content: {content}'
        }
      }
    }
  },
  social: {
    facebook: 'https://facebook.com/attech',
    twitter: 'https://twitter.com/attech',
    linkedin: 'https://linkedin.com/company/attech',
    youtube: 'https://youtube.com/attech',
    instagram: 'https://instagram.com/attech',
    zalo: 'https://zalo.me/attech'
  },
  security: {
    sessionTimeout: 30, // minutes
    maxLoginAttempts: 5,
    lockoutDuration: 15, // minutes
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: true,
    twoFactorAuth: false,
    sslCertificate: true,
    backupFrequency: 'daily',
    backupRetention: 30, // days
    logRetention: 90 // days
  },
  performance: {
    cacheEnabled: true,
    cacheDuration: 3600, // seconds
    imageOptimization: true,
    gzipCompression: true,
    cdnEnabled: false,
    cdnUrl: '',
    maxUploadSize: 10485760, // 10MB
    allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx']
  },
  notification: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: false,
    adminNotifications: true,
    userNotifications: true,
    notificationChannels: ['email', 'admin']
  }
};

// Mock data cho banner config
export const mockBannerConfig = {
  homepage: {
    enabled: true,
    slides: [
      {
        id: 1,
        title: {
          vi: 'Giải pháp CNS/ATM hàng đầu',
          en: 'Leading CNS/ATM Solutions'
        },
        subtitle: {
          vi: 'Công nghệ tiên tiến cho ngành hàng không',
          en: 'Advanced technology for aviation industry'
        },
        image: 'https://picsum.photos/1200/400?random=1',
        link: '/products',
        order: 1,
        active: true
      },
      {
        id: 2,
        title: {
          vi: 'Dịch vụ bay kiểm tra chuyên nghiệp',
          en: 'Professional Flight Inspection Services'
        },
        subtitle: {
          vi: 'Đảm bảo an toàn và hiệu quả',
          en: 'Ensuring safety and efficiency'
        },
        image: 'https://picsum.photos/1200/400?random=2',
        link: '/services',
        order: 2,
        active: true
      },
      {
        id: 3,
        title: {
          vi: 'Đối tác tin cậy của ngành hàng không',
          en: 'Trusted Partner in Aviation Industry'
        },
        subtitle: {
          vi: 'Hơn 10 năm kinh nghiệm',
          en: 'Over 10 years of experience'
        },
        image: 'https://picsum.photos/1200/400?random=3',
        link: '/about',
        order: 3,
        active: true
      }
    ],
    autoplay: true,
    autoplaySpeed: 5000,
    showArrows: true,
    showDots: true
  },
  products: {
    enabled: true,
    slides: [
      {
        id: 4,
        title: {
          vi: 'Sản phẩm CNS/ATM',
          en: 'CNS/ATM Products'
        },
        subtitle: {
          vi: 'Thiết bị và giải pháp chuyên dụng',
          en: 'Specialized equipment and solutions'
        },
        image: 'https://picsum.photos/1200/400?random=4',
        link: '/products',
        order: 1,
        active: true
      }
    ],
    autoplay: false,
    autoplaySpeed: 5000,
    showArrows: true,
    showDots: true
  },
  services: {
    enabled: true,
    slides: [
      {
        id: 5,
        title: {
          vi: 'Dịch vụ hàng không',
          en: 'Aviation Services'
        },
        subtitle: {
          vi: 'Dịch vụ chuyên nghiệp và uy tín',
          en: 'Professional and reliable services'
        },
        image: 'https://picsum.photos/1200/400?random=5',
        link: '/services',
        order: 1,
        active: true
      }
    ],
    autoplay: false,
    autoplaySpeed: 5000,
    showArrows: true,
    showDots: true
  }
};

// Utility functions
export const getSystemSetting = (key) => {
  const keys = key.split('.');
  let value = mockSystemSettings;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return null;
    }
  }
  
  return value;
};

export const updateSystemSetting = (key, value) => {
  const keys = key.split('.');
  let current = mockSystemSettings;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
  return true;
};

export const getBannerConfig = (page) => {
  return mockBannerConfig[page] || null;
};

export const updateBannerConfig = (page, config) => {
  mockBannerConfig[page] = { ...mockBannerConfig[page], ...config };
  return true;
}; 