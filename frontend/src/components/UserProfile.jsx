// import React from 'react'
import '../stylesheets/UserProfile.css';

const UserProfile = () => {
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