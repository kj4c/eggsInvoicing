import '../stylesheets/InvoiceReceiving.css';
import '../stylesheets/team.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';
import teamload from '../assets/team-load.png'
// Making an array for months
const Months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Retrieves all invoices from the database and stores it in an inboxing format
const TeamInbox = () => {
  const [data, setData] = useState(null);
  const [dataFound, setDataFound] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Fetching Invoices');
  const [fetchOption, setFetchOption] = useState('All')
  const [formData, setFormData] =  useState({ID: "", Date: "", DateFrom: "", DateTo: ""});
  const [searchInput, setSearchInput] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const navigate = useNavigate();
  const [preLoading, setPreLoading] = useState('Loading');
  /* Loading animation */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPreLoading(prev => {
        if (prev.length >= 10) return 'Loading';
        return prev + '.';
      });
    }, 200); 

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Checks if the  cookie exists if not you go back
  const cookieExists = document.cookie.includes('cookie='); 
  useEffect(() => {
    if (!cookieExists) {
      navigate('/login');
      return;
    }
  }, [cookieExists, navigate]);

  let uid;
  if (cookieExists) {
    uid = document.cookie.split("; ");
    uid = uid.find(part => part.startsWith("uid=")).split("=")[1];
  }

  const [sent, setSent] = useState(null);
  const [received, setReceived] = useState(null);
  const [receivedTab, setReceivedTab] = useState(true);
  const [sentTab, setSentTab] = useState(false);
  const [teamEmail, setTeamEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [load, setLoad] = useState(false);
  
  const inTeam = async () => {
    if (!uid) return;
    try {
      const response = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/teamdetail?uid=${uid}`);
      setTeamEmail(response.data.details.teamEmail);
      setTeamName(response.data.details.teamName);
      setLoad(true);
    } catch (err) {
      navigate('/teamcreate');
      setLoad(true);
    }
  }; 

  useEffect(() => {
    if (!uid) return;
    inTeam();
  }, [uid]);

  // Loading screen before the invoices load
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText(prev => {
        if (prev.length >= 20) return 'Fetching Invoices';
        return prev + '.';
      });
    }, 200); 

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Function to handle actual search input changes
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // useEffect hook to update formData based on selectedVariable and searchInput
  useEffect(() => {
    // Logic to update formData based on selectedVariable whenever searchInput changes
    // or the selected variable changes
    switch(fetchOption) {
      case "ID":
        setFormData(prev => ({ ...prev, ID: searchInput }));
        break;
      case "Date":
        setFormData(prev => ({ ...prev, Date: searchInput }));
        break;
      case "DateRange": {
        // Your logic for handling date range
        const [from, to] = searchInput.split("-");
        setFormData(prev => ({ ...prev, DateFrom: from, DateTo: to }));
        break;
      }
      default:
        // No default action
    }
    console.log(formData);
  }, [searchInput]); // Dependencies

  async function fetchData() {
    if (receivedTab) {
      try {
        setData([]);
        setLoading(true);
        let response = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receiveinbox?uid=${uid}`);
        response.data.inbox.map((item) => {
          let date = new Date(item.sent_at);
          let hour = date.getHours();
          let month = date.getMonth();
          let day = date.getDate();
          let min = date.getMinutes();
          if (min < 10) {
            item.sent_at = `${Months[month]} ${day} ${hour}:0${min}`;
          } else {
            item.sent_at = `${Months[month]} ${day} ${hour}:${min}`;
          }
        });
        setLoading(false);
        setData(response.data.inbox);
        console.log('hello')
      } catch (error) {
        console.log(error);
      } finally {
        setDataFound(true);
      }
    } else {
      try {
        setData([]);
        setLoading(true);
        let response = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/sentinbox?uid=${uid}`);
        response.data.inbox.map((item) => {
          let date = new Date(item.sent_at);
          let hour = date.getHours();
          let month = date.getMonth();
          let day = date.getDate();
          let min = date.getMinutes();
          if (min < 10) {
            item.sent_at = `${Months[month]} ${day} ${hour}:0${min}`;
          } else {
            item.sent_at = `${Months[month]} ${day} ${hour}:${min}`;
          }
        });
        setLoading(false);
        setData(response.data.inbox);
        console.log('hello')
      } catch (error) {
        console.log(error);
      } finally {
        setDataFound(true);
      }
    }
  }


  const handleCheckedInvoices = (invoiceId, isChecked) => {
    setCheckedItems(prev => ({
      ...prev,
      [invoiceId]: isChecked
    }));
  };

  const deleteSelectedEmails = async () => {
    const checkedIds = Object.entries(checkedItems).filter(([value]) => value).map(([key]) => key);
    try {
      await Promise.all(checkedIds.map(id =>
        axios.delete(`https://invoice-seng2021-24t1-eggs.vercel.app/deleteEmail/${id}`)
      ));
      fetchData();
      setCheckedItems({});
    } catch (error) {
      alert('An error occurred when deleting');
    }
  };

  // on each row clicked, it will download the xml as well as display it on the website
  const openXML = async (invoiceId) => {
    try {
      const response = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receive/fetchByInvoiceId?uid=${uid}&invoiceId=${invoiceId}`, {
        responseType: 'json', // Assuming the server responds with JSON
      });
      
      const fileURL = window.URL.createObjectURL(new Blob([response.data.invoices], { type: 'xml' })); // Explicitly set the MIME type
      /* Creates the hyperlink where the link is the PDF file. */
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'xmlfile.xml');
      document.body.appendChild(fileLink);

      fileLink.click();

      window.open(fileURL, "_blank");
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while opening the file');
    }
  }

  // same thing but to open JSON files and download JSON files
  const openJSON = async (invoiceId) => {
    try {
      const response = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receive/fetchByInvoiceId?uid=${uid}&invoiceId=${invoiceId}`, {
        responseType: 'json', // Assuming the server responds with JSON
      });
      
      const fileURL = window.URL.createObjectURL(new Blob([response.data.invoices], { type: 'json' })); // Explicitly set the MIME type
      /* Creates the hyperlink where the link is the PDF file. */
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'jsonFile.json');
      document.body.appendChild(fileLink);

      fileLink.click();

      window.open(fileURL, "_blank");
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while opening the file');
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    fetchData();
  }, [receivedTab, sentTab]);

  const goBack = () => {
    navigate("/team");
  };

  // design for frontend
  return (
    <div className='team-container'>
      {
        load ? (
          <>
            <button onClick={goBack} className="backButton inbox-back-button">Back</button>
            <h3 className="inbox-title">Team inbox for {teamName} </h3>
            <p className="inbox-email">{teamEmail}</p>
            <div className='top-bar'>
              <p className = {receivedTab ? 'receive-active' : 'receive-inactive'} onClick={() => {setSentTab(false); setReceivedTab(true)}}>Received</p>
              <p className = {receivedTab ? 'sent-inactive' : 'sent-active'} onClick={() => {setSentTab(true); setReceivedTab(false)}}>Sent</p>
              
            </div>
            <div className="inboxContainerTeam">
              <div className='bin-button-container'>
                <button className='bin-button' onClick={deleteSelectedEmails}>
                  <RiDeleteBinLine className='bin-icon' />  
                  <div className="tooltip">Delete</div>
                </button>
              </div>
                <p className='header'>Invoice ID</p>
                <p className='header'>Title</p>
                <p className='header'>{receivedTab ? 'Sender': 'Receiver'}</p>
                <p className='header'>Type</p>     
                <p className='header'>Date</p>
              {dataFound && data.map((item) => (
                <div className="inbox-grid" key={item.invoice_id}>
                  <div className='checkbox-container'>
                    <input type="checkbox" className="checkbox" 
                    onChange={e => handleCheckedInvoices(item.invoice_id, e.target.checked)}
                    checked={checkedItems[item.invoice_id] || false}
                    />
                  </div>
                  <div className={`grid-row ${hoveredRow === item.invoice_id ? 'row-hover' : ''}`} 
                    onMouseEnter={() => setHoveredRow(item.invoice_id)} 
                    onMouseLeave={() => setHoveredRow(null)} 
                    key={item.invoice_id}
                    onClick={() => item.type === 'XML' ? openXML(item.invoice_id) : openJSON(item.invoice_id)}>
                    <p className="grid-item">{item.invoice_id}</p>
                    <p className="grid-item">{item.title}</p>
                    <p className="grid-item">{receivedTab ? item.sender_email : item.receiver_email}</p>
                    <p className="grid-item">{item.type}</p>
                    <p className="grid-item">{item.sent_at}</p>
                  </div>
                </div>
              ))}
              {Loading && <h1 className='loadingScreen'>{loadingText}</h1>}
            </div>
          
          </>
          
        ) : (
          <div className='team-loading'>
            <h1 className='loading-text'>{preLoading}</h1>
            <img src={teamload}  alt="team" className='load-img'/>
          </div>
        )
      }
    </div>
  )
}

export default TeamInbox;
