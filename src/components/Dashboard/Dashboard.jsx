import React, { useState } from "react";
import DashboardStats from "./DashboardStats";
import DashboardCharts from "./DashboardCharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("overview");

  const ViewSelector = () => (
    <div className="view-selector">
      <button
        className={`view-btn ${activeView === "overview" ? "active" : ""}`}
        onClick={() => setActiveView("overview")}
      >
        <i className="bi bi-grid-3x3-gap"></i>
        <span>Overview</span>
      </button>
      <button
        className={`view-btn ${activeView === "stats" ? "active" : ""}`}
        onClick={() => setActiveView("stats")}
      >
        <i className="bi bi-bar-chart"></i>
        <span>Statistics</span>
      </button>
      <button
        className={`view-btn ${activeView === "charts" ? "active" : ""}`}
        onClick={() => setActiveView("charts")}
      >
        <i className="bi bi-graph-up"></i>
        <span>Analytics</span>
      </button>
    </div>
  );

  const OverviewView = () => (
    <div className="overview-view">
      <div className="overview-section stats-preview">
        <DashboardStats />
      </div>
      <div className="overview-section charts-preview">
        <DashboardCharts />
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Advanced Dashboard</h1>
          </div>
          <ViewSelector />
        </div>
      </div>

      <div className="dashboard-content">
        {activeView === "overview" && <OverviewView />}
        {activeView === "stats" && <DashboardStats />}
        {activeView === "charts" && <DashboardCharts />}
      </div>

      {/* Dashboard Footer */}
      <div className="dashboard-footer">
        <div className="footer-info">
          <div className="footer-item">
            <span className="footer-label">Last Refresh:</span>
            <span className="footer-value">{new Date().toLocaleString()}</span>
          </div>
          <div className="footer-item">
            <span className="footer-label">Data Source:</span>
            <span className="footer-value">Real-time API</span>
          </div>
          <div className="footer-item">
            <span className="footer-label">Update Interval:</span>
            <span className="footer-value">30 seconds</span>
          </div>
        </div>
        <div className="footer-actions">
          <button
            className="footer-btn"
            onClick={() => window.location.reload()}
          >
            <i className="bi bi-arrow-clockwise"></i>
            Refresh Data
          </button>
          <button className="footer-btn">
            <i className="bi bi-download"></i>
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
