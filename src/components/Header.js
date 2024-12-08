import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, onLogout }) {
  return (
    <div className="header-container">
      <h1 className="logo">Charity Auction</h1>
      <div className="auth-links">
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={onLogout} className="logout-button">Logout</button>
        )}
      </div>
    </div>
  );
}

export default Header;
