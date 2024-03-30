// import React from 'react'
import '../stylesheets/UserProfile.css';
import { useState } from 'react';
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
  
  function getCookie(name) {
    let cookies = document.cookie.split('; ');
    let cookieValue = cookies.find(row => row.startsWith(name + '='));
    return cookieValue ? cookieValue.split('=')[1] : null;
  }

  async function getUserInfo() {
    const uid = localStorage.getItem('uid');

    setUserDetails({
      uid: uid,
      username: getCookie('username'),
      email: getCookie('email'),
      phone_no: getCookie('phone_no')
    });
  }

  useEffect(() => {
    getUserInfo();
  },);
    
  const handleLogout = () => {
    localStorage.removeItem('uid');
    document.cookie = 'cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'phone_no=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/login');
  }

  

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

export default UserProfile;