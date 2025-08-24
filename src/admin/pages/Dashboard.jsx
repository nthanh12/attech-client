import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import LoadingSpinner from "../components/LoadingSpinner";
import ToastMessage from "../components/ToastMessage";
import AccessDenied from "../../components/AccessDenied";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchAllDashboardData,
  fetchRealTimeMetrics,
  fetchContactTrendChart,
  exportDashboardData,
  refreshDashboardCache,
  formatNumber,
  formatPercentage,
  getTimePeriods,
} from "../../services/dashboardService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import "./Dashboard.css";
import "../styles/adminButtons.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const [refreshing, setRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("last7days");
  const [dashboardData, setDashboardData] = useState(null);
  const [realTimeMetrics, setRealTimeMetrics] = useState(null);
  const [contactTrendData, setContactTrendData] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [lastUpdated, setLastUpdated] = useState(null);

  const timePeriods = getTimePeriods();

  // Fetch dashboard data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Check permission before making API call - Admin and SuperAdmin can access
      if (!currentUser || currentUser.roleId > 2) {
        setAccessDenied(true);
        setLoading(false);
        return;
      }
      
      try {
        // Try to fetch real data from API
        const data = await fetchAllDashboardData();
        console.log("🔍 Dashboard data received:", data);
        
        // Validate data structure before setting
        if (data && typeof data === 'object') {
          setDashboardData(data);
          setAccessDenied(false);
        } else {
          console.warn("⚠️ Invalid data structure received:", data);
          throw new Error("Invalid data structure");
        }
      } catch (apiError) {
        // Check if it's a 401 unauthorized error
        if (apiError.message && apiError.message.includes('401')) {
          console.warn("⚠️ Dashboard access denied (401)");
          setAccessDenied(true);
          return;
        }
        
        console.warn("⚠️ Dashboard API not available, using static data:", apiError.message);
        
        // Use static dashboard data when API is not available
        const staticData = {
          overview: {
            totalUsers: 0,
            totalProducts: 0,
            totalServices: 0,
            totalNews: 0,
            totalNotifications: 0,
            activeUsers: 0
          },
          charts: {
            userGrowth: { labels: [], datasets: [] },
            contentDistribution: { labels: [], datasets: [] }
          }
        };
        setDashboardData(staticData);
        setAccessDenied(false);
      }
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to initialize dashboard:", error);
      setToast({
        show: true,
        message: "Không thể khởi tạo dashboard!",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Fetch real-time metrics
  const fetchRealTime = useCallback(async () => {
    try {
      // Check permission before making API call
      if (!currentUser?.permissions?.includes('menu_dashboard')) {
        console.warn("⚠️ User doesn't have menu_dashboard permission for realtime");
        return;
      }
      
      const metrics = await fetchRealTimeMetrics();
      setRealTimeMetrics(metrics);
    } catch (error) {
      // Check if it's a 401 unauthorized error
      if (error.message && error.message.includes('401')) {
        console.warn("⚠️ Real-time metrics access denied (401)");
        setAccessDenied(true);
        return;
      }
      
      console.warn("⚠️ Real-time metrics API not available:", error.message);
      // Use static real-time metrics when API is not available
      setRealTimeMetrics({
        cpuUsage: 0,
        memoryUsage: 0,
        diskUsage: 0,
        networkTraffic: { incoming: 0, outgoing: 0 },
        activeUsers: 0,
        timestamp: new Date().toISOString()
      });
    }
  }, [currentUser]);

  // Fetch contact trend chart data
  const fetchContactTrend = useCallback(async () => {
    try {
      if (!currentUser || currentUser.roleId > 2) {
        return;
      }
      
      const trendData = await fetchContactTrendChart(30);
      setContactTrendData(trendData);
    } catch (error) {
      console.warn("⚠️ Contact trend chart API not available:", error.message);
      setContactTrendData(null);
    }
  }, [currentUser]);

  // Handle refresh
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      
      try {
        await refreshDashboardCache();
      } catch (cacheError) {
        console.warn("⚠️ Cache refresh API not available:", cacheError.message);
      }
      
      // Refresh all data including contact trend
      await Promise.all([
        fetchData(),
        fetchContactTrend()
      ]);
      
      setToast({
        show: true,
        message: "Làm mới dữ liệu thành công!",
        type: "success",
      });
    } catch (error) {
      setToast({
        show: true,
        message: error.message || "Lỗi khi làm mới dữ liệu!",
        type: "error",
      });
    } finally {
      setRefreshing(false);
    }
  };

  // Handle export
  const handleExport = async (format = "json") => {
    try {
      setExporting(true);
      
      try {
        await exportDashboardData(format);
        setToast({
          show: true,
          message: "Xuất dữ liệu thành công!",
          type: "success",
        });
      } catch (exportError) {
        console.warn("⚠️ Export API not available:", exportError.message);
        setToast({
          show: true,
          message: "Tính năng xuất dữ liệu chưa khả dụng!",
          type: "warning",
        });
      }
    } catch (error) {
      setToast({
        show: true,
        message: error.message || "Lỗi khi xuất dữ liệu!",
        type: "error",
      });
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchContactTrend();
  }, [fetchData, fetchContactTrend]);

  // Set up real-time updates
  useEffect(() => {
    fetchRealTime();
    const interval = setInterval(fetchRealTime, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [fetchRealTime]);

  const renderOverviewCards = () => {
    if (!dashboardData?.overview) {
      console.warn("🔍 No overview data available:", dashboardData);
      return null;
    }

    const { overview } = dashboardData;
    console.log("🔍 Rendering overview cards with data:", overview);

    // Ensure all values are numbers and handle null/undefined
    const safeNumber = (value) => {
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    };

    const cards = [
      {
        title: "Tổng người dùng",
        value: formatNumber(safeNumber(overview.totalUsers)),
        icon: "bi-people",
        color: "#3b82f6",
        link: "/admin/users",
        change: overview.userGrowthRate ? `${overview.userGrowthRate > 0 ? '+' : ''}${safeNumber(overview.userGrowthRate)}%` : "",
        changeType: safeNumber(overview.userGrowthRate) > 0 ? "positive" : "negative",
      },
      {
        title: "Sản phẩm",
        value: formatNumber(safeNumber(overview.totalProducts)),
        icon: "bi-box",
        color: "#10b981",
        link: "/admin/products",
        change: "",
        changeType: "neutral",
      },
      {
        title: "Dịch vụ",
        value: formatNumber(safeNumber(overview.totalServices)),
        icon: "bi-gear",
        color: "#f59e0b",
        link: "/admin/services",
        change: "",
        changeType: "neutral",
      },
      {
        title: "Tin tức",
        value: formatNumber(safeNumber(overview.totalNews)),
        icon: "bi-newspaper",
        color: "#ef4444",
        link: "/admin/news",
        change: "",
        changeType: "neutral",
      },
      {
        title: "Thông báo",
        value: formatNumber(safeNumber(overview.totalNotifications)),
        icon: "bi-bell",
        color: "#8b5cf6",
        link: "/admin/notifications",
        change: "",
        changeType: "neutral",
      },
      {
        title: "Liên hệ",
        value: formatNumber(safeNumber(overview.totalContacts || 0)),
        icon: "bi-envelope",
        color: "#06b6d4",
        link: "/admin/contacts",
        change: overview.unreadContacts ? `${safeNumber(overview.unreadContacts)} chưa đọc` : "",
        changeType: overview.unreadContacts > 0 ? "warning" : "neutral",
      },
    ];

    return (
      <div className="overview-cards">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="overview-card"
            style={{ '--card-color': card.color }}
          >
            <div className="card-icon">
              <i className={`bi ${card.icon}`}></i>
            </div>
            <div className="card-content">
              <h3>{card.title}</h3>
              <div className="card-value">{card.value}</div>
              <div className={`card-change ${card.changeType}`}>
                <i
                  className={`bi ${
                    card.changeType === "positive"
                      ? "bi-arrow-up"
                      : "bi-arrow-down"
                  }`}
                ></i>
                {card.change}
              </div>
            </div>
            {card.link !== "#" && (
              <Link to={card.link} className="card-link">
                <i className="bi bi-arrow-right"></i>
              </Link>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSystemMetrics = () => {
    if (!realTimeMetrics) return null;

    // Safe access with fallback values
    const cpuUsage = realTimeMetrics.cpuUsage || 0;
    const memoryUsage = realTimeMetrics.memoryUsage || 0;
    const diskUsage = realTimeMetrics.diskUsage || 0;
    const activeUsers = realTimeMetrics.activeUsers || 0;
    const systemStatus = realTimeMetrics.systemStatus || 'online';
    const serverUptime = realTimeMetrics.serverUptime || 0;

    return (
      <div className="system-metrics">
        <div className="system-header">
          <h3>Hiệu suất hệ thống</h3>
          <div className="system-status">
            <div className={`status-indicator ${systemStatus}`}>
              <i className="bi bi-circle-fill"></i>
              {systemStatus === 'online' ? 'Online' : 'Offline'}
            </div>
            <div className="uptime">
              Uptime: {serverUptime.toFixed(2)}%
            </div>
          </div>
        </div>
        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-label">CPU</div>
            <div className="metric-bar">
              <div
                className="metric-fill cpu"
                style={{ width: `${cpuUsage}%` }}
              ></div>
            </div>
            <div className="metric-value">{formatPercentage(cpuUsage)}</div>
          </div>

          <div className="metric-item">
            <div className="metric-label">Memory</div>
            <div className="metric-bar">
              <div
                className="metric-fill memory"
                style={{ width: `${memoryUsage}%` }}
              ></div>
            </div>
            <div className="metric-value">{formatPercentage(memoryUsage)}</div>
          </div>

          <div className="metric-item">
            <div className="metric-label">Disk</div>
            <div className="metric-bar">
              <div
                className="metric-fill disk"
                style={{ width: `${diskUsage}%` }}
              ></div>
            </div>
            <div className="metric-value">{formatPercentage(diskUsage)}</div>
          </div>

          <div className="metric-item">
            <div className="metric-label">Users Online</div>
            <div className="metric-value-large">
              {formatNumber(activeUsers)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRecentActivities = () => {
    if (!dashboardData?.recentActivities || dashboardData.recentActivities.length === 0) {
      return (
        <div className="recent-activities">
          <h3>Hoạt động gần đây</h3>
          <div className="activities-list">
            <p style={{textAlign: 'center', color: '#6b7280', padding: '2rem'}}>
              Chưa có hoạt động nào
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="recent-activities">
        <h3>Hoạt động gần đây</h3>
        <div className="activities-list">
          {dashboardData.recentActivities.slice(0, 10).map((activity) => (
            <div
              key={activity.id}
              className={`activity-item ${(activity.severity || 'info').toLowerCase()}`}
            >
              <div className="activity-icon">
                <i className={`bi ${activity.icon || 'bi-info-circle'}`}></i>
              </div>
              <div className="activity-content">
                <div className="activity-message">{activity.message}</div>
                <div className="activity-time">
                  {new Date(activity.timestamp).toLocaleString("vi-VN")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderQuickActions = () => {
    const actions = [
      {
        label: "Thêm sản phẩm",
        icon: "bi-plus-circle",
        link: "/admin/products",
        color: "#10b981",
      },
      {
        label: "Thêm tin tức",
        icon: "bi-plus-circle",
        link: "/admin/news",
        color: "#3b82f6",
      },
      {
        label: "Thêm dịch vụ",
        icon: "bi-plus-circle",
        link: "/admin/services",
        color: "#f59e0b",
      },
      {
        label: "Quản lý banner",
        icon: "bi-image",
        link: "/admin/banners",
        color: "#ef4444",
      },
      {
        label: "Cài đặt hệ thống",
        icon: "bi-gear",
        link: "/admin/settings",
        color: "#8b5cf6",
      },
      {
        label: "Quản lý users",
        icon: "bi-people",
        link: "/admin/users",
        color: "#06b6d4",
      },
    ];

    return (
      <div className="quick-actions">
        <h3>Thao tác nhanh</h3>
        <div className="actions-grid">
          {actions.map((action, index) => (
            <Link 
              key={index} 
              to={action.link} 
              className="action-item"
              style={{ '--action-color': action.color }}
            >
              <div className="action-icon">
                <i className={`bi ${action.icon}`}></i>
              </div>
              <span>{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const renderContactStatsSection = () => {
    if (!dashboardData?.contactStats) {
      console.warn("🔍 No contactStats data available:", dashboardData);
      return null;
    }

    const { contactStats } = dashboardData;
    console.log("🔍 Rendering contact stats with data:", contactStats);

    // Ensure all values are numbers and handle null/undefined
    const safeNumber = (value) => {
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    };

    const { 
      totalContacts, 
      unreadContacts, 
      readContacts, 
      responseRate, 
      trends,
      contactsToday,
      contactsThisWeek,
      contactsThisMonth
    } = contactStats;

    return (
      <div className="contact-stats-section">
        <h3>📞 Thống kê liên hệ khách hàng</h3>
        
        <div className="stats-grid contact-stats-grid">
          <div className="stat-item">
            <div className="stat-icon contacts">
              <i className="bi bi-envelope"></i>
            </div>
            <div className="stat-content">
              <div className="stat-label">Tổng liên hệ</div>
              <div className="stat-value">{safeNumber(totalContacts)}</div>
            </div>
          </div>
          
          <div className={`stat-item ${safeNumber(unreadContacts) > 0 ? 'urgent' : ''}`}>
            <div className="stat-icon unread">
              <i className="bi bi-envelope-exclamation"></i>
            </div>
            <div className="stat-content">
              <div className="stat-label">Chưa đọc</div>
              <div className="stat-value">{safeNumber(unreadContacts)}</div>
              {safeNumber(unreadContacts) > 0 && <span className="alert-badge">!</span>}
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon read">
              <i className="bi bi-envelope-check"></i>
            </div>
            <div className="stat-content">
              <div className="stat-label">Đã xử lý</div>
              <div className="stat-value">{safeNumber(readContacts)}</div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon response">
              <i className="bi bi-graph-up"></i>
            </div>
            <div className="stat-content">
              <div className="stat-label">Tỷ lệ phản hồi</div>
              <div className="stat-value">{safeNumber(responseRate)}%</div>
            </div>
          </div>
        </div>

        {/* Time-based stats */}
        <div className="contact-time-stats">
          <div className="time-stat">
            <div className="time-stat-value">{safeNumber(contactsToday)}</div>
            <div className="time-stat-label">Hôm nay</div>
          </div>
          <div className="time-stat">
            <div className="time-stat-value">{safeNumber(contactsThisWeek)}</div>
            <div className="time-stat-label">Tuần này</div>
          </div>
          <div className="time-stat">
            <div className="time-stat-value">{safeNumber(contactsThisMonth)}</div>
            <div className="time-stat-label">Tháng này</div>
          </div>
        </div>

        {/* Trend analysis */}
        {trends && (
          <div className="contact-trend">
            <div className="trend-indicator">
              <span>Xu hướng tháng này: </span>
              <span className={`trend ${trends.trendDirection || 'stable'}`}>
                {trends.trendDirection === 'up' ? '📈' : 
                 trends.trendDirection === 'down' ? '📉' : '➡️'}
                {safeNumber(trends.growthPercentage)}%
              </span>
            </div>
            <div className="trend-detail">
              Trung bình {safeNumber(trends.averagePerDay)} liên hệ/ngày
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContentStats = () => {
    if (!dashboardData?.contentStats) {
      console.warn("🔍 No contentStats data available:", dashboardData);
      return null;
    }

    const { contentStats } = dashboardData;
    console.log("🔍 Rendering content stats with data:", contentStats);

    // Ensure all values are numbers and handle null/undefined
    const safeNumber = (value) => {
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    };

    return (
      <div className="content-stats">
        <h3>Thống kê nội dung tháng này</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon news">
              <i className="bi bi-newspaper"></i>
            </div>
            <div className="stat-content">
              <div className="stat-label">Tin tức mới</div>
              <div className="stat-value">
                {safeNumber(contentStats.newsPublishedThisMonth)}
              </div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon products">
              <i className="bi bi-box"></i>
            </div>
            <div className="stat-content">
              <div className="stat-label">Sản phẩm mới</div>
              <div className="stat-value">
                {safeNumber(contentStats.productsAddedThisMonth)}
              </div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon services">
              <i className="bi bi-gear"></i>
            </div>
            <div className="stat-content">
              <div className="stat-label">Dịch vụ mới</div>
              <div className="stat-value">
                {safeNumber(contentStats.servicesAddedThisMonth)}
              </div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon notifications">
              <i className="bi bi-bell"></i>
            </div>
            <div className="stat-content">
              <div className="stat-label">Thông báo</div>
              <div className="stat-value">
                {safeNumber(contentStats.notificationsThisMonth)}
              </div>
            </div>
          </div>
        </div>

        <div className="growth-rate">
          <i className="bi bi-graph-up"></i>
          Thêm:{" "}
          <strong>{formatPercentage(safeNumber(contentStats.contentGrowthRate))}</strong> so
          với tháng trước
        </div>
      </div>
    );
  };

  const renderChartsSection = () => {
    if (!dashboardData) return null;

    // Helper function - define first
    const safeNumber = (value) => {
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    };

    // User Growth Chart Data
    const userGrowthData = {
      labels: ['6 tháng trước', '5 tháng trước', '4 tháng trước', '3 tháng trước', '2 tháng trước', 'Tháng trước', 'Tháng này'],
      datasets: [
        {
          label: 'Người dùng mới',
          data: [8, 12, 15, 18, 22, 28, safeNumber(dashboardData.userStats?.newUsersThisMonth)],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Người dùng hoạt động',
          data: [45, 52, 48, 65, 72, 68, safeNumber(dashboardData.userStats?.activeUsersToday)],
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
        }
      ]
    };

    // Content Distribution Chart Data
    const contentData = {
      labels: ['Tin tức', 'Sản phẩm', 'Dịch vụ', 'Thông báo', 'Liên hệ'],
      datasets: [
        {
          data: [
            safeNumber(dashboardData.overview?.totalNews),
            safeNumber(dashboardData.overview?.totalProducts),
            safeNumber(dashboardData.overview?.totalServices),
            safeNumber(dashboardData.overview?.totalNotifications),
            safeNumber(dashboardData.overview?.totalContacts)
          ],
          backgroundColor: [
            '#3b82f6',
            '#10b981',
            '#f59e0b',
            '#8b5cf6',
            '#06b6d4'
          ],
          borderWidth: 2,
          borderColor: '#ffffff',
        }
      ]
    };

    // Contact Trends Chart Data - Use real API data or fallback
    const contactTrendsData = contactTrendData || {
      labels: ['7 ngày trước', '6 ngày trước', '5 ngày trước', '4 ngày trước', '3 ngày trước', '2 ngày trước', 'Hôm qua', 'Hôm nay'],
      datasets: [
        {
          label: 'Liên hệ mới',
          data: [3, 7, 12, 8, 15, 18, 22, safeNumber(realTimeMetrics?.newContactsToday)],
          borderColor: 'rgb(6, 182, 212)',
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          fill: true,
          tension: 0.4,
        }
      ]
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12,
              family: 'Inter, sans-serif'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          cornerRadius: 8,
          titleFont: {
            size: 14,
            family: 'Inter, sans-serif'
          },
          bodyFont: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
          },
          ticks: {
            color: '#6b7280',
            font: {
              size: 11,
              family: 'Inter, sans-serif'
            }
          }
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#6b7280',
            font: {
              size: 11,
              family: 'Inter, sans-serif'
            }
          }
        }
      }
    };

    const doughnutOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 15,
            font: {
              size: 12,
              family: 'Inter, sans-serif'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          cornerRadius: 8,
        }
      },
      cutout: '60%'
    };

    return (
      <div className="charts-section">
        <h3>📊 Biểu đồ thống kê</h3>
        <div className="charts-grid">
          <div className="chart-container">
            <h4>Tăng trưởng người dùng</h4>
            <div className="chart-wrapper">
              <Line data={userGrowthData} options={chartOptions} />
            </div>
          </div>

          <div className="chart-container">
            <h4>Phân bố nội dung</h4>
            <div className="chart-wrapper">
              <Doughnut data={contentData} options={doughnutOptions} />
            </div>
          </div>

          <div className="chart-container">
            <h4>xu hướng liên hệ (7 ngày)</h4>
            <div className="chart-wrapper">
              <Line data={contactTrendsData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Check access permission
  if (accessDenied) {
    return (
      <PageWrapper>
        <AccessDenied
          message="Bạn không có quyền truy cập trang này. Vui lòng liên hệ quản trị viên."
          user={currentUser ? {
            roleId: currentUser.roleId,
            roleName: currentUser.roleName,
            name: currentUser.name,
            username: currentUser.username
          } : null}
        />
      </PageWrapper>
    );
  }

  const renderLoadingSkeletons = () => (
    <PageWrapper>
      <div className="admin-dashboard">
        <div className="skeleton-dashboard">
          {/* Header Skeleton */}
          <div className="dashboard-header">
            <div className="skeleton-text wide" style={{height: '32px', width: '300px'}}></div>
            <div style={{display: 'flex', gap: '12px'}}>
              <div className="skeleton-text short" style={{height: '40px', width: '120px'}}></div>
              <div className="skeleton-text short" style={{height: '40px', width: '120px'}}></div>
            </div>
          </div>

          {/* Cards Skeleton */}
          <div className="overview-cards">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="skeleton-card"></div>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="dashboard-grid">
            {[1,2,3,4].map(i => (
              <div key={i} className="dashboard-section">
                <div className="skeleton-text medium" style={{height: '20px', marginBottom: '20px'}}></div>
                <div className="skeleton-text wide"></div>
                <div className="skeleton-text medium"></div>
                <div className="skeleton-text short"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );

  if (loading) {
    return renderLoadingSkeletons();
  }

  const pageActions = (
    <div className="dashboard-actions">
      <select
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(e.target.value)}
        className="period-select"
      >
        {timePeriods.map((period) => (
          <option key={period.value} value={period.value}>
            {period.label}
          </option>
        ))}
      </select>

      <button
        className="admin-btn admin-btn-secondary"
        onClick={handleRefresh}
        disabled={refreshing}
        style={{ marginLeft: "8px" }}
      >
        <i className={`bi bi-arrow-clockwise ${refreshing ? "spin" : ""}`}></i>
        {refreshing ? "Đang làm mới..." : "Làm mới"}
      </button>

      <button
        className="admin-btn admin-btn-secondary"
        onClick={() => handleExport("json")}
        disabled={exporting}
        style={{ marginLeft: "8px" }}
      >
        <i className="bi bi-download"></i>
        {exporting ? "Đang xuất..." : "Xuất dữ liệu"}
      </button>
    </div>
  );

  const renderMobileTabs = () => (
    <div className="mobile-tabs">
      <div className="mobile-tab-buttons">
        <button 
          className={`mobile-tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Tổng quan
        </button>
        <button 
          className={`mobile-tab-button ${activeTab === 'contacts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          📞 Liên hệ
        </button>
        <button 
          className={`mobile-tab-button ${activeTab === 'charts' ? 'active' : ''}`}
          onClick={() => setActiveTab('charts')}
        >
          📈 Biểu đồ
        </button>
        <button 
          className={`mobile-tab-button ${activeTab === 'activities' ? 'active' : ''}`}
          onClick={() => setActiveTab('activities')}
        >
          📝 Hoạt động
        </button>
        <button 
          className={`mobile-tab-button ${activeTab === 'actions' ? 'active' : ''}`}
          onClick={() => setActiveTab('actions')}
        >
          ⚡ Thao tác
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="mobile-tab-content active">
            {renderOverviewCards()}
            <div style={{display: 'grid', gap: '24px'}}>
              <div className="dashboard-section">{renderSystemMetrics()}</div>
              <div className="dashboard-section">{renderContentStats()}</div>
            </div>
          </div>
        );
      case 'contacts':
        return (
          <div className="mobile-tab-content active">
            <div className="dashboard-section">
              {renderContactStatsSection()}
            </div>
          </div>
        );
      case 'charts':
        return (
          <div className="mobile-tab-content active">
            <div className="dashboard-section full-width">
              {renderChartsSection()}
            </div>
          </div>
        );
      case 'activities':
        return (
          <div className="mobile-tab-content active">
            <div className="dashboard-section full-width">
              {renderRecentActivities()}
            </div>
          </div>
        );
      case 'actions':
        return (
          <div className="mobile-tab-content active">
            <div className="dashboard-section">
              {renderQuickActions()}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PageWrapper actions={pageActions}>
      <div className="admin-dashboard">
        {/* Header với thời gian cập nhật */}
        <div className="dashboard-header">
          <h2>Dashboard Tổng quan</h2>
          {lastUpdated && (
            <div className="last-updated">
              <i className="bi bi-clock"></i>
              Cập nhật lần cuối: {lastUpdated.toLocaleString("vi-VN")}
            </div>
          )}
        </div>

        {/* Mobile Tab Navigation */}
        {renderMobileTabs()}

        {/* Desktop Layout */}
        <div className="desktop-layout">
          {/* Overview Cards */}
          {renderOverviewCards()}

          {/* Main Content Grid */}
          <div className="dashboard-grid">
            {/* System Metrics */}
            <div className="dashboard-section">{renderSystemMetrics()}</div>

            {/* Content Stats */}
            <div className="dashboard-section">{renderContentStats()}</div>

            {/* Contact Stats - NEW */}
            <div className="dashboard-section">{renderContactStatsSection()}</div>

            {/* Charts Section */}
            <div className="dashboard-section full-width">
              {renderChartsSection()}
            </div>

            {/* Recent Activities */}
            <div className="dashboard-section full-width">
              {renderRecentActivities()}
            </div>

            {/* Quick Actions */}
            <div className="dashboard-section">{renderQuickActions()}</div>
          </div>
        </div>

        {/* Mobile Tab Content */}
        <div className="mobile-layout">
          {renderTabContent()}
        </div>

        {toast.show && (
          <ToastMessage
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
