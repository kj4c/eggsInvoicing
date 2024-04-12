import { Header } from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import '../stylesheets/LandingPage.css';

const LandingPage = () => {
  return (
    <div className='landingPageTheme'>
      <div className='headerContainer'>
        <Header />
        <Hero />
        <Features />
      </div>
    </div>
  );
};

export default LandingPage;
