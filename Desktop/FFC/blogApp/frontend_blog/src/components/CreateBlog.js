import React from 'react';
import Control from './Control';
import Input from './Input';
import Button from './Button';

const CreateBlog = ({ ref, action }) => {
  return (
    <Control
      ref={ref}
      buttonLabel={"Create blog"}
      children={
        <div>
          <Input placeholder={"Title"} />
          <Input placeholder={"Author"} />
          <Input placeholder={"url"} />
          <Button text={"Add"} onClic={action} />
        </div>
      }
    />
  );
};

export default CreateBlog;
