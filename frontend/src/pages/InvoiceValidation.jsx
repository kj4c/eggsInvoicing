import { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/InvoiceValidation.css'

const InvoiceValidation = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passed, setPassed] = useState('');
  const [failed, setFailed] = useState('');

  function handleOnChange(e) {
    const target = e.target;
    setFile(target.files[0]);
    setFileName(target.files[0].name);
  }

  async function handleOnSubmit(e) {
    if (file !== '') {
      const login = getValidate();
      console.log(login);
      setIsSubmitting(true);
    }
  }

  const formData = new FormData;
  formData.append('file', file);

  async function getValidate() {
    await axios.post('https://invoice-seng2021-24t1-eggs.vercel.app/login', {
      body: {
        "username": "khyejac",
        "password": "password"
      }
    }).then(res => {
      console.log(res.data);
      setIsSubmitting(false);
    }).catch(err => {
      console.log(err.data)
    })
  }

  return (
    <div>
      <h1 className='validation-heading'>Validation</h1>
      <div className='validation-container'>
        <h2>Upload your invoice to be validated here:</h2>
        <p className='valid-text'>Ensure your uploaded invoice is in valid XML format.</p>
        <div className='mid-container'>
          <div className='select-button-div'>
            <input type="file" id='select-file' className='select-file' onChange={handleOnChange} accept='.xml'></input>
            <label htmlFor='select-file' className='select-button'>Select Files to Upload</label>
          </div>
          {file ? <p className='valid-uploaded'>Uploaded: {fileName}</p> : <p className='valid-uploaded'>No File Uploaded.</p>}
          {/* <p className={file !== 'ready' ? 'valid-uploaded' : 'valid-not-uploaded'}>Uploaded: {fileName} </p> */}
          <button className='valid-submit' onClick={handleOnSubmit}>Submit</button>
          {isSubmitting && <p className='validating-load'>Validating...</p>}
          {passed && <p className='valid-result'>Invoice Passed Validation</p>}
          {failed && <p className='valid-result'>Invoice Failed Validation</p>}
          <h2 className='valid-report'>Generate Validation Report</h2>
          <div className='valid-report-container'>
            <button className='valid-type'>HTML</button>
            <button className='valid-type'>PDF</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default InvoiceValidation