import {useState} from 'react';
import './InvoiceRendering.css';
import Notif from '../components/RenderNotif'
const InvoiceRendering = () => {
  const [file, setFile] = useState('ready');
  const [notif, setNotif] = useState(false);
  async function handleOnSubmit(e) {
    e.preventDefault();
    if (file === 'ready') {
      setNotif(true);
      return;
    }
  }

  function handleOnChange(e) {
    const target = e.target;
    setFile(target.files[0]);
    console.log(file);
  }

  return(
    <div className='render-container'>
      <h1>Render your invoice here</h1>
      <div className='fileBtnDiv'>
        <input type='file' id='file' className='fileBtn' accept='.xml' onChange={handleOnChange}/>
        <label htmlFor='file' className='fileText'>Upload your xml file</label>
      </div>
      <button type='submit' className='submitBtn' onClick={handleOnSubmit}>Submit</button>

    </div>
    
  )
}

export default InvoiceRendering