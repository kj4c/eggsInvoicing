import { useState, useEffect } from 'react';
import '../stylesheets/InvoiceRendering.css';
import Notif from '../components/RenderNotif';
import { useNavigate } from 'react-router-dom';
import pointers from '../assets/pointers_nobg.png';

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

    navigate('/invoiceRendered');
  }

  // sets the file if the user uploads a new file
  function handleOnChange(e) {
    const target = e.target;
    setFile(target.files[0]);
    setFileName(target.files[0].name);
  }

  // navigate back to dashboard
  function goBack() {
    navigate('/dashboard');
  }

  // design for the frontend for rendering
  return (
    <div className='splitScreen'>
      <div className='render-container'>
        <div className='inputWrapper'>
          <button onClick={goBack} className='backButton'>
            Back
          </button>
          <p className='information-text'>
            Invoice rendering converts structured data into easily understood
            text, simplifying financial document interpretation.
          </p>
          <div className='select-button-div2'>
            <input
              type='file'
              id='file'
              className='fileBtn'
              accept='.xml'
              onChange={handleOnChange}
            />
            <label htmlFor='file' className='fileText'>
              Upload XML File
            </label>
          </div>
          <p className={file !== 'ready' ? 'textUploaded' : 'textNotUploaded'}>
            Uploaded file: {fileName}
          </p>
          <button
            type='submit'
            className={file !== 'ready' ? 'submitBtn' : 'noSubmitBtn'}
            onClick={handleOnSubmit}
          >
            Render
          </button>
          <Notif trigger={notif} setTrigger={setNotif}></Notif>
        </div>
      </div>
      <div className='Image'>
        <h1 className='pageTitle'>Rendering</h1>
        <img className='sourceImage' src={pointers}></img>
      </div>
    </div>
  );
};

export default InvoiceRendering;
