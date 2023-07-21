import React, { useState, useEffect } from "react";

const SpecialInputComp = ({
  label,
  type,
  name,
  id,
  required,
  placeholder,
  className,
  totalFund,
  projectType,
  isDisabled,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputTextChange = (event) => {
    setInputText(event.target.value);
  };

  return type === "number" ? (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label} : </label>
      <input
        type={"text"}
        name={name}
        id={id}
        required={required}
        placeholder={placeholder}
        className="border outline-none px-3 py-2"
        value={totalFund === 0 ? inputValue : totalFund}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
    </div>
  ) : type === "text" ? (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label} : </label>
      <input
        type={type}
        name={name}
        id={id}
        required={required}
        placeholder={placeholder}
        className="border outline-none px-3 py-2"
        value={projectType === "" ? inputText : projectType}
        onChange={handleInputTextChange}
        disabled={isDisabled}
      />
    </div>
  ) : (
    <></>
  );
};

export default SpecialInputComp;
