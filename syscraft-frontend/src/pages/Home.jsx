import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <main className="hero container animate-fade-in">
        <div className="hero-content">
          <div className="badge glass">🚀 The Ultimate System Design Journey</div>
          <h1 className="hero-title">
            Master System Design <br />
            <span className="text-gradient">Without the Confusion</span>
          </h1>
          <p className="hero-subtitle">
            A structured, visual, and community-driven platform to learn system design from zero to architect. Get curated roadmaps, visual components, cheat sheets, and real interview questions.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-large">Start Learning Now</button>
            <button className="btn btn-outline btn-large">View Curriculum</button>
          </div>
        </div>
        
        {/* Mockup / Visual element */}
        <div className="hero-visual glass">
          <div className="mockup-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="mockup-body">
            <div className="architecture-diagram">
              <div className="node client glass">Client</div>
              <div className="arrow">→</div>
              <div className="node lb glass bg-gradient">Load Balancer</div>
              <div className="arrow">→</div>
              <div className="node server glass">App Servers</div>
              <div className="arrow">→</div>
              <div className="node db glass">Database</div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="features container">
        <h2 className="section-title">Everything you need to crack the interview</h2>
        <div className="feature-grid">
          <div className="feature-card glass hover-effect">
            <div className="feature-icon">🗺️</div>
            <h3>Structured Roadmap</h3>
            <p>Know exactly what to read and in what order. No more getting lost in endless tutorials.</p>
          </div>
          <div className="feature-card glass hover-effect">
            <div className="feature-icon">👁️</div>
            <h3>Visual Learning</h3>
            <p>Understand complex architectures through beautiful diagrams and interactive elements.</p>
          </div>
          <div className="feature-card glass hover-effect">
            <div className="feature-icon">📝</div>
            <h3>Personal Notes</h3>
            <p>Take notes directly on the platform and save them for your last-minute revision.</p>
          </div>
          <div className="feature-card glass hover-effect">
            <div className="feature-icon">⚡</div>
            <h3>Quick Cheat Sheets</h3>
            <p>Revise entire topics in minutes with our highly condensed cheat sheets.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
