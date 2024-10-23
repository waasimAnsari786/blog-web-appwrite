import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { login as storeLogin } from "../../features/authSlice";
import { Input } from "../reuseableComponents/Input";
import { Button } from "../reuseableComponents/Button";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login();
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <p className="text-3xl font-bold">logo</p>
      <p className="text-xl">don't have an account?</p>
      <Link to="/signup">signup</Link>
      {error && <p className="text-red-700">{error}</p>}
      <form onSubmit={() => handleSubmit(login)}>
        <Input
          label="email:"
          myClass="w-full"
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
          myClass="w-full"
          placeholder="your password"
          type="password"
          {...register("password", { required: true })}
        />

        <Button type="submit" myClass="w-full">
          sign in
        </Button>
      </form>
    </div>
  );
}
