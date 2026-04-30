import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
        <button className="btn btn-outline">Sign In</button>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
