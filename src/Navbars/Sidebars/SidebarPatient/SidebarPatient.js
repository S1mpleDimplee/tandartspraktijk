// DashboardSidebar.js
import React, { useState } from "react";
import "./SidebarPatient.css";
import { useNavigate } from "react-router-dom";

const SidebarPatiënt = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const navigate = useNavigate();

  const menuItemsPatient = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "afspraken", label: "Afspraken", icon: "📅" },
    { id: "profiel", label: "Profiel", icon: "👤" },
  ];

  const menuItemsTandarts = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
  ];

  const menuItemsTandartsAssistente = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
  ];

  const menuItems = {
    patient: menuItemsPatient,
    tandarts: menuItemsTandarts,
    tandartsAssistente: menuItemsTandartsAssistente,
  };

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    // Add navigation logic here
    if (itemId === "uitloggen") {
      // Handle logout
      console.log("Logging out...");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInData");
    navigate("/");
  };

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <h2>{activeItem}</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItemsPatient.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => handleItemClick(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>{" "}
      <button
        className={`sidebar-item logout-button`}
        onClick={() => handleLogout()}
      >
        <span className="sidebar-label">Uitloggen</span>
      </button>
    </aside>
  );
};

export default SidebarPatiënt;
