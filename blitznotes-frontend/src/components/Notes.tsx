//Notes.tsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate for logout
import axios from 'axios';
import { Note } from '../types';
import '../styles/Notes.css'; // Import the custom CSS for the Notes page

interface NotesProps {
  token: string;
  setToken: (token: string) => void;
}

const Notes: React.FC<NotesProps> = ({ token, setToken }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get<Note[]>('http://localhost:5140/api/notes', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setNotes(response.data);
      } catch (error) {
        setError('Error fetching notes');
        console.error('Error fetching notes', error);
      }
    };
    fetchNotes();
  }, [token]);

  const handleDelete = async (noteId: number) => {
    try {
      await axios.delete(`http://localhost:5140/api/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      setError('Error deleting note');
      console.error('Error deleting note', error);
    }
  };

  const handleLogout = () => {
    setToken(''); // Clear token on logout
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h2 className="notes-title">Notes</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="notes-actions">
          <Link to="/create-note">
            <button className="btn create-btn">Create New Note</button>
          </Link>
          <button onClick={handleLogout} className="btn logout-btn">
            Logout
          </button>
        </div>
      </div>
      <div className="notes-list-wrapper">
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note.id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => handleDelete(note.id)} className="btn delete-btn">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notes;
