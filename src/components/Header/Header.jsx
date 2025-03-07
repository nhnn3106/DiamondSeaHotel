import React, { useState } from "react";

import Logo from "../Logo";
import Input from "../Input";
import ShoppingCart from "../ShoppingCart";
import Authority from "../Authority";
import { Container, Navbar, Button } from "react-bootstrap";
import "./header.css";
import { IoIosSearch } from "react-icons/io";
import Datepicker from "../DatepickerModal/DatepickerModal";

const Header = () => {
  return (
    <header className="position-fixed top-0 start-0 end-0 z-1 bg-light">
      <Container fluid>
        <Navbar className="d-flex justify-content-between align-items-center py-2">
          {/* Logo Section */}
          <Navbar.Brand className="logo">
            <Logo />
          </Navbar.Brand>

          {/* Search and Input Section */}
          <div className="d-flex align-items-center">
            {/* Search Button */}
            <Button variant="light" className="search-btn">
              <IoIosSearch />
            </Button>

            {/* Input Groups */}
            <div className="d-flex">
              <div className="first-nav__input-group mx-2 p-2 rounded">
                <Input
                  labelName="Check-in"
                  valueName="Add date"
                  isDateInput={true}
                />
              </div>

              <div className="verticalLine mx-2"></div>

              <div className="first-nav__input-group mx-2 p-2 rounded">
                <Input
                  labelName="Check-out"
                  valueName="Add date"
                  isDateInput={true}
                />
              </div>

              <div className="verticalLine mx-2"></div>

              <div className="first-nav__input-group mx-2 p-2 rounded">
                <Input labelName="Guests" valueName="Add guests" />
              </div>
            </div>
          </div>

          {/* Cart and Authority Section */}
          <div className="d-flex align-items-center">
            <div className="cart p-2 rounded">
              <ShoppingCart />
            </div>

            <div className="authority rounded p-2">
              <Authority />
            </div>
          </div>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
