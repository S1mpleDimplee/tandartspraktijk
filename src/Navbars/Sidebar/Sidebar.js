// DashboardSidebar.js
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const navigate = useNavigate();

  const menuItemsPatient = [
    { id: "dashboard", label: "Dashboard", icon: "🏠", url: "/dashboard" },
    { id: "afspraken", label: "Afspraken", icon: "📅", url: "/afspraken" },
    { id: "profiel", label: "Profiel", icon: "👤", url: "/dashboard/profile" },
  ];

  const menuItemsTandarts = [
    { id: "dashboard", label: "Dashboard", icon: "🏠", url: "/dashboard" },
    { id: "calender", label: "Rooster", icon: "📅", url: "/dashboard/rooster" },
    { id: "patiënten", label: "Patiënten", icon: "👥", url: "/dashboard/patienten" },
  ];

  const menuItemsTandartsAssistente = [
    { id: "dashboard", label: "Dashboard", icon: "🏠", url: "/dashboard" },
    { id: "patiënten", label: "Patiënten", icon: "👥", url: "/patiënten-assistente" },
    { id: "afspraken", label: "Afspraken", icon: "📅", url: "/afspraken-assistente" },
  ];

  const menuItemsManager = [
    { id: "dashboard", label: "Dashboard", icon: "🏠", url: "/dashboard" },
    { id: "medewerkers", label: "Medewerkers", icon: "👥", url: "/dashboard/medewerkers" },
    { id: "accounts", label: "Accounts", icon: "📊", url: "/dashboard/accounts" },
  ];

  const menuItems = {
    0: menuItemsPatient,
    1: menuItemsTandarts,
    2: menuItemsTandartsAssistente,
    3: menuItemsManager,
  };

  const [currentRole, setCurrentRole] = useState(null);

  useEffect(() => {
    const loggedInData = JSON.parse(localStorage.getItem("loggedInData"));
    setCurrentRole(parseInt(loggedInData.role));
  }, []);

  const handleItemClick = (itemId, itemUrl) => {
    setActiveItem(itemId);

    navigate(itemUrl);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInData");
    navigate("/inloggen");
  };

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <h2>{activeItem}</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems[currentRole]?.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => handleItemClick(item.id, item.url)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>
      <button
        className={`sidebar-item logout-button`}
        onClick={() => handleLogout()}
      >
        <span className="sidebar-label">Uitloggen</span>
      </button>
    </aside>
  );
};

export default Sidebar;
