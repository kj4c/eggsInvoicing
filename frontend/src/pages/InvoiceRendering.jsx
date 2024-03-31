import {useState, useEffect} from 'react';
import '../stylesheets/InvoiceRendering.css';
import Notif from '../components/RenderNotif';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const InvoiceRendering = () => {
  const [file, setFile] = useState('ready');
  const [fileName, setFileName] = useState('');
  const [notif, setNotif] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const cookieExists = document.cookie.includes('cookie='); 

    if (!cookieExists) {
      navigate('/login');
    }
  }, [navigate]);
  
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


  function handleOnChange(e) {
    const target = e.target;
    setFile(target.files[0]);
    setFileName(target.files[0].name);
  }

  useEffect(() => {
    console.log(fileName);
    const formData = new FormData();
    formData.append('file', file);
  }, [file, fileName]);

  return(
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
    
  )
}

export default InvoiceRendering