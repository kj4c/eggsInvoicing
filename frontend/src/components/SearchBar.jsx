import loadingIcon from '../assets/hero/loading.png';
import '../stylesheets/SearchBar.css';
const SearchBar = ({ className }) => {
  return (
    <div className={`SearchBar ${className || ''}`}>
      <img className='LoadingIcon' src={loadingIcon} alt='loading' />
      Create, Validate, Render, Compose, Send and Receive Invoices ...
    </div>
  );
};

export default SearchBar;
