//Register.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add Link and useNavigate for better navigation
import axios from 'axios';

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px', fontSize: '16px', backgroundColor: '#61dafb', border: 'none', cursor: 'pointer' }}>
          Register
        </button>
        {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
      
      {/* Link back to login */}
      <p style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
