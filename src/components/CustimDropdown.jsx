import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const options = [
  {
    value: "option1",
    label: "Abduvasit",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-person-fill"
        viewBox="0 0 16 16"
      >
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
      </svg>
    ),
  },
  {
    value: "option2",
    label: "Option 2",
    icon: (
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.707a1 1 0 10-1.414 1.414L10 10.586 7.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    value: "option3",
    label: "Option 3",
    icon: (
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.707a1 1 0 10-1.414 1.414L10 10.586 7.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

const CustomDropdown = () => {
  const [selected, setSelected] = useState(options[0]);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (option) => {
    setShowOptions(false);
    setSelected(option);
  };

  return (
    <div
      className="relative w-[170px] flex "
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="w-full  gap-[10px]   text-text  bg-[#EDF2F6] rounded-[10px] p-2 px-3 flex items-center justify-between"
        onClick={() => {
          setShowOptions(true);
        }}
      >
        <span className="flex justify-between items-center gap-[15px]">
          {selected.icon}
          {selected.label}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          className="bi bi-caret-down-fill text-text"
          viewBox="0 0 16 16"
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </button>
      {showOptions ? (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
          <ul>
            {options.map((option) => (
              <li
                key={option.value}
                className="flex items-center gap-3 text-text  cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(option)}
              >
                {option.icon}
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CustomDropdown;
