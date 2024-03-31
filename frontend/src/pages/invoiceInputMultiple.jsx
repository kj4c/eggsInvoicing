import { useState } from 'react';
import '../stylesheets/InvoiceInput.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function sendEmail(reqBody) {
    axios.post("https://invoice-seng2021-24t1-eggs.vercel.app/send/multiInvoice", reqBody)
    .then((response) => {
        console.log(response);
        alert('Email successfully sent!');
    });
}

const InvoiceInputMultiple = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        from: "",
        recipient: "",
        xmlFiles: [{ filename: "", xmlString: "" }] // Initially empty XML string
    });

    const addXmlFile = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            xmlFiles: [...prevFormData.xmlFiles, { filename: "", xmlString: "" }]
        }));
    };

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
        <div className="inputContainers">
            <button onClick={goBack} className="backButton">Back</button>
            <h1 className="header">Send Email with Multiple XML Attachments</h1>
            <p className='description'>
                1. From: should be your email<br />
                2. Enter the recipient&apos;s email inside the To (Email)<br />
                3. Upload your XML files from your computer. <br />
                4. Click add another Attachment if you need.
            </p>
            <label className="labels">From:</label>
            <input type="text" className="inputBox" name="from" value={formData.from} onChange={handleChange}/>
            <label className="labels">To (Email):</label>
            <input type="email" className="inputBox" name="recipient" value={formData.recipient} onChange={handleChange}/>
            {formData.xmlFiles.map((file, index) => (
                <div key={index} className="attachmentGroup">
                    <input
                        type="file"
                        className="attachmentFileInput"
                        onChange={(e) => handleXmlStringChange(index, e)}
                        accept=".xml"
                    />
                    <span className="fileNameDisplay">{file.filename || 'No file chosen, yet.'}</span>
                </div>
            ))}
            <button onClick={addXmlFile} type="button">Add Another XML File</button>
            <button className="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default InvoiceInputMultiple;