import api from "../api";

// Mock statistics data for fallback when backend is not available
const mockStatistics = {
  overview: {
    totalUsers: 1250,
    totalProducts: 89,
    totalServices: 34,
    totalNews: 156,
    totalNotifications: 23,
    totalOrders: 542,
    totalRevenue: 2450000000, // VND
    activeUsers: 892,
    pendingOrders: 15,
    publishedNews: 142,
    activeServices: 31,
    activeProducts: 76,
  },
  userStats: {
    newUsersToday: 12,
    newUsersThisWeek: 87,
    newUsersThisMonth: 234,
    activeUsersToday: 156,
    userGrowthRate: 15.3, // percentage
    usersByRole: [
      { role: "Admin", count: 5, percentage: 0.4 },
      { role: "Editor", count: 12, percentage: 1.0 },
      { role: "Customer", count: 1233, percentage: 98.6 },
    ],
  },
  contentStats: {
    newsPublishedThisMonth: 23,
    productsAddedThisMonth: 8,
    servicesAddedThisMonth: 3,
    notificationsThisMonth: 5,
    contentGrowthRate: 12.7,
    categoryDistribution: [
      { category: "Technology", count: 45, type: "news" },
      { category: "Business", count: 32, type: "news" },
      { category: "Software", count: 28, type: "products" },
      { category: "Consulting", count: 18, type: "services" },
    ],
  },
  systemStats: {
    serverUptime: 99.97,
    lastBackup: "2024-07-27T02:00:00Z",
    storageUsed: 45.2, // GB
    storageLimit: 100, // GB
    memoryUsage: 68.5, // percentage
    cpuUsage: 23.8, // percentage
    diskUsage: 52.3, // percentage
    networkTraffic: {
      incoming: 2.5, // MB/s
      outgoing: 1.8, // MB/s
    },
  },
  recentActivities: [
    {
      id: 1,
      type: "user_registered",
      message: "Người dùng mới đăng ký: user@example.com",
      timestamp: "2024-07-27T10:30:00Z",
      icon: "bi-person-plus",
      severity: "info",
    },
    {
      id: 2,
      type: "news_published",
      message: 'Bài viết mới được xuất bản: "Xu hướng công nghệ 2024"',
      timestamp: "2024-07-27T09:15:00Z",
      icon: "bi-newspaper",
      severity: "success",
    },
    {
      id: 3,
      type: "product_added",
      message: 'Sản phẩm mới: "Website quản lý bán hàng"',
      timestamp: "2024-07-27T08:45:00Z",
      icon: "bi-box",
      severity: "success",
    },
    {
      id: 4,
      type: "system_backup",
      message: "Sao lưu hệ thống hoàn tất",
      timestamp: "2024-07-27T02:00:00Z",
      icon: "bi-cloud-check",
      severity: "info",
    },
    {
      id: 5,
      type: "security_alert",
      message: "Cảnh báo: 3 lần đăng nhập thất bại từ IP 192.168.1.100",
      timestamp: "2024-07-26T23:30:00Z",
      icon: "bi-shield-exclamation",
      severity: "warning",
    },
  ],
  charts: {
    // Data for user growth chart (last 7 days)
    userGrowth: {
      labels: ["21/07", "22/07", "23/07", "24/07", "25/07", "26/07", "27/07"],
      datasets: [
        {
          label: "Người dùng mới",
          data: [8, 12, 15, 9, 18, 14, 12],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
        },
        {
          label: "Người dùng hoạt động",
          data: [145, 156, 162, 149, 178, 165, 156],
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.4,
        },
      ],
    },
    // Data for content distribution chart
    contentDistribution: {
      labels: ["Tin tức", "Sản phẩm", "Dịch vụ", "Thông báo"],
      datasets: [
        {
          data: [156, 89, 34, 23],
          backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
          borderWidth: 2,
          borderColor: "#ffffff",
        },
      ],
    },
    // Data for revenue chart (last 6 months)
    revenue: {
      labels: ["T2", "T3", "T4", "T5", "T6", "T7"],
      datasets: [
        {
          label: "Doanh thu (triệu VND)",
          data: [380, 420, 395, 450, 485, 520],
          borderColor: "#059669",
          backgroundColor: "rgba(5, 150, 105, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    // Data for system performance (last 24 hours)
    systemPerformance: {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      datasets: [
        {
          label: "CPU (%)",
          data: [
            20, 18, 15, 12, 14, 16, 22, 28, 35, 42, 38, 45, 48, 52, 49, 46, 41,
            38, 35, 32, 28, 25, 23, 21,
          ],
          borderColor: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          tension: 0.4,
        },
        {
          label: "Memory (%)",
          data: [
            65, 64, 63, 62, 63, 65, 68, 72, 75, 78, 76, 79, 82, 85, 83, 80, 77,
            74, 71, 69, 67, 66, 65, 64,
          ],
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          tension: 0.4,
        },
      ],
    },
  },
};

// Get dashboard overview statistics
export const fetchDashboardOverview = async () => {
  try {const response = await api.get("/api/dashboard/all");

    if (response.data?.status === 1) {return {
        success: true,
        data: response.data.data,
      };
    } else {return {
        success: true,
        data: mockStatistics.overview,
      };
    }
  } catch (error) {return {
      success: true,
      data: mockStatistics.overview,
    };
  }
};

// Get user statistics
export const fetchUserStatistics = async () => {
  try {const response = await api.get("/api/dashboard/all");

    if (response.data?.status === 1) {return response.data.data;
    } else {return mockStatistics.userStats;
    }
  } catch (error) {return mockStatistics.userStats;
  }
};

// Get content statistics
export const fetchContentStatistics = async () => {
  try {const response = await api.get("/api/dashboard/all");

    if (response.data?.status === 1) {return response.data.data;
    } else {return mockStatistics.contentStats;
    }
  } catch (error) {return mockStatistics.contentStats;
  }
};

// Get system statistics
export const fetchSystemStatistics = async () => {
  try {const response = await api.get("/api/dashboard/all");

    if (response.data?.status === 1) {return response.data.data;
    } else {return mockStatistics.systemStats;
    }
  } catch (error) {return mockStatistics.systemStats;
  }
};

// Get recent activities
export const fetchRecentActivities = async (limit = 10) => {
  try {const response = await api.get("/api/dashboard/activities", {
      params: { limit },
    });

    if (response.data?.status === 1) {return response.data.data;
    } else {return mockStatistics.recentActivities.slice(0, limit);
    }
  } catch (error) {return mockStatistics.recentActivities.slice(0, limit);
  }
};

// Get contact trend chart data from API
export const fetchContactTrendChart = async (days = 30) => {
  try {const response = await api.get(
      `/api/dashboard/charts/contacttrend?days=${days}`
    );if (response.data?.status === 1 || response.data?.success) {return response.data.data || response.data;
    } else {
      throw new Error("Contact trend API returned invalid data");
    }
  } catch (error) {throw error;
  }
};

// Get chart data for dashboard
export const fetchChartData = async (chartType) => {
  try {const response = await api.get("/api/dashboard/all");

    if (response.data?.status === 1) {return response.data.data;
    } else {return mockStatistics.charts[chartType] || {};
    }
  } catch (error) {return mockStatistics.charts[chartType] || {};
  }
};

// Get contact statistics specifically
export const fetchContactStatistics = async () => {
  try {const response = await api.get("/api/dashboard/contacts");if (response.data?.status === 1 || response.data?.success) {return response.data.data || response.data;
    } else {return {
        totalContacts: 442,
        unreadContacts: 23,
        readContacts: 419,
        contactsToday: 3,
        contactsThisWeek: 18,
        contactsThisMonth: 67,
        responseRate: 94.8,
        trends: {
          totalThisMonth: 67,
          totalLastMonth: 52,
          growthPercentage: 28.8,
          trendDirection: "up",
          averagePerDay: 2.3,
        },
      };
    }
  } catch (error) {return {
      totalContacts: 442,
      unreadContacts: 23,
      readContacts: 419,
      contactsToday: 3,
      contactsThisWeek: 18,
      contactsThisMonth: 67,
      responseRate: 94.8,
      trends: {
        totalThisMonth: 67,
        totalLastMonth: 52,
        growthPercentage: 28.8,
        trendDirection: "up",
        averagePerDay: 2.3,
      },
    };
  }
};

// Get comprehensive dashboard data with all statistics
export const fetchAllDashboardData = async () => {
  try {const response = await api.get("/api/dashboard/overview");if (response.data?.status === 1 && response.data?.data) {const apiData = response.data.data;

      // API trả về overview data structure
      return {
        overview: {
          totalUsers: apiData.totalUsers || 0,
          totalProducts: apiData.totalProducts || 0,
          totalServices: apiData.totalServices || 0,
          totalNews: apiData.totalNews || 0,
          totalNotifications: apiData.totalNotifications || 0,
          totalContacts: apiData.totalContacts || 0,
          activeUsers: apiData.activeUsers || 0,
          lastUpdated: apiData.lastUpdated,
        },
        userStats: {
          newUsersThisMonth: apiData.totalUsers || 0,
          activeUsersToday: apiData.activeUsers || 0,
        },
        contentStats: {
          newsPublishedThisMonth: apiData.totalNews || 0,
          productsAddedThisMonth: apiData.totalProducts || 0,
          servicesAddedThisMonth: apiData.totalServices || 0,
          notificationsThisMonth: apiData.totalNotifications || 0,
        },
        contactStats: {
          totalContacts: apiData.totalContacts || 0,
          unreadContacts: 0, // Will fetch separately if needed
          readContacts: apiData.totalContacts || 0,
          responseRate: 100,
        },
        recentActivities: [],
        charts: mockStatistics.charts,
      };
    } else {throw new Error("Overview API returned invalid data");
    }
  } catch (error) {return {
      overview: {
        totalUsers: 0,
        totalProducts: 0,
        totalServices: 0,
        totalNews: 0,
        totalNotifications: 0,
        totalContacts: 0,
        activeUsers: 0,
      },
      userStats: {},
      contentStats: {},
      contactStats: {},
      recentActivities: [],
    };
  }
};

// Get statistics for a specific date range
export const fetchStatisticsByDateRange = async (
  startDate,
  endDate,
  type = "overview"
) => {
  try {const response = await api.get(`/api/dashboard/${type}/range`, {
      params: { startDate, endDate },
    });

    if (response.data?.status === 1) {return response.data.data;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {throw new Error(
      `Lấy thống kê ${type} thất bại: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};

// Export dashboard data
export const exportDashboardData = async (
  format = "json",
  dateRange = null
) => {
  try {const response = await api.get("/api/dashboard/export", {
      params: { format, dateRange },
      responseType: "blob",
    });

    if (response.data) {// Create download link from API response
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `dashboard-export-${new Date().toISOString().split("T")[0]}.${format}`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return true;
    } else {// Fallback to mock data
      const exportData = JSON.stringify(mockStatistics, null, 2);
      const blob = new Blob([exportData], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `dashboard-export-${new Date().toISOString().split("T")[0]}.${format}`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return true;
    }
  } catch (error) {// Fallback to mock data
    const exportData = JSON.stringify(mockStatistics, null, 2);
    const blob = new Blob([exportData], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `dashboard-export-${new Date().toISOString().split("T")[0]}.${format}`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);return true;
  }
};

// Refresh cache for dashboard data
export const refreshDashboardCache = async () => {
  try {const response = await api.post("/api/dashboard/cache/refresh");

    if (response.data?.status === 1) {return response.data.data;
    } else {return {
        success: true,
        message: "Mock cache refresh completed",
        timestamp: new Date().toISOString(),
      };
    }
  } catch (error) {return {
      success: true,
      message: "Mock cache refresh completed",
      timestamp: new Date().toISOString(),
    };
  }
};

// Get real-time system metrics (alias for fetchRealTimeMetrics)
export const fetchRealtimeData = async () => {
  try {const response = await api.get("/api/dashboard/realtime");

    if (response.data?.status === 1) {return response.data.data;
    } else {return {
        cpuUsage: mockStatistics.systemStats.cpuUsage,
        memoryUsage: mockStatistics.systemStats.memoryUsage,
        diskUsage: mockStatistics.systemStats.diskUsage,
        networkTraffic: mockStatistics.systemStats.networkTraffic,
        activeUsers: mockStatistics.overview.activeUsers,
        timestamp: new Date().toISOString(),
      };
    }
  } catch (error) {return {
      cpuUsage: mockStatistics.systemStats.cpuUsage,
      memoryUsage: mockStatistics.systemStats.memoryUsage,
      diskUsage: mockStatistics.systemStats.diskUsage,
      networkTraffic: mockStatistics.systemStats.networkTraffic,
      activeUsers: mockStatistics.overview.activeUsers,
      timestamp: new Date().toISOString(),
    };
  }
};

// Get real-time system metrics and updates
export const fetchRealTimeMetrics = async () => {
  try {const response = await api.get("/api/dashboard/realtime");

    if (response.data && typeof response.data === "object") {return {
        cpuUsage: response.data.cpuUsage || 0,
        memoryUsage: response.data.memoryUsage || 0,
        diskUsage: response.data.diskUsage || 0,
        networkTraffic: response.data.networkTraffic || {
          incoming: 0,
          outgoing: 0,
        },
        activeUsers: response.data.activeUsers || 0,
        onlineUsers: response.data.onlineUsers || 0,
        systemStatus: response.data.systemStatus || "online",
        serverUptime: response.data.serverUptime || 0,
        timestamp: response.data.timestamp || new Date().toISOString(),
        // Contact real-time data
        newContactsToday: response.data.newContactsToday || 0,
        unreadContacts: response.data.unreadContacts || 0,
        // Live notifications
        liveNotifications: response.data.liveNotifications || [],
      };
    } else {return {
        cpuUsage: mockStatistics.systemStats.cpuUsage,
        memoryUsage: mockStatistics.systemStats.memoryUsage,
        diskUsage: mockStatistics.systemStats.diskUsage,
        networkTraffic: mockStatistics.systemStats.networkTraffic,
        activeUsers: mockStatistics.overview.activeUsers,
        onlineUsers: mockStatistics.overview.activeUsers,
        systemStatus: "online",
        serverUptime: 99.9,
        timestamp: new Date().toISOString(),
        newContactsToday: 0,
        unreadContacts: 0,
        liveNotifications: [],
      };
    }
  } catch (error) {return {
      cpuUsage: mockStatistics.systemStats.cpuUsage,
      memoryUsage: mockStatistics.systemStats.memoryUsage,
      diskUsage: mockStatistics.systemStats.diskUsage,
      networkTraffic: mockStatistics.systemStats.networkTraffic,
      activeUsers: mockStatistics.overview.activeUsers,
      onlineUsers: mockStatistics.overview.activeUsers,
      systemStatus: "online",
      serverUptime: 99.9,
      timestamp: new Date().toISOString(),
      newContactsToday: 0,
      unreadContacts: 0,
      liveNotifications: [],
    };
  }
};

// Format numbers for display
export const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) {
    return "0";
  }

  const number = Number(num);
  if (isNaN(number)) {
    return "0";
  }

  // Handle negative numbers
  const absNumber = Math.abs(number);
  const sign = number < 0 ? "-" : "";

  if (absNumber >= 1000000000) {
    return sign + (absNumber / 1000000000).toFixed(1) + "B";
  }
  if (absNumber >= 1000000) {
    return sign + (absNumber / 1000000).toFixed(1) + "M";
  }
  if (absNumber >= 1000) {
    return sign + (absNumber / 1000).toFixed(1) + "K";
  }
  return number.toString();
};

// Format percentage
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined || isNaN(value)) {
    return "0.0%";
  }
  return `${Number(value).toFixed(decimals)}%`;
};

// Get time period options
export const getTimePeriods = () => {
  return [
    { value: "today", label: "Hôm nay" },
    { value: "yesterday", label: "Hôm qua" },
    { value: "last7days", label: "7 ngày qua" },
    { value: "last30days", label: "30 ngày qua" },
    { value: "thisMonth", label: "Tháng này" },
    { value: "lastMonth", label: "Tháng trước" },
    { value: "last3months", label: "3 tháng qua" },
    { value: "last6months", label: "6 tháng qua" },
    { value: "thisYear", label: "Năm này" },
    { value: "lastYear", label: "Năm trước" },
    { value: "custom", label: "Tùy chọn" },
  ];
};

export default {
  fetchDashboardOverview,
  fetchUserStatistics,
  fetchContentStatistics,
  fetchSystemStatistics,
  fetchRecentActivities,
  fetchChartData,
  fetchContactStatistics,
  fetchContactTrendChart,
  fetchAllDashboardData,
  fetchStatisticsByDateRange,
  exportDashboardData,
  refreshDashboardCache,
  fetchRealTimeMetrics,
  formatNumber,
  formatPercentage,
  getTimePeriods,
};
