import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setShowPhoneVerify } from '../redux/slices/auth';
import AuthCode from 'react-auth-code-input';
import axiosIsntance from '../utils/lib/axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PhonePopup = () => {
  const navigate = useNavigate();
  const phoneNumber = useSelector((store) => store.auth.verifyPhoneNumber);
  const dispatch = useDispatch();
  const [time, setTime] = useState({ min: '00', second: 60 });
  const [disableBtn, setDisableBtn] = useState(true);

  const handleChange = async (value) => {
    const verifyData = {};
    if (value.length === 4) {
      verifyData.phone_number = phoneNumber;
      verifyData.code = value;
      console.log(verifyData);
      try {
        axiosIsntance.post('/oauth/verify/', verifyData).then((res) => {
          if (res.status === 200) {
            navigate('/auth/sign-in');
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    let countDown;
    if (time.second > 0) {
      countDown = setInterval(() => {
        setTime((prevValue) => {
          const newValue = prevValue.second - 1;
          if (newValue === 0) {
            clearInterval(countDown);
            setDisableBtn(false);
          }
          return { min: '00', second: newValue };
        });
      }, 1000);
    }
    return () => {
      clearInterval(countDown);
    };
  }, [time.second]);

  const sengMessageAgain = async () => {
    console.log(1);
    setTime({ min: '00', second: 60 });
    try {
      const { data } = await axiosIsntance.post('/oauth/send-sms/', {
        phone_number: phoneNumber,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-[350px] justify-center">
      {' '}
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
      <h2 className="text-[24px] text-center font-[600] text-[#022F5E]">
        Код подтверждения
      </h2>
      <h4 className="text-center ">
        Мы отправили код подтверждения на номер телефона:
      </h4>
      <p className="text-[18px] text-center my-3">{phoneNumber}</p>
      <div className="activation-code-div phone-auth">
        <AuthCode
          allowedCharacters="numeric"
          length={4}
          onChange={handleChange}
        />
      </div>
      <button
        disabled={disableBtn}
        onClick={sengMessageAgain}
        className={`mt-2 hover:text-[#4489F7] ${time.second === 0 ? 'text-[#4489F7]' : ''} text-[14px] text-[#121C25] text-left`}
      >
        Отправить еще один код{' '}
        <span className="text-[#121C25]">
          {time.min} : {String(time.second).padStart(2, 0)}
        </span>
      </button>
      <p className="mt-6">
        Авторизуясь, вы соглашаетесь с{' '}
        <Link className="text-[#4279F7]">
          политикой обработки персональных данных
        </Link>
      </p>
    </div>
  );
};

export default PhonePopup;
