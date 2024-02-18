import React, { useState } from 'react';

const Alert = ({ message, state }) => {
  const [alert, setAlert] = useState(null);

  return state ? <div className='alert'><p>{message}</p></div> : null;
};

export default Alert;
