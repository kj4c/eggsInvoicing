import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Dashboard.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios';
import {ChatIcon} from '@mui/icons-material/Chat';

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
        console.error(error);
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
          <p className="welcome">Welcome to EGG-INVOICE, our all-in-one e-invoicing platform to effortlessly create, send, and manage received invoices</p>
        </div>
        <div className='unread-box'>
          <p className="unread-start">You have</p>
          {!loaded ? (
            <p className="unread-data" dangerouslySetInnerHTML={{ __html: loading }}></p>
          ) : (
            <p className="unread-data" dangerouslySetInnerHTML={{ __html: data }}></p>
          )}
          <p className="unread-end">unread emails</p>
        </div>
        <div className="create">
          
        </div>
      </div>
      {
        !chat ? (
          <button style={{ position: "fixed", bottom: "15px", right: "20px", height: "40px", width: "40px"}} onClick={() => setChat(true) }></button>
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
            <button style={{ position: "fixed", bottom: "15px", right: "20px", height: "40px", width: "40px"}} onClick={() => setChat(false) }></button>
          </div>
          
          
        )
      }
      
    </div>

  )
}

export default Dashboard