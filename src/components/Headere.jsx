import React, { useState } from 'react';
import '../assets/css/header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigator = useNavigate();

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">KALSANG</div>
        
        {/* Hamburger Menu for mobile */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {/* <span></span>
          <span></span>
          <span></span> */}
        </div>
        
        {/* Empty or Custom Navigation Links */}
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          {/* Add or remove links as needed */}
        </ul>
        
       
      </nav>
    </header>
  );
};

export default Header;