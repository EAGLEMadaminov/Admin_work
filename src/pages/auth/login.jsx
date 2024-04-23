import login from "../../assets/login3.jpg";
import LoginForm from "../../features/auth/components/LoginForm.jsx";
import { Link } from "react-router-dom";
import Image from "src/assets/login.jpeg";
import { useSelector } from "react-redux";
import ResetPassword from "src/features/auth/components/ResetPassword";

const Login = () => {
  const state = useSelector((store) => store.auth);
  console.log(state.isForgotPassword);
  return (
    <div className="flex justify-center sm:justify-between  h-[100vh]">
      <img src={Image} alt="" className="w-0 object-cover sm:w-[50%]" />

      <div className="flex items-center justify-center w-[45%] h-[100vh] flex-col">
        <div>
          <div className="flex justify-center items-center">
            <img src={login} alt="sigin logo" className="w-[80px] h-[80px]" />
          </div>
        </div>
        {state.isForgotPassword ? (
          <div>
            <h2 className="text-[24px] sm:text-[30px] text-[#101828] font-bold text-center">
              Reset your Password
            </h2>
            <ResetPassword />
          </div>
        ) : (
          <div>
            <div className="flex flex-col justify-center items-center mt-[10px]">
              <h2 className="text-[24px] sm:text-[30px] text-[#101828] font-bold text-center">
                Log in to your account
              </h2>
              <h5 className="text-[#475467] font-[400] mt-[12px] text-center">
                Welcome back! Please enter your details.
              </h5>
            </div>
            <div className="mt-[20px]">
              <LoginForm />
              <p className="text-center  mt-3 text-[14px] text-gray-400">
                Don’t you have an account?
                <Link
                  to="/auth/sign-up"
                  className="text-[#0260E4]  font-semibold ml-2"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
