import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* left spacer, keeps logo centered */}
      <div className="header-spacer" />

      {/* centered logo */}
      <div className="header-logo">
        E<span>Mart</span>
      </div>

      {/* icons on the right */}
      <div className="header-icons">
        <Link to="/cart" className="icon">🛒</Link>
        {user ? (
          <>
            <span className="greeting">Hello, {user}</span>
            <button
              className="icon logout-btn"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              🔒
            </button>
          </>
        ) : (
          <Link to="/auth" className="icon">👤</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
