import './FormInput.css'

const FormInput = (props) => {

  const handleSumbit = (e) => {
    e.preventDefault();
  }
  return (
    <div className='formInput'>
      {/* <label>Username</label> */}
      <input className='input' placeholder={props.placeholder}/>
    </div>
  )
}

export default FormInput