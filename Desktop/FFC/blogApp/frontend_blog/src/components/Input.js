import React from 'react';

const Input = ({value, onChange, placeholder}) => {
    return (
      <div>
        <input required placeholder={placeholder} value={value} onChange={onChange}></input>
      </div>
    )
  }

  export default Input