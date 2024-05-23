import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { constinueBtn } from "../../../redux/slices/auth";
import ReactInputMask from "react-input-mask";
const EditInfo = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.auth.isShowNextRegister);
  const formatChars = {
    "-": "[0-9]",
  };
  return (
    <div>
      <button onClick={() => dispatch(constinueBtn(false))}>back</button>
      <form action="">
        {!state ? (
          <div>
            <label htmlFor="name">Name</label>
            <div className="border rounded-lg px-3">
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                className="border-none p-2 outline-none"
              />
            </div>
            <label htmlFor="phone">Phone</label>
            <div className="border rounded-lg px-3">
              <ReactInputMask
                mask="+998 -- --- -- --"
                placeholder="+998"
                id="phone"
                className="w-full p-2 px-3 placeholder:text-[#9BB8CF] rounded-lg outline-none"
                formatChars={formatChars}
              />
            </div>
            <label htmlFor="email">Email</label>
            <div className="border rounded-lg px-3">
              <input
                type="text"
                id="email"
                placeholder="Enter email"
                className="border-none p-2 outline-none"
              />
            </div>
            <label htmlFor="password">Password</label>
            <div className="border rounded-lg px-3">
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="border-none p-2 outline-none"
              />
            </div>
            <label htmlFor="confirm">Repeat password</label>
            <div className="border rounded-lg px-3">
              <input
                type="password"
                id="confirm"
                placeholder="Repeat password"
                className="border-none p-2 outline-none"
              />
            </div>
            <button type="button" onClick={() => dispatch(constinueBtn(true))}>
              Continue
            </button>
          </div>
        ) : (
          <div>
            <label htmlFor="logo">Logo</label>
            <div className="border rounded-lg px-3">
              <input
                type="file"
                id="logo"
                className="border-none p-2 outline-none"
              />
            </div>
            <label htmlFor="address">Address</label>
            <div className="border rounded-lg px-3">
              <input
                type="text"
                id="address"
                placeholder="Enter address"
                className="border-none p-2 outline-none"
              />
            </div>
            <label htmlFor="phone_client">Phone</label>
            <div className="border rounded-lg px-3">
              <ReactInputMask
                mask="+998 -- --- -- --"
                placeholder="+998"
                id="phone_client"
                className="w-full p-2 px-3 placeholder:text-[#9BB8CF] rounded-lg outline-none"
                formatChars={formatChars}
              />
            </div>
            <label htmlFor="licency">Number license</label>
            <div className="border rounded-lg px-3">
              <input
                type="text"
                id="licency"
                placeholder="Enter license number"
                className="border-none p-2 outline-none"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditInfo;
