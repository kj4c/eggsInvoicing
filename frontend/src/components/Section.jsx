import '../stylesheets/Section.css';
const Section = ({ className, id, customPaddings, children }) => {
  return (
    <div
      id={id}
      className={`
      SectionContainer ${customPaddings || `py-16`} ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default Section;
