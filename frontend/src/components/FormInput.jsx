import '../stylesheets/FormInput.css'

const FormInput = (props) => {
  const {label, onChange, ...inputProps } = props;
  
  return (
    <div className='FI-Container'>
      <label className='label'>{label}</label>
      <input className='input' {...inputProps} onChange={onChange} />
    </div>
  )
}

export default FormInput