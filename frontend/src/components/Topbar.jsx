import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" aria-label="Menu">
          <Menu size={24} />
        </button>
        <div className="search-bar">
          <Search className="search-icon" size={18} />
          <input type="text" placeholder="Search across ERP..." />
        </div>
      </div>
      <div className="topbar-right">
        <button className="notification-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        <div className="user-profile">
          <div className="avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">Vishal Maurya</span>
            <span className="user-role">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
