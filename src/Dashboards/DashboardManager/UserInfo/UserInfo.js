import React, { useEffect, useState } from 'react';
import './UserInfo.css';
import { useNavigate } from 'react-router-dom';
import postCall from '../../../Calls/calls';

const UserInfo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter1, setRoleFilter1] = useState('');
  const [roleFilter2, setRoleFilter2] = useState('');

  const [users, setUsers] = useState([

  ]);

  const navigate = useNavigate();

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userid.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole1 = roleFilter1 === '' || user.role.toString() === roleFilter1;
    const matchesRole2 = roleFilter2 === '' || user.role.toString() === roleFilter2;

    return matchesSearch && matchesRole1 && matchesRole2;
  });

  useEffect(() => {
    fetchAllDentists();
  }, []);

  const fetchAllDentists = async () => {
    const response = await postCall("getallusers", {});

    if (response.isSuccess) {
      setUsers(response.data || []);
    }
  };

  const handleSearch = () => {
    // Search functionality is handled by filteredUsers automatically
    console.log('Searching for:', searchTerm);
  };

  const handleOpenUser = (userId) => {
    localStorage.setItem('selectedUserId', userId);
    navigate(`/dashboard/gebruikers`);
  };

  const getRoleColor = (roll) => {
    switch (roll) {
      case 0: return '#6b7280'; // Gray for role 0
      case 1: return '#f59e0b'; // Amber for role 1
      case 2: return '#10b981'; // Emerald for role 2
      case 3: return '#3b82f6'; // Blue for role 3
      default: return '#6b7280';
    }
  };

  return (
    <div className="manager-container">
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
                <option value="0">Patient</option>
                <option value="1">Tandarts</option>
                <option value="3">Manager</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="users-table-container">
          <div className="users-table">
            {/* Table Header */}
            <div className="table-header-userinfo">
              <div className="header-cell-userinfo">Naam</div>
              <div className="header-cell-userinfo">Account datum</div>
              <div className="header-cell-userinfo">ID</div>
              <div className="header-cell-userinfo">Roll</div>
              <div className="header-cell-userinfo">Actie</div>
            </div>

            {/* Table Body */}
            <div className="table-body-userinfo">
              {filteredUsers.map((user) => (
                <div key={user.id} className="table-row-userinfo">
                  <div className="user-info-section">
                    <div className="table-cell user-name">{user.firstname} {user.lastname}</div>

                  </div>
                  <div className="table-cell">{user.created_at}</div>
                  <div className="table-cell user-id">{user.userid}</div>
                  <div className="table-cell user-role">{user.role === "0" ? "Patient" : user.role === "1" ? "Tandarts" : "Manager"}</div>
                  <div className="table-cell action-cell">
                    <button
                      className="open-btn"
                      onClick={() => handleOpenUser(user.userid)}
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