import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Briefcase } from 'lucide-react';
import './Auth.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Employee'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Registration successful! Please login.');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      alert('Error connecting to server');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-icon-large">A</div>
          <h2>Create Account</h2>
          <p>Join the Amdox Cloud ERP platform</p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="input-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input 
                type="text" 
                name="name"
                placeholder="Vishal Maurya" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input 
                type="email" 
                name="email"
                placeholder="vishal@amdox.com" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input 
                  type="password" 
                  name="password"
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="input-group">
              <label>Role</label>
              <div className="input-wrapper">
                <Briefcase className="input-icon" size={20} />
                <select name="role" value={formData.role} onChange={handleChange} required>
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="HR">HR Admin</option>
                  <option value="Admin">Super Admin</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="auth-submit-btn mt-4">
            Register Account <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
      
      <div className="auth-decoration">
        <div className="glow-circle circle-1"></div>
        <div className="glow-circle circle-2"></div>
      </div>
    </div>
  );
}
