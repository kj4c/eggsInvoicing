import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/InvoiceInput.css'; // Ensuring the CSS is applied uniformly

// check if the function is a valid email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// get cookie
function getCookie(name) {
    let cookies = document.cookie.split('; ');
    let cookieValue = cookies.find(row => row.startsWith(name + '='));
    return cookieValue ? cookieValue.split('=')[1] : null;
}

// function to send email later by calling the api
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
        type: "", // or "multiplexml"
        from: getCookie('email') || "",
        recipient: "",
        content: [{filename: "", xmlString: ""}], 
        delayInMinutes: 0
    });

    // changing what type of files you wanna send
    const handleOptionChange = () => {
        // Get the select element
        let selectElement = document.getElementById('options');
        const selectValue = selectElement.value;
        setFormData((prevFormData) => ({ ...prevFormData, type: selectValue }));
        alert('Selected type: ' + selectValue);
    };

    // set the form data to be newly inputted data
    const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

    // set the XML to a new XML string if new files are added
    const handleXmlStringChange = (index, event) => {
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0], "UTF-8");
        fileReader.onload = e => {
            const updatedXmlFiles = formData.content.map((file, i) => {
                if (i === index) {
                    return { ...file, filename: event.target.files[0].name, xmlString: e.target.result};
                }
                return file;
            });
            setFormData({...formData, content: updatedXmlFiles});
        };
    };

    // same for json
    const handleJsonStringChange = (index, event) => {
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0], "UTF-8");
        fileReader.onload = e => {
            const updatedJsonFiles = formData.content.map((file, i) => {
                if (i === index) {
                    return { ...file, filename: event.target.files[0].name, jsonString: e.target.result };
                }
                return file;
            });
            setFormData({...formData, content: updatedJsonFiles});
        };
    };

    // const handleFilesChange = (index, event) => {
    //     const newFile = event.target.files[0];
    //     if (newFile) {
    //         const updatedFiles = formData.content.map((file, fileIndex) => {
    //             if (index === fileIndex) {
    //                 return { filename: newFile.name, xmlString: newFile };
    //             }
    //             return file;
    //         });
    //         setFormData({...formData, content: updatedFiles});
    //     }
    // };


    // creates a new input to attach new files
    const addFileInput = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            content: [...prevFormData.content, { filename: "", files: null }]
        }));
    };

    // on submit checks if anything fails and alert the user
    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(formData);
        if (!isValidEmail(formData.recipient)) {
            alert('Please enter a valid email in the "Recipient" section and try again.');
            return;
        } 
        
        if (formData.from === "") {
            alert('Please enter your email in the "From" field.');
            return;
        } 
        
        if (formData.content.some(item => item.filename === "")) {
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
                    processedItem.jsonString = JSON.parse(item.jsonString);
                } catch (error) {
                    alert(`Error parsing JSON for file: ${item.filename}`);
                    throw error; // Prevent form submission
                }
            } else {
                processedItem.xmlString = item.xmlString;
            }
            return processedItem;
        });

        const reqBody = { ...formData, content: processedContent};
        console.log(reqBody);
        sendEmailLater(reqBody);
    };

    // frontend for send email later
    return (
        <div className="inputContainers">
            <button onClick={() => navigate("/invoiceSending")} className="backButton">Back</button>
            <h1 className="header">Schedule Email</h1>
            <form className="formContainer">
                <div className="formGroup">
                    <label>Type:</label>
                    <select name="type" id="options" onChange={handleOptionChange} className="inputBox2">
                        <option value= "" >Select an option</option>
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
                                onChange={(e) => 
                                    formData.type === 'multiplejson' ? 
                                    handleJsonStringChange(index, e) :
                                    handleXmlStringChange(index, e)}
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
