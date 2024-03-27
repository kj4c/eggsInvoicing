import {useState} from 'react';

const Notif = () => {
  
  return(
    <div className='uploadNotif'>
      <div className="overlay"></div>
      <div className="notifText">
        <h3>Warning😢</h3>
        <p>Please upload a file</p>
        <button>Close</button>
      </div>
    </div>
    
  )
}

export default Notif