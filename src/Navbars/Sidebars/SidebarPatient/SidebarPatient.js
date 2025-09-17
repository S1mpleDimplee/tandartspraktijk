// DashboardSidebar.js
import React, { useEffect, useState } from "react";
import "./SidebarPatient.css";
import { useNavigate } from "react-router-dom";

const SidebarPatiënt = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const navigate = useNavigate();

  const menuItemsPatient = [
    { id: "dashboard", label: "Dashboard", icon: "🏠", url: "/dashboard" },
    { id: "afspraken", label: "Afspraken", icon: "📅" },
    { id: "profiel", label: "Profiel", icon: "👤" },
  ];

  const menuItemsTandarts = [
    { id: "dashboard", label: "Dashboard", icon: "🏠", url: "/dashboard" },
    { id: "calender", label: "Calender", icon: "📅", url: "/rooster-tandarts" },
    { id: "patiënten", label: "Patiënten", icon: "👥", url: "/patiënten-tandarts" },
  ];

  const menuItemsTandartsAssistente = [
    { id: "dashboard", label: "Dashboard", icon: "🏠", url: "/dashboard" },
    { id: "patiënten", label: "Patiënten", icon: "👥", url: "/patiënten-assistente" },
    { id: "afspraken", label: "Afspraken", icon: "📅", url: "/afspraken-assistente" },
  ];

  const menuItems = {
    0: menuItemsPatient,
    1: menuItemsTandarts,
    2: menuItemsTandartsAssistente,

  };

  const [currentRole, setCurrentRole] = useState(null);

  useEffect(() => {
    const loggedInData = JSON.parse(localStorage.getItem("loggedInData"));
    setCurrentRole(parseInt(loggedInData.role));
  }, []);

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
        {menuItems[currentRole]?.map((item) => (
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
