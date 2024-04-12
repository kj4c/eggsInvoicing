import { useLocation } from 'react-router-dom';
import '../stylesheets/header.css';
import { GiCosmicEgg } from 'react-icons/gi';

import { navItems } from '../data/navbarData';

export const Header = () => {
  const url = useLocation();

  return (
    <div className='yeet'>
      <div className='yeet2'>
        <a className='yeet3' href='#hero'>
          <div className='logo'>
            <GiCosmicEgg />
          </div>
          Eggs-Invoice
        </a>

        <nav className='yeet4'>
          <div className='yeet5'>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className={`yeet6 ${item.url === url.hash ? `yeet7` : `yeet8`}`}
              >
                {item.title}
              </a>
            ))}
          </div>
        </nav>

        <div className='buttonsContainer'>
          <a href='/register' className='signUpButton'>
            SIGN UP
          </a>
          <a href='/login' className='loginButton'>
            LOGIN
          </a>
        </div>
      </div>
    </div>
  );
};
