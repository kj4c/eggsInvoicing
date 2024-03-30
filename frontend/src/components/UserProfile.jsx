// import React from 'react'
import '../stylesheets/UserProfile.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    phone: ''
  });

  async function getUserInfo() {
    const uid = localStorage.getItem('uid');
    try {
      // maybe get uses somthign diff??
      const response = await axios.get('https://invoice-seng2021-24t1-eggs.vercel.app/getUserInfo', {
        uid
      });
      setUserDetails({
        username: res.data.username,
        email: res.data.email,
        phone: res.data.phone
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <p className='heading'>Profile</p>
      <div className='profile-info'>
        <img className='profile-picture' />
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
        <Link to="/login" className='log-out'>Log Out</Link>
      </div>

    </div>
  )
}

export default UserProfile