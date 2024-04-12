import { Header } from '../components/Header';
import Hero from '../components/Hero';
import '../stylesheets/LandingPage.css';
const LandingPage = () => {
  return (
    <div className='landingPageTheme'>
      <div className='headerContainer'>
        <Header />
        <Hero />
      </div>
    </div>
  );
};

export default LandingPage;
