import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../appwrite/auth";
import { login as storeLogin } from "../../features/authSlice";
import { Input, Button } from "../index";

export default function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const signUp = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);

      if (userData) {
        dispatch(storeLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <p className="text-3xl font-bold">logo</p>
      <p className="text-xl">already have an account?</p>
      <Link to="/login">signin</Link>
      {error && <p className="text-red-700">{error}</p>}
      <form onSubmit={handleSubmit(signUp)}>
        <Input
          label="name:"
          myClass="w-full text-black"
          placeholder="your name"
          {...register("name", { required: true })}
        />
        <Input
          label="email:"
          myClass="w-full text-black"
          placeholder="your email"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^[a-zA-Z0-9]+(?:[._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:-[a-zA-Z\d]+)*\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/.test(
                  value
                ) || "Email address must be a valid address",
            },
          })}
          type="email"
        />

        <Input
          label="password:"
          myClass="w-full text-black"
          placeholder="your password"
          {...register("password", { required: true })}
          type="password"
        />

        <Button type="submit" myClass="w-full text-white">
          sign up
        </Button>
      </form>
    </div>
  );
}
