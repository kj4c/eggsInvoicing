import {useState} from 'react';
import './InvoiceRendering.css';

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
      <h1>Render your invoice here</h1>
      <div className='fileBtnDiv'>
        <p1>Upload your file</p1>
        <input type='file' name='file' className='fileBtn' onChange={handleOnChange}/>
      </div>
      <button type='submit' className='submitBtn' onClick={handleOnSubmit}>Submit</button>

    </div>
    
  )
}

export default InvoiceRendering