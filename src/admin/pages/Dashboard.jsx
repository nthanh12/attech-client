import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  mockProducts, 
  mockServices, 
  mockNews, 
  mockNotifications, 
  mockUsers,
  mockBannerConfig,
  getSystemSetting
} from "../../utils/mockData.js";
import "./Dashboard.css";

// Khoảng thời gian lựa chọn
const PERIODS = [
  { label: "7 ngày", value: 7 },
  { label: "30 ngày", value: 30 },
  { label: "90 ngày", value: 90 },
];

// Dữ liệu mẫu có ngày tạo
const today = new Date("2024-06-07"); // giả lập ngày hiện tại
function daysAgo(dateStr) {
  const d = new Date(dateStr);
  return Math.floor((today - d) / (1000 * 60 * 60 * 24));
}

// Sử dụng mock data thay vì hardcoded
const mockData = {
  products: mockProducts.map(p => ({
    id: p.id,
    name: p.nameVi,
    createdAt: p.timePosted
  })),
  services: mockServices.map(s => ({
    id: s.id,
    name: s.nameVi,
    createdAt: s.timePosted
  })),
  news: mockNews.map(n => ({
    id: n.id,
    title: n.titleVi,
    createdAt: n.timePosted
  })),
  notifications: mockNotifications.map(notif => ({
    id: notif.id,
    title: notif.titleVi,
    createdAt: notif.timePosted
  })),
  accounts: mockUsers.map(u => ({
    id: u.id,
    username: u.username,
    createdAt: u.createdAt
  })),
  banners: mockBannerConfig.homepage?.slides?.map((banner, index) => ({
    id: banner.id,
    title: banner.titleVi,
    createdAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString()
  })) || []
};

const statConfig = [
  { key: "products", label: "Sản phẩm mới", faIcon: "fa-solid fa-box", link: "/admin/products", color: "#3b82f6" },
  { key: "services", label: "Dịch vụ mới", faIcon: "fa-solid fa-cogs", link: "/admin/services", color: "#10b981" },
  { key: "news", label: "Tin tức mới", faIcon: "fa-solid fa-newspaper", link: "/admin/news", color: "#f59e42" },
  { key: "notifications", label: "Thông báo mới", faIcon: "fa-solid fa-bell", link: "/admin/notifications", color: "#ef4444" },
  { key: "accounts", label: "Tài khoản mới", faIcon: "fa-solid fa-users", link: "/admin/users", color: "#6366f1" },
  { key: "banners", label: "Banner mới", faIcon: "fa-solid fa-image", link: "/admin/config", color: "#fbbf24" },
];

const mockRecent = {
  products: mockData.products.slice(0, 2),
  news: mockData.news.slice(0, 2),
  notifications: mockData.notifications.slice(0, 2),
};

const mockNotices = [
  "Có 1 banner chưa đủ thông tin.",
  "2 sản phẩm đang ở trạng thái ẩn.",
  "Tài khoản admin mới được tạo hôm qua.",
];

const quickActions = [
  { label: "Thêm sản phẩm", icon: "bi bi-plus-circle", link: "/admin/products" },
  { label: "Thêm tin tức", icon: "bi bi-plus-circle", link: "/admin/news" },
  { label: "Thêm banner", icon: "bi bi-plus-circle", link: "/admin/config" },
  { label: "Cấu hình hệ thống", icon: "bi bi-sliders", link: "/admin/config" },
];

// Nhật ký hoạt động (mock)
const mockAuditLog = [
  { id: 1, user: "admin", action: "Thêm sản phẩm mới", target: "Thiết bị A", time: "2 phút trước" },
  { id: 2, user: "editor", action: "Cập nhật banner", target: "Banner 2", time: "10 phút trước" },
  { id: 3, user: "admin", action: "Xóa tin tức", target: "Hội thảo công nghệ 2024", time: "1 giờ trước" },
  { id: 4, user: "admin", action: "Đăng nhập hệ thống", target: "", time: "2 giờ trước" },
  { id: 5, user: "editor", action: "Sửa dịch vụ", target: "Dịch vụ B", time: "3 giờ trước" },
];

// Trạng thái hệ thống (mock)
const mockSystemStatus = {
  api: "Online",
  storage: "80%",
  errors: 1,
  lastError: "Lỗi kết nối SMTP (10 phút trước)"
};

// Lịch sự kiện nội bộ (mock)
const mockEvents = [
  { id: 1, name: "Bảo trì hệ thống", date: "2024-06-10", desc: "Bảo trì định kỳ hệ thống từ 22:00 - 23:00" },
  { id: 2, name: "Họp nội bộ ATTECH", date: "2024-06-15", desc: "Họp tổng kết quý II" },
  { id: 3, name: "Ra mắt sản phẩm mới", date: "2024-06-20", desc: "Giới thiệu sản phẩm mới tới khách hàng" },
];

// Thống kê truy cập (mock)
const mockTraffic = [
  { date: "06/01", visits: 120 },
  { date: "06/02", visits: 150 },
  { date: "06/03", visits: 180 },
  { date: "06/04", visits: 90 },
  { date: "06/05", visits: 200 },
  { date: "06/06", visits: 170 },
  { date: "06/07", visits: 210 },
];

// Tính toán tổng, trung bình, cao nhất
const totalVisits = mockTraffic.reduce((sum, item) => sum + item.visits, 0);
const avgVisits = Math.round(totalVisits / mockTraffic.length);
const maxItem = mockTraffic.reduce((max, item) => item.visits > max.visits ? item : max, mockTraffic[0]);

const Dashboard = () => {
  const [period, setPeriod] = useState(7);
  // InfoCard state
  const [now, setNow] = useState(new Date());
  // Giả lập số người online và lượt truy cập hôm nay
  const onlineUsers = 5;
  const todayVisits = 120;

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Tính số mới tạo trong khoảng period ngày gần nhất
  const stats = statConfig.map((cfg) => {
    const total = mockData[cfg.key].length;
    const recent = mockData[cfg.key].filter(item => daysAgo(item.createdAt) < period).length;
    return { ...cfg, total, recent };
  });

  return (
    <div className="admin-dashboard">
      <div className="dashboard-period">
        <span>Xem số mới trong: </span>
        <select value={period} onChange={e => setPeriod(Number(e.target.value))}>
          {PERIODS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
      </div>
      <div className="dashboard-stats">
        {stats.map((stat) => (
          <Link to={stat.link} className="stat-card" key={stat.label} style={{ borderLeft: `6px solid ${stat.color}` }}>
            <div className="stat-icon" style={{ background: stat.color + '22', color: stat.color }}>
              <i className={stat.faIcon}></i>
            </div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">+{stat.recent}</div>
            <div className="stat-total">Tổng: {stat.total}</div>
          </Link>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-left">
          <div className="dashboard-section">
            <h3>Thông tin hệ thống</h3>
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <i className="bi bi-clock"></i>
                </div>
                <div className="info-content">
                  <div className="info-label">Thời gian hiện tại</div>
                  <div className="info-value">{now.toLocaleString('vi-VN')}</div>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">
                  <i className="bi bi-people"></i>
                </div>
                <div className="info-content">
                  <div className="info-label">Người dùng online</div>
                  <div className="info-value">{onlineUsers}</div>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">
                  <i className="bi bi-graph-up"></i>
                </div>
                <div className="info-content">
                  <div className="info-label">Lượt truy cập hôm nay</div>
                  <div className="info-value">{todayVisits}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <h3>Thống kê truy cập</h3>
            <div className="traffic-stats">
              <div className="traffic-item">
                <span className="traffic-label">Tổng lượt truy cập:</span>
                <span className="traffic-value">{totalVisits}</span>
              </div>
              <div className="traffic-item">
                <span className="traffic-label">Trung bình/ngày:</span>
                <span className="traffic-value">{avgVisits}</span>
              </div>
              <div className="traffic-item">
                <span className="traffic-label">Cao nhất:</span>
                <span className="traffic-value">{maxItem.visits} ({maxItem.date})</span>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <h3>Trạng thái hệ thống</h3>
            <div className="system-status">
              <div className="status-item">
                <span className="status-label">API:</span>
                <span className={`status-value status-${mockSystemStatus.api.toLowerCase()}`}>
                  {mockSystemStatus.api}
                </span>
              </div>
              <div className="status-item">
                <span className="status-label">Storage:</span>
                <span className="status-value">{mockSystemStatus.storage}</span>
              </div>
              <div className="status-item">
                <span className="status-label">Lỗi:</span>
                <span className="status-value">{mockSystemStatus.errors}</span>
              </div>
              {mockSystemStatus.lastError && (
                <div className="status-item">
                  <span className="status-label">Lỗi cuối:</span>
                  <span className="status-value error">{mockSystemStatus.lastError}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="dashboard-right">
          <div className="dashboard-section">
            <h3>Hoạt động gần đây</h3>
            <div className="recent-activities">
              {mockAuditLog.map((log) => (
                <div key={log.id} className="activity-item">
                  <div className="activity-icon">
                    <i className="bi bi-activity"></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-user">{log.user}</div>
                    <div className="activity-action">{log.action}</div>
                    {log.target && <div className="activity-target">{log.target}</div>}
                    <div className="activity-time">{log.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-section">
            <h3>Sự kiện sắp tới</h3>
            <div className="upcoming-events">
              {mockEvents.map((event) => (
                <div key={event.id} className="event-item">
                  <div className="event-date">{event.date}</div>
                  <div className="event-content">
                    <div className="event-name">{event.name}</div>
                    <div className="event-desc">{event.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-section">
            <h3>Thao tác nhanh</h3>
            <div className="quick-actions">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link} className="quick-action">
                  <i className={action.icon}></i>
                  <span>{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="dashboard-section">
            <h3>Thông báo</h3>
            <div className="notices">
              {mockNotices.map((notice, index) => (
                <div key={index} className="notice-item">
                  <i className="bi bi-exclamation-triangle"></i>
                  <span>{notice}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 