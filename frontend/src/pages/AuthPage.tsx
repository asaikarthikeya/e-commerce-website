import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AuthPage.css';

const BACKEND = 'http://localhost:4000'; // your Express + Redis server

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const switchMode = () => {
    setMode(m => (m === 'login' ? 'signup' : 'login'));
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // FULL URL so it hits your backend
    const url =
      mode === 'login'
        ? `${BACKEND}/api/auth/login`
        : `${BACKEND}/api/auth/register`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        if (mode === 'login') {
          login(data.token);
          alert(data.message || 'Login successful');
          navigate('/');
        } else {
          alert(data.message || 'Registration successful');
          setMode('login');
        }
      } else {
        alert(data.message || 'An error occurred');
      }
    } catch (err) {
      console.error(err);
      alert('Cannot reach server');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="toggle">
          {mode === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}
          <button onClick={switchMode} className="toggle-btn">
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
