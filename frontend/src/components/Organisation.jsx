import '../stylesheets/Organisation.css';
import org1 from '../assets/hero/organisation/org1.png';
import { orgImages } from '../data/OrganisationData.jsx';

const Organisation = ({ className, title }) => {
  return (
    <div className={`${className || ''} OrganisationBar`}>
      <img
        src={org1}
        width={62}
        height={62}
        style={{ borderRadius: '0.75rem' }}
        alt='Org1'
      />

      <div className='MembersContainer'>
        <h6 className=''>{title}</h6>

        <div className='ProfileContainer'>
          <ul>
            {orgImages.map((item, index) => (
              <li key={index}>
                <img
                  src={item}
                  style={{ width: '100%' }}
                  width={10}
                  height={20}
                  alt={item}
                />
              </li>
            ))}
          </ul>
          <div className='subHeading'>1m ago</div>
        </div>
      </div>
    </div>
  );
};

export default Organisation;
