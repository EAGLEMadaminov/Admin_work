import { useState } from 'react';
import ReactInputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setShowPhoneVerify } from '../redux/slices/auth';
import AuthCode from 'react-auth-code-input';

const PhonePopup = () => {
  const [phoneValue, setPhoneValue] = useState('');
  const [showAuthCode, setShowAuthCode] = useState(false);
  const dispatch = useDispatch();
  const formatchars = {
    '-': '[0-9]',
  };

  const handleSubmitPhone = () => {
    let phone = {};
    phone.phone_number = phoneValue;
    if (phoneValue) {
      setShowAuthCode(true);
    }
  };

  const handleChange = (value) => {
    if (value.length === 6) {
      console.log(value);
    }
  };
  return (
    <div className="absolute flex items-center  left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.4)] z-[5]">
      <div className="flex justify-center rounded-xl min-h-[300px] mx-auto flex-col p-5 w-[370px]  bg-white ">
        <button
          className="ml-auto mr-5 text-[#000]"
          onClick={() => dispatch(setShowPhoneVerify(false))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
        <h2 className="text-[24px] font-[600] text-[#000]">
          Введите номер телефона
        </h2>
        <p className="text-[18px]">Отправим смс с кодом подтверждения</p>
        <ReactInputMask
          mask="998 -- --- -- --"
          placeholder="998"
          onChange={(e) => setPhoneValue(e.target.value)}
          className="w-full my-5 p-2 bg-[#F3F4F7] px-3 rounded-lg placeholder:text-[#9BB8CF]  outline-none"
          formatChars={formatchars}
        />
        {showAuthCode ? (
          <div className="activation-code-div phone-auth">
            <AuthCode allowedCharacters="numeric" onChange={handleChange} />
          </div>
        ) : (
          <button
            className="bg-[#7F56D9] py-[10px] px-[18px] text-white rounded-[8px]"
            onClick={handleSubmitPhone}
          >
            Получить код
          </button>
        )}

        <p className="mt-10">
          Авторизуясь, вы соглашаетесь с{' '}
          <Link className="text-[#4279F7]">
            политикой обработки персональных данных
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PhonePopup;
