import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';


const Button = ({ bgColor, color, size, text, borderRadius }) => {
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type="button"
      onClick={() => setIsClicked(initialState)}
      style={
        { backgroundColor: bgColor, 
          color, 
          borderRadius, 
          fontSize: `${size}`,
          padding: '0.75rem',
        }
      }
    >
    {text}
    </button>
  );
};

export default Button;
