import {useState, useEffect, useRef} from 'react';
import '../stylesheets/InvoiceInput.css';
import '../stylesheets/team.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SendImage from '../assets/send_imagev2.png';
import teamload from '../assets/team-load.png'

function isValidEmail(email) {
	// Simple regex for basic email validation
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}


// calls our API to send the XML email
function sendEmail(reqBody) {
	axios.post("https://invoice-seng2021-24t1-eggs.vercel.app/send/email", reqBody)
	.then((response) => {
		console.log(response);
	});
}


// Gets all the inputs from the user and stores them into states to be used to send later
const TeamSend = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({from: "", to: "", attachment: ""});
	const [fileName, setFileName] = useState('No file chosen, yet.');
	const [buttonName, setButtonName] = useState('Upload XML File');
  const [uid, setUid] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamEmail, setTeamEmail] = useState('');



  const cookieExists = document.cookie.includes('cookie=');

  const [loading, setLoading] = useState('Loading');
  const [load, setLoad] = useState(false);
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

	const handleFileChange = (event) => {
		let newFile = event.target.files[0];
		setFileName(newFile ? newFile.name : 'No file chosen, yet.');
		if (newFile) {
			setButtonName(newFile.name);

			/*Opens the file nd converts to a string*/
			const reader = new FileReader();
			let xmlString;
			reader.readAsText(newFile);
			reader.onload = function(e) {
				xmlString = e.target.result;
				formData.attachment = xmlString;
			};
		}
	};

	// update the formdata on any input change
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	// back button to go back
	const goBack = () => {
    navigate("/team");
  };
	
	// on submit you check if anything is wrong and alert user otherwise send the email
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!isValidEmail(formData.to)) {
			alert('Please enter a valid email and try again.')
		} else if (fileName === 'No file chosen, yet.') {
			alert('Please upload a file.')
		} else {
			const reqBody = {
				from: teamEmail,
				recipient: formData.to,
				xmlString: formData.attachment
			}
      console.log(reqBody);
			sendEmail(reqBody)
			alert('Email successfully sent!');
		}
	};
  
	// frontend design for the inputs
	return (
		<div>
      {
        load ? (
          <div className = "splitScreen">
            <div className = "inputContainers">
              <div className = "inputWrapper">
                <button onClick={goBack} className="backButton back-button">
                  Back
                </button>
                <div className="team-info">
                  <h3 className="team-name-send">
                    Send an invoice for {teamName}
                  </h3>
                  <h3 className="team-email-send">
                    {teamEmail}
                  </h3>
                </div>
                <input type="email" className="team-email-input" placeholder ="Recipient" name="to" value={formData.to} onChange={handleChange}/>
                <input 
                  type= "file" 
                  id = "fileUpload" 
                  hidden = 'hidden' 
                  name="file" 
                  accept=".xml" onChange={handleFileChange}
                />
                <button
                  className = "team-upload"
                  onClick={() => document.getElementById('fileUpload').click()}
                >
                  {buttonName}
                </button>
                <button className="submit" onClick = {handleSubmit}>Submit</button>
              </div>
            </div>
            <div className = "Image">
              <h1 className = "send-page-title">Team email sending</h1>
              <p className="send-discription">Send an invoice on your team&apos;s behalf using your team&apos;s email</p>
              <img className = "sourceImage" src = {SendImage}/>
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
};
  
export default TeamSend;
