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

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     const response = await axios.get()
  //   }
  // })
  async function getUserInfo() {
    axios.post()
  }

  return (
    <div>
      <p className='heading'>Profile</p>
      <div className='profile-info'>
        <img className='profile-picture' />
        <hr className="solid" />
        <p className='user-name'>Username</p>
        <hr className="solid" />
        <p className='email'>Email</p>
        <hr className="solid" />
        <p className='phone-no'>Phone</p>
        <hr className="solid" />
        <a href=""></a>
        <button className='log-out'>Log Out</button>
      </div>

    </div>
  )
}

export default UserProfile