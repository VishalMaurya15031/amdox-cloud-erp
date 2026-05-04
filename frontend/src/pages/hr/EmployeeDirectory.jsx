import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2, X } from 'lucide-react';

export default function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    role: '',
    status: 'Active'
  });

  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/employees');
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowAddModal(false);
        setFormData({ name: '', email: '', department: 'Engineering', role: '', status: 'Active' });
        fetchEmployees();
      } else {
        alert("Failed to add employee");
      }
    } catch (err) {
      alert("Error connecting to server");
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.empId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employee-directory">
      <div className="toolbar">
        <div className="search-bar hr-search">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search employees by name, ID or role..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="primary-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={18} />
          <span>Add Employee</span>
        </button>
      </div>

      <div className="table-container">
        <table className="erp-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.id}>
                <td>
                  <div className="user-profile">
                    <div className="avatar small">{emp.name.charAt(0)}</div>
                    <span className="user-name">{emp.name}</span>
                  </div>
                </td>
                <td><span className="badge-id">{emp.empId}</span></td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td>
                  <span className={`status-badge ${emp.status === 'Active' ? 'active' : 'warning'}`}>
                    {emp.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn" title="Edit"><Edit2 size={16} /></button>
                    <button className="icon-btn danger" title="Delete"><Trash2 size={16} /></button>
                    <button className="icon-btn" title="More"><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                  No employees found. Click "Add Employee" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Add New Employee</h3>
              <button className="icon-btn" onClick={() => setShowAddModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddEmployee} className="modal-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>
                  <select value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                    <option value="Engineering">Engineering</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input type="text" placeholder="e.g. Software Engineer" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="primary-btn">Save Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
