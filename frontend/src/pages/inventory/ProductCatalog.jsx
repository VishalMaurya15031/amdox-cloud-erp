import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2, Cpu, X } from 'lucide-react';

export default function ProductCatalog() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: 'Electronics',
    quantity: 0,
    price: 0,
    aiAlert: ''
  });

  const fetchInventory = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/inventory');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Error fetching inventory", err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowAddModal(false);
        setFormData({ sku: '', name: '', category: 'Electronics', quantity: 0, price: 0, aiAlert: '' });
        fetchInventory();
      } else {
        alert("Failed to add item");
      }
    } catch (err) {
      alert("Error connecting to server");
    }
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-catalog">
      <div className="toolbar">
        <div className="search-bar inv-search">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products by SKU or Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="primary-btn inv-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="table-container">
        <table className="erp-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>AI Insights</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td><span className="badge-sku">{item.sku}</span></td>
                <td><span className="product-name">{item.name}</span></td>
                <td>{item.category}</td>
                <td><strong>{item.quantity}</strong></td>
                <td>
                  <span className={`status-badge ${item.status === 'In Stock' ? 'active' : item.status === 'Low Stock' ? 'warning' : 'danger'}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  {item.aiAlert ? (
                    <div className="ai-insight-cell">
                      <Cpu size={14} className="ai-icon-small" />
                      <span>{item.aiAlert}</span>
                    </div>
                  ) : (
                    <span className="no-alert">-</span>
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn" title="Edit"><Edit2 size={16} /></button>
                    <button className="icon-btn danger" title="Delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                  No inventory found. Click "Add Product" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card inv-modal">
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button className="icon-btn" onClick={() => setShowAddModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddItem} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>SKU (Barcode)</label>
                  <input type="text" placeholder="e.g. LAP-001" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Hardware">Hardware</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Product Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Quantity</label>
                  <input type="number" min="0" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Unit Price ($)</label>
                  <input type="number" min="0" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label className="ai-label"><Cpu size={16} /> AI Prediction Alert (Optional)</label>
                <input type="text" placeholder="e.g. Stock will deplete in 5 days" value={formData.aiAlert} onChange={e => setFormData({...formData, aiAlert: e.target.value})} />
              </div>
              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="primary-btn inv-btn">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
