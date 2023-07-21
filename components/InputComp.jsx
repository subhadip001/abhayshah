import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const InputComp = ({
  label,
  type,
  name,
  id,
  required,
  placeholder,
  className,
  showSuggestions,
  getTotalFundByProjectNo,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    if (getTotalFundByProjectNo) {
      getTotalFundByProjectNo(inputValue);
    }

    // Fetch suggestions based on the input value if showSuggestions is true
    if (showSuggestions) {
      getDistinctProjectNo(inputValue);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion);
    if (getTotalFundByProjectNo) {
      getTotalFundByProjectNo(suggestion);
    }
    setSuggestions([]); // Clear suggestions after selecting one
  };

  const getDistinctProjectNo = async (inputValue) => {
    try {
      const res = await axios.get(
        " https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/getDistinctProjectNos"
      );
      // Filter the suggestions based on the input value
      const filteredSuggestions = res.data.filter((projectNo) =>
        projectNo.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      // Click is outside of the input field and suggestion box
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={inputRef} className="flex flex-col gap-2 relative">
      <label htmlFor={id}>{label} : </label>
      <input
        type={type}
        name={name}
        id={id}
        required={required}
        placeholder={placeholder}
        autoComplete="off"
        className="border outline-none px-3 py-2"
        value={value}
        onChange={handleInputChange}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="border w-full absolute top-full left-0 bg-white z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer border-b py-2 px-4 hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Set a default value for the showSuggestions prop
InputComp.defaultProps = {
  showSuggestions: false,
};

export default InputComp;
