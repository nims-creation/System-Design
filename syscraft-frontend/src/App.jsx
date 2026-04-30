import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Ambient glowing orbs for background effect */}
      <div className="ambient-glow" style={{ top: '-10%', left: '-10%' }}></div>
      <div className="ambient-glow" style={{ bottom: '-10%', right: '-10%', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 60%)' }}></div>

      {/* Persistent Navbar */}
      <Navbar />

      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
      
      {/* Footer */}
      <footer className="footer container border-top">
        <p>&copy; {new Date().getFullYear()} SysCraft. Built for developers, by developers.</p>
      </footer>
    </div>
  );
}

export default App;
