import { useState } from 'react';
import '../stylesheets/InvoiceInput.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SendImage from '../assets/send_imagev2.png';
import { GoPlus } from "react-icons/go";

// checks if the email is valid
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// gets cookie from site
function getCookie(name) {
    let cookies = document.cookie.split('; ');
    let cookieValue = cookies.find(row => row.startsWith(name + '='));
    return cookieValue ? cookieValue.split('=')[1] : null;
}

//sends multiple xml invoices
function sendEmail(reqBody) {
    axios.post("https://invoice-seng2021-24t1-eggs.vercel.app/send/multiInvoice", reqBody)
    .then((response) => {
        console.log(response);
        alert('Email successfully sent!');
    });
}

//  function to send multiple invoices
const InvoiceInputMultiple = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        from: getCookie('email') || "",
        recipient: "",
        xmlFiles: [{ filename: "", xmlString: "" }] // Initially empty XML string
    });

    // adding a new xml file that appends to an exisitng xmlFiles string
    const addXmlFile = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            xmlFiles: [...prevFormData.xmlFiles, { filename: "", xmlString: "" }]
        }));
    };

    //find the index to replace the xml and resets it to a new one
    const handleXmlStringChange = (index, event) => {
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0], "UTF-8");
        fileReader.onload = e => {
            const updatedXmlFiles = formData.xmlFiles.map((file, i) => {
                if (i === index) {
                    return { ...file, filename: event.target.files[0].name, xmlString: e.target.result };
                }
                return file;
            });
            setFormData({...formData, xmlFiles: updatedXmlFiles});
        };
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const goBack = () => {
        navigate("/invoiceSending");
    };

    // checks if the inputs were valid to submit and send the email
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValidEmail(formData.recipient)) {
            alert('Please enter a valid email');
        } else if (formData.from === "") {
            alert('Please enter text in the "From" field.');
        } else {
            console.log(formData);
            sendEmail(formData); // Directly using formData since it already matches the required structure
        }
    };

    // design for the input
    return (
        <div className='splitScreen'>
            <div className='inputContainers'>
                <div className="inputWrapper">
                    <button onClick={goBack} className="backButton">Back</button>
                    <input type="email" className="inputBox" name="recipient" placeholder = "Recipient" value={formData.recipient} onChange={handleChange}/>
                    <div className = "fileWrapper">
                        {formData.xmlFiles.map((file, index) => (
                            <div key={index} className="attachmentGroup">
                                <input
                                    type="file"
                                    id = {`file-upload-${index}`}
                                    className="attachmentFileInput"
                                    onChange={(e) => handleXmlStringChange(index, e)}
                                    accept=".xml"
                                    hidden
                                />
                                <label htmlFor={`file-upload-${index}`} className="file-upload-button">{file.filename || 'Upload File'}</label>
                            </div>
                        ))}
                    </div>
                    <button onClick={addXmlFile} type="button" className='plusButton'><GoPlus /></button>
                    <button className="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div className = "Image">
				<h1 className = "pageTitle">Email XML Invoices</h1>
				<img className = "sourceImage" src = {SendImage}/>
			</div>
        </div>
    );
};

export default InvoiceInputMultiple;
