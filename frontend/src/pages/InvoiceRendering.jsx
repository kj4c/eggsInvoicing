import {useState, useEffect} from 'react';
import '../stylesheets/InvoiceRendering.css';
import Notif from '../components/RenderNotif';

const InvoiceRendering = () => {
  const [file, setFile] = useState('ready');
  const [fileName, setFileName] = useState('');
  const [notif, setNotif] = useState(false);
  async function handleOnSubmit(e) {
    const btn = document.querySelector('.noSubmitBtn');
    btn.classList.add('vibrating');
    setTimeout(() => {
      btn.classList.remove('vibrating');
    }, 300);
    e.preventDefault();
    if (file === 'ready') {
      setTimeout(() => setNotif(true), 250);
      return;
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