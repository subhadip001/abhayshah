import { useEffect } from "react";

const YearPicker = ({ id, name, title, classname }) => {
  const currentYear = new Date().getFullYear();
  const minYear = 2000;
  const maxYear = 2030;

  useEffect(() => {
    const yearInput = document.getElementById(id);
    for (let year = maxYear; year >= minYear; year--) {
      const option = document.createElement("option");
      option.text = year;
      option.value = year;
      yearInput.add(option);
    }

    // Set the default selected year (you can adjust this value if needed)
    yearInput.value = currentYear;
  }, []);

  return (
    <div>
      <label htmlFor={id}>{title}</label>
      <select className={classname} id={id} name={name}></select>
    </div>
  );
};

export default YearPicker;
