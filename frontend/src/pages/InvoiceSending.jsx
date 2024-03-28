import '../stylesheets/InvoiceSending.css';
import { useNavigate } from 'react-router-dom';

const InvoiceSending = () => {
  const navigate = useNavigate();

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