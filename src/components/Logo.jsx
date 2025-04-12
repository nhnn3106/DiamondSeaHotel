import React from "react";

import logo from "../assets/airbnb-logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="d-flex align-items-center" style={{ width: "30px" }}>
      <img className="img-fluid me-2" src={logo} alt="" />
      {/* <Link to="/">
        About
      </Link> */}
      <div className="text-danger fw-bold">airbnb</div>
    </div>
  );
};

export default Logo;
