import { useNavigate } from 'react-router-dom';
import '../stylesheets/InvoiceRendered.css'

// Renders the invoice given by converting it to a HTML which is nice formatted
const InvoiceRendered = () => {
  const navigate = useNavigate();

  return (
    <div className="renderedContainer">
      <div className="rendered">
        <h1 className="inv-heading">Invoice Information</h1>
        <div className="info">
          <p className="inv-no">Invoice no: 3547</p>
          <p className="date">Invoice date: 29 March 2023</p>
        </div>
        <div className="to-from">
          <div className="to">
            <h3 className="to-head">To:</h3>
            <p className='p-info'>Awolako Pty Ltd <br/>Suite 23 <br/> 98 The Road <br/> Sydney NSW 2000</p>
          </div>
          <div className="from">
            <h3 className="from-head">From:</h3>
            <p className='p-info'>Kobuko Pty Ltd <br/>Level 54 <br/> 23 Some Avenue<br/> Hurstville NSW 2220</p>
          </div>
      
        </div>
        
        <table className='tb'>
          <tr>
            <th>Quantity</th>
            <th>Description</th>
            <th>Price</th>
            <th>GST</th>
            <th>Total</th>
          </tr>
          <tr>
            <td>10</td>
            <td>Paper</td>
            <td>$1.00</td>
            <td>10.0%</td>
            <td>$11.00</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Bag</td>
            <td>$150.00</td>
            <td>10.0%</td>
            <td>$165.00</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Table</td>
            <td>$125.00</td>
            <td>10.0%</td>
            <td>$137.50</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Cups</td>
            <td>$20.00</td>
            <td>10.0%</td>
            <td>$44.00</td>
          </tr>
        </table>
        <h3 className="pay-heading">Payment information</h3>
        <div className="pay-info">
          <div className="pay-left">
            <p className="pay-term">Payment terms: As agreed</p>
            <p className="pay-term">Payment code: 1</p>
            <p className="pay-term">Payment ID: EBSOA10</p>
          </div>
          <div className="pay-right">
            <p className="pay-term">Account name: Kobuko <br/>BSB: 132 435<br/> Account number: 29481593</p>
          </div>
        </div>
        <h1 className="summary">Payable Amount: $176</h1>
      </div>
      
      
      
      <button className='backBtn' onClick={() => navigate('/invoiceRendering')}>Back</button>
    </div>
  );
}

export default InvoiceRendered;