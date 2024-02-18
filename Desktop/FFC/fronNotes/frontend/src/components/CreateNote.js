import React, { useState } from 'react';
import { postData } from '../services/services';
import {Button, Input} from './barredFile';


const CreateNote = ({ token }) => {
  const [content, setContent] = useState('');

  const create = async () => {
    try {
      const newContent = { content: content };
      if (token) {
        const response = await postData(newContent, token);
        setContent(response.data.content);
      }
    } catch (error) {
      console.log('error post note:', error);
    }
  };

  return (
    <div>
      <Input
        placeholder={'add content note'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button text={'create'} onClick={() => create()} />
    </div>
  );
};

export default CreateNote;
