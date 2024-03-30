import React, { useState } from "react";
import { Button } from "src/components/ui/button";
import AuthCodeInput from "react-auth-code-input";
import InputMask from "react-input-mask";

const Activation = () => {
  const [showActivation, setShowActivation] = useState(false);
  const [phone, setPhone] = useState("");
  const handleCodeChange = (code) => {
    console.log(code);
  };
  const handleClickBtn = () => {
    console.log("+998" + phone);
    setShowActivation(true);
    setPhone("");
  };
  return (
    <div className="w-[400px] p-[10px] flex flex-col items-center justify-center mx-auto h-[100vh]">
      {" "}
      <div>
        <div className="flex flex-col justify-center items-center mt-[24px]">
          <h2 className="text-[30px] text-[#101828] font-bold">
            Введите номер телефона
          </h2>
          <h5 className="text-[#475467] text-center font-[400] mt-[12px]">
            Отправим смс с кодом подтверждения
          </h5>
        </div>
      </div>
      <div className=" activation-code-div mt-5">
        {showActivation ? (
          <AuthCodeInput
            length={5}
            onChange={handleCodeChange}
            inputClassName="w-[50px] h-[50px] border border-[#7F56D9] text-[30px] text-center text-[#7F56D9] rounded-lg"
            inputFocusStyle={{
              outline: "none",
              boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.1)",
              border: "1px solid #333",
            }}
          />
        ) : (
          <div className="flex items-center">
            <p>+998</p>
            <InputMask
              mask="99 999 99 99"
              placeholder="00 000-00-00"
              onChange={(e) => setPhone(e.target.value)}
              className="outline-none"
            />
          </div>
        )}
      </div>
      <Button onClick={handleClickBtn} className="bg-[#7F56D9] my-7 w-full">
        Получить код
      </Button>
      <div className="px-2">
        <p className="text-[#475467] font-normal inline">
          Авторизуясь, вы соглашаетесь с{" "}
          <span className="text-[#6941C6] bg-transparent ml-1 font-[300] inline">
            политикой обработки персональных данных
          </span>
        </p>
      </div>
    </div>
  );
};

export default Activation;
