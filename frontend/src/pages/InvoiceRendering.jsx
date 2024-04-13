import {useState, useEffect} from 'react';
import '../stylesheets/InvoiceRendering.css';
import Notif from '../components/RenderNotif';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { yapper} from '../assets/yapper.png';

// page for rendering invoices
const InvoiceRendering = () => {
  const [file, setFile] = useState('ready');
  const [fileName, setFileName] = useState('');
  const [notif, setNotif] = useState(false);

  const navigate = useNavigate();

  //checks if cookie exists
  useEffect(() => {
    const cookieExists = document.cookie.includes('cookie='); 

    if (!cookieExists) {
      navigate('/login');
    }
  }, [navigate]);

  // on submit see if the file is ready, remove the vibarting effect and calls the API to render the invoice
  async function handleOnSubmit(e) {
    e.preventDefault();
    if (file === 'ready') {
      const btn = document.querySelector('.noSubmitBtn');
      btn.classList.add('vibrating');
      setTimeout(() => {
        btn.classList.remove('vibrating');
      }, 300);
      setTimeout(() => setNotif(true), 250);
      return;
    }

    const formData = new FormData();
    formData.append('invoice', file);
    try {
      const res = await axios.post('https://sleeperagents1.alwaysdata.net/renderHTML?language=eng', formData);
      navigate('/invoiceRendered', { state: { res: res.data } });
    } catch (error) {
      console.error('Error:', error);
    } 
  
  }

  // sets the file if the user uploads a new file
  function handleOnChange(e) {
    const target = e.target;
    setFile(target.files[0]);
    setFileName(target.files[0].name);
  }

  // design for the frontend for rendering
  return(
    <div className='splitScreen'>
      <div className='render-container'>
        <h1>Render your invoice here</h1>
        <div className='fileBtnDiv'>
          <input type='file' id='file' className='fileBtn' accept='.xml' onChange={handleOnChange}/>
          <label htmlFor='file' className='fileText'>Upload your xml file here</label>
        </div>
        <p className={file!=='ready' ? 'textUploaded':'textNotUploaded'}>Uploaded file: {fileName}</p>
        <button type='submit' className={file!=='ready' ? 'submitBtn':'noSubmitBtn'} onClick={handleOnSubmit}>Submit</button>
        <Notif trigger={notif} setTrigger={setNotif}></Notif>
      </div>
      <div className='Image'>
        <img className='sourceImage' src={yapper}></img>
      </div>
    </div>
  )
}

export default InvoiceRendering