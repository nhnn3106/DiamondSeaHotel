import React, { useState } from 'react'

import Logo from '../components/Logo';
import Input from '../components/Input';
import ShoppingCart from '../components/ShoppingCart';
import Authority from '../components/Authority';
import { Container, Navbar , Button} from 'react-bootstrap';
import './header.css'
import { IoIosSearch } from 'react-icons/io';
import Datepicker from '../components/DatepickerModal/DatepickerModal';
const Header = () => {


  return (
    <header>
      <Navbar className='first-nav'>
        <Container className='first-nav__left ms-5'>
          <Navbar.Brand href='#home'>
            <Logo/>
          </Navbar.Brand>
        </Container>
        <Container className='first-nav__center border py-1 px-5 rounded-5  w-100'>
          <Input labelName={"Nhận phòng"} valueName={"Thêm ngày"} isDateInput={true}/>
          <div className='verticalLine'></div>
          <Input labelName={"Trả phòng"} valueName={"Thêm ngày"} isDateInput={false}/>
          <div  className='verticalLine'></div>
          <Input labelName={"Nhập khách"} valueName={"Thêm khách"}/>
          <Button variant="danger" className='search-btn rounded-5'>
          <IoIosSearch size={30}/>
          </Button>
        </Container>
        <Container className="first-nav__right me-5 justify-content-end" >
            <ShoppingCart/>
            <Authority />
        </Container>
        
      </Navbar>
    </header>
    
  )
}

export default Header
