import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation and useNavigate for redirects
import axios from 'axios';

interface LoginProps {
  setToken: (token: string) => void;
}

interface LoginResponse {
  token: string; // Adjust this if your API returns a different structure
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<LoginResponse>('http://localhost:5140/api/authentication/login', {
        username,
        password,
      });

      setToken(response.data.token); // Set token after successful login
      setError('');
      navigate('/notes'); // Redirect to the Notes page
    } catch (err) {
      console.error(err); // Log the error for more insight
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
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
          Login
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
      
      {/* Add link to Register page */}
      <p style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
