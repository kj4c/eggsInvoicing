import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      await axios.post('https://invoice-seng2021-24t1-eggs.vercel.app/createteam', {
        name: teamName,
        email: ownerEmail,
        teamEmail: teamEmail
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

  return (
    <div className='team-create-container'>
      <h2>Create a New Team</h2>
      <form onSubmit={handleCreateTeam}>
        <div className='form-group'>
          <label>Team Name:</label>
          <input
            type='text'
            value={teamName}
            placeholder='teamname'
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Owner Email:</label>
          <input
            type='email'
            placeholder='email'
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Team Email (for communications):</label>
          <input
            type='email'
            value={teamEmail}
            onChange={(e) => setTeamEmail(e.target.value)}
            required
          />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Creating...' : 'Create Team'}
        </button>
      </form>
    </div>
  );
};

export default TeamCreate;
