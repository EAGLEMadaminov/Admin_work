import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CustomDropdown = ({ options }) => {
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
        ''
      )}
    </div>
  );
};

export default CustomDropdown;
