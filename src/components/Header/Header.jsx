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
  const [showDatepicker, setShowDatepicker] = useState(false);

  const toggleDatepicker = () => {
    setShowDatepicker(!showDatepicker);
  };

  return (
    <header>
      <Container fluid>
        <Navbar className="d-flex justify-content-between align-items-center py-2">
          {/* Logo Section */}
          <Navbar.Brand className="logo">
            <Logo />
          </Navbar.Brand>

          {/* Search and Input Section */}
          <div className="d-flex align-items-center">
            {/* Search Button */}
            <Button variant="light" className="search-btn rounded-circle">
              <IoIosSearch />
            </Button>

            {/* Input Groups */}
            <div className="d-flex">
              <div
                className="first-nav__input-group mx-2 p-2 rounded-pill"
                onClick={toggleDatepicker}
              >
                <Input
                  labelName="Check-in"
                  valueName="Add date"
                  isDateInput={true}
                />
                {showDatepicker && <Datepicker />}
              </div>

              <div className="verticalLine mx-2"></div>

              <div
                className="first-nav__input-group mx-2 p-2 rounded-pill"
                onClick={toggleDatepicker}
              >
                <Input
                  labelName="Check-out"
                  valueName="Add date"
                  isDateInput={true}
                />
              </div>

              <div className="verticalLine mx-2"></div>

              <div className="first-nav__input-group mx-2 p-2 rounded-pill">
                <Input labelName="Guests" valueName="Add guests" />
              </div>
            </div>
          </div>

          {/* Cart and Authority Section */}
          <div className="d-flex align-items-center">
            <div
              className="cart px-3 rounded-circle"
              style={{ paddingTop: "13px", paddingBottom: "13px" }}
            >
              <ShoppingCart />
            </div>

            <div className="authority rounded-pill p-3">
              <Authority />
            </div>
          </div>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
