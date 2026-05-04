import React from 'react';
import { Users, Box, TrendingUp, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Employees', value: '1,240', icon: Users, change: '+12%', color: 'var(--primary-color)' },
    { title: 'Active Inventory', value: '45,200', icon: Box, change: '-2%', color: 'var(--secondary-color)' },
    { title: 'Revenue (YTD)', value: '$2.4M', icon: DollarSign, change: '+18%', color: '#10b981' },
    { title: 'Growth', value: '24%', icon: TrendingUp, change: '+4%', color: '#8b5cf6' },
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <div className="stat-card" key={index}>
              <div className="stat-header">
                <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                  <Icon size={24} />
                </div>
                <span className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="stat-content">
                <h3>{stat.title}</h3>
                <h2>{stat.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-widgets">
        <div className="widget chart-widget">
          <h3>Revenue vs Expenses</h3>
          <div className="placeholder-chart">
            {/* Chart visualization placeholder */}
            <div className="bar" style={{ height: '60%' }}></div>
            <div className="bar" style={{ height: '80%' }}></div>
            <div className="bar" style={{ height: '40%' }}></div>
            <div className="bar" style={{ height: '90%' }}></div>
            <div className="bar" style={{ height: '50%' }}></div>
            <div className="bar" style={{ height: '75%' }}></div>
            <div className="bar" style={{ height: '100%' }}></div>
          </div>
        </div>
        <div className="widget list-widget">
          <h3>Recent Activities</h3>
          <ul className="activity-list">
            <li>
              <div className="activity-dot blue"></div>
              <div className="activity-text">
                <p>New employee onboarded in <strong>Engineering</strong></p>
                <span>10 mins ago</span>
              </div>
            </li>
            <li>
              <div className="activity-dot green"></div>
              <div className="activity-text">
                <p>Purchase order <strong>#PO-8921</strong> approved</p>
                <span>1 hr ago</span>
              </div>
            </li>
            <li>
              <div className="activity-dot red"></div>
              <div className="activity-text">
                <p>Low stock alert: <strong>Server Racks (SKU-102)</strong></p>
                <span>3 hrs ago</span>
              </div>
            </li>
            <li>
              <div className="activity-dot purple"></div>
              <div className="activity-text">
                <p>Monthly payroll processed successfully</p>
                <span>5 hrs ago</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
