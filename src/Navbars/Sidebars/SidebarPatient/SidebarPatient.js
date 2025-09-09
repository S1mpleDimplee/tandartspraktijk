// DashboardSidebar.js
import React, { useState } from 'react';
import './SidebarPatient.css';

const   SidebarPatiënt = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'afspraken', label: 'Afspraken', icon: '📅' },
    { id: 'profiel', label: 'Profiel', icon: '👤' },
    { id: 'uitloggen', label: 'Uitloggen', icon: '🚪' }
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    // Add navigation logic here
    if (itemId === 'uitloggen') {
      // Handle logout
      console.log('Logging out...');
    }
  };

  return (
    <aside className="dashboard-sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => handleItemClick(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarPatiënt;