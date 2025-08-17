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
  exportDashboardData,
  refreshDashboardCache,
  formatNumber,
  formatPercentage,
  getTimePeriods,
} from "../../services/dashboardService";
import "./Dashboard.css";

const Dashboard = () => {
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const [refreshing, setRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("last7days");
  const [dashboardData, setDashboardData] = useState(null);
  const [realTimeMetrics, setRealTimeMetrics] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
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
      
      // Check permission before making API call
      if (!currentUser?.permissions?.includes('menu_dashboard')) {
        setAccessDenied(true);
        setLoading(false);
        return;
      }
      
      try {
        // Try to fetch real data from API
        const data = await fetchAllDashboardData();
        setDashboardData(data);
        setAccessDenied(false);
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

  // Handle refresh
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      
      try {
        await refreshDashboardCache();
      } catch (cacheError) {
        console.warn("⚠️ Cache refresh API not available:", cacheError.message);
      }
      
      await fetchData();
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
  }, [fetchData]);

  // Set up real-time updates
  useEffect(() => {
    fetchRealTime();
    const interval = setInterval(fetchRealTime, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [fetchRealTime]);

  const renderOverviewCards = () => {
    if (!dashboardData?.overview) return null;

    const { overview } = dashboardData;
    console.log("🔍 Rendering overview cards with data:", overview);

    const cards = [
      {
        title: "Tổng người dùng",
        value: formatNumber(overview.totalUsers),
        icon: "bi-people",
        color: "#3b82f6",
        link: "/admin/users",
        change: overview.userGrowthRate ? `${overview.userGrowthRate > 0 ? '+' : ''}${overview.userGrowthRate}%` : "",
        changeType: overview.userGrowthRate > 0 ? "positive" : "negative",
      },
      {
        title: "Sản phẩm",
        value: formatNumber(overview.totalProducts),
        icon: "bi-box",
        color: "#10b981",
        link: "/admin/products",
        change: "",
        changeType: "neutral",
      },
      {
        title: "Dịch vụ",
        value: formatNumber(overview.totalServices),
        icon: "bi-gear",
        color: "#f59e0b",
        link: "/admin/services",
        change: "",
        changeType: "neutral",
      },
      {
        title: "Tin tức",
        value: formatNumber(overview.totalNews),
        icon: "bi-newspaper",
        color: "#ef4444",
        link: "/admin/news",
        change: "",
        changeType: "neutral",
      },
      {
        title: "Thông báo",
        value: formatNumber(overview.totalNotifications),
        icon: "bi-bell",
        color: "#8b5cf6",
        link: "/admin/notifications",
        change: "",
        changeType: "neutral",
      },
    ];

    return (
      <div className="overview-cards">
        {cards.map((card, index) => (
          <div key={index} className="overview-card">
            <div className="card-icon" style={{ backgroundColor: card.color }}>
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

    return (
      <div className="system-metrics">
        <h3>Hiệu suất hệ thống</h3>
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
    if (!dashboardData?.recentActivities) return null;

    return (
      <div className="recent-activities">
        <h3>Hoạt động gần đây</h3>
        <div className="activities-list">
          {dashboardData.recentActivities.map((activity) => (
            <div
              key={activity.id}
              className={`activity-item ${activity.severity}`}
            >
              <div className="activity-icon">
                <i className={`bi ${activity.icon}`}></i>
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
            <Link key={index} to={action.link} className="action-item">
              <div
                className="action-icon"
                style={{ backgroundColor: action.color }}
              >
                <i className={`bi ${action.icon}`}></i>
              </div>
              <span>{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const renderContentStats = () => {
    if (!dashboardData?.contentStats) return null;

    const { contentStats } = dashboardData;

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
                {contentStats.newsPublishedThisMonth}
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
                {contentStats.productsAddedThisMonth}
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
                {contentStats.servicesAddedThisMonth}
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
                {contentStats.notificationsThisMonth}
              </div>
            </div>
          </div>
        </div>

        <div className="growth-rate">
          <i className="bi bi-graph-up"></i>
          Thêm:{" "}
          <strong>{formatPercentage(contentStats.contentGrowthRate)}</strong> so
          với tháng trước
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
            userLevel: currentUser.userLevel,
            userType: currentUser.userType,
            name: currentUser.name,
            username: currentUser.username
          } : null}
        />
      </PageWrapper>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
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
        className="btn btn-secondary"
        onClick={handleRefresh}
        disabled={refreshing}
        style={{ marginLeft: "8px" }}
      >
        <i className={`bi bi-arrow-clockwise ${refreshing ? "spin" : ""}`}></i>
        {refreshing ? "Đang làm mới..." : "Làm mới"}
      </button>

      <button
        className="btn btn-secondary"
        onClick={() => handleExport("json")}
        disabled={exporting}
        style={{ marginLeft: "8px" }}
      >
        <i className="bi bi-download"></i>
        {exporting ? "Đang xuất..." : "Xuất dữ liệu"}
      </button>
    </div>
  );

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

        {/* Overview Cards */}
        {renderOverviewCards()}

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* System Metrics */}
          <div className="dashboard-section">{renderSystemMetrics()}</div>

          {/* Content Stats */}
          <div className="dashboard-section">{renderContentStats()}</div>

          {/* Recent Activities */}
          <div className="dashboard-section full-width">
            {renderRecentActivities()}
          </div>

          {/* Quick Actions */}
          <div className="dashboard-section">{renderQuickActions()}</div>
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
