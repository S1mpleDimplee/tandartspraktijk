// NavbarHome.jsx
import React, { useState } from "react";
import "./NavbarHome.css";

const NavbarHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h1>Tandarts praktijk hengelo</h1>
        </div>

        <ul className="nav-menu">
          <li>
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarHome;
