import {useState} from 'react';
import './InvoiceRendering.css';
import axios from 'axios';

const InvoiceRendering = () => {
  const [file, setFile] = useState('ready');

  async function handleOnSubmit(e) {
    e.preventDefault();
    if (file === 'ready') {
      console.log('where is file');
      return;
    }
  }

  function handleOnChange(e) {
    const target = e.target;
    setFile(target.files[0]);
    console.log(file)
  }

  return(
    <div className='render-container'>
      <h1>Render here</h1>
      <input type='file' name='file' className='fileBtn' onChange={handleOnChange}/>
      <button type='submit' className='submitBtn' onClick={handleOnSubmit}>Submit</button>

    </div>
    
  )
}

export default InvoiceRendering