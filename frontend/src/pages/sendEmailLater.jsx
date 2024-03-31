import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/InvoiceInput.css'; // Assuming the CSS is similarly applicable

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
    axios.post("https://your-backend.com/send/invoiceLater", reqBody)
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
        files: [], // Initially empty
        delayInMinutes: 0
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFilesChange = (event) => {
        const files = Array.from(event.target.files).map(file => ({
            name: file.name,
            content: file // We'll read the content when submitting
        }));
        setFormData({...formData, files});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isValidEmail(formData.recipient)) {
            alert('Please enter a valid email in the "Recipient" section and try again.');
        } else if (formData.from === "") {
            alert('Please enter your email in the "From" field.');
        } else if (formData.files.length === 0) {
            alert('Please attach at least one file.');
        } else if (isNaN(formData.delayInMinutes) || formData.delayInMinutes < 0) {
            alert('Please enter a valid delay in minutes.');
        } else {
            // Prepare files for upload
            const filesPromises = formData.files.map(async file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = e => resolve({ name: file.name, content: e.target.result });
                    reader.onerror = e => reject(e);
                    reader.readAsDataURL(file.content); // or readAsText if you want the raw text
                });
            });
            const filesContents = await Promise.all(filesPromises);
            const reqBody = { ...formData, files: filesContents };

            sendEmailLater(reqBody);
        }
    };

    return (
        <div className="inputContainers">
            <button onClick={() => navigate("/")} className="backButton">Back</button>
            <h1 className="header">Schedule Email</h1>
            <div>
                <label>Type:</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="multiplejson">Multiple JSON</option>
                    <option value="multiplexml">Multiple XML</option>
                </select>
            </div>
            <div>
                <label>From:</label>
                <input type="text" name="from" value={formData.from} onChange={handleChange}/>
            </div>
            <div>
                <label>To (Email):</label>
                <input type="email" name="recipient" value={formData.recipient} onChange={handleChange}/>
            </div>
            <div>
                <label>Attachments:</label>
                <input type="file" multiple onChange={handleFilesChange} accept=".json,.xml"/>
            </div>
            <div>
                <label>Delay (in Minutes):</label>
                <input type="number" name="delayInMinutes" value={formData.delayInMinutes} onChange={handleChange}/>
            </div>
            <button onClick={handleSubmit}>Schedule Send</button>
        </div>
    );
}

export default SendEmailLater;
