import React, { useState } from "react";
import DatepickerModal from "./DatepickerModal/DatepickerModal";

const Input = (props) => {
  const [showDatepicker, setShowDatepicker] = useState(false);

  const toggleDatepicker = () => {
    setShowDatepicker(!showDatepicker);
  };

  return (
    <div className="d-flex flex-column" onClick={toggleDatepicker}>
      <span className="header__label">{props.labelName}</span>
      <span className="header__value">{props.valueName}</span>
      {showDatepicker && <DatepickerModal />}
    </div>
  );
};
export default Input;
