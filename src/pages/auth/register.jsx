import login from '../../assets/login3.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegirterForm from '../../features/auth/components/RegisterForm.jsx';
import { Button } from '../../components/ui/button';
import Image from 'src/assets/auth/auth_image.png';
import { useSelector, useDispatch } from 'react-redux';
import { constinueBtn } from '../../redux/slices/auth';
import PhonePopup from 'src/components/PhonePopup';

const Register = () => {
  const state = useSelector((store) => store.auth.isShowNextRegister);
  const showPhoneVerify = useSelector((store) => store.auth.showPhoneVerify);
  console.log(showPhoneVerify);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center sm:justify-between h-[100vh]">
      <img src={Image} alt="" className="w-0 object-cover sm:w-[50%]" />
      {showPhoneVerify && <PhonePopup />}
      <div className="flex h-[100vh] items-center justify-center my-5 relative flex-col w-[45%] ">
        {state ? (
          <button
            className=" mr-auto flex items-center gap-5 text-[#004280]"
            onClick={() => dispatch(constinueBtn(false))}
          >
            <svg
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 11L1 6L6 1"
                stroke="#004280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Назад
          </button>
        ) : (
          ''
        )}

        <div>
          <div className="flex flex-col justify-center items-center ">
            <h2 className="text-[28px] text-[#1B2126] font-normal">
              {state ? 'Данные фирмы' : 'Регистрация'}
            </h2>
            <h5 className="text-main font-[400] text-center w-[400px] mt-[12px]">
              {state
                ? 'Пожалуйста, заполните поля, чтобы зарегистрировать данные вашей фирмы'
                : 'Создайте учетную запись, чтобы получить доступ к нашим услугам и возможностям'}
            </h5>
          </div>
          <div className="flex justify-between w-[400px] mt-4">
            <div className="w-[200px] text-center">
              <h2
                className={` ${!state ? 'text-[#004280]' : 'text-[#D1DCE5]'} `}
              >
                Этап 1
              </h2>
              <span
                className={` ${!state ? 'bg-[#004280]' : 'bg-[#D1DCE5]'} mt-1 block h-[2px] w-full`}
              ></span>
            </div>
            <div className="w-[200px] text-center">
              <h2
                className={` ${state ? 'text-[#004280]' : 'text-[#D1DCE5]'} `}
              >
                Этап 2
              </h2>
              <span
                className={` ${state ? 'bg-[#004280]' : 'bg-[#D1DCE5]'} mt-1 block h-[2px] w-full`}
              ></span>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <RegirterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
