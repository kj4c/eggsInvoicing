import '../stylesheets/Heading.css';

const Heading = ({ className, title }) => {
  return (
    <div className={`${className} HeadingContainer`}>
      {title && <h2 className='heading2'>{title}</h2>}
    </div>
  );
};

export default Heading;
