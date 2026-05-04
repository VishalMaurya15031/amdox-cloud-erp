import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Layout.css'; // Let's add specific layout CSS

export default function Layout() {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content-wrapper">
        <Topbar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
