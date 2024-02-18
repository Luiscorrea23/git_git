import React, {useState, useRef} from 'react';
import { updateData } from '../services/services';
import { useUser } from '../hooks/UserCont';
import Button from './button';
import Togglable from './visibleForm';
import Input from './input';

const Note = (props) => {
  const { note } = props;
  const { token } = useUser();
  const [newContent, setNewContent] = useState(note.content);
  const controlRef = useRef();

  const changeContentNote = async () => {
    try {
      const updatedNote = { ...note, content: newContent };
      const response = await updateData(note.id, updatedNote, token);
      console.log('Note content updated:', response.data.content);
    } catch (error) {
      console.log('Error editing note content:', error);
    }
  };

  const makeImportant = async () => {
    try {
      const updatedNote = { ...note, important: !note.important };
      await updateData(note.id, updatedNote, token);
      console.log('Note importance updated:', updatedNote.important);
    } catch (error) {
      console.log('Error updating note importance:', error);
    }
  };

  return (
    <div>
      <h3>{note.content}</h3>
      <Togglable
        ref={controlRef}
        buttonLabel="edit"
        children={
          <div>
            <Input
              placeholder="Change the note"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <Button text="save" onClick={changeContentNote} />
          </div>
        }
      />
      <Button text="make important" onClick={makeImportant} />
    </div>
  );
};

export default Note;