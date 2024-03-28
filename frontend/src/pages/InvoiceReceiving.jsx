import '../stylesheets/InvoiceReceiving.css';

const InvoiceReceiving = () => {
    return (
      <>
        <div className='searchContainer'>
          <p>Fetch Invoices</p>
          <input type="text" className='inputBox'/>
          <select>
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
            <p className='header'>Time</p>
          <p class="grid-item">1</p>
          <p class="grid-item">What is good guys!</p>
          <p class="grid-item">kahowang3659@gmail.com</p>
          <p class="grid-item">Multiple JSON</p>
          <p class="grid-item">23:59</p>
        </div>
      </>
    )
  }
  
export default InvoiceReceiving