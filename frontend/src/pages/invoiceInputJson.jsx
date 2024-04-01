import { useState } from 'react';
import '../stylesheets/InvoiceInput.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function getCookie(name) {
    let cookies = document.cookie.split('; ');
    let cookieValue = cookies.find(row => row.startsWith(name + '='));
    return cookieValue ? cookieValue.split('=')[1] : null;
}


function sendEmail(reqBody) {
    axios.post("https://invoice-seng2021-24t1-eggs.vercel.app/send/email-json", reqBody)
    .then((response) => {
        console.log(response);
    });
}

const InvoiceInputJSON = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({from: getCookie('email') || "", to: "", attachment: ""});
    const [fileName, setFileName] = useState('No file chosen, yet.');
    const [buttonName, setButtonName] = useState('Upload JSON File');

    const handleFileChange = (event) => {
        let newFile = event.target.files[0];
        setFileName(newFile ? newFile.name : 'No file chosen, yet.');
        if (newFile) {
            setButtonName(newFile.name);

            // Reads the file and converts to a JSON string
            const reader = new FileReader();
            let jsonString;
            reader.readAsText(newFile);
            reader.onload = function(e) {
                jsonString = e.target.result;
                formData.attachment = jsonString;
            };
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const goBack = () => {
        navigate("/invoiceSending");
        };
  
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValidEmail(formData.to)) {
            alert('Please enter a valid email in the "To" section and try again.')
        } else if (formData.from === "") {
            alert('Please enter text in the "From" field.')
        } else if (fileName === 'No file chosen, yet.') {
            alert('Please upload a file.')
        } else {
            const reqBody = {
                from: formData.from,
                recipient: formData.to,
                jsonString: formData.attachment // Changed to jsonString to reflect the content
            }
            sendEmail(reqBody)
            alert('Email successfully sent!');
        }
    };
  
    return (
        <div className = "inputContainers">
            <button onClick={goBack} className="backButton">
                Back
            </button>
            <h1 className="header">Send Email with JSON File</h1>
            <p className='description'>1. From: should be your email<br></br>2. Enter the recipients email inside the To (Email) <br></br>3. Lastly upload your JSON file from your computer </p>
            <label className="labels">From:</label>
            <input type="text" className="inputBox" name="from" value={formData.from} onChange={handleChange}/>
            <label className="labels">To (Email):</label>
            <input type="email" className="inputBox" name="to" value={formData.to} onChange={handleChange}/>
            <label className="labels">Attachment:</label>
            <input 
                type= "file" 
                id = "fileUpload" 
                hidden = 'hidden' 
                name="file" 
                accept=".json" onChange={handleFileChange} // Changed to accept only JSON files
            />
            <button
                className = "fileUpload"
                onClick={() => document.getElementById('fileUpload').click()}
            >
                {buttonName}
            </button>
            <button className="submit" onClick={handleSubmit}>Submit</button>
        </div>
    )
};
  
export default InvoiceInputJSON;
