import '../stylesheets/InvoiceSending.css';

const InvoiceSending = () => {
  return (
    <>
    <div className='options-grid-container'>
      <button className = 'email-options'>Sending Email with XML File</button>
      <button className = 'email-options'>Sending Email with JSON File</button>
      <button className = 'email-options'>Sending Email with Multiple XML Files</button>
      <button className = 'email-options'>Sending Email with Multiple JSON Files</button>
    </div>
    </>
  )
}

export default InvoiceSending