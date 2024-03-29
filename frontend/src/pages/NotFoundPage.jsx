import picture from '../assets/404notfound.png';
import React, { useState } from 'react';
import '../stylesheets/404.css';

const NotFoundPage = () => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e) => {
        if (isHovering) {
            const button = e.target;
            const buttonRect = button.getBoundingClientRect();
            button.style.position = "absolute";
            button.style.left = `${Math.random() * (window.innerWidth - buttonRect.width)}px`;
            button.style.top = `${Math.random() * (window.innerHeight - buttonRect.height)}px`;
        }
    };

    const handleSubmit = () => { 
        alert('you are officially the GOAT of the GOAT!');
    }

    return (
      <div style={{ padding: "1rem", textAlign: "center" }}>
        <h1>404: Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <p>Anyways Jacqueline and Chloe is the best tutor ever</p>
        <a href="/">Go back to the homepage</a>
        <p></p>
        <img src={picture} alt="404 Not Found" style={{ width: "10%" }} />
        <p>
        <br></br>
        Hey Jacqueline,<br></br>
        Just wanted to drop a quick message to say you are the amazing tutor!<br></br>
        Thanks for always replying to my messages instantly.<br></br>
        You're not just the GOAT; you're the GOAT of the GOAT!<br></br>
        Your support is fire keep up the good work.<br></br>
        Shot for everything you've done for us for this course.<br></br>
        kind regards from the goat.2, <br></br>
        Jackson 🐐
        </p>
        <p>
            <br></br>
            ur the best director engsoc can have <br></br>
            i wish u get an atlassian fulltimejob <br></br>
            and stay happy 4ever <br></br>
            -Kj
        </p>
        <p>
        <br></br>
        Ur clothes are always so cute and ur so nice!!! pls give us hd <br></br>
        -Cherise
        </p>
        <p>
        <br></br>
        give us hd<br></br>
        -winnie
        </p>
        <p> 
        <br></br>
        </p>
        <div>
            <button className="button" onClick={handleSubmit}>Give us HD</button>
            <button 
                onMouseEnter={() => setIsHovering(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setIsHovering(false)}
                style={{ position: 'relative', cursor: 'pointer' }}
            >
                This project is not a HD project 😢
            </button>
        </div>
      </div>
    );
  };
  
  export default NotFoundPage;
  