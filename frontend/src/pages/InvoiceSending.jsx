import '../stylesheets/InvoiceSending.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

const InvoiceSending = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookieExists = document.cookie.includes('cookie='); 

    if (!cookieExists) {
      navigate('/login');
    }
  }, [navigate]);

  const routeChange = () =>{ 
    let path = `/invoiceInput`; 
    navigate(path);
  }

  return (
    <>
    <div className='options-grid-container'>
      <button className = 'email-options' onClick={routeChange}>Sending Email with XML File</button>
      <button className = 'email-options'>Sending Email with JSON File</button>
      <button className = 'email-options'>Sending Email with Multiple XML Files</button>
      <button className = 'email-options'>Sending Email with Multiple JSON Files</button>
    </div>
    </>
  )
}

export default InvoiceSending;