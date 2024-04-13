import Section from './Section.jsx';
import Create from './Create.jsx';
import SendReceive from './SendReceive.jsx';
import RenderValidate from './RenderValidate.jsx';

const Services = () => {
  return (
    <>
      <Section id='services'>
        <Create />
        <SendReceive />
        <RenderValidate />
      </Section>

      <div style={{ paddingTop: '100rem', fontSize: '10rem' }}>
        REMOVE ME!!!
      </div>
    </>
  );
};

export default Services;
