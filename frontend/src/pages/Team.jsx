import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import '../stylesheets/team.css';
import teamwork from '../assets/teamwork.png'
import teamload from '../assets/team-load.png'
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const Team = () => {
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState('');
  const [members, setMembers] = useState('');
  const [uid, setUid] = useState('');
  const [teamName, setTeamName] = useState('');
  const [passcode, setPasscode] = useState('');
  const [teamEmail, setTeamEmail] = useState('');
  const [copyStatus, setCopyStatus] = useState(false);
  const [loading, setLoading] = useState('Loading');

  const navigate = useNavigate();

  const cookieExists = document.cookie.includes('cookie='); 

  /* Get the cookie of the current user and see if it exists. */
  function getCookie(name) {
    let cookies = document.cookie.split('; ');
    let cookieValue = cookies.find(row => row.startsWith(name + '='));
    return cookieValue ? cookieValue.split('=')[1] : null;
  }

  /* Loading animation */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoading(prev => {
        if (prev.length >= 10) return 'Loading';
        return prev + '.';
      });
    }, 200); 

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
  
  /* If cookie does not exist you go back to login, if it exists find email*/
  useEffect(() => {
    if (!cookieExists) {
      navigate('/login');
    } else {
      let id = document.cookie.split("; ");
      id = id.find(part => part.startsWith("uid=")).split("=")[1];
      setUid(id);
      setEmail(getCookie('email'));
    }
  }, [cookieExists, navigate]);

  const hasFetchedData = useRef(false);
  useEffect(() => {
    const detail = async () => {
      if (!uid) return;
      try {
        const response = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/teamdetail?uid=${uid}`);
        setTeamName(response.data.details.teamName);
        setTeamEmail(response.data.details.teamEmail);
        setPasscode(response.data.details.passcode);
        setMembers(response.data.details.members);
      } catch (err) {
        navigate('/teamcreate');
      }
      setLoad(true);
    }; 
    
    if (uid !== '' && hasFetchedData.current === false) {
      detail();
      hasFetchedData.current = true;
    }
  }, [uid]);

  const onClickInvite = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 1400); 
    navigator.clipboard.writeText(passcode);
  }

  const onClickLeave = () => {
    setLoad(false);
    const leave = async() => {
      console.log(email);
      await axios.delete(`https://invoice-seng2021-24t1-eggs.vercel.app/leaveteam`, {
        headers: {
          'email': email
        }
      });
      navigate('/teamcreate');
    }
    leave();
    
  }

  const goBack = () => {
    navigate("/dashboard");
  };

  return(
    <div className='team-container'>
      {
        load ? (
          <div className='team-page'>
            <div className='team-left'>
              <button onClick={goBack} className="backButton back-button">
                Back
              </button>
              <div className="team-info-container">
                <h1 className="team-info-heading">
                  {teamName}
                </h1>
                <div className="team-email">{teamEmail}</div>
                <div className="team-action">
                  <p className="team-invite" onClick={onClickInvite }>Invite to team</p>
                  <p className="team-leave" onClick={onClickLeave}>Leave team</p>
                  {
                    copyStatus ? (
                      <div className="copied">Passcode copied to clipboard!</div>
                    ): ''
                  }
                </div>
              </div>
              <h3 className='member-heading'>Members</h3> 
              <ul className='member-list'>
                {
                  members.map((x, index) => <li key={index} className='member'>{x}</li>)
                }
              </ul>
              
            </div>
            <div className='team-right'>
              <div className="team-send pageTitle">
                <h3 className="team-send-text" onClick={() => {navigate('/teamsend')}}>Send Invoice</h3>
                <IoArrowForwardCircleOutline className='arrow' size={30}/> 
              </div>
              <div className="team-receive pageTitle">
                <h3 className="team-receive-text" onClick={() => {navigate('/teaminbox')}}>Team Inbox</h3>
                <IoArrowForwardCircleOutline className='arrow' size={30}/> 
              </div>
              <img src={teamwork}  alt="team" className='team-img'/>
            </div>
          </div>
          
        ) : (
          <div className='team-loading'>
            <h1 className='loading-text'>{loading}</h1>
            <img src={teamload}  alt="team" className='load-img'/>
          </div>
        )
      }
    </div>
  )
}

export default Team