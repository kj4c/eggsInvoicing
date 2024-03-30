import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { cardData } from '../data/dashboardData';
import '../stylesheets/Dashboard.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "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";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookieExists = document.cookie.includes('cookie='); 

    if (!cookieExists) {
      navigate('/login');
    }
  }, [navigate]);

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
        <div className='Dashboard-banner lg-w-80'>
          <div className='Dashboard-Banner-Content'>
            <div>
              <p className='Dashboard-Earnings'>FY2024 Earnings</p>
              <p className='Dashboard-Earnings-Content'>$1234.56</p>
            </div>
          </div>
          <div className='mt-6'>
            <Button
              color="white"
              bgColor="blueviolet"
              text="Download Report"
              borderRadius="10px"
            />
          </div>
        </div>

        <div className='Dashboard-Card-Container '>
          {cardData.map((item) => (
            <div key={item.title} className='Dashboard-Card-Style md-w-56'>
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="Dashboard-Card-Button-Style"
              >
                {item.icon}
              </button>
              <p style={{marginTop: '0.75rem'}}>
                <span className="">amount</span>
              </p>
              <p className="Dashboard-Card-Title">{item.title}</p>
            </div>
          ))}
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