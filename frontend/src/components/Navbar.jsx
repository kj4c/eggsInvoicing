// import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
// import { IoIosNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaRegUser } from "react-icons/fa6";
// import { Notification, UserProfile } from '.';
import PropTypes from 'prop-types'; // Import PropTypes
import { useStateContext } from '../contexts/ContextProvider';
import Tooltip from './Tooltip';
import '../stylesheets/Navbar.css'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

// navigation bar
const NavButton = ({ title, customFunc, icon, dotColour }) => (
  <Tooltip text={title}>
    <button type="button"
      className='navbar-button'
      onClick={() => customFunc()}
    >
      <span style={{ background: dotColour }} className='navbar-dotColour' />
      {icon}
    </button>
  </Tooltip>
);

const Navbar = () => {
  const { activeMenu, setActiveMenu, handleClick, screenSize, setScreenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize])

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  return (
    <div className="navbar-container md-ml-6 md-mr-6e">
      <NavButton title="Menu" customFunc={() => setActiveMenu(!activeMenu)} icon={<AiOutlineMenu />} />
      <div className="navbar-flex">
        {activeMenu && (
          <Tooltip text="Profile">
            <Link to='/profile' className='navbar-profile' onClick={() => handleClick('userProfile')}>
              <FaRegUser className='navbar-profile-image' />
              <MdKeyboardArrowDown className="navbar-profileText" />
            </Link>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

// Define prop types for NavButton
NavButton.propTypes = {
  title: PropTypes.string.isRequired, // Assuming title is required and a string
  customFunc: PropTypes.func.isRequired, // Assuming customFunc is required and a function
  icon: PropTypes.node, // Assuming icon is React node (e.g., an element), not marked as required
  dotColour: PropTypes.string // Assuming dotColour is a string (e.g., for CSS color values), not marked as required
};

export default Navbar