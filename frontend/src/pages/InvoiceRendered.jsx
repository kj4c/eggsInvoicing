import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../stylesheets/InvoiceRendered.css'

// Renders the invoice given by converting it to a HTML which is nice formatted
const InvoiceRendered = () => {
  const [res, setRes] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.res) {
      setRes(location.state.res);
    } else {
      navigate('/invoiceRendering');
    }
  }, [location.state, navigate]);

  return (
    <div className="renderedContainer">
      {res && (
        <div className="responseContent" dangerouslySetInnerHTML={{ __html: res }} />
      )}
      <button className='backBtn' onClick={() => navigate('/invoiceRendering')}>Back</button>
    </div>
  );
}

export default InvoiceRendered;