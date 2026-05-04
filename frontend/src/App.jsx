import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import HRDashboard from './pages/hr/HRDashboard';
import EmployeeDirectory from './pages/hr/EmployeeDirectory';
import Attendance from './pages/hr/Attendance';
import LeaveManagement from './pages/hr/LeaveManagement';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="hr" element={<HRDashboard />}>
            <Route index element={<EmployeeDirectory />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leaves" element={<LeaveManagement />} />
            <Route path="payroll" element={<div className="placeholder-module"><h2>Payroll System</h2></div>} />
          </Route>
          <Route path="inventory" element={<div className="page-header"><h1>AI Inventory</h1></div>} />
          <Route path="finance" element={<div className="page-header"><h1>Finance & Accounting</h1></div>} />
          <Route path="crm" element={<div className="page-header"><h1>Sales & CRM</h1></div>} />
          <Route path="*" element={<div className="page-header"><h1>Module Coming Soon</h1></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
