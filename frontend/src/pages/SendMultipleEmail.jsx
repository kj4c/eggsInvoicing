import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SendImage from '../assets/send_imagev2.png';
import { GoPlus } from "react-icons/go";

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
}

function getCookie(name) {
    let cookies = document.cookie.split('; ');
    let cookieValue = cookies.find(row => row.startsWith(name + '='));
    return cookieValue ? cookieValue.split('=')[1] : null;
}

function sendEmail(reqBody) {
    axios.post("https://invoice-seng2021-24t1-eggs.vercel.app/send/multEmail", reqBody)
    .then((response) => {
        console.log(response);
        alert('Email successfully sent!');
    });
}

const SendMultipleEmail = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        from: getCookie('email') || "",
        recipients: [],
        files: [{ filename: "", content: "{}", type: "multiplejson" }]
    });

    const handleFileTypeChange = (event) => {
        const newFileType = event.target.value;
        // Update all files to new file type with default content
        const updatedFiles = formData.files.map(file => ({
            ...file,
            content: newFileType === "multiplejson" ? "{}" : "",
            type: newFileType
        }));
        setFormData(prevFormData => ({
            ...prevFormData,
            files: updatedFiles
        }));
    };

    const addFile = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            files: [...prevFormData.files, { filename: "", content: formData.files[0].type === "multiplejson" ? "{}" : "", type: formData.files[0].type }]
        }));
    };

    const handleFileChange = (index, event) => {
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0], "UTF-8");
        fileReader.onload = e => {
            const updatedFiles = formData.files.map((file, i) => {
                if (i === index) {
                    return { ...file, filename: event.target.files[0].name, content: e.target.result };
                }
                return file;
            });
            setFormData({...formData, files: updatedFiles});
        };
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'recipients') {
            const emails = value.split(',').map(email => email.trim());
            setFormData({ ...formData, [name]: emails });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const goBack = () => {
        navigate("/invoiceSending");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const invalidEmails = formData.recipients.filter(email => !isValidEmail(email));
        if (invalidEmails.length > 0) {
            alert('Please check the email addresses for errors and try again.');
        } else if (formData.from === "") {
            alert('Please enter text in the "From" field.');
        } else {
            sendEmail({
                ...formData,
                files: formData.files.map(file => ({
                    filename: file.filename,
                    content: file.content,
                    type: file.type
                }))
            });
        }
    };

    return (
        <div className='splitScreen'>
            <div className="inputContainers">
                <div className='inputWrapper'>
                    <button onClick={goBack} className="backButton">Back</button>
                    <input
                        type="text"
                        className="inputBox"
                        name="recipients"
                        placeholder="Recipients (separate emails with commas)"
                        value={formData.recipients.join(', ')}
                        onChange={handleChange}
                    />
                    <select onChange={handleFileTypeChange} value={formData.files[0].type} className="fileTypeSelector">
                        <option value="multiplejson">JSON</option>
                        <option value="multiplexml">XML</option>
                    </select>
                    <div className="fileWrapper">
                        {formData.files.map((file, index) => (
                            <div key={index} className="attachmentGroup">
                                <input
                                    type="file"
                                    id={`file-upload-${index}`}
                                    className="attachmentFileInput"
                                    onChange={(e) => handleFileChange(index, e)}
                                    accept={file.type === "multiplejson" ? ".json" : ".xml"}
                                    hidden
                                />
                                <label htmlFor={`file-upload-${index}`} className="file-upload-button">{file.filename || 'Upload File'}</label>
                            </div>
                        ))}
                    </div>
                    <button onClick={addFile} type="button" className='plusButton'><GoPlus /></button>
                    <button className="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div className="Image">
                <h1 className="pageTitle">Send Multiple Email</h1>
                <img className="sourceImage" src={SendImage}/>
            </div>
        </div>
    );
};

export default SendMultipleEmail;
