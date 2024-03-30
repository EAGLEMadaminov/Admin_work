import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import axiosIsntance from "src/utils/lib/axios";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "src/components/ui/form";

const formSchame = z.object({
  phone_number: z.string().min(13, {
    message: "Please enter correct phone ",
  }),
  phone_number_2: z.string().min(13, {
    message: "Please enter correct phone",
  }),
  password: z.string().min(6, {
    message: "Password must be least 6 characters",
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
  const form = useForm({
    resolver: zodResolver(formSchame),
    defaultValues: {
      phone_number: "",
      phone_number_2: "",
      name: "",
      licence_number: "",
      address: "",
      tg_username: "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      let { data: agency } = await axiosIsntance.post(
        "/admin/agency/register/",
        data
      );
      if (agency) {
        console.log(agency);
        navigate("/dashboard/agency");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[500px] mx-auto"
      >
        <div className="flex justify-between items-center">
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button className="bg-blue-500 text-white p-2 x-3 rounded-[10px] mt-7">
            verification
          </button>
        </div>
        <FormField
          control={form.control}
          name="phone_number_2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone 2</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter agecy name" {...field} />
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
              <FormLabel>License number</FormLabel>
              <FormControl>
                <Input placeholder="Enter license number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Agency address" {...field} />
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
                <Input placeholder="TG Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-[100%] bg-[#7F56D9]">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
