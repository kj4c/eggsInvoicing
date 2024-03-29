import { useState } from 'react';
import './InvoiceCreation.css';
import FormInput from '../components/FormInput';
import { inputs } from '../data/InvoiceCreationInputs';

const InvoiceCreation = () => {
  const [values, setValues]  = useState({
    issueDate: "",
    invoiceTypeCode: "",
    company: "",
    country: "",
    phone: "",
    email: "",
    taxSchemeId: "",
    legalName: "",
    legalId: "",
    taxExclusiveAmount: "",
    MonetaryCurrency: "",
    numItems: "",
    taxAmount: "",
    taxCurrency: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  };

  return (
    <div className='IC-Container'>
      <form className='IC-Form' onSubmit={handleSubmit}>
        <h1 className='IC-h1'>Invoice Form</h1>
        <h2 className='IC-h2'>Invoice Details</h2>
        {inputs.map((input) => (
          <div key={input.id}>
            {input.heading && <h2 className='IC-h2'> {input.heading} </h2>}
            <FormInput {...input} value={values[input.name]} onChange={onChange} />
          </div>
        ))}

        <button className='IC-button'>Submit</button>

      </form>
    </div>
  );
};

export default InvoiceCreation;
