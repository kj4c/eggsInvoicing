import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from '../components/Footer';
import '../stylesheets/auth.css';
import eggslogo from '../assets/eggs.logo.png';
import picture from '../assets/picture1.jpg';
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

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [currentImage, setCurrentImage] = useState(0); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevCurrentImage) => (prevCurrentImage + 1) % images.length);
    }, 3500); 
    
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('Request password reset link for:', email);
      setTimeout(() => {
        navigate('/login');
      }, 3000); 
    } catch (error) {
      setMessage('There was an error sending your password reset link. Please try again.');
      console.error('Error requesting password reset:', error);
    }
  };

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
            <h2 className='title-login'>Reset Your Password</h2>
            <div>
              <label>Email:</label>
              <input
                type="email"
                placeholder='Enter your email'
                className='inputFields'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <p className='login-error'>{message}</p>
            <button type="submit" className='submit-button'>Send Reset Link</button>
            <div className="auth-links">
              <Link to="/login">Back to login</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ForgetPassword;
