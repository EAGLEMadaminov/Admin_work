import login from "../../assets/login3.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegirterForm from "../../features/auth/components/RegisterForm.jsx";
import { Button } from "../../components/ui/button";
import Image from "src/assets/login.jpeg";
import { useSelector } from "react-redux";

const Register = () => {
  const state = useSelector((store) => store.auth.isShowNextRegister);
  return (
    <div className="flex justify-center sm:justify-between  h-[100vh]">
      <img src={Image} alt="" className="w-0 object-cover sm:w-[50%]" />
      <div className="flex items-center justify-center my-5 flex-col w-[45%] ">
        {!state ? (
          <div>
            <div className="flex justify-center items-center">
              <img src={login} alt="sigin logo" className="w-[70px] h-[70px]" />
            </div>
            <div className="flex flex-col justify-center items-center ">
              <h2 className="text-[30px] text-[#101828] font-bold">
                Create your account
              </h2>
              <h5 className="text-[#475467] font-[400] mt-[12px]">
                Welcome back! Please enter your details.
              </h5>
            </div>
          </div>
        ) : (
          ""
        )}

        <div>
          <RegirterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
