import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { links } from '../data/dashboardData.jsx';
import { useStateContext } from '../contexts/ContextProvider';
import Tooltip from './Tooltip';
import '../stylesheets/Sidebar.css';
import { useState } from 'react';

// side bar for the website
const Sidebar = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  const [activeItem, setActiveItem] = useState(null);

  // set the active item to color it
  const handleMenuItemClick = (id) => {
    setActiveItem(id);
  };

  // loops through and adds all the pages needed to the sidebar with the relevant styles
  // makes it so on click it navigates
  return (
    <div className='sidebar-container md-overflow-hidden'>
      {activeMenu && (
        <>
          {/* Homepage Logo Container */}
          <div className='sidebar-listContainer'>
            {/* Homepage Logo */}
            <Link to='/' className='sidebar-title'>
              <FaHome /> <span>EGGS-INVOICE</span>
            </Link>

            {/* Close Menu button */}
            <Tooltip text='Menu'>
              <button
                className='sidebar-closeMenuButton md-hidden'
                type='button'
                onClick={() => setActiveMenu(!activeMenu)}
              >
                <MdOutlineCancel />
              </button>
            </Tooltip>
          </div>

          {/* Sidebar items */}
          <div className='sidebar-mt-10'>
            {links.map((item) => (
              <div key={item.title}>
                <p className='sidebar-listTitles'>{item.title}</p>
                {item.links.map((link) => (
                  <div key={link.id}>
                    {link.path ? (
                      <Link
                        to={link.path}
                        className={
                          activeItem === link.id
                            ? 'sidebar-activeLink'
                            : 'sidebar-normalLink'
                        }
                        onClick={() => handleMenuItemClick(link.id)}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    ) : (
                      <a
                        className={
                          activeItem === link.id
                            ? 'sidebar-activeLink'
                            : 'sidebar-normalLink'
                        }
                        onClick={() => handleMenuItemClick(link.id)}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </a>
                    )}

                    {/* COnditionally render submenus */}
                    {activeItem === link.id &&
                      link.subMenus &&
                      link.subMenus.map((subMenu) => (
                        <NavLink
                          key={subMenu.id}
                          to={`/${subMenu.path}`}
                          className={({ isActive }) =>
                            isActive ? 'subMenu-active' : 'subMenu-normal'
                          }
                          onClick={() => handleMenuItemClick(link.id)}
                        >
                          {subMenu.icon}
                          <span>{subMenu.name}</span>
                        </NavLink>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
