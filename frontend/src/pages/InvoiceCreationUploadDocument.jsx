import { useRef, useState } from 'react';
import axios from 'axios';
import { MdOutlineFileUpload } from 'react-icons/md';
import { FaRegFileAlt } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';
import '../stylesheets/InvoiceCreationUploadDocument.css';

// Page to upload CSV and JSON to convert into XML file
const InvoiceCreationUploadDocument = () => {
  const inputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('select');

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // For the chosen file
  const onChooseFile = () => {
    inputRef.current.click();
  };

  //Remove all files
  const clearFileInput = () => {
    inputRef.current.value = '';
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadStatus('select');
  };

  // Download the files and save it to your computer
  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // see what type of file to upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (uploadStatus === 'done') {
      clearFileInput();
      return;
    }

    if (selectedFile.type === 'text/csv') {
      handleCSVFile();
    }

    if (selectedFile.type === 'application/json') {
      handleJSONFile();
    }
  };

  // pass the JSON file to the APi that converts JSON TO XML
  const handleJSONFile = async () => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileContent = e.target.result;
        const jsonData = JSON.parse(fileContent);
        setUploadStatus('uploading');

        const res = await axios.post(
          'https://w13a-brownie.vercel.app/v2/api/invoice/create',
          jsonData,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        );
        setUploadStatus('done');
        const xmlInvoice = res.data;
        const filename = selectedFile.name.replace(/\.json$/, '.xml');
        downloadFile(xmlInvoice, filename);
      };
      reader.readAsText(selectedFile);
    } catch (error) {
      setUploadStatus('select');
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  // Pass CSV file to another API that handles CSV to XML conversion and download
  const handleCSVFile = async () => {
    try {
      let res = await axios.post(
        'https://3dj53454nj.execute-api.ap-southeast-2.amazonaws.com/login',
        {
          email: 'eggInvoice@gmail.com',
          password: 'eggInvoice',
        }
      );

      const token = res.data.token;
      setUploadStatus('uploading');
      const formData = new FormData();
      formData.append('file', selectedFile);

      res = await axios.post(
        'https://3dj53454nj.execute-api.ap-southeast-2.amazonaws.com/invoices/v2',
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      setUploadStatus('done');
      const invoiceID = res.data[0];

      const url =
        'https://3dj53454nj.execute-api.ap-southeast-2.amazonaws.com/invoices/v2/' +
        invoiceID;
      res = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const xmlInvoice = res.data;
      const filename = selectedFile.name.replace(/\.csv$/, '.xml');
      downloadFile(xmlInvoice, filename);
    } catch (error) {
      setUploadStatus('select');
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  // GUI CONTAINER FOR THE UPLOADING
  return (
    <div className='ICUD-container'>
      <div className='body-container'>
        <h1 style={{ color: 'blueviolet' }}>
          Create XML invoice with file upload
        </h1>
        <input
          ref={inputRef}
          style={{ display: 'none' }}
          type='file'
          onChange={handleFileInput}
        />

        {!selectedFile && (
          <button className='upload' onClick={onChooseFile}>
            <span style={{ lineHeight: 1 }}>
              <MdOutlineFileUpload className='uploadIcon' />
            </span>
            Upload CSV or JSON File
          </button>
        )}

        {selectedFile && (
          <>
            <div className='file-container'>
              <span className='file-icon'>
                <FaRegFileAlt />
              </span>

              <div className='file-desc'>
                <div style={{ flex: 1 }}>
                  <h6>{selectedFile.name}</h6>
                  <div className='progress-container'>
                    <div
                      className='progress-bar'
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>

                {uploadStatus === 'select' ? (
                  <button onClick={clearFileInput}>
                    <span className='close-icon'>
                      <IoIosClose />
                    </span>
                  </button>
                ) : (
                  <div className='progress-circle'>
                    {uploadStatus === 'uploading' ? (
                      `${uploadProgress}%`
                    ) : uploadStatus === 'done' ? (
                      <span>
                        <FaCheck />
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
            <button className='upload-btn' onClick={handleFileUpload}>
              {uploadStatus === 'select' || uploadStatus === 'uploading'
                ? 'Upload'
                : 'Done'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default InvoiceCreationUploadDocument;
