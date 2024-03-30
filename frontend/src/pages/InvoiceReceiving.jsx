import '../stylesheets/InvoiceReceiving.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceReceiving = () => {
  const [data, setData] = useState(null);
  const [dataFound, setDataFound] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
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

  useEffect(() => {
    async function fetchData() {
      try {
        let response = 
        await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receive/fetchAll?uid=${uid}`,)

        response.data.map((item) => {
          let date = new Date(item.sent_at);
          let hour = date.getHours();
          let min = date.getMinutes();
          item.sent_at = `${hour}:${min}`;
        });
        setData(response.data);
        console.log('hello')
      } catch (error) {
        console.log('error');
      } finally {
        setDataFound(true);
      }
    }

    fetchData();
  }, [uid]); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <div className='searchContainer'>
        <p className = "fetching">Fetch Invoices</p>
        <input type="text" className='inputSearch'/>
        <select className = "options">
          <option value="ID">by Invoice ID</option>
          <option value="Date">by Date</option>
          <option value="DateRange">by Date Range</option>
        </select>
      </div>
      <div className="inboxContainer">
          <p className='header'>Invoice ID</p>
          <p className='header'>Title</p>
          <p className='header'>Sender</p>
          <p className='header'>Type</p>    
          <p className='header'>Date</p>
          {dataFound && data.map((item, index) => (
          <div className={`grid-row ${hoveredRow === index ? 'row-hover' : ''}`} 
             onMouseEnter={() => setHoveredRow(index)} 
             onMouseLeave={() => setHoveredRow(null)} 
             key={index}>
          <p className="grid-item">{item.invoice_id}</p>
          <p className="grid-item">Placeholder</p>
          <p className="grid-item">{item.sender_email}</p>
          <p className="grid-item">{item.type}</p>
          <p className="grid-item">{item.sent_at}</p>
        </div>
      ))}
      </div>
      <div className='buttonContainer'>
        <button className='button1' onClick={generatePDF}>Generate PDF</button>
        <button className='button2'>Generate HTML</button>
      </div>
    </>
  )
}
  
export default InvoiceReceiving