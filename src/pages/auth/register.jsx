import login from "../../assets/login.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegirterForm from "../../features/auth/components/RegisterForm.jsx";
import { Button } from "../../components/ui/button";

const Register = () => {
  return (
    <div className="flex items-center justify-center my-10 flex-col">
      <div>
        <div className="flex justify-center items-center">
          <img src={login} alt="sigin logo" />
        </div>
        <div className="flex flex-col justify-center items-center mt-[24px]">
          <h2 className="text-[30px] text-[#101828] font-bold">
            Create your account
          </h2>
          <h5 className="text-[#475467] font-[400] mt-[12px]">
            Welcome back! Please enter your details.
          </h5>
        </div>
      </div>
      <div className="mt-[32px]">
        <RegirterForm />
      </div>
    </div>
  );
};

export default Register;
