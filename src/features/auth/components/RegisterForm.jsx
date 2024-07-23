import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import axiosIsntance from 'src/utils/lib/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactInputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { constinueBtn } from 'src/redux/slices/auth';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { setShowPhoneVerify, getPhoneNumber } from 'src/redux/slices/auth';

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from 'src/components/ui/form';

const formSchame = z.object({
  fullname: z.string().min(2, { message: 'Required Field' }),
  phone_number: z.string().min(13, { message: 'Please enter correct phone' }),
  email: z.string().min(7, { message: 'Enter correct email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be least 8 characters' }),
  password2: z
    .string()
    .min(8, { message: 'Password must be least 8 characters' }),
  address: z.string().min(2, { message: 'Address required' }),
  phone_client: z.string().min(13, { message: 'Please enter correct phone' }),
  license_number: z.string().min(2, { message: 'License number is required' }),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(false);
  const [clickCurrent, setClickCurrent] = useState(false);
  const [logoImage, setLogoImage] = useState('');
  const [gmailError, setGmailError] = useState('');
  const [phone1Error, setPhone1Error] = useState('');

  const handleGeolocationSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    setSelectedLocation({ lat: latitude, lng: longitude });
  };

  const handleGeolocationError = (error) => {
    console.error('Error getting geolocation:', error);
  };

  const getCurrentLocation = () => {
    setClickCurrent(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const dispatch = useDispatch();
  const state = useSelector((store) => store.auth.isShowNextRegister);
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  const formatchars = {
    '-': '[0-9]',
  };
  const form = useForm({
    resolver: zodResolver(formSchame),
    defaultValues: {
      fullname: '',
      phone_number: '',
      email: '',
      password: '',
      password2: '',
      address: '',
      phone_client: '',
      license_number: '',
    },
  });
  const onSubmit = async (data) => {
    setPhone1Error('');
    setGmailError('');
    data.logo = logoImage;
    const firstNumber = phoneValue.replace(/\s/g, '');
    data.phone_number = firstNumber;
    data.phone_client = data.phone_client.replace(/\s/g, '');
    data.lat = Number(String(selectedLocation.lat).slice(0, 7)).toFixed(3);
    data.long = Number(String(selectedLocation.lng).slice(0, 7)).toFixed(3);
    try {
      let { data: agency } = await axiosIsntance.post('/oauth/sign-up/', data);
      if (agency) {
        dispatch(getPhoneNumber(firstNumber));
        dispatch(setShowPhoneVerify(true));
      }
    } catch (error) {
      if (error.response.data?.email) {
        dispatch(constinueBtn(false));
        setGmailError("Bu email oldin registratsiyadan o'tgan");
      }
      if (error.response.data?.phone_number) {
        dispatch(constinueBtn(false));
        setPhone1Error("Bu raqam oldin registratsiyadan o'tgan");
      }
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      setImageSrc(reader.result);
    };
    try {
      let formData = new FormData();
      formData.append('file', file);
      const { data } = await axiosIsntance.post('/file/upload/', formData, {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (data) {
        setLogoImage(data.file);
      }
    } catch (error) {
      console.log(error);
    }
    reader.readAsDataURL(file);
  };

  const onError = (errors) => {
    console.error('Form submission errors:', errors);
  };

  const handleCheckPhoneValueBtn = (value) => {
    setPhoneValue(value);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className=" w-[400px] mx-auto"
        >
          {!state ? (
            <div>
              <FormField
                control={form.control}
                name="fullname"
                key="fullname"
                className="active:border-none"
                render={({ field }) => (
                  <FormItem className="w-full active:border-none relative border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                    <FormLabel className="text-[#004280] text-[14px]">
                      Имя <span className="text-rose-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-lg px-3">
                        <span className="text-[#9BB8CF]">
                          <svg
                            width="16"
                            height="14"
                            viewBox="0 0 16 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.42822 12.625C2.42228 10.9669 4.60093 9.83214 7.99993 9.83214C11.3989 9.83214 13.5776 10.9669 14.5716 12.625M10.6999 4.075C10.6999 5.56617 9.4911 6.775 7.99993 6.775C6.50876 6.775 5.29993 5.56617 5.29993 4.075C5.29993 2.58383 6.50876 1.375 7.99993 1.375C9.4911 1.375 10.6999 2.58383 10.6999 4.075Z"
                              stroke="#9BB8CF"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <Input
                          placeholder="Введите имя"
                          className="placeholder:text-[#9BB8CF] active:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0  border-none active:border-none outline-none focus:outline-none focus:border-transparent"
                          type="text"
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-end mt-3">
                <FormField
                  control={form.control}
                  name="phone_number"
                  key="phone_number"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                      onChange={(e) => handleCheckPhoneValueBtn(e.target.value)}
                      value={phoneValue}
                    >
                      <FormLabel className="text-[#004280] text-[14px] font-[500]">
                        Телефон <span className="text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex px-3 items-center border  rounded-lg">
                          <span>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.4976 14.0781C15.4976 14.0781 14.6286 14.9316 14.4157 15.1819C14.0688 15.5521 13.66 15.7269 13.1242 15.7269C13.0727 15.7269 13.0177 15.7269 12.9662 15.7235C11.9461 15.6583 10.9981 15.2607 10.2871 14.9214C8.34298 13.9822 6.6359 12.6488 5.21734 10.9589C4.04608 9.55007 3.26295 8.24753 2.7443 6.849C2.42487 5.99549 2.30809 5.33051 2.35961 4.70323C2.39396 4.30218 2.54852 3.96969 2.83361 3.68518L4.00487 2.51632C4.17317 2.35864 4.35178 2.27295 4.52695 2.27295C4.74334 2.27295 4.91851 2.4032 5.02843 2.51289C5.03186 2.51632 5.0353 2.51975 5.03873 2.52318C5.24825 2.71856 5.44747 2.9208 5.65699 3.13674C5.76347 3.24643 5.87338 3.35612 5.98329 3.46924L6.92099 4.40501C7.28507 4.76836 7.28507 5.10428 6.92099 5.46762C6.82138 5.56702 6.72521 5.66643 6.6256 5.7624C6.33708 6.05719 6.56373 5.831 6.2649 6.09837C6.25803 6.10522 6.25116 6.10865 6.24773 6.11551C5.95234 6.41029 6.00729 6.69823 6.06912 6.89361C6.07255 6.90389 6.07599 6.91417 6.07942 6.92446C6.32329 7.51403 6.66677 8.06933 7.18885 8.73088L7.19229 8.73431C8.14029 9.89975 9.13981 10.8081 10.2424 11.5039C10.3832 11.5931 10.5275 11.665 10.6648 11.7336C10.7885 11.7953 10.9053 11.8536 11.0049 11.9153C11.0186 11.9221 11.0324 11.9324 11.0461 11.9393C11.1629 11.9975 11.2728 12.025 11.3861 12.025C11.6712 12.025 11.8498 11.8467 11.9082 11.7884L12.5815 11.1166C12.6983 11 12.8838 10.8595 13.1001 10.8595C13.3131 10.8595 13.4883 10.9932 13.5948 11.1097C13.5982 11.1131 13.5982 11.1131 13.6016 11.1166L15.4942 13.0053C15.848 13.3549 15.4976 14.0781 15.4976 14.0781Z"
                                stroke="#9BB8CF"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <ReactInputMask
                            {...field}
                            mask="998 -- --- -- --"
                            placeholder="998"
                            className="w-full p-2 px-3 rounded-lg placeholder:text-[#9BB8CF]  outline-none"
                            formatChars={formatchars}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {phone1Error ? (
                <p className="text-red-500 text-[12px]">{phone1Error}</p>
              ) : (
                ''
              )}
              <FormField
                control={form.control}
                name="email"
                key="email"
                render={({ field }) => (
                  <FormItem className="border-none outline-none mt-3">
                    <FormLabel className="text-[#004280] text-[14px] font-[500]">
                      Email <span className="text-rose-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center  px-3 border rounded-lg">
                        <span>
                          <svg
                            width="16"
                            height="12"
                            viewBox="0 0 16 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.51563 2.0625L7.51973 5.65519C7.80867 5.86263 8.19133 5.86263 8.48027 5.65519L13.4844 2.0625M2.9375 11.25H13.0625C13.9945 11.25 14.75 10.4665 14.75 9.5V2.5C14.75 1.5335 13.9945 0.75 13.0625 0.75H2.9375C2.00552 0.75 1.25 1.5335 1.25 2.5V9.5C1.25 10.4665 2.00552 11.25 2.9375 11.25Z"
                              stroke="#9BB8CF"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Введите почту"
                          className=" w-full placeholder:text-[#9BB8CF] border-none focus-visible:ring-offset-0 focus-visible:ring-0 p-2 px-3 rounded-lg outline-none"
                          formatChars={formatchars}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {gmailError ? (
                <p className="text-red-500 text-[12px]">{gmailError}</p>
              ) : (
                ''
              )}
              <FormField
                control={form.control}
                name="password"
                key="password"
                render={({ field }) => (
                  <FormItem className="w-full mt-3">
                    <FormLabel className="text-[#004280] text-[14px] font-[500]">
                      Пароль <span className="text-rose-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center relative border rounded-lg px-3">
                        <span className="text-[#004280]">
                          <svg
                            width="15"
                            height="16"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.625 5.66667V5C2.625 2.78413 4.7994 1 7.5 1C10.2006 1 12.375 2.78413 12.375 5V5.66667M2.625 5.66667C1.73125 5.66667 1 6.26667 1 7V13.6667C1 14.4 1.73125 15 2.625 15H12.375C13.2688 15 14 14.4 14 13.6667V7C14 6.26667 13.2688 5.66667 12.375 5.66667M2.625 5.66667H12.375"
                              stroke="#9BB8CF"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <Input
                          placeholder="Введите пароль"
                          name="password"
                          key="password"
                          id="password"
                          className="border-none placeholder:text-[#9BB8CF] focus-visible:ring-offset-0 focus-visible:ring-0 outline-none"
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                        />
                        <button
                          className="flex items-center absolute right-2 top-[13px]"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {!showPassword ? (
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password2"
                key="password2"
                render={({ field }) => (
                  <FormItem className="w-full mt-3">
                    <FormLabel className="text-[#004280] text-[14px] font-[500]">
                      Подтвердите пароль{' '}
                      <span className="text-rose-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center relative border rounded-lg px-3">
                        <span className="text-[#004280]">
                          <svg
                            width="15"
                            height="16"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.625 5.66667V5C2.625 2.78413 4.7994 1 7.5 1C10.2006 1 12.375 2.78413 12.375 5V5.66667M2.625 5.66667C1.73125 5.66667 1 6.26667 1 7V13.6667C1 14.4 1.73125 15 2.625 15H12.375C13.2688 15 14 14.4 14 13.6667V7C14 6.26667 13.2688 5.66667 12.375 5.66667M2.625 5.66667H12.375"
                              stroke="#9BB8CF"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <Input
                          placeholder="Введите пароль"
                          className="border-none placeholder:text-[#9BB8CF] focus-visible:ring-offset-0 focus-visible:ring-0 outline-none"
                          value={password}
                          type={showConfirmPassword ? 'text' : 'password'}
                          {...field}
                        />
                        <button
                          className="flex items-center absolute right-2 top-[13px] "
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {' '}
                          {!showConfirmPassword ? (
                            <span>
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
                            </span>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                onClick={() => dispatch(constinueBtn(true))}
                type="button"
                className="w-full p-[10px] px-[13px] hover:bg-primary/90 text-white rounded-[8px] mt-3 bg-[#004280]"
              >
                Далее
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="image"
                  className="text-[#004280] font-[500] text-[14px]"
                >
                  Логотип <span className="text-rose-500">*</span>
                </label>
                <p className="text-[#9BB8CF] text-[12px]">
                  Форматы: Png,Svg,Jpg
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-1 mb-3">
                <div
                  className={`w-[100%] p-2 px-3 rounded-lg gap-3 flex item-center mx-auto items-center `}
                >
                  <input
                    type="file"
                    className="opacity-0 absolute"
                    id="image"
                    key="file"
                    readOnly
                    onChange={handleImageChange}
                    placeholder="Выберите файл"
                    accept="image/png, image/jpg, image/jpeg, image/webp, image/heic"
                  />
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      className="w-[100px] h-[30px] mx-auto object-cover"
                      alt={imageSrc}
                    />
                  ) : (
                    <svg
                      width="12"
                      height="15"
                      viewBox="0 0 12 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.875 0.75V4.125C6.875 4.59099 7.26675 4.96875 7.75 4.96875H11.25M7.02513 0.75H2.5C1.5335 0.75 0.75 1.50552 0.75 2.4375V12.5625C0.75 13.4945 1.5335 14.25 2.5 14.25H9.5C10.4665 14.25 11.25 13.4945 11.25 12.5625V4.82399C11.25 4.37643 11.0656 3.94721 10.7374 3.63074L8.26256 1.24426C7.93437 0.92779 7.48925 0.75 7.02513 0.75Z"
                        stroke="#9BB8CF"
                        strokeWidth="1.2"
                      />
                    </svg>
                  )}
                  {imageSrc ? (
                    ' '
                  ) : (
                    <p className="text-[#9BB8CF] text-[14px] ">Выберите файл</p>
                  )}
                </div>
              </div>
              <FormField
                constrol={form.control}
                name="address"
                key="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#004280] text-[14px] font-[500]">
                      Адрес <span className="text-rose-500">*</span>
                    </FormLabel>
                    <div className="flex items-center border rounded-lg px-3">
                      <svg
                        width="14"
                        height="17"
                        viewBox="0 0 14 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.00002 15.6998C7.00002 15.6998 12.6348 10.6911 12.6348 6.93459C12.6348 3.82258 10.112 1.2998 7.00002 1.2998C3.88801 1.2998 1.36523 3.82258 1.36523 6.93459C1.36523 10.6911 7.00002 15.6998 7.00002 15.6998Z"
                          stroke="#9BB8CF"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M8.80025 6.69992C8.80025 7.69403 7.99436 8.49992 7.00025 8.49992C6.00613 8.49992 5.20025 7.69403 5.20025 6.69992C5.20025 5.70581 6.00613 4.89992 7.00025 4.89992C7.99436 4.89992 8.80025 5.70581 8.80025 6.69992Z"
                          stroke="#9BB8CF"
                          strokeWidth="1.2"
                        />
                      </svg>

                      <FormControl>
                        <Input
                          placeholder="Введите адрес"
                          className="focus-visible:ring-0 placeholder:text-[#9BB8CF]  border-none focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-3">
                <LoadScript googleMapsApiKey="AIzaSyDaZ10eIqb3u2d4t9uNBFSrTQUhj1iDP_w">
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '200px' }}
                    center={
                      clickCurrent
                        ? selectedLocation
                        : { lat: 41.311081, lng: 69.240562 }
                    }
                    zoom={15}
                    onClick={handleMapClick}
                  >
                    {selectedLocation && <Marker position={selectedLocation} />}
                  </GoogleMap>
                  <button
                    type="button"
                    className="mx-auto w-full text-center"
                    onClick={getCurrentLocation}
                  >
                    Turgan joyni aniqlash
                  </button>
                </LoadScript>
              </div>

              <FormField
                constrol={form.control}
                name="phone_client"
                key="phone_client"
                render={({ field }) => (
                  <FormItem
                    className="w-full mt-3"
                    onChange={(e) => handleCheckPhoneValueBtn(e.target.value)}
                    value={phoneValue}
                  >
                    <FormLabel className="text-[#004280] text-[14px] font-[500]">
                      Телефон для клиентов{' '}
                      <span className="text-rose-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex px-3 items-center border  rounded-lg">
                        <span>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.4976 14.0781C15.4976 14.0781 14.6286 14.9316 14.4157 15.1819C14.0688 15.5521 13.66 15.7269 13.1242 15.7269C13.0727 15.7269 13.0177 15.7269 12.9662 15.7235C11.9461 15.6583 10.9981 15.2607 10.2871 14.9214C8.34298 13.9822 6.6359 12.6488 5.21734 10.9589C4.04608 9.55007 3.26295 8.24753 2.7443 6.849C2.42487 5.99549 2.30809 5.33051 2.35961 4.70323C2.39396 4.30218 2.54852 3.96969 2.83361 3.68518L4.00487 2.51632C4.17317 2.35864 4.35178 2.27295 4.52695 2.27295C4.74334 2.27295 4.91851 2.4032 5.02843 2.51289C5.03186 2.51632 5.0353 2.51975 5.03873 2.52318C5.24825 2.71856 5.44747 2.9208 5.65699 3.13674C5.76347 3.24643 5.87338 3.35612 5.98329 3.46924L6.92099 4.40501C7.28507 4.76836 7.28507 5.10428 6.92099 5.46762C6.82138 5.56702 6.72521 5.66643 6.6256 5.7624C6.33708 6.05719 6.56373 5.831 6.2649 6.09837C6.25803 6.10522 6.25116 6.10865 6.24773 6.11551C5.95234 6.41029 6.00729 6.69823 6.06912 6.89361C6.07255 6.90389 6.07599 6.91417 6.07942 6.92446C6.32329 7.51403 6.66677 8.06933 7.18885 8.73088L7.19229 8.73431C8.14029 9.89975 9.13981 10.8081 10.2424 11.5039C10.3832 11.5931 10.5275 11.665 10.6648 11.7336C10.7885 11.7953 10.9053 11.8536 11.0049 11.9153C11.0186 11.9221 11.0324 11.9324 11.0461 11.9393C11.1629 11.9975 11.2728 12.025 11.3861 12.025C11.6712 12.025 11.8498 11.8467 11.9082 11.7884L12.5815 11.1166C12.6983 11 12.8838 10.8595 13.1001 10.8595C13.3131 10.8595 13.4883 10.9932 13.5948 11.1097C13.5982 11.1131 13.5982 11.1131 13.6016 11.1166L15.4942 13.0053C15.848 13.3549 15.4976 14.0781 15.4976 14.0781Z"
                              stroke="#9BB8CF"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <ReactInputMask
                          {...field}
                          mask="998 -- --- -- --"
                          placeholder="998"
                          className="w-full p-2 px-3 placeholder:text-[#9BB8CF] rounded-lg outline-none"
                          formatChars={formatchars}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                constrol={form.control}
                name="license_number"
                key="licency"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <label className="text-[#004280] text-[14px] font-[500]">
                      Номер лицензии <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex items-center px-3 border rounded-lg">
                      <svg
                        width="15"
                        height="10"
                        viewBox="0 0 15 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.194 4.522C11.718 4.522 11.2887 4.424 10.906 4.228C10.5327 4.032 10.2387 3.76133 10.024 3.416C9.80933 3.07067 9.702 2.68333 9.702 2.254C9.702 1.82467 9.80933 1.43733 10.024 1.092C10.2387 0.746667 10.5327 0.480667 10.906 0.294C11.2887 0.0979999 11.718 0 12.194 0C12.67 0 13.0947 0.0979999 13.468 0.294C13.8507 0.480667 14.1447 0.746667 14.35 1.092C14.5647 1.43733 14.672 1.82467 14.672 2.254C14.672 2.68333 14.5647 3.07067 14.35 3.416C14.1447 3.76133 13.8507 4.032 13.468 4.228C13.0947 4.424 12.67 4.522 12.194 4.522ZM7.028 0.0839998H8.428V9.884H7.28L1.4 2.576V9.884H0V0.0839998H1.148L7.028 7.392V0.0839998ZM12.194 0.798C11.7273 0.798 11.3493 0.933333 11.06 1.204C10.78 1.47467 10.64 1.82467 10.64 2.254C10.64 2.68333 10.7847 3.03333 11.074 3.304C11.3633 3.57467 11.7367 3.71 12.194 3.71C12.6513 3.71 13.02 3.57467 13.3 3.304C13.5893 3.03333 13.734 2.68333 13.734 2.254C13.734 1.82467 13.5893 1.47467 13.3 1.204C13.02 0.933333 12.6513 0.798 12.194 0.798ZM9.982 5.628H14.406V6.538H9.982V5.628Z"
                          fill="#9BB8CF"
                        />
                      </svg>
                      <FormControl>
                        <Input
                          placeholder="Введите адрес"
                          name="licency_number"
                          className="border-none placeholder:text-[#9BB8CF] outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-[100%] mt-5 bg-[#004280]">
                Регистрация
              </Button>
            </div>
          )}
        </form>
      </Form>

      {state ? (
        ''
      ) : (
        <p className="text-center mt-10 text-[14px] text-main">
          У вас уже есть учетная запись?
          <Link
            to="/auth/sign-in"
            className="text-[#0B77E6] ml-2 font-semibold"
          >
            Войти
          </Link>{' '}
        </p>
      )}
    </>
  );
};

export default RegisterForm;
