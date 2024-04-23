import React, { useState } from "react";
import ReactInputMask from "react-input-mask";
import { Button } from "src/components/ui/button";
import axiosIsntance from "src/utils/lib/axios";
import AuthCodeInput from "react-auth-code-input";
import { useDispatch } from "react-redux";
import { changePassword } from "src/redux/slices/auth";

const ResetPassword = () => {
  const [phoneValue, setPhoneValue] = useState("");
  const [showActivation, setShowActivation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeText, setChangeText] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorText, setErrorText] = useState("");
  const dispatch = useDispatch();
  const formatChars = {
    "-": "[0-9]",
  };
  const handleForgetBtn = async () => {
    let phone = {};
    phone.phone_number = phoneValue.replace(/\s/g, "");
    try {
      let { data } = await axiosIsntance.post("/auth/forget-password/", phone);
      if (data) {
        console.log(data);
        setShowActivation(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleActivation = async (value) => {
    let activation = {};
    activation.phone_number = phoneValue.replace(/\s/g, "");
    activation.code = value;
    if (value.length === 5) {
      try {
        let { data } = await axiosIsntance.post(
          "/auth/confirm-phone/",
          activation
        );
        if (data) {
          localStorage.setItem("access_token", data.access_token);
          setShowPassword(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleResetBtn = async () => {
    let resetData = {};
    resetData.password = password;
    resetData.password_confirm = confirmPassword;
    let token = localStorage.getItem("access_token");
    try {
      let { data } = await axiosIsntance.post(
        "/auth/reset-password/",
        resetData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        dispatch(changePassword(false));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleConfirm = (value) => {
    if (value === password) {
      setConfirmPassword(value);
      setErrorText("");
    } else {
      setErrorText("confirm dosn't same to password");
    }
  };
  return (
    <div className="mt-10">
      <form className="flex flex-col space-y-8 ">
        {showPassword ? (
          <div className="flex flex-col space-y-5 ">
            <label htmlFor="password">
              New Password
              <div className="w-full  relative border mt-2 p-2 px-3 rounded-lg border-[#222] flex">
                <input
                  type={!changeText ? "password" : "text"}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none"
                />
                <button
                  className="flex items-center absolute right-2 top-[12px] "
                  type="button"
                  onClick={() => setChangeText(!changeText)}
                >
                  {" "}
                  {!changeText ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye-slash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                      <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                    </svg>
                  )}
                </button>
              </div>
            </label>
            <label htmlFor="confirm">
              Confirm Password
              <div className="w-full relative border mt-2 p-2 px-3 rounded-lg border-[#222] flex">
                <input
                  type={showConfirm ? "text" : "password"}
                  id="password"
                  onChange={(e) => handleConfirm(e.target.value)}
                  className="outline-none"
                />
                <button
                  className="flex items-center absolute right-2 top-[12px] "
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {" "}
                  {!showConfirm ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye-slash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                      <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                    </svg>
                  )}
                </button>
              </div>
              {errorText ? (
                <span className="text-rose-500 mt-3 text-[14px]">
                  {errorText}
                </span>
              ) : (
                ""
              )}
            </label>
          </div>
        ) : (
          <div>
            <label htmlFor="phone">
              Phone number
              <ReactInputMask
                formatChars={formatChars}
                mask="+998 -- --- -- --"
                onChange={(e) => setPhoneValue(e.target.value)}
                id="phone"
                placeholder="+998"
                className="w-full border mt-3 p-2 px-3 rounded-lg border-[#222]"
              />
            </label>
            {showActivation ? (
              <div className="flex w-[200px] mt-7 activation-code-div">
                <AuthCodeInput length={5} onChange={handleActivation} />
              </div>
            ) : (
              ""
            )}
            <Button
              type="button"
              className="w-[100%] bg-[#0B77E6] mt-10"
              onClick={handleForgetBtn}
            >
              Send Phone
            </Button>
          </div>
        )}
        {showPassword ? (
          <Button
            type="button"
            className="w-[100%] bg-[#0B77E6] mt-10"
            onClick={handleResetBtn}
          >
            Reset Password
          </Button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
