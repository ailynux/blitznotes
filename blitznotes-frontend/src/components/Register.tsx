//Register.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add Link and useNavigate for better navigation
import axios from 'axios';
import '../styles/Register.css'; // Importing the CSS file

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // For redirection after successful registration

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5140/api/authentication/register', { username, password });
      setMessage('User registered successfully!');
      setError('');
      setTimeout(() => {
        navigate('/login'); // Redirect to login after successful registration
      }, 2000);
    } catch (err) {
      setError('Registration failed. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="register-input"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="register-input"
          autoComplete="new-password" // Fix: changed autocomplete to autoComplete
        />
        <button type="submit" className="register-button">
          Register
        </button>
        {message && <p className="register-success">{message}</p>}
        {error && <p className="register-error">{error}</p>}
      </form>
      
      {/* Link back to login */}
      <p className="login-link">
        Already have an account? <Link to="/login" className="login-link-text">Login here</Link>
      </p>

      {/* Social Badges */}
      <div className="social-badges">
        <a href="https://www.linkedin.com/in/ailyndiaz01" className="badge linkedin-badge">LinkedIn</a>
        <a href="https://github.com/ailynux" className="badge github-badge">GitHub</a>
      </div>
    </div>
  );
};

export default Register;
