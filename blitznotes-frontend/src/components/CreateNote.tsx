//CreateNote.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Note } from '../types';
import '../styles/CreateNote.css'; // Importing the CSS file

interface CreateNoteProps {
  token: string;
}

const CreateNote: React.FC<CreateNoteProps> = ({ token }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // For navigation after creating a note

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !category) {
      setError('All fields are required');
      return;
    }

    try {
      const newNote: Omit<Note, 'id'> = {
        title,
        content,
        category,
        userId: 1, // Replace this with dynamic userId if available
      };

      await axios.post('http://localhost:5140/api/notes', newNote, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Note created successfully');
      navigate('/notes'); // Redirect back to Notes page
    } catch (err) {
      console.error(err);
      setError('Error creating note. Please try again.');
    }
  };

  return (
    <div className="create-note-container">
      <h2 className="create-note-title">New Notes</h2>
      <form onSubmit={handleCreateNote} className="create-note-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="create-note-input"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="create-note-textarea"
        ></textarea>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="create-note-input"
        />
        <button type="submit" className="create-note-button">Create Note</button>
      </form>
      {error && <p className="create-note-error">{error}</p>}
      
      {/* Back to Notes Button */}
      <button 
        className="create-note-back-button" 
        onClick={() => navigate('/notes')}
      >
        Back to Notes
      </button>
    </div>
  );
};

export default CreateNote;
