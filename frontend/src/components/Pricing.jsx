import '../stylesheets/Pricing.css';
import Section from './Section';
import Heading from './Heading';
import { pricing } from '../data/PricingData';
import { FaCircleCheck } from 'react-icons/fa6';

const Pricing = () => {
  return (
    <Section className='PricingSection' id='pricing'>
      <div className='PricingContainer '>
        {/* <div className='hidden relative justify-center mb-[6.5rem] lg:flex'>
          <img
            src=''
            className='relative z-1'
            width={255}
            height={255}
            alt='Sphere'
          />
          <div className='absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
            <img
              src=''
              className='w-full'
              width={950}
              height={400}
              alt='Stars'
            />
          </div>
        </div> */}

        <Heading
          title='Flexible Pricing'
          subTitle='Choose a plan that suits your business needs'
        />

        <div style={{ position: 'relative' }}>
          {/* <PricingList /> */}
          <div className='PricingListContainer'>
            {pricing.map((item) => (
              <div key={item.id} className='PricingItemBorder'>
                <h4>{item.title}</h4>
                <p>{item.description}</p>

                <div className='Pricing'>
                  {item.price && (
                    <>
                      <h3>$</h3>
                      <div className='PricingPrice'>{item.price}</div>
                      /month
                    </>
                  )}
                </div>

                <div className='PriceButton'>
                  <a href='/register'>Get Started</a>
                </div>

                {/* <Button
                    className='w-full mb-6'
                    href={
                      item.price ? '/pricing' : 'mailto:contact@jsmastery.pro'
                    }
                    white={!!item.price}
                  >
                    {item.price ? 'Get started' : 'Contact us'}
                  </Button> */}

                <ul>
                  {item.features.map((feature, index) => (
                    <li key={index}>
                      <div className='checkIcon'>
                        <FaCircleCheck />
                      </div>
                      <p style={{ marginLeft: '1rem', marginTop: '5px' }}>
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* <LeftLine /> */}
          {/* <RightLine /> */}
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
