// import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { links } from '../data/dashboardData.jsx';
import { useStateContext } from '../contexts/ContextProvider';

import Tooltip from './Tooltip';
import '../stylesheets/Sidebar.css'

const Sidebar = () => {
  const { activeMenu, setActiveMenu } = useStateContext();

  return (
    <div className='sidebar-container md-overflow-hidden'>
      {activeMenu && (
        <> 
          <div className='sidebar-listContainer'>
            <Link to="/" className='sidebar-title' onClick={() => setActiveMenu(false)}>
              <FaHome /> <span>HOMEPAGE</span>
            </Link>
            <Tooltip text='Menu'>
              <button 
                className='sidebar-closeMenuButton md-hidden'
                type="button" 
                onClick={() => setActiveMenu(!activeMenu)} 
              >
                <MdOutlineCancel />
              </button>
            </Tooltip>
          </div>
          
          <div className='sidebar-mt-10'>
          {links.map((item) => (
            <div key={item.title}>
              <p className="sidebar-listTitles">
                  {item.title}
              </p>
              {item.links.map((link) => (
                <NavLink
                  to={`/${link.path}`}
                  key={link.path}
                  onClick={() => {}}
                  className={({ isActive }) => (isActive ? 'sidebar-activeLink' : 'sidebar-normalLink')}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </div>
          ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Sidebar