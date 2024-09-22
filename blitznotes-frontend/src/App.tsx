//App.tsx 

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Notes from './components/Notes';
import CreateNote from './components/CreateNote'; 
import './App.css';

function App() {
  const [token, setToken] = useState<string>('');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        {/* Pass both token and setToken to Notes */}
        <Route path="/notes" element={<Notes token={token} setToken={setToken} />} />
        <Route path="/create-note" element={<CreateNote token={token} />} />
        <Route path="/" element={<Navigate to="/login" />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
