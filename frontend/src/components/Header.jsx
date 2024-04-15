import { useLocation } from 'react-router-dom';
import '../stylesheets/header.css';
import { GiCosmicEgg } from 'react-icons/gi';

import { navItems } from '../data/navbarData';

export const Header = () => {
  const url = useLocation();

  return (
    <div className='HeaderPos'>
      <div className='HeaderContainer'>
        {/* Logo */}
        <a className='LogoContainer' href='#hero'>
          <div className='Logo'>
            <GiCosmicEgg />
          </div>
          Eggs-Invoice
        </a>

        {/* Dyanmically rendering each item in nav bar */}
        <nav className='navContainer'>
          <div className='navContent'>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className={`navItem ${
                  item.url === url.hash ? `activeItem` : `unActiveItem`
                }`}
              >
                {item.title}
              </a>
            ))}
          </div>
        </nav>

        {/* SignUp and Login button in Navbar */}
        <div className='buttonsContainer'>
          <a href='/' className='signUpButton'>
            SIGN UP
          </a>
          <a href='/' className='loginButton'>
            LOGIN
          </a>
        </div>
      </div>
    </div>
  );
};
