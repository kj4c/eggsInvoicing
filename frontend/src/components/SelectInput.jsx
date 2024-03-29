import React from 'react'
import './SelectInput.css'


const SelectInput = (props) => {
  const {options, label, id, onChange, ...inputs} = props

  // console.log("options is: ",options);
  console.log(inputs)
  return (
    <div className='S-Container'>
      <label className='S-label'>{label}</label>
      <select className='S-select' onChange={onChange}>
        {options.map((option) => (
          <option key={option.id}> {option.name}</option>
        ))}

      </select>
    </div>
  )
}

export default SelectInput