import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Box, 
  Calculator, 
  Truck, 
  LineChart,
  Headset,
  Briefcase,
  Settings,
  ShieldAlert,
  Target,
  FileText,
  Workflow
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Core HR & Payroll', path: '/hr', icon: Users },
  { name: 'AI Inventory', path: '/inventory', icon: Box },
  { name: 'Finance & Accounting', path: '/finance', icon: Calculator },
  { name: 'Sales & CRM', path: '/crm', icon: Target },
  { name: 'Procurement', path: '/procurement', icon: Truck },
  { name: 'Manufacturing', path: '/manufacturing', icon: Workflow },
  { name: 'Project Mgmt', path: '/projects', icon: Briefcase },
  { name: 'Customer Support', path: '/support', icon: Headset },
  { name: 'Asset Mgmt', path: '/assets', icon: FileText },
  { name: 'Risk Mgmt', path: '/risk', icon: ShieldAlert },
  { name: 'Business Intel', path: '/bi', icon: LineChart },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">A</div>
        <h2>Amdox ERP</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  <Icon className="nav-icon" size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <NavLink to="/settings" className="nav-link">
          <Settings className="nav-icon" size={20} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
