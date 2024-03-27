import {useState} from 'react';
import '../stylesheets/InvoiceRendering.css';
const Notif = (props) => {
  
  return (props.trigger) ? (
    <div className='uploadNotif'>
      <div className="notifText">
        <h3>Hey there</h3>
        <p>Please upload a file ❤️</p>
        <button className='closeBtn' onClick={() => props.setTrigger(false)}>OK!!!</button>
      </div>
    </div>
    
  ):"";
}

export default Notif;