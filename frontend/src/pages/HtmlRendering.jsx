import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/* Renders the HTML Data Downloaded and renders it into a readable format */
const HtmlRendering = () => {
  const [res, setRes] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.res) {
      setRes(location.state.res);
    } else {
      navigate('/invoiceReceiving');
    }
  }, [location.state, navigate]);

  return (
    <div className="renderedContainer">
      {res && (
        <div className="responseContent" dangerouslySetInnerHTML={{ __html: res }} />
      )}
      <button className='backBtn' onClick={() => navigate('/invoiceReceiving')}>Back</button>
    </div>
  );
}

export default HtmlRendering;