import React, { useState, useEffect } from 'react';
import './DashboardStats.css';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalNews: 0,
    totalUsers: 0,
    totalViews: 0,
    totalComments: 0,
    activeNews: 0,
    todayNews: 0,
    weeklyGrowth: 0,
    monthlyGrowth: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [realTimeData, setRealTimeData] = useState({
    onlineUsers: 0,
    activeReaders: 0,
    serverStatus: 'online'
  });

  useEffect(() => {
    // Simulate fetching dashboard stats
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Mock API call - replace with real backend
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          totalNews: 1247,
          totalUsers: 3521,
          totalViews: 89432,
          totalComments: 2156,
          activeNews: 892,
          todayNews: 23,
          weeklyGrowth: 12.5,
          monthlyGrowth: 8.3
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Simulate real-time updates
    const realTimeInterval = setInterval(() => {
      setRealTimeData(prev => ({
        onlineUsers: Math.floor(Math.random() * 100) + 50,
        activeReaders: Math.floor(Math.random() * 30) + 10,
        serverStatus: Math.random() > 0.1 ? 'online' : 'maintenance'
      }));
    }, 5000);

    return () => clearInterval(realTimeInterval);
  }, []);

  const StatCard = ({ title, value, icon, trend, color = 'primary' }) => (
    <div className={`stat-card ${color}`}>
      <div className="stat-header">
        <div className="stat-icon">
          <i className={icon}></i>
        </div>
        <div className="stat-trend">
          {trend && (
            <span className={trend > 0 ? 'trend-up' : 'trend-down'}>
              <i className={`bi ${trend > 0 ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>
              {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
      <div className="stat-body">
        <h3 className="stat-value">{loading ? '...' : value.toLocaleString()}</h3>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  );

  const RealTimeCard = ({ title, value, status, icon, color = 'info' }) => (
    <div className={`realtime-card ${color}`}>
      <div className="realtime-header">
        <div className="realtime-icon">
          <i className={icon}></i>
        </div>
        <div className={`status-indicator ${status}`}>
          <span className="status-dot"></span>
          <span className="status-text">{status}</span>
        </div>
      </div>
      <div className="realtime-body">
        <h4 className="realtime-value">{value}</h4>
        <p className="realtime-title">{title}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="dashboard-stats">
        <div className="stats-loading">
          <div className="loading-spinner"></div>
          <p>Loading dashboard statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-stats">
      <div className="stats-header">
        <h2>📊 Dashboard Overview</h2>
        <div className="last-updated">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Main Statistics Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total News Articles"
          value={stats.totalNews}
          icon="bi bi-newspaper"
          trend={stats.weeklyGrowth}
          color="primary"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon="bi bi-people"
          trend={stats.monthlyGrowth}
          color="success"
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews}
          icon="bi bi-eye"
          trend={15.2}
          color="info"
        />
        <StatCard
          title="Total Comments"
          value={stats.totalComments}
          icon="bi bi-chat-dots"
          trend={-2.1}
          color="warning"
        />
      </div>

      {/* Secondary Statistics */}
      <div className="secondary-stats">
        <div className="stat-item">
          <div className="stat-label">Active News</div>
          <div className="stat-number">{stats.activeNews}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Today's Posts</div>
          <div className="stat-number">{stats.todayNews}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Weekly Growth</div>
          <div className="stat-number">+{stats.weeklyGrowth}%</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Monthly Growth</div>
          <div className="stat-number">+{stats.monthlyGrowth}%</div>
        </div>
      </div>

      {/* Real-time Data */}
      <div className="realtime-section">
        <h3>🔴 Real-time Monitoring</h3>
        <div className="realtime-grid">
          <RealTimeCard
            title="Online Users"
            value={realTimeData.onlineUsers}
            status="online"
            icon="bi bi-person-check"
            color="success"
          />
          <RealTimeCard
            title="Active Readers"
            value={realTimeData.activeReaders}
            status="active"
            icon="bi bi-book-half"
            color="info"
          />
          <RealTimeCard
            title="Server Status"
            value="🟢 Healthy"
            status={realTimeData.serverStatus}
            icon="bi bi-server"
            color={realTimeData.serverStatus === 'online' ? 'success' : 'warning'}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>⚡ Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn primary">
            <i className="bi bi-plus-circle"></i>
            Add News Article
          </button>
          <button className="action-btn secondary">
            <i className="bi bi-graph-up"></i>
            View Analytics
          </button>
          <button className="action-btn tertiary">
            <i className="bi bi-gear"></i>
            System Settings
          </button>
          <button className="action-btn danger">
            <i className="bi bi-shield-exclamation"></i>
            Security Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;