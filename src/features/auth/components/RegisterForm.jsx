import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import axiosIsntance from "src/utils/lib/axios";
import { useNavigate } from "react-router-dom";
import AuthCodeInput from "react-auth-code-input";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ReactInputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { constinueBtn } from "src/redux/slices/auth";
import {
  grant_type,
  client_id,
  client_secret,
} from "src/utils/util/constants.js";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "src/components/ui/form";

const formSchame = z.object({
  phone_number_2: z.string().min(13, {
    message: "Please enter correct phone",
  }),
  password: z.string().min(8, {
    message: "Password must be least 8 characters",
  }),
  name: z.string().min(2, {
    message: "Required Field",
  }),
  licence_number: z.string().min(2, {
    message: "License number is required",
  }),
  address: z.string().min(2, {
    message: "Address required",
  }),
  tg_username: z.string(),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState("");
  const token = localStorage.getItem("access_token");
  const [sendImage, setSendImage] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showActivation, setShowActivation] = useState(false);
  const [password, setPassword] = useState("");
  const [showNext, setShowNext] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((store) => store.auth.isShowNextRegister);
  const formatChars = {
    "-": "[0-9]",
  };
  const form = useForm({
    resolver: zodResolver(formSchame),
    defaultValues: {
      phone_number_2: "",
      name: "",
      licence_number: "",
      address: "",
      tg_username: "",
      licence_image: "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    data.licence = sendImage;
    data.phone_number = phoneValue.replace(/\s/g, "");
    data.phone_number_2 = data.phone_number_2.replace(/\s/g, "");
    console.log(data);
    try {
      let { data: agency } = await axiosIsntance.post(
        "/admin/agency/register/",
        data
      );
      if (agency) {
        console.log(agency);
        navigate("/dashboard/agency");
        setShowActivation(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.detail);
      toast.error(error?.response?.data?.non_field_errors[0]);
      toast.error(error?.response?.data?.tg_username?.detail);
      toast.error(error?.response?.data[0]);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
    const form = new FormData();
    form.append("file", file);
    try {
      let { data: imageId } = await axiosIsntance.post("/image-upload/", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (imageId && imageId.image) {
        setSendImage(imageId.image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckPhoneValueBtn = (value) => {
    setPhoneValue(value);
  };
  const handleActivation = async (value) => {
    if (value.length == 5) {
      let data = {};
      data.code = value;
      data.phone_number = phoneValue.replace(/\s/g, "");

      try {
        let { data: activateInfo } = await axiosIsntance.post(
          "/auth/activation/",
          data
        );
        if (activateInfo) {
          console.log(activateInfo);
          localStorage.setItem("access_token", activateInfo.access_token);
          localStorage.setItem("refresh_token", activateInfo.refresh_token);
          setShowActivation(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const sendToActivationBtn = async () => {
    let phone = {};
    let value = phoneValue.replace(/\s/g, "");
    phone.phone_number = value;
    console.log(phone);
    try {
      let { data } = await axiosIsntance.post("/auth/sign-up/", phone);
      if (data) {
        console.log(data);
        setShowActivation(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-[500px] mx-auto"
        >
          {!state ? (
            <div>
              <div className="flex justify-between items-end">
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                      onChange={(e) => handleCheckPhoneValueBtn(e.target.value)}
                      value={phoneValue}
                    >
                      <FormLabel>Telefon raqam</FormLabel>
                      <FormControl>
                        <ReactInputMask
                          {...field}
                          mask="+998 -- --- -- --"
                          placeholder="+998"
                          className="border w-full border-[#222] p-2 px-3 rounded-lg outline-none"
                          formatChars={formatChars}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  className="bg-[#0B77E6]"
                  onClick={sendToActivationBtn}
                >
                  Verify
                </Button>
              </div>
              {showActivation ? (
                <div className="flex my-3 activation-code-div">
                  <AuthCodeInput length={5} onChange={handleActivation} />
                </div>
              ) : (
                ""
              )}
              {phoneError ? (
                <span className="text-[14px] text-red-500">{phoneError}</span>
              ) : (
                ""
              )}

              <FormField
                control={form.control}
                name="phone_number_2"
                render={({ field }) => (
                  <FormItem onChange={(e) => setPassword(e.target.value)}>
                    <FormLabel>Qo&apos;shimcha telefon raqam</FormLabel>
                    <FormControl>
                      <ReactInputMask
                        {...field}
                        mask="+998 -- --- -- --"
                        placeholder="+998"
                        className="border w-full border-[#222] p-2 px-3 rounded-lg outline-none"
                        formatChars={formatChars}
                      />
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
                    <FormLabel>Kod-parol</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Esda qolarli parol kiriting"
                        className="border-[#222]"
                        value={password}
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agency nomi</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Agency nomini kiriting"
                        {...field}
                        className="border-[#222]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                onClick={() => dispatch(constinueBtn(true))}
                type="button"
                className="w-full mt-3 bg-[#0B77E6]"
              >
                Continue
              </Button>
            </div>
          ) : (
            <div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manzil</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Agency joylashgan joy"
                        className="border-[#222]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tg_username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tg Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="TG Username"
                        className="border-[#222]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="licence_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Litsenziya raqami</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="l34-3d3-4"
                        className="border-[#222] "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <label htmlFor="image" className="font-semibold text-[14px] mt-3">
                Litsenziya surati
              </label>
              <div className="flex flex-wrap gap-2">
                <div
                  className={`w-[100%] rounded-lg border-[#222] h-[150px] border border-dashed gap-3 flex item-center mx-auto justify-center flex-col text-center ${"bg-[#FFFBEF]"}`}
                >
                  <input
                    type="file"
                    className="opacity-0 absolute  h-[200px]"
                    id="image"
                    onChange={handleImageChange}
                    accept="image/png, image/jpg, image/jpeg, image/webp, image/heic"
                  />

                  {imageSrc ? (
                    <img src={imageSrc} />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-camera mx-auto inline"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                      <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                    </svg>
                  )}
                </div>
              </div>
              <Button type="submit" className="w-[100%] mt-5 bg-[#0B77E6]">
                Submit
              </Button>
            </div>
          )}
        </form>
      </Form>
      <p className="text-center mt-3 text-[14px] text-[#7F56D9]">
        Have an account?
        <Link to="/auth/sign-in" className="text-[#0B77E6] ml-2 font-semibold">
          Sign in
        </Link>{" "}
      </p>
    </>
  );
};

export default RegisterForm;
