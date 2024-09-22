import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css'; // Importing the custom CSS file

interface LoginProps {
  setToken: (token: string) => void;
}

interface LoginResponse {
  token: string; 
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<LoginResponse>('http://localhost:5140/api/authentication/login', {
        username,
        password,
      });

      setToken(response.data.token);
      setError('');
      navigate('/notes');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">BlitzNotes</h1> {/* BlitzNotes title */}
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>

      {/* Add link to Register page */}
      <p className="register-link">
        Don't have an account? <Link to="/register" className="register-link-text">Register here</Link>
      </p>

      {/* Social Badges */}
      <div className="social-badges">
        <a href="https://www.linkedin.com/in/ailyndiaz01" className="badge linkedin-badge" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/ailynux" className="badge github-badge" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Login;
