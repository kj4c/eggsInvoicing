import { useState } from 'react';
import './InvoiceCreation.css';
import FormInput from '../components/FormInput';
import { inputs } from '../data/InvoiceCreationInputs';
import SelectInput from '../components/SelectInput';
import '../components/FormInput.css';

// const InvoiceCreation = () => {
//   const [values, setValues]  = useState({
//     issueDate: "",
//     invoiceTypeCode: "380",
//     company: "",
//     country: "",
//     phone: "",
//     email: "",
//     taxSchemeId: "",
//     legalName: "",
//     legalId: "",
//     taxExclusiveAmount: "",
//     MonetaryCurrency: "",
//     numItems:[],
//     taxAmount: "",
//     taxCurrency: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(values);
//   };

//   const onChange = (e) => {
//     setValues({...values, [e.target.name]: e.target.value})
//   };
  
//   const [numDivs, setNumDivs] = useState(0);
//   const [divArray, setDivArray] = useState([]);

//   const handleGenerateDivs = (e) => {
//     e.preventDefault();
    
//     const value = parseInt(numDivs);
//     if (!isNaN(value) && value > 0) {
//       setDivArray(Array.from({ length: value }, (_, index) => index + 1));
//       setValues({...values, numItems: Array.from({ length: value }, (_, index) => index + 1)});
//     } else {
//       alert('Please enter a valid number greater than 0');
//     }
//     console.log(Array.from({ length: value }, (_, index) => index + 1));
//     console.log(values);
//   };


//   return (
//     <div className='IC-Container'>
//       <form className='IC-Form' onSubmit={handleSubmit}>
//         <h1 className='IC-h1'>Invoice Form</h1>
//         <h2 className='IC-h2'>Invoice Details</h2>
//         {inputs.map((input) => (
//           <div key={input.id}>
//             {input.heading && <h2 className='IC-h2'> {input.heading} </h2>}
//             {input.name !=='numItems' ?
//               <FormInput {...input} value={values[input.name]} onChange={onChange} />
//             :
//               <div className='FI-Container'> 
//                 <label className='label'> Number of Items </label>
//                 <input 
//                   type='number' 
//                   className='input' 
//                   name="num Items" 
//                   value={numDivs} 
//                   onChange={(e) => setNumDivs(e.target.value)}/>
//                 <button className='IC-button' onClick={handleGenerateDivs}>Select</button>
//                 <div>
//                   {divArray.map((index) => (
//                     <div key={index}>
//                       <FormInput label= 'Item Name' name="itemName" placeholder="Orange" />
//                       <FormInput label= 'Item Description' name="itemDescription" placeholder="Fruit" />
//                       <FormInput label= 'Item Id' name="itemId" placeholder="123456" />
//                       <FormInput label= 'Item Cost' name="itemCost" placeholder="3.99" />
//                       <FormInput label= 'Invoiced Quantity' name="invoiceQuantity" placeholder="12" />
//                       <FormInput label= 'Unit Code (e.g., pcs, kg)' name="unitCode" placeholder="kg" />
//                       <FormInput label= 'Currency ID (e.g., USD, EUR)' name="currencyID" placeholder="AUD" />
//                     </div>
//                   ))}
//               </div>
//               </div>
//             }
//           </div>
//         ))}

//         <button className='IC-button'>Submit</button>
//       </form>
//     </div>
//   );
// };

// const InvoiceCreation = () => {
//   const [values, setValues]  = useState({
//     issueDate: "",
//     invoiceTypeCode: "380",
//     company: "",
//     country: "",
//     phone: "",
//     email: "",
//     taxSchemeId: "",
//     legalName: "",
//     legalId: "",
//     taxExclusiveAmount: "",
//     MonetaryCurrency: "",
//     numItems:[],
//     taxAmount: "",
//     taxCurrency: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(values);
//   };

//   const onChange = (e) => {
//     setValues({...values, [e.target.name]: e.target.value})
//   };
  
//   const [numDivs, setNumDivs] = useState(0);
//   const [divArray, setDivArray] = useState([]);

//   const handleGenerateDivs = (e) => {
//     e.preventDefault();
    
//     const value = parseInt(numDivs);
//     if (!isNaN(value) && value > 0) {
//       const itemsArray = Array.from({ length: value }, () => ({
//         itemName: "",
//         itemDescription: "",
//         itemId: "",
//         itemCost: "",
//         invoiceQuantity: "",
//         unitCode: "",
//         currencyID: ""
//       }));
//       setDivArray(Array.from({ length: value }, (_, index) => index + 1));
//       setValues({...values, numItems: itemsArray});
//     } else {
//       alert('Please enter a valid number greater than 0');
//     }
//   };
  
//   console.log(values);
//   return (
//     <div className='IC-Container'>
//       <form className='IC-Form' onSubmit={handleSubmit}>
//         <h1 className='IC-h1'>Invoice Form</h1>
//         <h2 className='IC-h2'>Invoice Details</h2>
//         {inputs.map((input) => (
//           <div key={input.id}>
//             {input.heading && <h2 className='IC-h2'> {input.heading} </h2>}
//             {input.name !=='numItems' ?
//               <FormInput {...input} value={values[input.name]} onChange={onChange} />
//             :
//               <div className='FI-Container'> 
//                 <label className='label'> Number of Items </label>
//                 <input 
//                   type='number' 
//                   className='input' 
//                   name="num Items" 
//                   value={numDivs} 
//                   onChange={(e) => setNumDivs(e.target.value)}/>
//                 <button className='IC-button' onClick={handleGenerateDivs}>Select</button>
//                 <div>
//                   {divArray.map((index) => (
//                     <div key={index}>
//                       <FormInput label= 'Item Name' name="itemName" placeholder="Orange" />
//                       <FormInput label= 'Item Description' name="itemDescription" placeholder="Fruit" />
//                       <FormInput label= 'Item Id' name="itemId" placeholder="123456" />
//                       <FormInput label= 'Item Cost' name="itemCost" placeholder="3.99" />
//                       <FormInput label= 'Invoiced Quantity' name="invoiceQuantity" placeholder="12" />
//                       <FormInput label= 'Unit Code (e.g., pcs, kg)' name="unitCode" placeholder="kg" />
//                       <FormInput label= 'Currency ID (e.g., USD, EUR)' name="currencyID" placeholder="AUD" />
//                     </div>
//                   ))}
//               </div>
//               </div>
//             }
//           </div>
//         ))}

//         <button className='IC-button'>Submit</button>
//       </form>
//     </div>
//   );
// };

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
    console.log(values);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('numItems')) {
      const startIndex = name.indexOf('[') + 1;
      const endIndex = name.indexOf(']');
      const index = parseInt(name.substring(startIndex, endIndex));
      const field = name.substring(endIndex + 2); // Adjusted to skip ']' and '.'
      
      console.log("index = ", index);
      console.log("field = ", field);
      console.log("value = ", value);
      
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
  
  
  console.log(values);

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