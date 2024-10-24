import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/authSlice";
import { Outlet } from "react-router-dom";

export default function MyWeb() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    <div>loading...</div>;
  }

  return (
    <>
      <Header />
      <main>{Outlet}</main>
      <Footer />
    </>
  );
}
