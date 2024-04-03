import {useState} from 'react';
import '../stylesheets/InvoiceInput.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function isValidEmail(email) {
	// Simple regex for basic email validation
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

// get the cookie from the page
function getCookie(name) {
    let cookies = document.cookie.split('; ');
    let cookieValue = cookies.find(row => row.startsWith(name + '='));
    return cookieValue ? cookieValue.split('=')[1] : null;
}

// calls our API to send the XML email
function sendEmail(reqBody) {
	axios.post("https://invoice-seng2021-24t1-eggs.vercel.app/send/email", reqBody)
	.then((response) => {
		console.log(response);
	});
}


// Gets all the inputs from the user and stores them into states to be used to send later
const InvoiceInput = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({from: getCookie('email') || "", to: "", attachment: ""});
	const [fileName, setFileName] = useState('No file chosen, yet.');
	const [buttonName, setButtonName] = useState('Upload XML File');

	const handleFileChange = (event) => {
		let newFile = event.target.files[0];
		setFileName(newFile ? newFile.name : 'No file chosen, yet.');
		if (newFile) {
			setButtonName(newFile.name);

			/*Opens the file nd converts to a string*/
			const reader = new FileReader();
			let xmlString;
			reader.readAsText(newFile);
			reader.onload = function(e) {
				xmlString = e.target.result;
				formData.attachment = xmlString;
			};
		}
	};

	// update the formdata on any input change
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	// back button to go back
	const goBack = () => {
        navigate("/invoiceSending");
      };

	  // on submit you check if anything is wrong and alert user otherwise send the email
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
				xmlString: formData.attachment
			}
			sendEmail(reqBody)
			alert('Email successfully sent!');
		}
	};
  
	// frontend design for the inputs
	return (
		<div className = "inputContainers">
			<button onClick={goBack} className="backButton">
                Back
            </button>
            <h1 className="header">Send Email with XML File</h1>
			<p className='description'>1. From: should be your email<br></br>2. Enter the recipients email inside the To (Email) <br></br>3. Lastly upload your XML file from your computer </p>
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
				accept=".xml" onChange={handleFileChange}
			/>
			<button
				className = "fileUpload"
				onClick={() => document.getElementById('fileUpload').click()}
			>
				{buttonName}
      </button>
			<button className="submit" onClick = {handleSubmit}>Submit</button>
		</div>
	)
};
  
export default InvoiceInput;