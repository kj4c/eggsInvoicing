import { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/InvoiceValidation.css'


// eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTE2OTI2NDMsImV4cCI6MTcxMTc3OTA0M30.UhmsU2VY9fa7gSDU8-haZGDF9PbMz70vQthhnuF-s9OMpm1OPwkaFIicE7OMcJeOWncgAsP6ytedFjPeWE58mA

const InvoiceValidation = () => {
  const [file, setFile] = useState(null);
  const handleOnChange = (event) => {
    const files = event.target.files;
    console.log(files);
  };

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
          <button className='valid-submit'>Submit</button>
          <p className='validating-load'>Validating...</p>
          <p className='valid-result'>Invoice Passed Validation</p>
          <p className='valid-report'>Generate Validation Report</p>
          <div className='valid-report-container'>
            <button className='valid-html'>HTML</button>
            <button className='valid-pdf'>PDF</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default InvoiceValidation