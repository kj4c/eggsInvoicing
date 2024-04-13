import { Header } from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import '../stylesheets/LandingPage.css';
import Services from '../components/Services';
import Pricing from '../components/Pricing';

const LandingPage = () => {
  return (
    <div className='landingPageTheme'>
      <div className='headerContainer'>
        <Header />
        <Hero />
        <Features />
        <Services />
        <Pricing />
      </div>
    </div>
  );
};

export default LandingPage;
