//Notes.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Note } from '../types';

interface NotesProps {
  token: string;
}

const Notes: React.FC<NotesProps> = ({ token }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div>
      <h2>Your Notes</h2>
      {error && <p>{error}</p>}
      <Link to="/create-note">
        <button>Create New Note</button> {/* Link to create note */}
      </Link>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
