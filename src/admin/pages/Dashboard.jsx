import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
const mockData = {
  products: [
    { id: 1, name: "Thiết bị A", createdAt: "2024-06-01" },
    { id: 2, name: "Thiết bị B", createdAt: "2024-05-28" },
    { id: 3, name: "Thiết bị C", createdAt: "2024-05-10" },
    { id: 4, name: "Thiết bị D", createdAt: "2024-04-20" },
  ],
  services: [
    { id: 1, name: "Dịch vụ A", createdAt: "2024-06-05" },
    { id: 2, name: "Dịch vụ B", createdAt: "2024-05-15" },
  ],
  news: [
    { id: 1, title: "ATTECH ra mắt sản phẩm mới", createdAt: "2024-06-02" },
    { id: 2, title: "Hội thảo công nghệ 2024", createdAt: "2024-05-30" },
    { id: 3, title: "Tin tức cũ", createdAt: "2024-04-15" },
  ],
  notifications: [
    { id: 1, title: "Bảo trì hệ thống ngày 10/6", createdAt: "2024-06-03" },
    { id: 2, title: "Cập nhật chính sách bảo mật", createdAt: "2024-05-29" },
  ],
  accounts: [
    { id: 1, username: "admin", createdAt: "2024-06-06" },
    { id: 2, username: "editor", createdAt: "2024-05-10" },
    { id: 3, username: "viewer", createdAt: "2024-04-01" },
  ],
  banners: [
    { id: 1, title: "Banner 1", createdAt: "2024-06-04" },
    { id: 2, title: "Banner 2", createdAt: "2024-05-20" },
    { id: 3, title: "Banner 3", createdAt: "2024-05-01" },
    { id: 4, title: "Banner 4", createdAt: "2024-04-10" },
  ],
};

const statConfig = [
  { key: "products", label: "Sản phẩm mới", faIcon: "fa-solid fa-box", link: "/admin/products", color: "#3b82f6" },
  { key: "services", label: "Dịch vụ mới", faIcon: "fa-solid fa-cogs", link: "/admin/services", color: "#10b981" },
  { key: "news", label: "Tin tức mới", faIcon: "fa-solid fa-newspaper", link: "/admin/news", color: "#f59e42" },
  { key: "notifications", label: "Thông báo mới", faIcon: "fa-solid fa-bell", link: "/admin/notifications", color: "#ef4444" },
  { key: "accounts", label: "Tài khoản mới", faIcon: "fa-solid fa-users", link: "/admin/accounts", color: "#6366f1" },
  { key: "banners", label: "Banner mới", faIcon: "fa-solid fa-image", link: "/admin/config", color: "#fbbf24" },
];

const mockRecent = {
  products: [
    { id: 1, name: "Thiết bị A", date: "2024-06-01" },
    { id: 2, name: "Thiết bị B", date: "2024-05-28" },
  ],
  news: [
    { id: 1, title: "ATTECH ra mắt sản phẩm mới", date: "2024-06-02" },
    { id: 2, title: "Hội thảo công nghệ 2024", date: "2024-05-30" },
  ],
  notifications: [
    { id: 1, title: "Bảo trì hệ thống ngày 10/6", date: "2024-06-03" },
    { id: 2, title: "Cập nhật chính sách bảo mật", date: "2024-05-29" },
  ],
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

      <div className="dashboard-main">
        <div className="dashboard-section system-section">
          <h4>Trạng thái hệ thống</h4>
          <ul className="system-status-list">
            <li><i className="bi bi-plug"></i> API: <span className={mockSystemStatus.api === "Online" ? "status-online" : "status-offline"}>{mockSystemStatus.api}</span></li>
            <li><i className="bi bi-hdd"></i> Dung lượng lưu trữ: <span>{mockSystemStatus.storage}</span></li>
            <li><i className="bi bi-exclamation-triangle"></i> Số lỗi hệ thống: <span className={mockSystemStatus.errors > 0 ? "status-error" : "status-ok"}>{mockSystemStatus.errors}</span></li>
            {mockSystemStatus.errors > 0 && <li><i className="bi bi-bug"></i> Lỗi gần nhất: <span>{mockSystemStatus.lastError}</span></li>}
          </ul>
        </div>
        <div className="dashboard-section audit-section">
          <h4>Nhật ký hoạt động</h4>
          <ul className="audit-log-list">
            {mockAuditLog.map((log) => (
              <li key={log.id}>
                <span className="audit-user">{log.user}</span> {log.action} <span className="audit-target">{log.target}</span> <span className="audit-time">({log.time})</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-section info-section">
          <h4>Thông tin hệ thống</h4>
          <div className="info-card">
            <div className="info-item">
              <i className="bi bi-people-fill info-icon"></i>
              <div>
                <div className="info-value">{onlineUsers}</div>
                <div className="info-label">Đang online</div>
              </div>
            </div>
            <div className="info-item">
              <i className="bi bi-bar-chart-fill info-icon"></i>
              <div>
                <div className="info-value">{todayVisits}</div>
                <div className="info-label">Lượt truy cập hôm nay</div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-section event-section">
          <h4>Lịch sự kiện nội bộ</h4>
          <ul className="event-list">
            {mockEvents.map((event) => (
              <li key={event.id}>
                <span className="event-date">{event.date}</span> <span className="event-name">{event.name}</span>
                <div className="event-desc">{event.desc}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-section traffic-section">
          <h4>Thống kê truy cập 7 ngày qua</h4>
          <div className="traffic-summary">
            <div>Tổng truy cập: <b>{totalVisits}</b></div>
            <div>Trung bình/ngày: <b>{avgVisits}</b></div>
            <div>Cao nhất: <b>{maxItem.visits}</b> ({maxItem.date})</div>
          </div>
          <div className="traffic-scroll-x">
            <div className="traffic-line-chart wide">
              <svg width={mockTraffic.length * 55} height="60" viewBox={`0 0 ${mockTraffic.length * 55} 60`}>
                {(() => {
                  const max = Math.max(...mockTraffic.map(i => i.visits));
                  const points = mockTraffic.map((item, idx) => {
                    const x = idx * 55 + 27.5;
                    const y = 55 - (item.visits / max) * 45;
                    return `${x},${y}`;
                  }).join(" ");
                  return <polyline fill="none" stroke="#3b82f6" strokeWidth="2.5" points={points} />;
                })()}
                {mockTraffic.map((item, idx) => {
                  const max = Math.max(...mockTraffic.map(i => i.visits));
                  const x = idx * 55 + 27.5;
                  const y = 55 - (item.visits / max) * 45;
                  return <circle key={item.date} cx={x} cy={y} r="3" fill="#3b82f6" />;
                })}
              </svg>
              <div className="traffic-labels wide" style={{ width: mockTraffic.length * 55, display: 'flex', justifyContent: 'flex-start' }}>
                {mockTraffic.map((item) => (
                  <span key={item.date} style={{ width: 55, textAlign: 'center' }}>{item.date}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-section recent-section">
          <h4>Sản phẩm mới nhất</h4>
          <ul>
            {mockRecent.products.map((item) => (
              <li key={item.id}>
                <span className="recent-title">{item.name}</span>
                <span className="recent-date">{item.date}</span>
              </li>
            ))}
          </ul>
          <Link to="/admin/products" className="see-all">Xem tất cả</Link>
        </div>
        <div className="dashboard-section recent-section">
          <h4>Tin tức mới nhất</h4>
          <ul>
            {mockRecent.news.map((item) => (
              <li key={item.id}>
                <span className="recent-title">{item.title}</span>
                <span className="recent-date">{item.date}</span>
              </li>
            ))}
          </ul>
          <Link to="/admin/news" className="see-all">Xem tất cả</Link>
        </div>
        <div className="dashboard-section recent-section">
          <h4>Thông báo mới nhất</h4>
          <ul>
            {mockRecent.notifications.map((item) => (
              <li key={item.id}>
                <span className="recent-title">{item.title}</span>
                <span className="recent-date">{item.date}</span>
              </li>
            ))}
          </ul>
          <Link to="/admin/notifications" className="see-all">Xem tất cả</Link>
        </div>
        <div className="dashboard-section quick-section">
          <h4>Truy cập nhanh</h4>
          <div className="quick-actions">
            {quickActions.map((action) => (
              <Link to={action.link} className="quick-btn" key={action.label}>
                <i className={action.icon}></i>
                <span>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="dashboard-section notice-section">
          <h4>Thông báo nội bộ</h4>
          <ul>
            {mockNotices.map((notice, idx) => (
              <li key={idx} className="notice-item">
                <i className="bi bi-info-circle"></i> {notice}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 