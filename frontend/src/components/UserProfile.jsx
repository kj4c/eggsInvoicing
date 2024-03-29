// import React from 'react'
import '../stylesheets/UserProfile.css';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

const UserProfile = () => {
  // const [userDetails, setUserDetails] = useState({
  //   username: '',
  //   email: '',
  //   phone: ''
  // });

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     const response = await axios.get()
  //   }
  // })

  return (
    <div>
      <p className='heading'>Profile</p>
      <img className='profile-picture' />
      <div className='profile-info'>
        <hr className="solid" />
        <p className='user-name'>Username</p>
        <hr className="solid" />
        <p className='email'>Email</p>
        <hr className="solid" />
        <p className='phone-no'>Phone</p>
        <hr className="solid" />
      </div>
    </div>
  )
}
export default UserProfile