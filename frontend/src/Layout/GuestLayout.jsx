import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../store/authSlice";

const GuestLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // console.log('Auth state:', isLoggedIn);

  return !isLoggedIn ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default GuestLayout;
