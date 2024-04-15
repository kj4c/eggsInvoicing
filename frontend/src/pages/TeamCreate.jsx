import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SendImage from '../assets/send_imagev2.png';
import '../stylesheets/team.css';

const TeamCreate = () => {
  const [teamName, setTeamName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [teamEmail, setTeamEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateTeam = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        'https://invoice-seng2021-24t1-eggs.vercel.app/createteam',
        {
          name: teamName,
          email: ownerEmail,
          teamEmail: teamEmail,
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

  const goBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className='splitScreen'>
      <div className='inputContainers'>
        <div className='inputWrapper'>
          <form onSubmit={handleCreateTeam} className='team-create-form'>
            <button onClick={goBack} className='backButton'>
              Back
            </button>
            <div>
              <input
                type='text'
                value={teamName}
                className='team-creation-box'
                placeholder='Team Name'
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type='email'
                placeholder='Email'
                value={ownerEmail}
                className='team-creation-box'
                onChange={(e) => setOwnerEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type='email'
                placeholder='Team Email'
                value={teamEmail}
                className='team-creation-box'
                onChange={(e) => setTeamEmail(e.target.value)}
                required
              />
            </div>
            <button
              type='submit'
              className='invoice-creation-submit-button'
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Team'}
            </button>
          </form>
        </div>
      </div>
      <div className='Image'>
        <h1 className='pageTitle'>Create Your Team</h1>
        <img className='sourceImage' src={SendImage} />
      </div>
    </div>
  );
};

export default TeamCreate;
