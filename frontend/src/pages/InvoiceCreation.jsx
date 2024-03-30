import { useState } from 'react';
import '../stylesheets/InvoiceCreation.css';
import FormInput from '../components/FormInput';
import { inputs } from '../data/InvoiceCreationInputs';
import '../stylesheets/FormInput.css';

const InvoiceCreation = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [values, setValues]  = useState({
    issueDate: "",
    invoiceTypeCode: "380",
    company: "",
    country: "",
    phone: "",
    email: "",
    taxSchemeId: "",
    legalName: "",
    legalId: "",
    taxExclusiveAmount: "",
    MonetaryCurrency: "",
    numItems:[],
    taxAmount: "",
    taxCurrency: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('numItems')) {
      const startIndex = name.indexOf('[') + 1;
      const endIndex = name.indexOf(']');
      const index = parseInt(name.substring(startIndex, endIndex));
      const field = name.substring(endIndex + 2); // Adjusted to skip ']' and '.'
      
      setValues(prevValues => {
        const updatedNumItems = [...prevValues.numItems]; // Shallow copy of numItems array
        updatedNumItems[index] = {
          ...updatedNumItems[index], // Shallow copy of the specific item
          [field]: value // Update the specific field of the item
        };
        return { ...prevValues, numItems: updatedNumItems }; // Update the state with the updated array
      });
    } else {
      setValues({...values, [name]: value});
    }
  };
  
  const [numDivs, setNumDivs] = useState(0);

  const handleGenerateDivs = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    const value = parseInt(numDivs);
    if (!isNaN(value) && value > 0) {
      const itemsArray = Array.from({ length: value }, () => ({
        itemDescription: "",
        itemId: "",
        itemCost: "",
        invoiceQuantity: "",
        unitCode: "",
        currencyID: ""
      }));
      setValues({ ...values, numItems: itemsArray });
    } else {
      alert('Please enter a valid number greater than 0');
    }
  };
  
  return (
    <div className='IC-Container'>
      <form className='IC-Form' onSubmit={handleSubmit}>
        <h1 className='IC-h1'>Invoice Form</h1>
        <h2 className='IC-h2'>Invoice Details</h2>
        {inputs.map((input) => (
          <div key={input.id}>
            {input.heading && <h2 className='IC-h2'> {input.heading} </h2>}
            {input.name !=='numItems' ?
              <FormInput {...input} value={values[input.name]} onChange={onChange} />
            :
              <div className='FI-Container'> 
                <label className='label'> Number of Items </label>
                <input 
                  type='number' 
                  className='input' 
                  name="num Items" 
                  value={numDivs} 
                  onChange={(e) => setNumDivs(e.target.value)}/>

             
                {/* Render the button only if it has not been clicked */}
                {!buttonClicked && (
                  <button className='IC-button' onClick={handleGenerateDivs}>Select</button>
                )}
              
                {values.numItems.map((item, index) => (
                  <div key={index}>
                    <FormInput label='Item Name' name={`numItems[${index}].itemName`} placeholder="Orange" onChange={onChange} />
                    <FormInput label='Item Description' name={`numItems[${index}].itemDescription`} placeholder="Fruit" onChange={onChange} />
                    <FormInput label='Item ID' name={`numItems[${index}].itemId`} placeholder="123456" onChange={onChange} />
                    <FormInput label='Item Cost' name={`numItems[${index}].itemCost`} placeholder="3.99" onChange={onChange} />
                    <FormInput label='Invoice Quantity' name={`numItems[${index}].invoiceQuantity`} placeholder="12" onChange={onChange} />
                    <FormInput label='Unit Code' name={`numItems[${index}].unitCode`} placeholder="kg" onChange={onChange} />
                    <FormInput label='Currency ID' name={`numItems[${index}].currencyID`} placeholder="AUD" onChange={onChange} />
                  </div>
                ))}
              </div>
            }
          </div>
        ))}

        <button className='IC-button'>Submit</button>
      </form>
    </div>
  );
};

export default InvoiceCreation;

// when i press select, based on the numDivs, can you append numDivs amount of object containing {itemName, itemDescription, itemId, itemCost,InvoicedQuantity, unitCode, currencyID}