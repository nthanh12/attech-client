import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  const [period, setPeriod] = useState("week");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalServices: 0,
    totalNews: 0,
    totalNotifications: 0,
    recentActivities: [],
    productStats: [],
    serviceStats: [],
    trafficStats: [],
    notifications: [],
  });

  useEffect(() => {
    fetchDashboardData(period);
  }, [period]);

  const fetchDashboardData = async (selectedPeriod) => {
    setLoading(true);
    try {
      setTimeout(() => {
        setStats({
          totalProducts: 48,
          totalServices: 12,
          totalNews: 76,
          totalNotifications: 23,
          recentActivities: [
            {
              id: 1,
              type: "product",
              action: "create",
              user: "Admin",
              item: "Sản phẩm mới A",
              time: "2 giờ trước",
            },
            {
              id: 2,
              type: "service",
              action: "update",
              user: "Admin",
              item: "Dịch vụ B",
              time: "3 giờ trước",
            },
            {
              id: 3,
              type: "news",
              action: "delete",
              user: "Admin",
              item: "Tin tức C",
              time: "5 giờ trước",
            },
            {
              id: 4,
              type: "product",
              action: "update",
              user: "Admin",
              item: "Sản phẩm D",
              time: "1 ngày trước",
            },
            {
              id: 5,
              type: "notification",
              action: "create",
              user: "Admin",
              item: "Thông báo E",
              time: "1 ngày trước",
            },
          ],
          productStats: [
            { name: "T2", value: 12 },
            { name: "T3", value: 19 },
            { name: "T4", value: 15 },
            { name: "T5", value: 25 },
            { name: "T6", value: 18 },
            { name: "T7", value: 15 },
            { name: "CN", value: 10 },
          ],
          serviceStats: [
            { name: "Dịch vụ A", value: 35 },
            { name: "Dịch vụ B", value: 25 },
            { name: "Dịch vụ C", value: 20 },
            { name: "Dịch vụ D", value: 15 },
            { name: "Khác", value: 5 },
          ],
          trafficStats: [
            { name: "T2", website: 2400, social: 1200 },
            { name: "T3", website: 1398, social: 900 },
            { name: "T4", website: 3800, social: 1700 },
            { name: "T5", website: 3908, social: 1800 },
            { name: "T6", website: 4800, social: 2200 },
            { name: "T7", website: 3800, social: 2100 },
            { name: "CN", website: 4300, social: 2400 },
          ],
          notifications: [
            {
              id: 1,
              title: "Đơn hàng mới #12345",
              time: "10 phút trước",
              type: "info",
            },
            {
              id: 2,
              title: "Hệ thống cập nhật thành công",
              time: "1 giờ trước",
              type: "success",
            },
            {
              id: 3,
              title: "Sản phẩm A sắp hết hàng",
              time: "3 giờ trước",
              type: "warning",
            },
            {
              id: 4,
              title: "Lỗi thanh toán đơn hàng #12342",
              time: "5 giờ trước",
              type: "danger",
            },
          ],
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <div className="dropdown">
          <button
            className="btn btn-outline-primary"
            id="dropdown-period"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {period === "week"
              ? "7 ngày qua"
              : period === "month"
              ? "30 ngày qua"
              : "365 ngày qua"}
          </button>
          <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
            <button
              className="dropdown-item"
              onClick={() => {
                setPeriod("week");
                setShowDropdown(false);
              }}
            >
              7 ngày qua
            </button>
            <button
              className="dropdown-item"
              onClick={() => {
                setPeriod("month");
                setShowDropdown(false);
              }}
            >
              30 ngày qua
            </button>
            <button
              className="dropdown-item"
              onClick={() => {
                setPeriod("year");
                setShowDropdown(false);
              }}
            >
              365 ngày qua
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Sản phẩm</h5>
                <div
                  className="stats-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-box"></i>
                </div>
              </div>
              <h3 className="mb-0">{stats.totalProducts}</h3>
              <p className="text-muted">Tổng số sản phẩm</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Dịch vụ</h5>
                <div
                  className="stats-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-tools"></i>
                </div>
              </div>
              <h3 className="mb-0">{stats.totalServices}</h3>
              <p className="text-muted">Tổng số dịch vụ</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Tin tức</h5>
                <div
                  className="stats-icon bg-info text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-newspaper"></i>
                </div>
              </div>
              <h3 className="mb-0">{stats.totalNews}</h3>
              <p className="text-muted">Bài viết đã đăng</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Thông báo</h5>
                <div
                  className="stats-icon bg-warning text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-bell"></i>
                </div>
              </div>
              <h3 className="mb-0">{stats.totalNotifications}</h3>
              <p className="text-muted">Thông báo trong hệ thống</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Thống kê truy cập</h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.trafficStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="website"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="social" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Dịch vụ được xem nhiều</h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.serviceStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.serviceStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Hoạt động gần đây</h5>
            </div>
            <div className="card-body p-0">
              <table className="table table-hover table-responsive mb-0">
                <thead>
                  <tr>
                    <th>Người dùng</th>
                    <th>Hoạt động</th>
                    <th>Nội dung</th>
                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.user}</td>
                      <td>
                        <span
                          className={`badge ${
                            activity.action === "create"
                              ? "bg-success"
                              : activity.action === "update"
                              ? "bg-primary"
                              : "bg-danger"
                          }`}
                        >
                          {activity.action === "create"
                            ? "Tạo mới"
                            : activity.action === "update"
                            ? "Cập nhật"
                            : "Xóa"}
                        </span>
                      </td>
                      <td>{activity.item}</td>
                      <td>{activity.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer bg-white text-center">
              <button className="btn btn-link text-decoration-none">
                Xem tất cả hoạt động
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Thông báo hệ thống</h5>
            </div>
            <div className="card-body p-0">
              <div className="notification-list">
                {stats.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="notification-item p-3 border-bottom"
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className={`notification-icon bg-${notification.type} text-white rounded-circle d-flex align-items-center justify-content-center`}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i
                          className={`bi ${
                            notification.type === "info"
                              ? "bi-info-circle"
                              : notification.type === "success"
                              ? "bi-check-circle"
                              : notification.type === "warning"
                              ? "bi-exclamation-triangle"
                              : "bi-x-circle"
                          }`}
                        ></i>
                      </div>
                      <div className="ms-3">
                        <h6 className="mb-0">{notification.title}</h6>
                        <small className="text-muted">
                          {notification.time}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer bg-white text-center">
              <button className="btn btn-link text-decoration-none">
                Xem tất cả thông báo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">Thống kê sản phẩm theo ngày</h5>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.productStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Lượt xem" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
