import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar container glass">
      <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
        <span className="logo-icon">💠</span>
        <span className="logo-text">SysCraft</span>
      </Link>
      <div className="nav-links">
        <Link to="/#features">Features</Link>
        <Link to="/roadmap">Roadmap</Link>
        <a href="#community">Community</a>
      </div>
      <div className="nav-actions">
        {user ? (
          <>
            <span className="text-text-secondary mr-4">Hi, {user.name.split(' ')[0]}</span>
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline" style={{ textDecoration: 'none' }}>Sign In</Link>
            <Link to="/signup" className="btn btn-primary" style={{ textDecoration: 'none' }}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
