import React, { useState } from "react";
import DatepickerModal from "./DatepickerModal/DatepickerModal";

const Input = (props) => {
  const [showDatepicker, setShowDatepicker] = useState(false);

  return (
    <div className="d-flex flex-column">
      <span className="header__label">{props.labelName}</span>
      <span className="header__value">{props.valueName}</span>
      {props.isDateInput && showDatepicker && <DatepickerModal />}
    </div>
  );
};
export default Input;
