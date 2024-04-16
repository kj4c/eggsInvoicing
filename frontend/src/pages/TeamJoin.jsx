import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import JoinImage from '../assets/teams.png';
import { useEffect } from 'react';
import '../stylesheets/team.css';
import teamload from '../assets/team-load.png';

function getCookie(name) {
  let cookies = document.cookie.split('; ');
  let cookieValue = cookies.find((row) => row.startsWith(name + '='));
  return cookieValue ? cookieValue.split('=')[1] : null;
}

const TeamJoin = () => {
  const [passcode, setPasscode] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const email = getCookie('email');
  const uid = getCookie('uid');
  const [loadingText, setLoadingText] = useState('Loading');

  const handleCreateTeam = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        'https://invoice-seng2021-24t1-eggs.vercel.app/jointeam',
        {
          email: email,
          passcode: passcode,
        }
      );
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
        const response = await axios.get(
          `https://invoice-seng2021-24t1-eggs.vercel.app/teamdetail?uid=${uid}`
        );
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
    navigate('/dashboard');
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText((prev) => {
        if (prev.length >= 10) return 'Loading';
        return prev + '.';
      });
    }, 200);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      {
        loading ? (
          <div className='team-loading'>
            <h1 className='loading-text'>{loadingText}</h1>
            <img src={teamload}  alt="team" className='load-img'/>
          </div>
        ) : (
          <div className='splitScreen'>
            <div className='inputContainers'>
              <div className='inputWrapper'>
                <form onSubmit={handleCreateTeam} className='team-create-form'>
                  <button onClick={goBack} className="backButton">Back</button>
                  <h1 className='join-text'>Join your team with the passcode!!</h1>
                  <div className='input-div'>
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
                    Join team
                  </button>
                </form>
              </div>
            </div>
            <div className = "Image">
              <h1 className = "pageTitle">Join a team</h1>
              <img className = "sourceImage" src = {JoinImage}/>
            </div>
          </div>
      )}
    </div>
  );
};

export default TeamJoin;
