import React, { useState, useEffect } from 'react';
import './DashboardCharts.css';

const DashboardCharts = () => {
  const [chartData, setChartData] = useState({
    newsPublishing: [],
    userActivity: [],
    contentCategories: [],
    viewsAnalytics: []
  });
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState('publishing');

  useEffect(() => {
    // Simulate fetching chart data
    const fetchChartData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock chart data
        setChartData({
          newsPublishing: [
            { month: 'Jan', articles: 45, views: 12800 },
            { month: 'Feb', articles: 52, views: 15600 },
            { month: 'Mar', articles: 48, views: 14200 },
            { month: 'Apr', articles: 61, views: 18900 },
            { month: 'May', articles: 55, views: 16800 },
            { month: 'Jun', articles: 67, views: 21400 }
          ],
          userActivity: [
            { day: 'Mon', logins: 156, registrations: 23 },
            { day: 'Tue', logins: 189, registrations: 31 },
            { day: 'Wed', logins: 167, registrations: 28 },
            { day: 'Thu', logins: 143, registrations: 19 },
            { day: 'Fri', logins: 201, registrations: 42 },
            { day: 'Sat', logins: 134, registrations: 18 },
            { day: 'Sun', logins: 98, registrations: 12 }
          ],
          contentCategories: [
            { category: 'Technology', count: 234, percentage: 35 },
            { category: 'Business', count: 186, percentage: 28 },
            { category: 'Sports', count: 124, percentage: 19 },
            { category: 'Health', count: 89, percentage: 13 },
            { category: 'Entertainment', count: 34, percentage: 5 }
          ],
          viewsAnalytics: [
            { hour: '00:00', views: 45 },
            { hour: '02:00', views: 23 },
            { hour: '04:00', views: 12 },
            { hour: '06:00', views: 67 },
            { hour: '08:00', views: 156 },
            { hour: '10:00', views: 234 },
            { hour: '12:00', views: 298 },
            { hour: '14:00', views: 267 },
            { hour: '16:00', views: 189 },
            { hour: '18:00', views: 145 },
            { hour: '20:00', views: 198 },
            { hour: '22:00', views: 134 }
          ]
        });
      } catch (error) {} finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const BarChart = ({ data, xKey, yKey, title, color = '#667eea' }) => {
    const maxValue = Math.max(...data.map(item => item[yKey]));
    
    return (
      <div className="chart-container">
        <h4 className="chart-title">{title}</h4>
        <div className="bar-chart">
          {data.map((item, index) => (
            <div key={index} className="bar-item">
              <div 
                className="bar"
                style={{ 
                  height: `${(item[yKey] / maxValue) * 100}%`,
                  background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`
                }}
              >
                <div className="bar-value">{item[yKey]}</div>
              </div>
              <div className="bar-label">{item[xKey]}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LineChart = ({ data, xKey, yKey, title, color = '#48bb78' }) => {
    const maxValue = Math.max(...data.map(item => item[yKey]));
    const points = data.map((item, index) => ({
      x: (index / (data.length - 1)) * 100,
      y: 100 - (item[yKey] / maxValue) * 100
    }));
    
    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');

    return (
      <div className="chart-container">
        <h4 className="chart-title">{title}</h4>
        <div className="line-chart">
          <svg viewBox="0 0 100 100" className="line-svg">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map(y => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e2e8f0" strokeWidth="0.2"/>
            ))}
            
            {/* Area fill */}
            <path
              d={`${pathData} L 100 100 L 0 100 Z`}
              fill={`url(#gradient-${color.replace('#', '')})`}
              opacity="0.3"
            />
            
            {/* Line */}
            <path
              d={pathData}
              stroke={color}
              strokeWidth="0.8"
              fill="none"
            />
            
            {/* Data points */}
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="1"
                fill={color}
                className="data-point"
              />
            ))}
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.4"/>
                <stop offset="100%" stopColor={color} stopOpacity="0.1"/>
              </linearGradient>
            </defs>
          </svg>
          
          {/* X-axis labels */}
          <div className="chart-labels">
            {data.map((item, index) => (
              <span key={index} className="label">{item[xKey]}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const PieChart = ({ data, title }) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    let cumulativePercentage = 0;

    return (
      <div className="chart-container">
        <h4 className="chart-title">{title}</h4>
        <div className="pie-chart-container">
          <div className="pie-chart">
            <svg viewBox="0 0 100 100" className="pie-svg">
              {data.map((item, index) => {
                const percentage = (item.count / total) * 100;
                const startAngle = (cumulativePercentage / 100) * 360 - 90;
                const endAngle = ((cumulativePercentage + percentage) / 100) * 360 - 90;
                
                const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                
                const largeArcFlag = percentage > 50 ? 1 : 0;
                
                const colors = ['#667eea', '#48bb78', '#4299e1', '#ed8936', '#f56565'];
                const color = colors[index % colors.length];
                
                cumulativePercentage += percentage;
                
                return (
                  <path
                    key={index}
                    d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={color}
                    className="pie-slice"
                  />
                );
              })}
            </svg>
          </div>
          
          <div className="pie-legend">
            {data.map((item, index) => {
              const colors = ['#667eea', '#48bb78', '#4299e1', '#ed8936', '#f56565'];
              return (
                <div key={index} className="legend-item">
                  <span 
                    className="legend-color" 
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></span>
                  <span className="legend-label">{item.category}</span>
                  <span className="legend-value">{item.count} ({item.percentage}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="dashboard-charts">
        <div className="charts-loading">
          <div className="loading-spinner"></div>
          <p>Loading charts and analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-charts">
      <div className="charts-header">
        <h2>📈 Analytics & Charts</h2>
        <div className="chart-controls">
          <button 
            className={`control-btn ${activeChart === 'publishing' ? 'active' : ''}`}
            onClick={() => setActiveChart('publishing')}
          >
            📊 Publishing
          </button>
          <button 
            className={`control-btn ${activeChart === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveChart('activity')}
          >
            👥 Activity
          </button>
          <button 
            className={`control-btn ${activeChart === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveChart('categories')}
          >
            🏷️ Categories
          </button>
          <button 
            className={`control-btn ${activeChart === 'views' ? 'active' : ''}`}
            onClick={() => setActiveChart('views')}
          >
            👁️ Views
          </button>
        </div>
      </div>

      <div className="charts-grid">
        {activeChart === 'publishing' && (
          <>
            <BarChart
              data={chartData.newsPublishing}
              xKey="month"
              yKey="articles"
              title="📝 Articles Published by Month"
              color="#667eea"
            />
            <LineChart
              data={chartData.newsPublishing}
              xKey="month"
              yKey="views"
              title="👀 Monthly Views Trend"
              color="#48bb78"
            />
          </>
        )}

        {activeChart === 'activity' && (
          <>
            <BarChart
              data={chartData.userActivity}
              xKey="day"
              yKey="logins"
              title="🔐 Daily User Logins"
              color="#4299e1"
            />
            <LineChart
              data={chartData.userActivity}
              xKey="day"
              yKey="registrations"
              title="👤 New User Registrations"
              color="#ed8936"
            />
          </>
        )}

        {activeChart === 'categories' && (
          <div className="full-width-chart">
            <PieChart
              data={chartData.contentCategories}
              title="🏷️ Content Distribution by Category"
            />
          </div>
        )}

        {activeChart === 'views' && (
          <div className="full-width-chart">
            <LineChart
              data={chartData.viewsAnalytics}
              xKey="hour"
              yKey="views"
              title="⏰ Hourly Views Distribution"
              color="#f56565"
            />
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="chart-summary">
        <div className="summary-card">
          <div className="summary-icon">📈</div>
          <div className="summary-info">
            <h4>Total Articles</h4>
            <p>{chartData.newsPublishing.reduce((sum, item) => sum + item.articles, 0)}</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">👥</div>
          <div className="summary-info">
            <h4>Total Logins</h4>
            <p>{chartData.userActivity.reduce((sum, item) => sum + item.logins, 0)}</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">👀</div>
          <div className="summary-info">
            <h4>Total Views</h4>
            <p>{chartData.viewsAnalytics.reduce((sum, item) => sum + item.views, 0)}</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">🏷️</div>
          <div className="summary-info">
            <h4>Categories</h4>
            <p>{chartData.contentCategories.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;