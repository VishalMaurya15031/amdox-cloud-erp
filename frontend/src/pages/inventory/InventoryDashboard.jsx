import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Box, Layers, AlertTriangle, PackageSearch } from 'lucide-react';
import './Inventory.css';

export default function InventoryDashboard() {
  return (
    <div className="inventory-module-container">
      <div className="page-header inventory-header">
        <div className="header-title">
          <h1>AI Inventory & Supply Chain</h1>
          <span className="ai-badge">AI Powered</span>
        </div>
        <p>Smart product catalog, auto-restock predictions, and supplier management.</p>
      </div>

      <div className="inventory-tabs">
        <NavLink to="/inventory" end className={({ isActive }) => isActive ? "inv-tab active" : "inv-tab"}>
          <Box size={18} />
          <span>Product Catalog</span>
        </NavLink>
        <NavLink to="/inventory/stock" className={({ isActive }) => isActive ? "inv-tab active" : "inv-tab"}>
          <Layers size={18} />
          <span>Stock Levels</span>
        </NavLink>
        <NavLink to="/inventory/predictions" className={({ isActive }) => isActive ? "inv-tab active" : "inv-tab"}>
          <AlertTriangle size={18} />
          <span>AI Predictions</span>
        </NavLink>
        <NavLink to="/inventory/suppliers" className={({ isActive }) => isActive ? "inv-tab active" : "inv-tab"}>
          <PackageSearch size={18} />
          <span>Suppliers</span>
        </NavLink>
      </div>

      <div className="inventory-content-area">
        <Outlet />
      </div>
    </div>
  );
}
