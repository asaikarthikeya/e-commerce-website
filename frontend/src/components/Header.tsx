import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom'

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
        <Link to="/auth" className="icon">👤</Link>
      </div>
    </header>
  );
};

export default Header;
