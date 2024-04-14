import { useState } from 'react';
import '../stylesheets/InvoiceInput.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SendImage from '../assets/send_imagev2.png';
import { GoPlus } from "react-icons/go";

/* SAME THING AS INVOICEMULTIPLE BUT FOR JSON THIS TIME */
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
    axios.post("https://invoice-seng2021-24t1-eggs.vercel.app/send/multiInvoice-json", reqBody)
    .then((response) => {
        console.log(response);
        alert('Email successfully sent!');
    });
}

const InvoiceInputMultipleJson = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        from: getCookie('email') || "",
        recipient: "",
        jsonFiles: [{ filename: "", jsonString: "{}" }] // Initialized jsonString with an empty object
    });

    const addJsonFile = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            jsonFiles: [...prevFormData.jsonFiles, { filename: "", jsonString: "{}" }]
        }));
    };

    const handleJsonStringChange = (index, event) => {
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0], "UTF-8");
        fileReader.onload = e => {
            const updatedJsonFiles = formData.jsonFiles.map((file, i) => {
                if (i === index) {
                    return { ...file, filename: event.target.files[0].name, jsonString: e.target.result };
                }
                return file;
            });
            setFormData({...formData, jsonFiles: updatedJsonFiles});
        };
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const goBack = () => {
        navigate("/invoiceSending");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValidEmail(formData.recipient)) {
            alert('Please enter a valid email in the "To" section and try again.');
        } else if (formData.from === "") {
            alert('Please enter text in the "From" field.');
        } else {
            sendEmail(formData); // Directly using formData since it already matches the required structure
        }
    };

    return (
        <div className='splitScreen'>
            <div className="inputContainers">
                <div className='inputWrapper'>
                    <button onClick={goBack} className="backButton">Back</button>
                    <input type="email" className="inputBox" name="recipient" placeholder = "Recipient" value={formData.recipient} onChange={handleChange}/>
                    <div className = "fileWrapper">
                        {formData.jsonFiles.map((file, index) => (
                            <div key={index} className="attachmentGroup">
                                <input
                                    type="file"
                                    id = {`file-upload-${index}`}
                                    className="attachmentFileInput"
                                    onChange={(e) => handleJsonStringChange(index, e)}
                                    accept=".json"
                                    hidden
                                />
                                <label htmlFor={`file-upload-${index}`} className="file-upload-button">{file.filename || 'Upload File'}</label>
                            </div>
                        ))}
                        <button onClick={addJsonFile} type="button" className='plusButton'><GoPlus /></button>
                    </div>
                    <button className="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div className = "Image">
				<h1 className = "pageTitle">Email JSON Invoices</h1>
				<img className = "sourceImage" src = {SendImage}/>
			</div>
        </div>
    );
};

export default InvoiceInputMultipleJson;
