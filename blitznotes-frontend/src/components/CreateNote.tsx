//CreateNote.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Note } from '../types';

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
    try {
      const newNote: Omit<Note, 'id'> = {
        title,
        content,
        category,
        userId: 1, // Set the valid userId
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
      setError('Error creating note. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create a New Note</h2>
      <form onSubmit={handleCreateNote}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Create Note</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateNote;
