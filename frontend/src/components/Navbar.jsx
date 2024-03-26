import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaRegUser } from "react-icons/fa6";
import { Notification, UserProfile } from '.';

import { useStateContext } from '../contexts/ContextProvider';
import Tooltip from './Tooltip';
import './Navbar.css'

const NavButton = ({ title, customFunc, icon, dotColour }) => (
  <Tooltip text={title}>
    <button type="button"
      className='navbar-button'
      onClick={() => customFunc()}
    >
      <span style={{ background: dotColour }} className='navbar-dotColour'/>
      {icon}
    </button>
  </Tooltip>
);


const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick } = useStateContext();

  return (
    <div className='navbar-container'>
      <NavButton 
        title="Menu" 
        customFunc={() => setActiveMenu(!activeMenu)} 
        icon={<AiOutlineMenu />} 
      />

      <div className='navbar-flex'>
        {/* <NavButton 
          title="Notification" 
          customFunc={() => handleClick('notification')} 
          dotColor="rgb(254, 201, 15)" 
          icon={<IoIosNotificationsOutline />} 
        /> */}

        <Tooltip text='Profile'>
          <div className='navbar-profile' onClick={() => handleClick('userProfile')}>
            <FaRegUser className='navbar-profile-image'/>
            <MdKeyboardArrowDown className="navbar-profileText" />
          </div>
        </Tooltip>

        {/* {isClicked.notification && (<Notification />)} */}
        {/* {isClicked.userProfile && (<UserProfile />)} */}
      </div>
    </div>
  )
}

export default Navbar