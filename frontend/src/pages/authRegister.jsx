import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from '../components/Footer';
import '../stylesheets/auth.css';
import eggslogo from '../assets/eggs.logo.png';
import picture1 from '../assets/picture1.jpg';
import picture2 from '../assets/picture2.jpg';
import picture3 from '../assets/picture3.jpg';
import picture4 from '../assets/picture4.jpg';
import picture5 from '../assets/picture5.jpg';
import picture6 from '../assets/picture6.jpg';
import picture7 from '../assets/picture7.jpg';
import picture8 from '../assets/picture8.jpg';
import picture9 from '../assets/picture9.jpg';

const images = [
  picture1,
  picture2,
  picture3,
  picture4,
  picture5,
  picture6,
  picture7,
  picture8,
  picture9,
];

function AuthRegister() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentImage, setCurrentImage] = useState(0); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /* Making the slide show */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % images.length);
    }, 3500
    ); 
    
    return () => clearInterval(intervalId); 
  }, []); 

  /* On submit see if it is possible to register by calling backend if not return error.*/
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://invoice-seng2021-24t1-eggs.vercel.app/register', {
        email,
        username,
        password,
        phone: phoneNumber,
      });
      
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration failed:', error);
    }
  };

  const ToLandingPage = () => {
    navigate(`/LandingPage`);
  }

  /* Creating GUI for register page with all relevant inputboxes. */
  return (
    <div>
      <div className="logo-container">
        <img src={eggslogo} alt="Eggs Logo" className="eggs-logo" />
      </div>
      <div className="auth-page-container">
        <div className="slideshow-container">
          <img src={images[currentImage]} alt="Slideshow" className="slideshow-image" />
        </div>
        <div className="registration-form-container">
          <form onSubmit={handleSubmit} className="registration-form">
            <h2 className="title-login">Create Your Eggs Invoicing Account</h2>
            <div>
              <label className='label-regi'>Email:</label>
              <input
                type="email"
                placeholder='email'
                className='inputFields'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className='label-regi'>Username:</label>
              <input
                type="text"
                placeholder='username'
                className='inputFields'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className='label-regi'>
              <label>Password:</label>
              <input
                type="password"
                placeholder='password'
                className='inputFields'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='label-regi'>
              <label>Phone Number:</label>
              <input
                type="tel"
                placeholder='phone number'
                className='inputFields'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <p className="login-error">{error}</p>
            <button type="submit" className="submit-button">Register</button>
            <div className="auth-links">
              <Link to="/login">Already have an account? Click here to log in.</Link>
            </div>
            <button className='fire-landing-page' onClick={ToLandingPage}>Landing Tutorial Page</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AuthRegister;
