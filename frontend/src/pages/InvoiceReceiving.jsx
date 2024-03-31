import '../stylesheets/InvoiceReceiving.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';


const InvoiceReceiving = () => {
  const [data, setData] = useState(null);
  const [dataFound, setDataFound] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Fetching Invoices');
  const [fetchOption, setFetchOption] = useState('All')
  const [formData, setFormData] =  useState({ID: "", Date: "", DateFrom: "", DateTo: ""});
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText(prev => {
        if (prev.length >= 0) return 'Fetching Invoices';
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
    if (fetchOption === 'All') {
      try {
        setLoading(true);
        let response = 
        await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receive/fetchAll?uid=${uid}`,);
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
        console.log('hello')
      } catch (error) {
        console.log('error');
      } finally {
        setDataFound(true);
      }
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
    } else if (fetchOption === 'Date') {
      console.log("MEOW");
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
    } else if (fetchOption === 'DateRange') {
      console.log("WOOF");
      try {
        setLoading(true);
        let response = 
        await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receive/fetchByDateRange?uid=${uid}&fromDate=${formData.DateFrom}&toDate=${formData.DateTo}`,);
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
  
  const generatePDF = async () => {
    try {
      const response = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receiveReport?uid=${uid}`);
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

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <div className='searchContainer'>
        <p className = "fetching">Fetch Invoices</p>
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
          <p className='header'>Invoice ID</p>
          <p className='header'>Title</p>
          <p className='header'>Sender</p>
          <p className='header'>Type</p>     
          <p className='header'>Date</p>
          {dataFound && data.map((item, index) => (
          <div className={`grid-row ${hoveredRow === item.invoice_id ? 'row-hover' : ''}`} 
             onMouseEnter={() => setHoveredRow(item.invoice_id)} 
             onMouseLeave={() => setHoveredRow(null)} 
             key={item.invoice_id}
             onClick={() => openXML(item.invoice_id)}>
          <p className="grid-item">{item.invoice_id}</p>
          <p className="grid-item">Invoice: {data.length - index}</p>
          <p className="grid-item">{item.sender_email}</p>
          <p className="grid-item">{item.type}</p>
          <p className="grid-item">{item.sent_at}</p>
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
  
export default InvoiceReceiving;