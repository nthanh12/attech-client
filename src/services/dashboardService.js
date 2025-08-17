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
  try {
    console.log("📊 Fetching dashboard overview from API...");
    const response = await api.get("/api/dashboard/all");

    if (response.data?.status === 1) {
      console.log("✅ Dashboard overview fetched successfully from API");
      return {
        success: true,
        data: response.data.data
      };
    } else {
      console.warn("⚠️ API returned invalid overview data, using mock data");
      return {
        success: true,
        data: mockStatistics.overview
      };
    }
  } catch (error) {
    console.warn(
      "⚠️ Failed to fetch dashboard overview from API, using mock data:",
      error.message
    );
    return {
      success: true,
      data: mockStatistics.overview
    };
  }
};

// Get user statistics
export const fetchUserStatistics = async () => {
  try {
    console.log("📊 Fetching user statistics from API...");
    const response = await api.get("/api/dashboard/all");

    if (response.data?.status === 1) {
      console.log("✅ User statistics fetched successfully from API");
      return response.data.data;
    } else {
      console.warn("⚠️ API returned invalid user data, using mock data");
      return mockStatistics.userStats;
    }
  } catch (error) {
    console.warn(
      "⚠️ Failed to fetch user statistics from API, using mock data:",
      error.message
    );
    return mockStatistics.userStats;
  }
};

// Get content statistics  
export const fetchContentStatistics = async () => {
  try {
    console.log("📊 Fetching content statistics from API...");
    const response = await api.get("/api/dashboard/all");

    if (response.data?.status === 1) {
      console.log("✅ Content statistics fetched successfully from API");
      return response.data.data;
    } else {
      console.warn("⚠️ API returned invalid content data, using mock data");
      return mockStatistics.contentStats;
    }
  } catch (error) {
    console.warn(
      "⚠️ Failed to fetch content statistics from API, using mock data:",
      error.message
    );
    return mockStatistics.contentStats;
  }
};

// Get system statistics
export const fetchSystemStatistics = async () => {
  try {
    console.log("📊 Fetching system statistics from API...");
    const response = await api.get("/api/dashboard/all");

    if (response.data?.status === 1) {
      console.log("✅ System statistics fetched successfully from API");
      return response.data.data;
    } else {
      console.warn("⚠️ API returned invalid system data, using mock data");
      return mockStatistics.systemStats;
    }
  } catch (error) {
    console.warn(
      "⚠️ Failed to fetch system statistics from API, using mock data:",
      error.message
    );
    return mockStatistics.systemStats;
  }
};

// Get recent activities
export const fetchRecentActivities = async (limit = 10) => {
  try {
    console.log("📊 Fetching recent activities from API...");
    const response = await api.get("/api/dashboard/all", {
      params: { limit },
    });

    if (response.data?.status === 1) {
      console.log("✅ Recent activities fetched successfully from API");
      return response.data.data;
    } else {
      console.warn("⚠️ API returned invalid activities data, using mock data");
      return mockStatistics.recentActivities.slice(0, limit);
    }
  } catch (error) {
    console.warn(
      "⚠️ Failed to fetch recent activities from API, using mock data:",
      error.message
    );
    return mockStatistics.recentActivities.slice(0, limit);
  }
};

// Get chart data for dashboard
export const fetchChartData = async (chartType) => {
  try {
    console.log(`📊 Fetching ${chartType} chart data from API...`);
    const response = await api.get("/api/dashboard/all");

    if (response.data?.status === 1) {
      console.log(`✅ ${chartType} chart data fetched successfully from API`);
      return response.data.data;
    } else {
      console.warn(
        `⚠️ API returned invalid ${chartType} chart data, using mock data`
      );
      return mockStatistics.charts[chartType] || {};
    }
  } catch (error) {
    console.warn(
      `⚠️ Failed to fetch ${chartType} chart data from API, using mock data:`,
      error.message
    );
    return mockStatistics.charts[chartType] || {};
  }
};

// Get all dashboard data in one request (optimized)
export const fetchAllDashboardData = async () => {
  try {
    console.log("📊 Fetching all dashboard data from API...");
    const response = await api.get("/api/dashboard/all");
    console.log("🔍 Dashboard API response structure:", response);
    console.log("🔍 Dashboard API response.data:", response.data);

    if (response.data?.status === 1) {
      console.log("✅ All dashboard data fetched successfully from API");
      return response.data.data;
    } else {
      console.warn("⚠️ API returned invalid dashboard data, using mock data");
      return mockStatistics;
    }
  } catch (error) {
    console.warn(
      "⚠️ Failed to fetch all dashboard data from API, using mock data:",
      error.message
    );
    return mockStatistics;
  }
};

// Get statistics for a specific date range
export const fetchStatisticsByDateRange = async (
  startDate,
  endDate,
  type = "overview"
) => {
  try {
    console.log(
      `📊 Fetching ${type} statistics for date range ${startDate} to ${endDate}...`
    );
    const response = await api.get(`/api/dashboard/${type}/range`, {
      params: { startDate, endDate },
    });

    if (response.data?.status === 1) {
      console.log(`✅ ${type} statistics for date range fetched successfully`);
      return response.data.data;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error(
      `❌ Failed to fetch ${type} statistics for date range:`,
      error
    );
    throw new Error(
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
  try {
    console.log("📊 Fetching dashboard export data from API...");
    const response = await api.get("/api/dashboard/export", {
      params: { format, dateRange },
      responseType: "blob",
    });

    if (response.data) {
      console.log("✅ Dashboard export data fetched successfully from API");
      // Create download link from API response
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
    } else {
      console.warn("⚠️ API returned invalid export data, using mock data");
      // Fallback to mock data
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
  } catch (error) {
    console.warn(
      "⚠️ Failed to fetch dashboard export data from API, using mock data:",
      error.message
    );
    // Fallback to mock data
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
    console.log("✅ Mock dashboard data exported successfully");
    return true;
  }
};

// Refresh cache for dashboard data
export const refreshDashboardCache = async () => {
  try {
    console.log("📊 Refreshing dashboard cache from API...");
    const response = await api.post("/api/dashboard/cache/refresh");

    if (response.data?.status === 1) {
      console.log("✅ Dashboard cache refreshed successfully from API");
      return response.data.data;
    } else {
      console.warn(
        "⚠️ API returned invalid cache refresh data, using mock data"
      );
      return {
        success: true,
        message: "Mock cache refresh completed",
        timestamp: new Date().toISOString(),
      };
    }
  } catch (error) {
    console.warn(
      "⚠️ Failed to refresh dashboard cache from API, using mock data:",
      error.message
    );
    return {
      success: true,
      message: "Mock cache refresh completed",
      timestamp: new Date().toISOString(),
    };
  }
};

// Get real-time system metrics (alias for fetchRealTimeMetrics)
export const fetchRealtimeData = async () => {
  try {
    console.log("📊 Fetching real-time data from API...");
    const response = await api.get("/api/dashboard/realtime");

    if (response.data?.status === 1) {
      console.log("✅ Real-time data fetched successfully from API");
      return response.data.data;
    } else {
      console.warn("⚠️ API returned invalid real-time data, using mock data");
      return {
        cpuUsage: mockStatistics.systemStats.cpuUsage,
        memoryUsage: mockStatistics.systemStats.memoryUsage,
        diskUsage: mockStatistics.systemStats.diskUsage,
        networkTraffic: mockStatistics.systemStats.networkTraffic,
        activeUsers: mockStatistics.overview.activeUsers,
        timestamp: new Date().toISOString(),
      };
    }
  } catch (error) {
    console.warn(
      "⚠️ Failed to fetch real-time data from API, using mock data:",
      error.message
    );
    return {
      cpuUsage: mockStatistics.systemStats.cpuUsage,
      memoryUsage: mockStatistics.systemStats.memoryUsage,
      diskUsage: mockStatistics.systemStats.diskUsage,
      networkTraffic: mockStatistics.systemStats.networkTraffic,
      activeUsers: mockStatistics.overview.activeUsers,
      timestamp: new Date().toISOString(),
    };
  }
};

// Get real-time system metrics
export const fetchRealTimeMetrics = async () => {
  try {
    console.log("📊 Fetching real-time metrics from API...");
    const response = await api.get("/api/dashboard/realtime");

    if (response.data?.status === 1) {
      console.log("✅ Real-time metrics fetched successfully from API");
      return response.data.data;
    } else {
      console.warn(
        "⚠️ API returned invalid real-time metrics data, using mock data"
      );
      return {
        cpuUsage: mockStatistics.systemStats.cpuUsage,
        memoryUsage: mockStatistics.systemStats.memoryUsage,
        diskUsage: mockStatistics.systemStats.diskUsage,
        networkTraffic: mockStatistics.systemStats.networkTraffic,
        activeUsers: mockStatistics.overview.activeUsers,
        timestamp: new Date().toISOString(),
      };
    }
  } catch (error) {
    console.warn(
      "⚠️ Failed to fetch real-time metrics from API, using mock data:",
      error.message
    );
    return {
      cpuUsage: mockStatistics.systemStats.cpuUsage,
      memoryUsage: mockStatistics.systemStats.memoryUsage,
      diskUsage: mockStatistics.systemStats.diskUsage,
      networkTraffic: mockStatistics.systemStats.networkTraffic,
      activeUsers: mockStatistics.overview.activeUsers,
      timestamp: new Date().toISOString(),
    };
  }
};

// Format numbers for display
export const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) {
    return "0";
  }
  const number = Number(num);
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + "B";
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
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
  fetchAllDashboardData,
  fetchStatisticsByDateRange,
  exportDashboardData,
  refreshDashboardCache,
  fetchRealTimeMetrics,
  formatNumber,
  formatPercentage,
  getTimePeriods,
};
