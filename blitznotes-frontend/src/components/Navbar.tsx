// Navbar.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  token: string;
  setToken: (token: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(''); // Clear the token
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/notes" style={styles.link}>Notes</Link>
      <Link to="/create-note" style={styles.link}>Create Note</Link>
      {token && (
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: 'white',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    marginRight: '10px',
  },
  logoutButton: {
    background: 'none',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Navbar;
