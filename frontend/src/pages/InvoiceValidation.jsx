import { useState } from 'react';
import axios from 'axios';
import '../stylesheets/InvoiceValidation.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// function to validate the invoice
const InvoiceValidation = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [passed, setPassed] = useState('');
  const [failed, setFailed] = useState('');
  const [data, setData] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const cookieExists = document.cookie.includes('cookie=');

    if (!cookieExists) {
      navigate('/login');
    }
  }, [navigate]);

  // on submit,  check if the file is xml, read the file given and pass into the api
  async function handleOnSubmit(e) {
    const validExtensions = ['xml'];
    e.preventDefault();
    setError(false);

    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (!validExtensions.includes(fileExtension)) {
        alert('Please upload a valid XML file.');
        e.target.value = null;
        setFile('');
        return;
      }

      setPassed(false);
      setFailed(false);
      setIsSubmitting(true);

      // if there are no errors generate the succesful report
      const reader = new FileReader();
      reader.onload = async function (event) {
        const xmlContent = event.target.result;
        await axios.post('https://sandc.vercel.app/validate', xmlContent, {
          headers: {
            'Content-Type': 'application/xml',
          },
        })
          .then(response => {
            console.log('success:', response.data);
            setData(response.data);
            console.log(response.data.successful);
            if (response.data.successful) {
              setPassed(true);
            } else {
              setFailed(true);
            }
          })
          .catch(error => {
            console.error('error:', error.response.data);
            setError(error.response.data);
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      };
      // see if theres an error, if it's an error generate a error report
      reader.onerror = (error) => {
        console.error('File reading error:', error);
        setError(true);
        setIsSubmitting(false);
      };
      reader.readAsText(file);
    } else {
      console.log('No file selected.');
      setIsSubmitting(false);
    }

  }

  // set the file for the new file attached
  function handleOnChange(e) {
    const target = e.target;
    setFile(target.files[0]);
    setFileName(target.files[0].name);
  }

  // downloads the JSON into the user's computer
  function downloadJson() {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;

    link.download = 'validation-report.json';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }

  // frontend for validation
  return (
    <div className='validation-page'>
      <h1 className='validation-heading'>Validation</h1>
      <div className='validation-container'>
        <h2>Upload your invoice to be validated here:</h2>
        <p className='valid-text'>Ensure your uploaded invoice is in valid XML format.</p>
        <div className='mid-container'>
          <div className='select-button-div'>
            <input type="file" id='file' className='select-file' onChange={handleOnChange} accept='.xml'></input>
            <label htmlFor='file' className='select-button'>Select Files to Upload</label>
          </div>
          {file ? <p className='valid-uploaded'>Uploaded: {fileName}</p> : <p className='valid-uploaded'>No File Uploaded.</p>}
          <button className='valid-submit' onClick={handleOnSubmit}>Submit</button>
          {isSubmitting && <p className='validating-load'>Validating...</p>}
          {error && <p className='validating-error'>Validating Error: {error}</p>}
          {passed && <h2 className='valid-result'>Invoice Passed Validation!</h2>}
          {failed && <p className='valid-result'>Invoice Failed Validation</p>}
          {(passed || failed) &&
            <div className='report-container'>
              <div className='validation-report'>
                <h2 className='report-title'>Validation Report</h2>
                <p className='index-container'>
                  <span className='report-index'>Format: </span>
                  {data.format}
                </p>
                <p className='index-container'>
                  <span className='report-index'>Issue Date: </span>
                  {data["issueDate (YYYY-MM-DD)"]}
                </p>
                <p className='index-container'>
                  <span className='report-index'>Successful: </span>
                  {data.successful ? 'Yes' : 'No'}
                </p>
                <p className='index-container'>
                  <span className='report-index'>Summary: </span>
                  {data.summary}
                </p>
                <p className='index-container'>
                  <span className='report-index'>Total Error Count: </span>
                  {data.totalErrorCount}
                </p>
                <hr className='solid'></hr>
                <h2 className='report-results'>Results</h2>
                <div>
                  {Object.entries(data.results).map(([key, result]) => (
                    <div key={key}>
                      <h3>{key}</h3>
                      <p ><span className='report-index'>Successful: </span> {result.successful ? 'Yes' : 'No'}</p>
                      <p>{result.summary}</p>
                      {result.errorCodes.length > 0 && (
                        <>
                          <h4>Error Codes</h4>
                          <ul>
                            {result.errorCodes.map((code, index) => (
                              <li key={index}>{code}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {result.errors.length > 0 && (
                        <>
                          <h4>Errors</h4>
                          {result.errors.map((error, index) => (
                            <div key={index}>
                              <p><span className='error-index'>Error ID:</span> {error.id}</p>
                              <p><span className='error-index'>Breached Rule:</span> {error.breached_rule}</p>
                              <p className='error-location'>
                                <span className='error-index'>Location: </span>
                                <ul>
                                  <pre><code>{error.location}</code></pre>
                                </ul>
                              </p>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <button className='report-download' onClick={downloadJson}>Download JSON Report</button>
            </div>
          }
        </div>
      </div>
    </div>

  )
}

export default InvoiceValidation