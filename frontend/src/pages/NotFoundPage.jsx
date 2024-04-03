import picture from '../assets/404notfound.png';
import { useState } from 'react';
import '../stylesheets/404.css';

// if a page netered is not found
const NotFoundPage = () => {
    const [isHovering, setIsHovering] = useState(false);

    // move the button away
    const handleMouseMove = (e) => {
        if (isHovering) {
            const button = e.target;
            const buttonRect = button.getBoundingClientRect();
            button.style.position = "absolute";
            button.style.left = `${Math.random() * (window.innerWidth - buttonRect.width)}px`;
            button.style.top = `${Math.random() * (window.innerHeight - buttonRect.height)}px`;
        }
    };

    //alert that Jacqueline is a goat of the goat
    const handleSubmit = () => { 
        alert('you are officially the GOAT of the GOAT!');
    }

    // glazing
    return (
      <div style={{ padding: "1rem", textAlign: "center" }}>
        <h1>404: Page Not Found</h1>
        <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <p>Anyways Jacqueline you are the best tutor ever</p>
        <a href="/">Go back to the homepage</a>
        <p></p>
        <img src={picture} alt="404 Not Found" style={{ width: "10%" }} />
        <p>
        <br></br>
        Hey Jacqueline,<br></br>
        Just wanted to drop a quick message to say you are an amazing tutor!<br></br>
        Thanks for always replying to my messages instantly.<br></br>
        You&apos;re not just the GOAT; you&apos;re the GOAT of the GOAT!<br></br>
        Your support is fire keep up the good work.<br></br>
        Shot for everything you&apos;ve done for us for this course.<br></br>
        Kind regards from the goat.2, <br></br>
        Jackson 🐐
        </p>
        <p>
        <br></br>
        You&apos;re the best director EngSoc can have.<br></br>
        I wish you get a full-time job at Atlassian <br></br>
        and stay happy forever.<br></br>
        -Kj
        </p>
        <p>
        <br></br>
        Your clothes are always so cute and you&apos;re so nice!!! Please give us the chance of investmetn.<br></br>
        -Cherise
        </p>
        <p>
        <br></br>
        There&apos;s been a rumor going around that if you give us an investment, Eric will show you his dog<br></br>
        -Eric
        </p>
        <p>
        <br></br>
        Give us investment.<br></br>
        -Winnie
        </p>
        <div>
            <button className="button" onClick={handleSubmit}>Invest in Us</button>
            <button 
                onMouseEnter={() => setIsHovering(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setIsHovering(false)}
                style={{ position: 'relative', cursor: 'pointer' }}
            >
                Dont Invest In Us 😢
            </button>
        </div>
      </div>
    );
};
  
export default NotFoundPage;
