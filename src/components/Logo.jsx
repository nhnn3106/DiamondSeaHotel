import React from "react";

import logo from "../assets/airbnb-logo.png";

const Logo = () => {
  return (
    <div className="d-flex align-items-center" style={{ width: "30px" }}>
      <img className="img-fluid me-2" src={logo} alt="" />
      <div className="text-danger fw-bold">airbnb</div>
    </div>
  );
};

export default Logo;
