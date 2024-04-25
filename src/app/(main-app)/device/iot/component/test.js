"use client";
import React, { useEffect, useState} from "react";

const SelectComponent = () => {
  const [selectedOption, setSelectedOption] = useState(({ id: '', label: '' }));

  const options = [
    { id: 1, label: 'Option 1' , name: "green"},
    { id: 2, label: 'Option 2' , name: "red"},
    { id: 3, label: 'Option 3' , name: "blue"},
  ];

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selected = options.find(option => option.id === parseInt(selectedValue));
    setSelectedOption(selected);
    console.log(selected.id)
    console.log(options)
  };

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <div>
        {/* <p>Selected ID: {selectedOption.id}</p>
        <p>Selected Label: {selectedOption.label}</p> */}
      </div>
    </div>
  );
};

export default SelectComponent;