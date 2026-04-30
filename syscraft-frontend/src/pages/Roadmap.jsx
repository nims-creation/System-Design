import React from 'react';
import './Roadmap.css';

const roadmapData = [
  {
    phase: "Phase 1: The Basics",
    topics: [
      { id: 1, title: "Networking Basics", desc: "TCP/IP, HTTP/HTTPS, DNS", status: "completed" },
      { id: 2, title: "Client-Server Model", desc: "How web apps communicate", status: "in-progress" },
      { id: 3, title: "API Paradigms", desc: "REST, GraphQL, gRPC", status: "locked" }
    ]
  },
  {
    phase: "Phase 2: Scalability",
    topics: [
      { id: 4, title: "Vertical vs Horizontal Scaling", desc: "Scaling up vs scaling out", status: "locked" },
      { id: 5, title: "Load Balancing", desc: "L4 vs L7, Hashing", status: "locked" },
      { id: 6, title: "Caching", desc: "CDN, Redis, Memcached", status: "locked" }
    ]
  },
  {
    phase: "Phase 3: Databases",
    topics: [
      { id: 7, title: "Relational vs NoSQL", desc: "ACID, CAP Theorem", status: "locked" },
      { id: 8, title: "Replication & Sharding", desc: "Scaling databases", status: "locked" },
      { id: 9, title: "Indexing", desc: "B-Trees, Hash Indexes", status: "locked" }
    ]
  }
];

const Roadmap = () => {
  return (
    <div className="roadmap-container container animate-fade-in">
      <div className="roadmap-header">
        <h1 className="roadmap-title">Your Learning <span className="text-gradient">Roadmap</span></h1>
        <p className="roadmap-subtitle">Follow this structured path from zero to System Design Architect.</p>
        
        <div className="progress-bar-container glass">
          <div className="progress-info">
            <span>Overall Progress</span>
            <span>12%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill bg-gradient" style={{ width: '12%' }}></div>
          </div>
        </div>
      </div>

      <div className="timeline">
        {roadmapData.map((phase, idx) => (
          <div className="timeline-phase" key={idx}>
            <div className="phase-marker glass">
              <span className="phase-number">{idx + 1}</span>
            </div>
            <div className="phase-content">
              <h2 className="phase-title">{phase.phase}</h2>
              <div className="topic-grid">
                {phase.topics.map(topic => (
                  <div className={`topic-card glass ${topic.status}`} key={topic.id}>
                    <div className="topic-status-icon">
                      {topic.status === 'completed' && '✅'}
                      {topic.status === 'in-progress' && '⏳'}
                      {topic.status === 'locked' && '🔒'}
                    </div>
                    <div className="topic-details">
                      <h3>{topic.title}</h3>
                      <p>{topic.desc}</p>
                    </div>
                    <button className={`btn ${topic.status === 'locked' ? 'btn-outline' : 'btn-primary'} topic-btn`}>
                      {topic.status === 'completed' ? 'Review' : topic.status === 'locked' ? 'Locked' : 'Continue'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
