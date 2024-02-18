import React from 'react';

const Button = ({text, onClic}) => {
    return <button onClick={onClic}>{text}</button>
}

export default Button