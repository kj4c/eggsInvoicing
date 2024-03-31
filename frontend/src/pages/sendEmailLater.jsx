import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/InvoiceInput.css'; // Ensuring the CSS is applied uniformly

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function getCookie(name) {
    let cookies = document.cookie.split('; ');
    let cookieValue = cookies.find(row => row.startsWith(name + '='));
    return cookieValue ? cookieValue.split('=')[1] : null;
}

function sendEmailLater(reqBody) {
    axios.post("https://invoice-seng2021-24t1-eggs.vercel.app/send/invoiceLater", reqBody)
    .then((response) => {
        console.log(response);
        alert('Email scheduled to be sent!');
    }).catch((error) => {
        console.error('Error scheduling email:', error);
        alert('Failed to schedule email.');
    });
}

function SendEmailLater() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type: "multiplejson", // or "multiplexml"
        from: getCookie('email') || "",
        recipient: "",
        content: [{filename: "", jsonString: null}], 
        delayInMinutes: 0
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFilesChange = (index, event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            const updatedFiles = formData.files.map((file, fileIndex) => {
                if (index === fileIndex) {
                    return { name: newFile.name, content: newFile };
                }
                return file;
            });
            setFormData({...formData, files: updatedFiles});
        }
    };

    const addFileInput = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            content: [...prevFormData.content, { name: "", content: null }]
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!isValidEmail(formData.recipient)) {
            alert('Please enter a valid email in the "Recipient" section and try again.');
            return;
        } 
        
        if (formData.from === "") {
            alert('Please enter your email in the "From" field.');
            return;
        } 
        
        if (formData.content.some(item => !item.fileString)) {
            alert('Please attach at least one file.');
            return;
        } 
        
        if (isNaN(formData.delayInMinutes) || formData.delayInMinutes < 0) {
            alert('Please enter a valid delay in minutes.');
            return;
        }
    
        // Depending on the type, process the fileString accordingly before sending
        const processedContent = formData.content.map(item => {
            // Assuming you need to send the data as a JSON object
            let processedItem = { filename: item.filename };
            if (formData.type === "multiplejson") {
                // If JSON, parse the string to JSON object (if needed)
                try {
                    processedItem.content = JSON.parse(item.fileString);
                } catch (error) {
                    alert(`Error parsing JSON for file: ${item.filename}`);
                    throw error; // Prevent form submission
                }
            } else if (formData.type === "multiplexml") {
                processedItem.content = item.fileString;
            }
            return processedItem;
        });
    
        const reqBody = { ...formData, content: processedContent };
        sendEmailLater(reqBody);
    };

    return (
        <div className="inputContainers">
            <button onClick={() => navigate("/invoiceSending")} className="backButton">Back</button>
            <h1 className="header">Schedule Email</h1>
            <form className="formContainer">
                <div className="formGroup">
                    <label>Type:</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="inputBox">
                        <option value="multiplejson">Multiple JSON</option>
                        <option value="multiplexml">Multiple XML</option>
                    </select>
                </div>
                <div className="formGroup">
                    <label>From:</label>
                    <input type="text" name="from" value={formData.from} onChange={handleChange} className="inputBox"/>
                </div>
                <div className="formGroup">
                    <label>To (Email):</label>
                    <input type="email" name="recipient" value={formData.recipient} onChange={handleChange} className="inputBox"/>
                </div>
                <div className="formGroup">
                    <label>Delay (in Minutes):</label>
                    <input type="number" name="delayInMinutes" value={formData.delayInMinutes} onChange={handleChange} className="inputBox"/>
                </div>
                <div className="formGroup">
                    <label>Attachments:</label>
                    {formData.content.map((content, index) => (
                        <div key={index} className="attachmentGroup">
                            <input
                                type="file"
                                onChange={(e) => handleFilesChange(index, e)}
                                accept=".json,.xml"
                                className="attachmentFileInput"
                            />
                            <span className="fileNameDisplay">{content.name || 'No file chosen, yet.'}</span>
                        </div>
                    ))}
                    <button type="button" onClick={addFileInput} className="addFileButton">Add Another File</button>
                </div>
                <button type="submit" onClick={handleSubmit} className="submit">Schedule Send</button>
            </form>
        </div>
    );
}

export default SendEmailLater;
