import React from 'react';
import { useNotes } from '../hooks/NotesCont';

const DisplayNotes = () => {
  const { notes } = useNotes();

  return (
    <div>
      <h2>Your Notes:</h2>
      {notes && notes.map((note) => (
        <div key={note.id}>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayNotes;
