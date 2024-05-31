import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "/src/components/ui/button";
import { Input } from "/src/components/ui/input";
import { Link } from "react-router-dom";
import axiosIsntance from "src/utils/lib/axios";
import { useNavigate } from "react-router-dom";
import ReactInputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "src/redux/slices/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
const grant_type = import.meta.env.VITE_GRANT_TYPE;
const client_id = import.meta.env.VITE_CLIENT_ID;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;

const formSchema = z.object({
  email: z.string().min(13, {
    message: "Pleace enter correct email",
  }),
  password: z.string().min(6, {
    message: "Password must be least 6 charcter",
  }),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [changeBorder, setChangeBorder] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const formatChars = {
    "-": "[0-9]",
  };
  const onSubmit = async (data) => {
    if (data.email === "" && data.password === "") {
      setChangeBorder(true);
      return;
    }
    data.grant_type = grant_type;
    data.client_id = client_id;
    data.client_secret = client_secret;
    console.log(data);

    try {
      let { data: agencyInfo } = await axiosIsntance.post(
        "/admin/agency/sign-in/",
        data
      );
      if (agencyInfo) {
        localStorage.setItem("refresh_token", agencyInfo.refresh_token);
        localStorage.setItem("access_token", agencyInfo.access_token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (changeBorder) {
    setTimeout(() => {
      setChangeBorder(false);
    }, 3000);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 lg:space-y-3 w-[280px] sm:w-[400px] mx-auto"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#004280] text-[14px] ">
                Email
              </FormLabel>
              <FormControl>
                <div
                  className={`flex items-center ${changeBorder ? "border-red-500" : ""} border  rounded-lg px-3`}
                >
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
                    type="email"
                    {...field}
                    className="border-none  placeholder:text-[#9BB8CF] focus-visible:ring-0 focus-visible:ring-offset-0 "
                    placeholder="Введите почту"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full relative">
              <FormLabel className="text-[#004280] text-[14px] ">
                Пароль
              </FormLabel>
              <FormControl>
                <div
                  className={`flex items-center ${changeBorder ? "border-red-500" : ""} px-3 border rounded-lg`}
                >
                  <span>
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
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    className=" focus-visible:ring-0 placeholder:text-[#9BB8CF] focus-visible:ring-offset-0 border-none"
                    {...field}
                    style={{ outline: "none" }}
                  />
                </div>
              </FormControl>
              <button
                className="flex items-center absolute right-2 top-[35px] "
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {" "}
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-[100%] bg-[#004280]">
          Войти
        </Button>
        <button
          className="block ml-auto text-[14px] text-main font-[600]"
          onClick={() => dispatch(changePassword(true))}
        >
          Забыли пароль?
        </button>
        <div className="flex items-center ">
          <span className="h-[1px] bg-[#D1DCE5] block w-[45%]"></span>
          <p className="px-3 text-[#D1DCE5] font-[500]">Или</p>
          <span className="h-[1px] bg-[#D1DCE5] block w-[45%]"></span>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
