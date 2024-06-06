import React, { useState } from 'react';

const CustomCheckBox = ({ label, id, onCheckboxChange }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={(e) => {
            onCheckboxChange(e);
            setChecked(e.target.checked);
          }}
        />

        {checked ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="19"
              height="19"
              rx="5.5"
              fill="white"
            />
            <rect
              x="0.5"
              y="0.5"
              width="19"
              height="19"
              rx="5.5"
              stroke="#FF9B06"
            />
            <path
              d="M14.6668 6.5L8.25016 12.9167L5.3335 10"
              stroke="#FF9B06"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <div className="w-5 h-5 border rounded-[6px] "></div>
        )}
        <span className="text-[14px] font-[500] text-[#1B2126]">{label}</span>
      </label>
    </div>
  );
};

export default CustomCheckBox;
