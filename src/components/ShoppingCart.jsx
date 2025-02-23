import React from 'react'
import { FaCartPlus } from "react-icons/fa";
const ShoppingCart = () => {
  return (
    <div type="button" className='cart p-md-3 rounded-circle'>
      <FaCartPlus size={20}/>
    </div>
  )
}

export default ShoppingCart
