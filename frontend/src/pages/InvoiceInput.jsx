import {useState} from 'react';
import '../stylesheets/InvoiceInput.css';
import axios from 'axios';


function isValidEmail(email) {
	// Simple regex for basic email validation
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

function sendEmail(reqBody) {
	axios.post("https://invoice-seng2021-24t1-eggs.vercel.app/send/email", reqBody)
	.then((response) => {
		console.log(response);
	});
}

const InvoiceInput = () => {
	const [formData, setFormData] = useState({from: "", to: "", attachment: ""});
	const [fileName, setFileName] = useState('No file chosen, yet.');
	const [buttonName, setButtonName] = useState('Upload File');

	const handleFileChange = (event) => {
		let newFile = event.target.files[0];
		setFileName(newFile ? newFile.name : 'No file chosen, yet.');
		if (newFile) {
			setButtonName(newFile.name);

			/*Opens the file and converts to a string*/
			const reader = new FileReader();
			let xmlString;
			reader.readAsText(newFile);
			reader.onload = function(e) {
				xmlString = e.target.result;
				formData.attachment = xmlString;
			};
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};
  
	const handleSubmit = (event) => {
		event.preventDefault();
		/* Checks if the parameters r checked out */
		if (!isValidEmail(formData.to)) {
			alert('Please enter a valid email in the "To" section and try again.')
		} else if (formData.from === "") {
			alert('Please enter text in the "From" field.')
		} else if (fileName === 'No file chosen, yet.') {
			alert('Please upload a file.')
		} else {
			/* Call the function to send the email*/
			const reqBody = {
				from: formData.from,
				recipient: formData.to,
				xmlString: formData.attachment
			}
			sendEmail(reqBody)
			alert('Email successfully sent!');
		}
  };
  
	return (
		<div className = "inputContainers">
			<label className="labels">From:</label>
			<input type="text" className="inputBox" name="from" value={formData.from} onChange={handleChange}/>
			<label className="labels">To:</label>
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