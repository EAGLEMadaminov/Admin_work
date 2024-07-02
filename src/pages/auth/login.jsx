import { useState } from 'react';
import LoginForm from '../../features/auth/components/LoginForm.jsx';
import { Link } from 'react-router-dom';
import Image from 'src/assets/auth/auth_image.png';
import { useSelector } from 'react-redux';
import ResetPassword from 'src/features/auth/components/ResetPassword';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import ReactFacebookLogin from 'react-facebook-login';
const Login = () => {
  const [user, setUser] = useState(null);

  const state = useSelector((store) => store.auth);
  console.log(state.isForgotPassword);

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {

      console.log('Login Success:', response);
      // Handle the response
    },
    onError: () => {
      console.error('Login Failed');
    },
  });
  // const handleLoginSuccess = (response) => {
  //   const token = response.credential;
  //   const decoded = jwtDecode(token);
  //   setUser(decoded);
  //   console.log(user.email);
  //   console.log('Login Success:', decoded);
  // };

  // const handleLoginFailure = (response) => {
  //   console.log('Login Failed:', response);
  // };

  const responseFacebook = (response) => {
    console.log(response);
  };
  return (
    <div className="flex justify-center sm:justify-between  h-[100vh]">
      <img src={Image} alt="" className="w-0 object-cover sm:w-[50%]" />

      <div className="flex items-center justify-center w-[45%] h-[100vh] flex-col">
        <div>
          <div className="flex justify-center items-center"></div>
        </div>
        {state.isForgotPassword ? (
          <div>
            <h2 className="text-[24px] sm:text-[30px] text-[#101828] font-bold text-center">
              Reset your Password
            </h2>
            <ResetPassword />
          </div>
        ) : (
          <div className="w-[400px]">
            <div className="flex flex-col justify-center items-center mt-[10px]">
              <h2 className="text-[24px] sm:text-[28px] text-[#1B2126] font-[600] text-center">
                Добро пожаловать!
              </h2>
              <h5 className="text-main font-[400] mt-[12px] text-center">
                Пожалуйста, введите свои учетные данные для входа в систему.
              </h5>
            </div>
            <div className="mt-[20px]">
              <LoginForm />
              <div className="flex justify-between my-5">
                <GoogleOAuthProvider clientId="1014028294467-ktj01p2tg62aqlgh27qcvmr0fq6krqbb.apps.googleusercontent.com">
                  <div className="App">
                    <button onClick={googleLogin} className="py-[5px] flex items-center text-[12px] px-[10px] text-white font-[500] rounded-lg bg-[#FF9B06]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-google mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                      </svg>
                      Sign up with Google
                    </button>
                  </div>
                </GoogleOAuthProvider>

                <ReactFacebookLogin
                  appId="1088597931155576"
                  autoLoad={true}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  icon="fa-facebook"
                  cssClass="facebook-login"
                  textButton="Login with Facebook"
                />
                {/* <button className="py-[5px] flex items-center text-[12px] px-[10px] border rounded-lg border-[#004280] text-[#004280] font-[500]">
                  <svg
                    width={16}
                    height={16}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="mr-2"
                  >
                    <path
                      fill="#004280"
                      d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                    />
                  </svg>
                  Sign up with Facebook
                </button> */}
              </div>
              <p className="text-center  mt-[100px] text-[14px] text-main">
                У вас нет учетной записи?
                <Link
                  to="/auth/sign-up"
                  className="text-[#004280]  font-bold ml-2"
                >
                  Зарегистрируйтесь
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
