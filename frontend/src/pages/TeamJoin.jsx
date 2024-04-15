import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SendImage from '../assets/send_imagev2.png';
import { useEffect } from 'react';
import '../stylesheets/team.css';

function getCookie(name) {
    let cookies = document.cookie.split('; ');
    let cookieValue = cookies.find(row => row.startsWith(name + '='));
    return cookieValue ? cookieValue.split('=')[1] : null;
}

const TeamJoin = () => {
  const [passcode, setPasscode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = getCookie('email');
  const uid = getCookie('uid');

  const handleCreateTeam = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.post('https://invoice-seng2021-24t1-eggs.vercel.app/jointeam', {
        email: email,  
        passcode: passcode
      });
      alert('Team created successfully!');
      navigate('/team'); 
    } catch (error) {
      console.error('Failed to create team:', error);
      alert('Error creating team. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const detail = async () => {
      if (!uid) return;
      try {
        const response = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/teamdetail?uid=${uid}`);
        if (response.data) {
          navigate('/team');
        }
      } catch (err) {
        console.error('User is not in a team:', err);
      }
      setLoading(false);
    }; 
  
    detail();
  }, [uid, navigate]);
  
  const goBack = () => {
    navigate('/');
  }

  return (
    <div className='splitScreen'>
      <div className='inputContainers'>
        <div className='inputWrapper'>
          <h1>Join your team with the passcode!!</h1>
          <form onSubmit={handleCreateTeam} className='team-create-form'>
            <button onClick={goBack} className="backButton">Back</button>

            <div>
              <input
                type='text'
                placeholder='Passcode'
                value={passcode}
                className="team-creation-box"
                onChange={(e) => setPasscode(e.target.value)}
                required
              />
            </div>
            <button type='submit' className='invoice-creation-submit-button' disabled={loading}>
              {loading ? 'Creating...' : 'Create Team'}
            </button>
          </form>
        </div>
      </div>
      <div className = "Image">
        <h1 className = "pageTitle">Join a team</h1>
        <img className = "sourceImage" src = {SendImage}/>
      </div>
      
    </div>
  );
};

export default TeamJoin;
