import React, { useState } from 'react';
import './Tooltip.css'

const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  
  return (
    <div className='tooltip-container' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {showTooltip && <div className='tooltip'>{text}</div>}
    </div>
  )
}

export default Tooltip