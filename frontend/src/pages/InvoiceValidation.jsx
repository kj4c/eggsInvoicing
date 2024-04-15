import { useState } from 'react';
import axios from 'axios';
import '../stylesheets/InvoiceValidation.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import staunch from '../assets/staunch_nobg.png';

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
        await axios
          .post('https://sandc.vercel.app/validate', xmlContent, {
            headers: {
              'Content-Type': 'application/xml',
            },
          })
          .then((response) => {
            console.log('success:', response.data);
            setData(response.data);
            console.log(response.data.successful);
            if (response.data.successful) {
              setPassed(true);
            } else {
              setFailed(true);
            }
          })
          .catch((error) => {
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

  // navigate back to dashboard
  function goBack() {
    navigate('/dashboard');
  }

  // Function to navigate and pass data
  const goToReportPage = () => {
    navigate('/validationReport', { state: data });
  };

  // frontend for validation
  return (
    <div className='splitScreen'>
      <div className='validation-page'>
        <div className='mid-container'>
          <button onClick={goBack} className='backButton'>
            Back
          </button>
          <div className='select-button-div'>
            <input
              type='file'
              id='file'
              className='select-file'
              onChange={handleOnChange}
              accept='.xml'
            ></input>
            <label htmlFor='file' className='select-button'>
              Upload File
            </label>
          </div>
          {file ? (
            <p className='valid-uploaded'>Uploaded: {fileName}</p>
          ) : (
            <p className='valid-uploaded'>No File Uploaded.</p>
          )}
          <button className='submit' onClick={handleOnSubmit}>
            Submit
          </button>
          {isSubmitting && <p className='validating-load'>Validating...</p>}
          {error && (
            <p className='validating-error'>Validating Error: {error}</p>
          )}
          {passed && (
            <h2 className='valid-result'>Invoice Passed Validation!</h2>
          )}
          {failed && <p className='valid-result'>Invoice Failed Validation</p>}
          {/* to open new page */}
          {(passed || failed) && goToReportPage()}
        </div>
      </div>
      <div className='Image'>
        <h1 className='pageTitle'>Validation</h1>
        <img className='sourceImage' src={staunch}></img>
      </div>
    </div>
  );
};

export default InvoiceValidation;
