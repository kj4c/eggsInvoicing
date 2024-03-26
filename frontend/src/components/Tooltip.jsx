import {useState} from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/Tooltip.css'

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

Tooltip.propTypes = {
  text: PropTypes.string.isRequired, // Assuming `text` is required and should be a string
  children: PropTypes.node.isRequired, // `children` can be anything renderable and is required
};