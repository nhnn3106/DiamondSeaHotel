import { Button } from "bootstrap";
import React from "react";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";

const Authority = () => {
  return (
    <button
      type="button"
      className="btn btn-light text-bg-light border rounded-5 p-md-3 authority"
    >
      <RxHamburgerMenu size={20} style={{ marginRight: "10px" }} />
      <RxAvatar size={20} />
    </button>
  );
};

export default Authority;
