import '../stylesheets/InvoiceSending.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// function for the buttons to select which type of sending they want
const InvoiceSending = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookieExists = document.cookie.includes('cookie='); 

    if (!cookieExists) {
      navigate('/login');
    }
  }, [navigate]);

  // based on the button chosen we will navigate to the correct page
  const routeChange = () => { 
    let path = `/invoiceInput`; 
    navigate(path);
  }

  const routeChange2 = () =>{ 
    let path = `/invoiceInputJson`; 
    navigate(path);
  }
  
  const routeChange3 = () => {
    let path = `/invoiceInputMultiple`
    navigate(path);
  }

  const routeChange4 = () => {
    let path = `/invoiceInputMultipleJson`
    navigate(path);
  }

  const routeChange5 = () => {
    let path = `/sendEmailLater`
    navigate(path);
  }

  // FRONTEND design
  return (
    <>
    <div className='options-grid-container'>
      <button className = 'email-options' onClick={routeChange}>Sending Email with XML File</button>
      <button className = 'email-options' onClick={routeChange2}>Sending Email with JSON File</button>
      <button className = 'email-options' onClick={routeChange3}>Sending Email with Multiple XML Files</button>
      <button className = 'email-options' onClick={routeChange4}>Sending Email with Multiple JSON Files</button>
      <button className = 'email-options' onClick={routeChange5}>Sending Email Later</button>
      <button className = 'email-options' onClick={routeChange4}>Sending multiple emails of invoices</button>
    </div>
    </>
  )
}

export default InvoiceSending;

