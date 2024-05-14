// Import statements remain unchanged
import '../stylesheets/UserProfile.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import picture from '../assets/anon.png';

const UserProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookieExists = document.cookie.includes('cookie='); 
    if (!cookieExists) {
      navigate('/login');
    }
  }, [navigate]);

  // State for user details
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    phone_no: ''
  });

  // State to manage editing status
  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    phone_no: false,
  });

  // Utility function to get cookie value
  function getCookie(name) {
    let cookies = document.cookie.split('; ');
    let cookieValue = cookies.find(row => row.startsWith(name + '='));
    return cookieValue ? cookieValue.split('=')[1] : null;
  }

  // Fetch user info from cookies
  useEffect(() => {
    const uid = localStorage.getItem('uid'); // Assuming you're using this somewhere or for future use

    setUserDetails({
      uid: uid, // Including uid in state assuming it might be used later on
      username: getCookie('username'),
      email: getCookie('email'),
      phone_no: getCookie('phone_no')
    });
  }, []);

  // Update individual user detail and cookie
  const handleEditChange = (event, field) => {
    setUserDetails({ ...userDetails, [field]: event.target.value });
  };

  // Toggle edit state
  const toggleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  // Save edits to cookies
  const handleSave = (field) => {
    document.cookie = `${field}=${userDetails[field]}; path=/`;
    toggleEdit(field);
  };

  // Handle logout
  const handleLogout = () => { 
  localStorage.removeItem('uid'); 
  document.cookie = 'cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; 
  document.cookie = 'uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; 
  document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; 
  document.cookie = 'phone_no=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; 
  document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; 
  navigate('/');
  }

  const simulateCtrlA = () => {
    const keyboardEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true, 
      key: "a",
      ctrlKey: true 
    });
  
    document.body.dispatchEvent(keyboardEvent);
  };

  return (
    <div>
      <p className='heading'>Profile</p>
      <div className='profile-info'>
        <img className='profile-picture' src={picture} alt="Profile"/>
        <hr className="solid" />
        {Object.keys(userDetails).map((field) => 
          field !== 'uid' && ( // Assuming you don't want to display UID
            <div key={field} className='info-containers'>
              <p className={`${field}-label`}>{field.replace('_', ' ').toUpperCase()}</p>
              {isEditing[field] ? (
                <div>
                  <input 
                    type="text"
                    value={userDetails[field]}
                    onChange={(e) => handleEditChange(e, field)}
                  />
                  <button onClick={() => handleSave(field)}>Save</button>
                </div>
              ) : (
                <p className='user-info'>{userDetails[field]} <button onClick={() => toggleEdit(field)} className='pencilLogo'><CreateIcon/></button></p>
              )}
              <hr className="solid" />
            </div>
          )
        )}
        <button onClick={simulateCtrlA} className='log-out'>Dark Mode</button>
        <button onClick={handleLogout} className='log-out'>Log Out</button>
      </div>
    </div>
  );
};

export default UserProfile;
