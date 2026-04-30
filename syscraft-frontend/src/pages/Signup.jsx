import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await register(name, email, password);
    if (success) {
      navigate('/roadmap');
    } else {
      setError('Registration failed. Email might already be in use.');
    }
  };

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -z-10" />

      <div className="glass-panel max-w-md w-full p-8 relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-text-secondary">Join SysCraft to build your architecture skills</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Full Name</label>
            <input
              type="text"
              required
              className="w-full bg-surface-dark border border-surface-light rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-surface-dark border border-surface-light rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full bg-surface-dark border border-surface-light rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full btn-primary py-3 flex justify-center items-center gap-2 text-lg">
            Create Account
            <span className="material-symbols-outlined text-sm">person_add</span>
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-accent transition-colors font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
