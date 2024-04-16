import '../stylesheets/LandingpageTeam.css';
import Section from './Section.jsx';
import Heading from './Heading.jsx';
import { teamsData } from '../data/LandingpageTeam.jsx';

const LandingpageTeam = () => {
  return (
    <Section id='teams'>
      <div className='LandingpageTeamTheme'>
        <Heading
          title='Unlock Team Efficiency with Eggs Invoices'
          subTitle='Empowering Organisation Collaboration'
        />

        <div className='LandingpageTeamContainer'>
          {teamsData.map((item) => {
            return (
              <div className={'LandingpageTeamCardPos'} key={item.id}>
                <div className='LadingpageTeamCardContainer'>
                  <div className='LandingpageTeamContent'>
                    <div className='LandingpageTeamCardImage'>
                      <img src={item.imageUrl} alt={item.title} />
                    </div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default LandingpageTeam;
