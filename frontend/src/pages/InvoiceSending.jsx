import '../stylesheets/InvoiceSending.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const InvoiceSending = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookieExists = document.cookie.includes('cookie='); 

    if (!cookieExists) {
      navigate('/login');
    }
  }, [navigate]);

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

  return (
    <>
    <div className='options-grid-container'>
      <button className = 'email-options' onClick={routeChange}>Sending Email with XML File</button>
      <button className = 'email-options' onClick={routeChange2}>Sending Email with JSON File</button>
      <button className = 'email-options' onClick={routeChange3}>Sending Email with Multiple XML Files</button>
      <button className = 'email-options' onClick={routeChange4}>Sending Email with Multiple JSON Files</button>
    </div>
    </>
  )
}

export default InvoiceSending;