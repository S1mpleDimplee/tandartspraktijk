// DashboardNavbar.js
import React from 'react';
import './NavbarDashboard.css';

const NavbarDashboard = ({ userName = "Klant naam" }) => {
  return (
    <nav className="dashboard-navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">Klanten Dashboard</h1>
        
        <div className="navbar-user">
          <div className="user-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" fill="white"/>
              <path d="M12 14C7.59 14 4 17.59 4 22H20C20 17.59 16.41 14 12 14Z" fill="white"/>
            </svg>
          </div>
          <span className="user-name">{userName}</span>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;