import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Users, Clock, CalendarOff, DollarSign } from 'lucide-react';
import './HR.css';

export default function HRDashboard() {
  return (
    <div className="hr-module-container">
      <div className="page-header">
        <h1>Core HR & Payroll</h1>
        <p>Manage your workforce, attendance, leaves, and salaries.</p>
      </div>

      <div className="hr-tabs">
        <NavLink to="/hr" end className={({ isActive }) => isActive ? "hr-tab active" : "hr-tab"}>
          <Users size={18} />
          <span>Employee Directory</span>
        </NavLink>
        <NavLink to="/hr/attendance" className={({ isActive }) => isActive ? "hr-tab active" : "hr-tab"}>
          <Clock size={18} />
          <span>Attendance</span>
        </NavLink>
        <NavLink to="/hr/leaves" className={({ isActive }) => isActive ? "hr-tab active" : "hr-tab"}>
          <CalendarOff size={18} />
          <span>Leave Management</span>
        </NavLink>
        <NavLink to="/hr/payroll" className={({ isActive }) => isActive ? "hr-tab active" : "hr-tab"}>
          <DollarSign size={18} />
          <span>Payroll</span>
        </NavLink>
      </div>

      <div className="hr-content-area">
        <Outlet />
      </div>
    </div>
  );
}
