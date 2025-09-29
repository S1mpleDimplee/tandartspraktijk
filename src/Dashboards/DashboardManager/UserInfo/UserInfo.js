import React, { useState } from 'react';
import './UserInfo.css';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter1, setRoleFilter1] = useState('');
  const [roleFilter2, setRoleFilter2] = useState('');

  const [users] = useState([
    {
      id: 1,
      naam: 'Sjonnie van der Boer',
      accountDatum: '19-11-2014',
      gebruikerId: 'U-00123',
      roll: 0
    },
    {
      id: 2,
      naam: 'Coen Bekhuis',
      accountDatum: '19-11-2014',
      gebruikerId: 'U-00021',
      roll: 0
    },
    {
      id: 3,
      naam: 'DR. Pieter Post',
      accountDatum: '19-11-2014',
      gebruikerId: 'C-31278',
      roll: 1
    },
    {
      id: 4,
      naam: 'Jan biggel',
      accountDatum: '19-11-2014',
      gebruikerId: 'C-21389',
      roll: 0
    },
    {
      id: 5,
      naam: 'Jan biggel',
      accountDatum: '19-11-2014',
      gebruikerId: 'C-00212',
      roll: 2
    }
  ]);

  const navigate = useNavigate();

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.gebruikerId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole1 = roleFilter1 === '' || user.roll.toString() === roleFilter1;
    const matchesRole2 = roleFilter2 === '' || user.roll.toString() === roleFilter2;
    
    return matchesSearch && matchesRole1 && matchesRole2;
  });

  const handleSearch = () => {
    // Search functionality is handled by filteredUsers automatically
    console.log('Searching for:', searchTerm);
  };

  const handleOpenUser = (userId) => {
   navigate(`/dashboard/gebruikers`);
  };

  const getRoleColor = (roll) => {
    switch (roll) {
      case 0: return '#6b7280'; // Gray for role 0
      case 1: return '#f59e0b'; // Amber for role 1
      case 2: return '#10b981'; // Emerald for role 2
      default: return '#6b7280';
    }
  };

  return (
    <div className="manager-container">
      {/* Header */}
      

      {/* Main Content */}
      <div className="manager-main">
        {/* Search and Filter Section */}
        <div className="search-section">
          <div className="search-controls">
            <input
              type="text"
              placeholder="Gebruiker zoeken"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            
            <div className="filter-group">
              <label>Role</label>
              <select 
                value={roleFilter1} 
                onChange={(e) => setRoleFilter1(e.target.value)}
                className="role-select"
              >
                <option value="">-</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Role</label>
              <select 
                value={roleFilter2} 
                onChange={(e) => setRoleFilter2(e.target.value)}
                className="role-select"
              >
                <option value="">-</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <button onClick={handleSearch} className="search-btn">
              Zoeken
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="users-table-container">
          <div className="users-table">
            {/* Table Header */}
            <div className="table-header">
              <div className="header-cell">Naam</div>
              <div className="header-cell">Account datum</div>
              <div className="header-cell">Gebruiker ID</div>
            </div>
            <div className="table-subheader">
              <div className="subheader-cell">Roll</div>
              <div className="subheader-cell">Actie</div>
              <div className="subheader-cell"></div>
            </div>

            {/* Table Body */}
            <div className="table-body">
              {filteredUsers.map((user) => (
                <div key={user.id} className="table-row">
                  <div className="user-info-section">
                    <div className="table-cell user-name">{user.naam}</div>
                    <div className="user-details">
                      <span 
                        className="role-badge"
                        style={{ backgroundColor: getRoleColor(user.roll) }}
                      >
                        {user.roll}
                      </span>
                    </div>
                  </div>
                  <div className="table-cell">{user.accountDatum}</div>
                  <div className="table-cell user-id">{user.gebruikerId}</div>
                  <div className="table-cell action-cell">
                    <button 
                      className="open-btn"
                      onClick={() => handleOpenUser(user.gebruikerId)}
                    >
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;