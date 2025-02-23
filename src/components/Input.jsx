import React from 'react'
import DatepickerModal from './DatepickerModal/DatepickerModal'



const Input = (props) => {
  return (
    <div type='button' className='first-nav__input-group rounded-5 mx-2 py-1'>
      <span className='header__label'>{props.labelName}</span><br/>
      <span className='header__value text-secondary'>{props.valueName}</span>
      {/* {props.isDateInput && <DatepickerModal/>} */}
    </div>
  )
}

export default Input
