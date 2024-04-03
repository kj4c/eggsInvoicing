import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import '../stylesheets/auth.css';
import picture from '../assets/picture1.jpg';
import eggslogo from '../assets/eggs.logo.png';
import picture2 from '../assets/picture2.jpg';
import picture3 from '../assets/picture3.jpg';
import picture4 from '../assets/picture4.jpg';
import picture5 from '../assets/picture5.jpg';
import picture6 from '../assets/picture6.jpg';
import picture7 from '../assets/picture7.jpg';
import picture8 from '../assets/picture8.jpg';
import picture9 from '../assets/picture9.jpg';

const images = [
  picture,
  picture2,
  picture3,
  picture4,
  picture5,
  picture6,
  picture7,
  picture8,
  picture9,
];

function AuthLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentImage, setCurrentImage] = useState(7); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % images.length);
    }, 3500
    ); 
    
    return () => clearInterval(intervalId); 
  }, []); 

  /* Generates a random string */
  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  /* Once submit button is clicked try to login, if it doesn't work prompt error message*/
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://invoice-seng2021-24t1-eggs.vercel.app/login', {
        username,
        password,
      });
      
      const userInfo = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/getUserInfo?uid=${response.data.uid}`);

      const cookie = generateRandomString(10);
      document.cookie = `cookie=${cookie}; path=/`;
      document.cookie = `uid=${response.data.uid}; path=/`;
      
      localStorage.setItem('uid', response.data.uid);
      localStorage.setItem('email', userInfo.data.email);
      localStorage.setItem('username', userInfo.data.username);
      localStorage.setItem('phone_no', userInfo.data.phone_no);

      document.cookie = `email=${userInfo.data.email}; path=/`;
      document.cookie = `username=${userInfo.data.username}; path=/`;
      document.cookie = `phone_no=${userInfo.data.phone_no}; path=/`;

      console.log('Login successful:', response.data);

      navigate(`/`);
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.')
      console.error('Login failed:', error);
    }
  };

  /* Creating the GUI for Login with Slideshows. */
  return (
    <div>
      <div className="logo-container">
          <img src={eggslogo} alt="Eggs Logo" className="eggs-logo" />
      </div>
      <div className="auth-page-container">
        <div className="slideshow-container">
          <img src={images[currentImage]} alt="Slideshow" className="slideshow-image" />
        </div>
        <div className='login-form-container'> 
          <form onSubmit={handleSubmit} className='login-form'>
            <h2 className='title-login'>Eggs Invoicing Login</h2>
            <div>
              <label>Username:</label>
              <input
                type="text" // Use type="text" for username field
                placeholder='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className='inputFields'
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='inputFields'
              />
            </div>
            <p className='login-error'>{error}</p>
            <button type="submit" className='submit-button'>Login</button>
            <div className="auth-links">
              <Link to="/register">New here? Click here to create your account.</Link>
              <Link to="/reset-password">Forget password? Click here to reset your password.</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AuthLogin;
