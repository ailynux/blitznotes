import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
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
  
      console.log(response.data); // Check the response structure
  
      setToken(response.data.token); // Set token after successful login
      setError('');
      navigate('/notes'); // Redirect to the Notes page
    } catch (err) {
      console.error(err); // Log the error for more insight
      setError('Login failed. Please check your credentials and try again.');
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
