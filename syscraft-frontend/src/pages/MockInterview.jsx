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
    <div className="pt-24 min-h-screen px-4 container relative flex flex-col">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -z-10" />

      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Mock Interviewer</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-lg">
          Practice your system design skills with our FAANG-level AI Simulator.
        </p>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full glass-panel flex flex-col mb-8 overflow-hidden" style={{ height: '600px' }}>
        
        {/* Chat Header */}
        <div className="p-4 border-b border-surface-light bg-surface-dark/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">robot_2</span>
          </div>
          <div>
            <h3 className="font-bold">Staff Engineer AI</h3>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400"></span> Online
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                msg.isAi 
                  ? msg.isError ? 'bg-red-500/20 text-red-300' : 'bg-surface-light text-text-primary' 
                  : 'bg-primary text-white'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-surface-light text-text-primary max-w-[80%] rounded-2xl px-5 py-3 flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-surface-dark border-t border-surface-light">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your response here..."
              className="flex-1 bg-surface-light border border-surface-light rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-text-primary"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="btn-primary rounded-xl px-6 flex items-center justify-center"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default MockInterview;
