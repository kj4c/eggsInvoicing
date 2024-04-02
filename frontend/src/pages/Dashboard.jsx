import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Dashboard.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_KEY = "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";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState('&nbsp;');
  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState('&nbsp;');
  const [loaded, setLoaded] = useState(false);
  const [chat, setChat] = useState(false)
  // Page
  const cookieExists = document.cookie.includes('cookie='); 
  
  function getCookie(name) {
    let cookies = document.cookie.split('; ');
    let cookieValue = cookies.find(row => row.startsWith(name + '='));
    return cookieValue ? cookieValue.split('=')[1] : null;
  }

  useEffect(() => {
    if (!cookieExists) {
      navigate('/login');
    } else {
      let id = document.cookie.split("; ");
      id = id.find(part => part.startsWith("uid=")).split("=")[1];
      setUid(id);
      setName(getCookie('username'));
    }
  }, [cookieExists, navigate]);

  const hasFetchedData = useRef(false);
  useEffect(() => {
    const notif = async () => {
      try {
        if (!uid) return;

        const response = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receive/getNotifications?uid=${uid}`);

        setData(`${response.data.notifications.length}`);
        setLoaded(true);
      } catch (error) {
        setData('0');
        setLoaded(true);
      }
    }; 
    
    if (uid !== '' && hasFetchedData.current === false) {
      notif();
      hasFetchedData.current = true;
    }
  }, [uid]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoading(prev => {
        if (prev.length >= 9) return '&nbsp;';
        return prev + '.';
      });
    }, 200); 

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // stat
  const [dInvoice, setDInvoice] = useState('loading');
  const [dTax, setDTax] = useState('loading');
  const [dAmount, setDAmount] = useState('loading');
  const [dPayable, setDPayable] = useState('loading');

  const [wInvoice, setWInvoice] = useState('loading');
  const [wTax, setWTax] = useState('loading');
  const [wAmount, setWAmount] = useState('loading');
  const [wPayable, setWPayable] = useState('loading');

  const [mInvoice, setMInvoice] = useState('loading');
  const [mTax, setMTax] = useState('loading');
  const [mAmount, setMAmount] = useState('loading');
  const [mPayable, setMPayable] = useState('loading');

  const [yInvoice, setYInvoice] = useState('loading');
  const [yTax, setYTax] = useState('loading');
  const [yAmount, setYAmount] = useState('loading');
  const [yPayable, setYPayable] = useState('loading');

  useEffect(() => {
    const stat = async () => {
      try {
        if (!uid) return;
        const res = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receive/v2/getStatistics?uid=${uid}`);
        console.log(res.data);
        if (res.status !== 200) {
          return
        }
        if (res.data.dailyFinancialStats.payableAmount !== undefined) {
          setDInvoice(res.data.dailyFinancialStats.numInvoices);
          setDTax(res.data.dailyFinancialStats.taxAmount);
          setDAmount(res.data.dailyFinancialStats.taxInclusiveAmount);
          setDPayable(res.data.dailyFinancialStats.payableAmount);
        } else {
          setDInvoice('0');
          setDTax('$0');
          setDAmount('$0');
          setDPayable('$0');
        }
        
        if (res.data.weeklyFinancialStats.payableAmount !== undefined) {
          setWInvoice(res.data.weeklyFinancialStats.numInvoices);
          setWTax(res.data.weeklyFinancialStats.taxAmount);
          setWAmount(res.data.weeklyFinancialStats.taxInclusiveAmount);
          setWPayable(res.data.weeklyFinancialStats.payableAmount);
        } else {
          setWInvoice('0');
          setWTax('$0');
          setWAmount('$0');
          setWPayable('$0');
        }
        
        if (res.data.monthlyFinancialStats.payableAmount !== undefined) {
          setMInvoice(res.data.monthlyFinancialStats.numInvoices);
          setMTax(res.data.monthlyFinancialStats.taxAmount);
          setMAmount(res.data.monthlyFinancialStats.taxInclusiveAmount);
          setMPayable(res.data.monthlyFinancialStats.payableAmount);
        } else {
          setMInvoice('0');
          setMTax('$0');
          setMAmount('$0');
          setMPayable('$0');
        }

        if (res.data.financialYearStats.payableAmount !== undefined) {
          setYInvoice(res.data.financialYearStats.numInvoices);
          setYTax(res.data.financialYearStats.taxAmount);
          setYAmount(res.data.financialYearStats.taxInclusiveAmount);
          setYPayable(res.data.financialYearStats.payableAmount);
        } else {
          setYInvoice('0');
          setYTax('$0');
          setYAmount('$0');
          setYPayable('$0');
        }
      } catch (error) {
        setDInvoice('0');
        setDTax('$0');
        setDAmount('$0');
        setDPayable('$0');
        setWInvoice('0');
        setWTax('$0');
        setWAmount('$0');
        setWPayable('$0');
        setMInvoice('0');
        setMTax('$0');
        setMAmount('$0');
        setMPayable('$0');
        setYInvoice('0');
        setYTax('$0');
        setYAmount('$0');
        setYPayable('$0');
        setYPayable('$0');
      }
    }; 
    
    if (uid !== '') {
      stat();
    }
  }, [uid]);
  
  //chat
  const [messages, setMessages] = useState([
    {
      message: "Hello I'm your assistant for Eggs Invoicing. How can I help you today?",
      sentTime: "just now",
      sender: "Eggs Invoicing",
      direction: "incoming"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (text) => {
    const userMessage = {
      message: text,
      direction: 'outgoing',
      sender: "user"
    };

    setMessages([...messages, userMessage]);
    setIsTyping(true);

    await processMessageToChatGPT([...messages, userMessage]);
  };

  const systemMessage = {
    "role": "system",
    "content": "Explain things like you're talking to a software professional with 2 years of experience."
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage, 
        ...apiMessages
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT",
        direction: "incoming"
      }]);
      setIsTyping(false);
    });
  }

  return (
    <div className='Dashboard'>
      <div className="welcome-page">
        <div className="welcome-message">
          <h1 className='hello'>Hello {name} !</h1>
          <p className="welcome">Welcome to EGG-INVOICE, your all-in-one e-invoicing platform for effortlessly creating, sending, and managing received invoices.</p>
          <div className='unread-box'>
            <p className="unread-start">You have</p>
            {!loaded ? (
              <p className="unread-data" dangerouslySetInnerHTML={{ __html: loading }}></p>
            ) : (
              <p className="unread-data" dangerouslySetInnerHTML={{ __html: data }}></p>
            )}
            <p className="unread-end">unread emails.</p>
            <div className="receive-btn">
              {
                loaded && data !== '0' ? (
                  <Link to="../invoiceReceiving" className='receive-link'>Check your received invoices</Link>
                ) : ''
              }
            </div>
          </div>
        </div>
        <div className="dashboard-content">
          <div className="dashboard-grid">
            <div className="day">
              <h3 className='tb-heading'>Daily Statistics</h3>
              <table className="day-table">
                <tr>
                  <td className='td1'>Invoice received</td>
                  <td>{dInvoice}</td>
                </tr>
                <tr>
                  <td className='td1'>Taxed amount:</td>
                  <td>{dTax}</td>
                </tr>
                <tr>
                  <td className='td1'>Total amount:</td>
                  <td>{dAmount}</td>
                </tr>
                <tr>
                  <td className='td1'>Payable amount</td>
                  <td>{dPayable}</td>
                </tr>
              </table>
            </div>

            <div className="week">
              <h3 className='tb-heading'>Weekly Statistics</h3>
              <table className="week-table">
                <tr>
                  <td className='td1'>Invoice received</td>
                  <td>{wInvoice}</td>
                </tr>
                <tr>
                  <td>Taxed amount:</td>
                  <td>{wTax}</td>
                </tr>
                <tr>
                  <td>Total amount:</td>
                  <td>{wAmount}</td>
                </tr>
                <tr>
                  <td>Payable amount</td>
                  <td>{wPayable}</td>
                </tr>
              </table>
            </div>
            <div className="month">
              <h3 className='tb-heading'>Monthly Statistics</h3>
              <table className="month-table">
                <tr>
                  <td className='td1'>Invoice received</td>
                  <td>{mInvoice}</td>
                </tr>
                <tr>
                  <td>Taxed amount:</td>
                  <td>{mTax}</td>
                </tr>
                <tr>
                  <td>Total amount:</td>
                  <td>{mAmount}</td>
                </tr>
                <tr>
                  <td>Payable amount</td>
                  <td>{mPayable}</td>
                </tr>
              </table>
            </div>

            <div className="year">
              <h3 className='tb-heading'>Financial Year Statistics</h3>
              <table className="year-table">
                <tr>
                  <td className='td1'>Invoice received</td>
                  <td>{yInvoice}</td>
                </tr>
                <tr>
                  <td>Taxed amount:</td>
                  <td>{yTax}</td>
                </tr>
                <tr>
                  <td>Total amount:</td>
                  <td>{yAmount}</td>
                </tr>
                <tr>
                  <td>Payable amount</td>
                  <td>{yPayable}</td>
                </tr>
              </table>
            </div>
          </div>
          {/* <div className="create">
            <p className="ready-text">Ready to get started?</p>
            <div className="create-btn">
              <Link to="../invoiceCreation" className='create-link'>Create your invoice here</Link>
            </div>
          </div> */}
        </div>
      </div>

      {
        !chat ? (
          <img src='../assets/chat.png' className='chat-btn' style={{ position: "fixed", bottom: "15px", right: "20px", height: "40px", width: "40px"}} onClick={() => setChat(true) }></img>
        ) : (
          <div className="chat">
              <div style={{ position: "fixed", bottom: "60px", right: "20px", height: "400px", width: "300px" }}>
                <MainContainer>
                  <ChatContainer>
                    <MessageList
                      typingIndicator={isTyping && <TypingIndicator content="ChatGPT is typing" />}
                    >
                      {messages.map((msg, index) => (
                        <Message
                          key={index}
                          model={{
                            message: msg.message,
                            direction: msg.direction,
                            position: "single"
                          }}
                        />
                      ))}
                    </MessageList>
                    <MessageInput placeholder="Type message here..." onSend={handleSend} />
                  </ChatContainer>
                </MainContainer>
            </div>
            <img src='../assets/chat.png' className='chat-btn' style={{ position: "fixed", bottom: "15px", right: "20px", height: "35px", width: "35px"}} onClick={() => setChat(false) }></img>
          </div>         
        )
      }
      
    </div>

  )
}

export default Dashboard