import React from 'react'
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools'

import './FormInput.css'

const FormInput = (props) => {
  const {label, onChange, id,errorMessage, ...inputProps } = props;
  
  return (
    <div className='FI-Container'>
      <label className='label'>{label}</label>
      <input className='input' {...inputProps} onChange={onChange} />
    </div>
  )
}

export default FormInput