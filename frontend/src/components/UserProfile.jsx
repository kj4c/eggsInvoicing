// import React from 'react'
import '../stylesheets/UserProfile.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import picture from '../assets/profile.png';

const UserProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookieExists = document.cookie.includes('cookie='); 

    if (!cookieExists) {
      navigate('/login');
    }
  }, [navigate]);
  
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    phone_no: ''
  });

  async function getUserInfo() {
    const uid = localStorage.getItem('uid');
    try {
      const res = await axios.get('https://invoice-seng2021-24t1-eggs.vercel.app/getUserInfo', {
        params: {
          uid: uid
        }
      });
      setUserDetails({
        username: res.data.username,
        email: res.data.email,
        phone_no: res.data.phone_no
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('uid');
    document.cookie = 'cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/login');
  }

  getUserInfo();

  return (
    <div>
      <p className='heading'>Profile</p>
      <div className='profile-info'>
        <img className='profile-picture' src={picture}/>
        <hr className="solid" />
        <div className='info-containers'>
          <p className='user-name'>Username</p>
          <p className='user-info'>{userDetails.username}</p>
        </div>
        <hr className="solid" />
        <div className='info-containers'>
          <p className='email'>Email</p>
          <p className='user-info'>{userDetails.email}</p>
        </div>
        <hr className="solid" />
        <div className='info-containers'>
          <p className='phone-no'>Phone</p>
          <p className='user-info'>{userDetails.phone_no}</p>
        </div>
        <hr className="solid" />
        <button onClick={handleLogout} className='log-out'>Log Out</button>
      </div>
    </div>
  )
}

export default UserProfile