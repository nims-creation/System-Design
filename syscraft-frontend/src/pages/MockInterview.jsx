import React, { useState, useEffect, useRef } from 'react';
import api from '../api';

const MockInterview = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I am your AI System Design Interviewer. Are you ready to begin your mock interview? Type 'Start' to begin.", isAi: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, isAi: false }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.post('/ai/chat', { message: userMessage });
      setMessages(prev => [...prev, { text: response.data.response, isAi: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Network error connecting to AI backend.", isAi: true, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page container" style={{ flexDirection: 'column', padding: '2rem 1.5rem' }}>
      <div className="auth-header animate-fade-in" style={{ marginTop: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Mock Interviewer</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Practice your system design skills with our FAANG-level AI Simulator.
        </p>
      </div>

      <div className="chat-container glass animate-fade-in" style={{ width: '100%', maxWidth: '800px', height: '600px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Chat Header */}
        <div className="chat-header" style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <span className="logo-icon">🤖</span>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Staff Engineer AI</h3>
            <p style={{ fontSize: '0.8rem', color: '#4ade80', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }}></span> Online
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: msg.isAi ? 'flex-start' : 'flex-end' }}>
              <div style={{
                maxWidth: '80%',
                padding: '1rem 1.25rem',
                borderRadius: '16px',
                borderBottomLeftRadius: msg.isAi ? '4px' : '16px',
                borderBottomRightRadius: msg.isAi ? '16px' : '4px',
                background: msg.isAi ? (msg.isError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)') : 'var(--primary)',
                color: msg.isError ? '#fca5a5' : 'var(--text-main)',
                border: msg.isAi ? '1px solid var(--border-color)' : 'none',
                lineHeight: '1.5'
              }}>
                <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '1rem 1.25rem',
                borderRadius: '16px',
                borderBottomLeftRadius: '4px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                gap: '0.5rem'
              }}>
                <span className="typing-dot">.</span>
                <span className="typing-dot" style={{ animationDelay: '0.2s' }}>.</span>
                <span className="typing-dot" style={{ animationDelay: '0.4s' }}>.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chat-input-area" style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your response here..."
              className="form-input"
              style={{ flex: 1, borderRadius: '99px', padding: '0.75rem 1.5rem' }}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="btn btn-primary"
              style={{ borderRadius: '99px', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center' }}
            >
              Send 🚀
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default MockInterview;
