import '../stylesheets/InvoiceRendering.css';
import PropTypes from 'prop-types';

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

Notif.propTypes = {
  trigger: PropTypes.bool.isRequired,
  setTrigger: PropTypes.func.isRequired
}
export default Notif;