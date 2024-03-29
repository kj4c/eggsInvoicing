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
        <hr class="solid" />
        <p className='user-name'>Username</p>
        <hr class="solid" />
        <p className='email'>Email</p>
        <hr class="solid" />
        <p className='phone-no'>Phone</p>
        <hr class="solid" />
      </div>
    </div>
  )
}
export default UserProfile