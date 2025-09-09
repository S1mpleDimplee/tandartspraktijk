import React, { useState } from 'react';
import './NavbarHome.css'; 

const NavbarHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h1>Tandarts praktijk</h1>
          <span className="logo-subtitle">hhvhh</span>
        </div>
        
        <ul className="nav-menu">
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href="/over-ons" className="nav-link">Over ons</a></li>
          <li><a href="/blah" className="nav-link">Blah</a></li>
        </ul>

        <button 
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>

        {isMenuOpen && (
          <ul className="mobile-nav-menu">
            <li><a href="/" className="mobile-nav-link">Home</a></li>
            <li><a href="/over-ons" className="mobile-nav-link">Over ons</a></li>
            <li><a href="/blah" className="mobile-nav-link">Blah</a></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavbarHome;