import { useState } from "react";
import "../stylesheets/InvoiceCreation.css";
import { inputs } from "../data/InvoiceCreationInputs";
import axios from "axios";

// Invoice creationg GUI page where users can generate an invoice
const InvoiceCreation = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [numItems, setNumItems] = useState(0);
  // temporary set the values for the demo.
  const [values, setValues] = useState({
    invoice: {
      inId: "123a",
      date: "",
      buyerRef: "1093A8",
      payment: {
        pid: "109",
        financialAccId: "1234567890",
        accName: "Acc Name",
        bsb: "123456",
      },
    },
    
    seller: {
      id: "13 004 085 616",
      name: "EGG-Invoices Ltd",
      address: {
        streetAdd: "123 Pitt St",
        city: "Sydney",
        postCode: "2000",
        state: "NSW",
      },
    },
    customer: {
      id: "53 004 085 616",
      name: "UNSW",
      address: {
        streetAdd: "123 Pitt St",
        city: "Sydney",
        postCode: "2000",
        state: "NSW",
      },
      contact: {
        name: "Jacqueline",
        phone: "012345679",
        email: "Jacquelinee@email.com",
      },
    },
    item: [],
  });

  // Download the generate file by creating a window
  const downloadFile= (content, filename)  => {
    const blob = new Blob([content], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // Creates the generated DIVs from increasing the item count.
  const handleGenerateDivs = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    const value = parseInt(numItems);
    if (!isNaN(value) && value > 0) {
      const itemsArray = Array.from({ length: value }, () => ({
        name: "",
        itId: "",
        unitPrice: "",
        quantity: "",
        taxCategory: "",
      }));
      setValues({ ...values, item: itemsArray });
    } else {
      alert("Please enter a valid number greater than 0");
    }
  };

  // on Submit call the API from the invoice creation group passing in the valid values
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://w13a-brownie.vercel.app/v2/api/invoice/create', values);

      const xmlInvoice = res.data;
      downloadFile(xmlInvoice, 'Invoice.xml');
    } catch (error) {
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
     
  };

  // Set the item values every new input
  const onChange = (e) => {
    const { name, value } = e.target;
    const [category, subCategory, field] = name.split('.');

    if (name.startsWith('item')) {
      const startIndex = name.indexOf('[') + 1;
      const endIndex = name.indexOf(']');
      const index = parseInt(name.substring(startIndex, endIndex));
      const field = name.substring(endIndex + 2); 

      setValues(prevValues => {
        const updatedNumItems = [...prevValues.item];
        updatedNumItems[index] = {
          ...updatedNumItems[index], 
          [field]: value 
        };
        return { ...prevValues, item: updatedNumItems };
      });
      return;
    }

    if (field) {
      setValues(prevState => ({
        ...prevState,
        [category]: {
          ...prevState[category],
          [subCategory]: {
            ...prevState[category][subCategory],
            [field]: value
          }
        }
      }));
    } else {
      setValues(prevState => ({
        ...prevState,
        [category]: {
          ...prevState[category],
          [subCategory]: value
        }
      }));
    }
  };

  // Actual GUI for the Invoice Creation part
  return (
    <div className="IC-Container">
      <form className="IC-Form" onSubmit={handleSubmit}>
        <h1 className="IC-h1">Invoice Form</h1>
        <h2 className="IC-h2">Invoice Details</h2>
        {inputs.map((input) => (
          <div key={input.id} className="FI-Container">
            {input.heading && <h2> {input.heading} </h2>}
            <label>{input.label}</label>
            <input
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
              value={values[input.name]}
              onChange={onChange}
              required={input.required}
              defaultValue={input.placeholder}
              />
          </div>
        ))}

        {/* INVOICE LINE ITEMS */}
        <div className="FI-Container">
          <h2>Invoice Line Items</h2>
          <label className="label"> Number of Items </label>
          <input
            type="number"
            value={numItems}
            onChange={(e) => setNumItems(e.target.value)}
          />
          
          {!buttonClicked && (
            <button className="IC-button" onClick={handleGenerateDivs}>
              Select
            </button>
          )}

          {values.item.map((item, index) => (
            <div key={item+index} className="FI-Container">
              <input 
                label="Item Name"
                name={`item[${index}].name`}
                placeholder="Orange"
                onChange={onChange}
                defaultValue="Orange"
              />
              <input
                label="Item ID"
                name={`item[${index}].itId`}
                placeholder="194mn21"
                onChange={onChange}
                defaultValue="194mn21"
              />
              <input
                label="Unit Price"
                name={`item[${index}].unitPrice`}
                placeholder="3.99"
                onChange={onChange}
                defaultValue="3.99"
              />
              <input
                label="Quantity"
                name={`item[${index}].quantity`}
                placeholder="12"
                onChange={onChange}
                defaultValue="12"
              />
              <input
                label="Tax Category"
                name={`item[${index}].taxCategory`}
                placeholder="Z"
                onChange={onChange}
                defaultValue="Z"
              />
            </div>
          ))}
        </div>
        <button className="IC-button">Submit</button>
      </form>
    </div>
  );
};

export default InvoiceCreation;
