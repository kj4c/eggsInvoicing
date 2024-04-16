const navigate = useNavigate();
const [load, setLoad] = useState(false);
const [loadingText, setLoadingText] = useState('Loading');
const [uid, setUid] = useState('');
const cookieExists = document.cookie.includes('cookie=');
const [sent, setSent] = useState(null);
const [received, setReceived] = useState(null);
const [receivedTab, setReceivedTab] = useState(true);
const [sentTab, setSentTab] = useState(false);
const [teamEmail, setTeamEmail] = useState('');

  /* Get the cookie of the current user and see if it exists. */
  function getCookie(name) {
    let cookies = document.cookie.split('; ');
    let cookieValue = cookies.find((row) => row.startsWith(name + '='));
    return cookieValue ? cookieValue.split('=')[1] : null;
  }

  /* If cookie does not exist you go back to login, if it exists find email*/
  useEffect(() => {
    if (!cookieExists) {
      navigate('/login');
    } else {
      let id = document.cookie.split('; ');
      id = id.find((part) => part.startsWith('uid=')).split('=')[1];
      setUid(id);
    }
  }, [cookieExists, navigate]);

	// check if in team
  const inTeam = async () => {
    if (!uid) return;
    try {
      const response = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/teamdetail?uid=${uid}`);
      setTeamEmail(response.data.details.teamEmail);
    } catch (err) {
      navigate('/teamcreate');
    }
  }; 
  
  const sentQ = async () => {
    if (!uid) return;
    try {
      const response = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/sentinbox?uid=${uid}`);
      if (response.data.inbox.length === 0) {
        setSent(null);
      } else {
        setSent(response.data.inbox)
      }
    } catch (err) {
      setSent(null);
    }
  }
  const receivedQ = async () => {
    if (!uid) return;
    try {
      const response = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receiveinbox?uid=${uid}`);
      if (response.data.inbox.length === 0) {
        setReceived(null);
      } else {
        setReceived(response.data.inbox);
      }
      setLoad(true);
    } catch (err) {
      setLoad(true)
    }
  }

  useEffect(() => {
    if (!uid) return;
    inTeam();
  }, [uid]);

  useEffect(() => {
    if (!uid) return;
    sentQ();
  }, [uid]);

  useEffect(() => {
    if (!uid) return;
    receivedQ();
  }, [uid]);

  useEffect(() => {
    console.log(received);
  }, [received]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText((prev) => {
        if (prev.length >= 10) return 'Loading';
        return prev + '.';
      });
    }, 200);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const goBack = () => {
    navigate("/team");
  };





  <>
  <div className='searchContainer'>
    <p className = "fetching">Received</p>
    
  </div>
  <div className="inboxContainer">
    <div className='bin-button-container'>
      <button className='bin-button' onClick={deleteSelectedEmails}>
        <RiDeleteBinLine className='bin-icon' />  
        <div className="tooltip">Delete</div>
      </button>
    </div>
      <p className='header'>Invoice ID</p>
      <p className='header'>Title</p>
      <p className='header'>Sender</p>
      <p className='header'>Type</p>     
      <p className='header'>Date</p>
    {dataFound && data.map((item) => (
      <div className="inbox-grid" key={item.invoice_id}>
        <div className='checkbox-container'>
          <input type="checkbox" className="checkbox" 
          onChange={e => handleCheckedInvoices(item.invoice_id, e.target.checked)}
          checked={checkedItems[item.invoice_id] || false}
          />
        </div>
        <div className={`grid-row ${hoveredRow === item.invoice_id ? 'row-hover' : ''}`} 
          onMouseEnter={() => setHoveredRow(item.invoice_id)} 
          onMouseLeave={() => setHoveredRow(null)} 
          key={item.invoice_id}
          onClick={() => item.type === 'XML' ? openXML(item.invoice_id) : openJSON(item.invoice_id)}>
          <p className="grid-item">{item.invoice_id}</p>
          <p className="grid-item">{item.title}</p>
          <p className="grid-item">{item.sender_email}</p>
          <p className="grid-item">{item.type}</p>
          <p className="grid-item">{item.sent_at}</p>
        </div>
      </div>
    ))}
    {Loading && <h1 className='loadingScreen'>{loadingText}</h1>}
  </div>
  <div className='buttonContainer'>
    <button className='button1' onClick={generatePDF}>PDF</button>
    <button className='button2' onClick={generateHTML}>HTML</button>
  </div>
</>