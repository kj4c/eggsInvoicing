import {useState} from 'react';
import '../stylesheets/InvoiceInput.css';


function isValidEmail(email) {
	// Simple regex for basic email validation
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

// function readFile(file) {
// 	const fs = require('fs');

// 	try {
// 		const data = fs.readFileSync(file, 'utf8');
// 		console.log('meow', data);
// 	} catch (err) {
// 		console.error('error reading file');
// 	}
// 	FileReader();
// }
const InvoiceInput = () => {
	const [formData, setFormData] = useState({from: "", to: "", text: ""});
	const [fileName, setFileName] = useState('No file chosen, yet.');
	const [file, setFile] = useState();
	const [buttonName, setButtonName] = useState('Upload File');

	const handleFileChange = (event) => {
	  const file = event.target.files[0];
	  setFileName(file ? file.name : 'No file chosen, yet.');
	  if (file) {
		setFile(file);
		setButtonName(file.name);
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
		/*Opens the file and converts to a string*/
		const reader = new FileReader();
		reader.onload = function(e) {
		  const xmlString = e.target.result;
		  console.log("XML as a string:", xmlString);
		};
		reader.readAsText(file);
	  	alert(`From: ${formData.from}, To: ${formData.to}, Text: ${formData.text}, Attachment: ${fileName}`);
	  }
  };
  
	return (
		<div className = "inputContainers">
			<label className="labels">From:</label>
			<input type="text" className="inputBox" name="from" value={formData.from} onChange={handleChange}/>
			<label className="labels">To:</label>
			<input type="email" className="inputBox" name="to" value={formData.to} onChange={handleChange}/>
			<label className="labels">Text:</label>
			<input className="inputBox" name="text" value={formData.text} onChange={handleChange}/>
			<label className="labels">Attachment:</label>
			<input 
				type= "file" 
				id = "fileUpload" 
				hidden = 'hidden' 
				name="file" 
				value={formData.attachment}
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