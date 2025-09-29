// DashboardSidebar.js
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import profile from "./icons/profile.svg"
import appointments from "./icons/appointments.svg"
import dashboard from "./icons/dashboard.svg"
import employees from "./icons/employees.svg"

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const navigate = useNavigate();

  const menuItemsPatient = [
    { id: "dashboard", label: "Dashboard", icon: dashboard, url: "/dashboard" },
    // { id: "afspraken", label: "Afspraken", icon: appointments, url: "/afspraken" },
    { id: "profiel", label: "Profiel", icon: profile, url: "/dashboard/profile" },
  ];

  const menuItemsTandarts = [
    { id: "dashboard", label: "Dashboard", icon: dashboard, url: "/dashboard" },
    { id: "calender", label: "Rooster", icon: appointments, url: "/dashboard/rooster" },
    { id: "patiënten", label: "Patiënten", icon: profile, url: "/dashboard/patienten" },
  ];

  const menuItemsTandartsAssistente = [
    { id: "dashboard", label: "Dashboard", icon: dashboard, url: "/dashboard" },
    { id: "patiënten", label: "Patiënten", icon: profile, url: "/patiënten-assistente" },
    { id: "afspraken", label: "Afspraken", icon: appointments, url: "/afspraken-assistente" },
  ];

  const menuItemsManager = [
    { id: "dashboard", label: "Dashboard", icon: dashboard, url: "/dashboard" },
    { id: "medewerkers", label: "Medewerkers", icon: employees, url: "/dashboard/medewerkers" },
    { id: "accounts", label: "Accounts", icon: profile, url: "/dashboard/accounts" },
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
            <img src={item.icon} alt={item.label} className="sidebar-icon" />
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
