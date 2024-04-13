import '../stylesheets/InvoiceReceiving.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBinLine } from "react-icons/ri";
import SearchIcon from '@mui/icons-material/Search';

// Making an array for months
const Months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Retrieves all invoices from the database and stores it in an inboxing format
const InvoicesSent = () => {
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

  // Checks if the  cookie exists if not you go back
  const cookieExists = document.cookie.includes('cookie='); 
  useEffect(() => {
    if (!cookieExists) {
      navigate('/login');
      return;
    }
  }, [cookieExists, navigate]);

  let uid;
  let email;
  if (cookieExists) {
    uid = document.cookie.split("; ");
    uid = uid.find(part => part.startsWith("uid=")).split("=")[1];
    email = document.cookie.split("; ");
    email = email.find(part => part.startsWith("email=")).split("=")[1];
  }

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
    // if its all then call for FetchAll
    if (fetchOption === 'All') {
      try {
        setLoading(true);
        let response = 
        await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receive/fetchAllSent?email=${email}`,);
        response.data.reverse().map((item) => {
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
        response.data = response.data.sort((a, b) => a.invoice_id - b.invoice_id);
        response.data = response.data.reverse();
        setLoading(false);
        setData(response.data);
        console.log('hello')
      } catch (error) {
        console.log('error');
      } finally {
        setDataFound(true);
      }
      // If fetchoption is ID then you find the specific invoiceId
    } else if (fetchOption === 'ID') {
      console.log("YO");
      try {
        setLoading(true);
        let response = 
        await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receive/fetchByInvoiceId?uid=${uid}&invoiceId=${formData.ID}`,);
        let item = response.data;
        let date = new Date(item.sent_at);
        let actualDate = date.toLocaleDateString('en-GB');
        let hour = date.getHours();
        let min = date.getMinutes();
        if (min < 10) {
          item.sent_at = `${actualDate} ${hour}:0${min}`;
        } else {
          item.sent_at = `${actualDate} ${hour}:${min}`;
        }
        let array = [];
        array[0] = item;
        setData(array);
        setLoading(false);
      } catch (error) {
        alert('No Invoice found matching that ID');
        setLoading(false);
      } finally {
        setDataFound(true);
      }
      // if its date then you call API to find all invoices in the matching date
    } else if (fetchOption === 'Date') {
      try {
        setLoading(true);
        let response = 
        await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receive/fetchByDate?uid=${uid}&date=${formData.Date}`,);
        response.data.reverse().map((item) => {
          let date = new Date(item.sent_at);
          let actualDate = date.toLocaleDateString('en-GB');
          let hour = date.getHours();
          let min = date.getMinutes();
          if (min < 10) {
            item.sent_at = `${actualDate} ${hour}:0${min}`;
          } else {
            item.sent_at = `${actualDate} ${hour}:${min}`;
          }
        });
        setLoading(false);
        setData(response.data);
      } catch (error) {
        alert('No Invoice found matching given Date');
        setLoading(false);
      } finally {
        setDataFound(true);
      }
      // calls api to find the invoice matching the given date range.
    } else if (fetchOption === 'DateRange') {
      try {
        setLoading(true);
        let response = 
        await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receive/fetchByDateRange/v2?uid=${uid}&fromDate=${formData.DateFrom}&toDate=${formData.DateTo}`,);
        response.data.reverse().map((item) => {
          let date = new Date(item.sent_at);
          let actualDate = date.toLocaleDateString('en-GB');
          let hour = date.getHours();
          let min = date.getMinutes();
          if (min < 10) {
            item.sent_at = `${actualDate} ${hour}:0${min}`;
          } else {
            item.sent_at = `${actualDate} ${hour}:${min}`;
          }
        });
        setLoading(false);
        setData(response.data);
      } catch (error) {
        alert('No Invoice found matching that Date Range');
        setLoading(false);
      } finally {
        setDataFound(true);
      }
    }
  }

  const handleSelectChange = () => {
    // Get the select element
    const selectValue = document.getElementById('options').value;
    setFetchOption(selectValue);
  };

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
  }

  // function to call API to generate the PDF which allows users to download and view it.
  const generatePDF = async () => {
    try {
      const response = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/sentReport?uid=${uid}`);
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));

      /* Creates the hyperlink where the link is the PDF file. */
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'communication_report_received.pdf');
      document.body.appendChild(fileLink);

      fileLink.click();
      fileLink.remove(); // Clean up after initiating the download
    } catch (error) {
      console.error('Download error:', error);
      alert('An error occurred while downloading the report');
    }
  };

  //function to generate HTML which allows users to download the HTML file and display it
  const generateHTML = async () => {
    try {
      const response = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receiveHtml?uid=${uid}`);
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));

      /* Creates the hyperlink where the link is the PDF file. */
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'htmlreport.txt');
      document.body.appendChild(fileLink);

      fileLink.click();
      fileLink.remove(); // Clean up after initiating the download
      navigate('/htmlRendering', { state: { res: response.data } });
    } catch (error) {
      console.error('Download error:', error);
      alert('An error occurred while downloading the file');
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

  // design for frontend
  return (
    <>
      <div className='searchContainer'>
        <p className = "fetching">Sent Invoices</p>
        <button className='search'><SearchIcon style={{color: 'white'}} onClick = {fetchData}/></button>
        <input type="text" className='inputSearch' placeholder='Fetch' onChange = {handleSearchChange}/>
        <select id = "options" className = "options" placeholder='Options' onChange={handleSelectChange}>
          <option value="All">Display all</option>
          <option value="ID">by Invoice ID</option>
          <option value="Date">by Date (DD/MM/YYYY)</option>
          <option value="DateRange">by Date Range (DD/MM/YYYY-DD/MM/YYYY)</option>
        </select>
      </div>
      <div className="inboxContainer">
        <div className='bin-button-container'>
          <button className='bin-button' onClick={deleteSelectedEmails}>
            <RiDeleteBinLine className='bin-icon' />  
            <div className="tooltip">Delete</div>
          </button>
        </div>
          <p className='header'>Invoice ID</p>
          <p className='header'>Title</p>
          <p className='header'>Receiver</p>
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
              <p className="grid-item">{item.receiver_email}</p>
              <p className="grid-item">{item.type}</p>
              <p className="grid-item">{item.sent_at}</p>
            </div>
        </div>
        ))}
        {Loading && <h1 className='loadingScreen'>{loadingText}</h1>}
      </div>
      <div className='buttonContainer'>
        <button className='button1' onClick={generatePDF}>Generate PDF</button>
        <button className='button2' onClick={generateHTML}>Generate HTML</button>
      </div>
    </>
  )
}
  
export default InvoicesSent;