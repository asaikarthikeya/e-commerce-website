import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-logo">E<span>Mart</span></div>
      <nav className="header-nav">
        <a href="#">Home</a>
        <a href="#">About Us</a>
        <a href="#">Shop</a>
        <a href="#">Blog</a>
        <a href="#">Contact</a>
      </nav>
      <div className="header-icons">
        <span className="icon">🛒</span>
        <span className="icon">👤</span>
      </div>
    </header>
  );
};

export default Header;
