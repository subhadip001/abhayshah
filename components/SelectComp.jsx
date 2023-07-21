import React from "react";

const SelectComp = ({
  label,
  className,
  name,
  id,
  required,
  optionTitle,
  optionValues,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="p-type">{label} : </label>
      <select
        className="border outline-none  px-3 py-2"
        name={name}
        id={id}
        required={required}
      >
        <option value="" className="text-gray-400">
          {optionTitle}
        </option>
        {optionValues.map((optionValue, i) => (
          <option key={i} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComp;
