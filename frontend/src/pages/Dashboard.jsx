import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { cardData } from '../data/dashboardData';
import '../stylesheets/Dashboard.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios';
const API_KEY = "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";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const cookieExists = document.cookie.includes('cookie='); 
  
  useEffect(() => {
    if (!cookieExists) {
      navigate('/login');
    } else {
      let id = document.cookie.split("; ");
      id = id.find(part => part.startsWith("uid=")).split("=")[1];
      setUid(id);
    }
  }, [cookieExists, navigate]);

  const hasFetchedData = useRef(false);
  useEffect(() => {
    const notif = async () => {
      try {
        if (!uid) return;
        console.log(uid);
        const response = await axios.get(`https://invoice-seng2021-24t1-eggs.vercel.app/receive/getNotifications?uid=${uid}`);

        setData(`${response.data.notifications.length}`);
      } catch (error) {
        console.error(error);
      }
    }; 

    const info = async() => {
      try {
        const res = await axios.get('https://invoice-seng2021-24t1-eggs.vercel.app/getUserInfo', {
          params: {
            uid: uid
          }
        });
        setName(res.data.username);
      } catch (error) {
        console.log(error);
      }
    }
  
    if (uid !== '' && hasFetchedData.current === false) {
      notif();
      info();
      hasFetchedData.current = true;
    }
  }, [uid]);
  // Page 

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
    <div className='mt-12'>
      <div className='Dashboard lg-flex-nowrap'>
        <div className="welcome-page">
          <div className="welcome-message">
            <h1 className='welcome'>Welcome</h1>
            <h1 className="name">{name}</h1>
          </div>
          <div className='unread-box'>
            <p className="unread-start">You have</p>
            <p className="unread-data">{data}</p>
            <p className="unread-end">unread emails</p>
          </div>
        </div>

        <div style={{ position: "fixed", bottom: "20px", right: "20px", height: "400px", width: "300px" }}>
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
      </div>
    </div>
  )
}

export default Dashboard