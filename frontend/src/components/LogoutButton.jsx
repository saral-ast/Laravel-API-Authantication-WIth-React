import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { handleLogout } from "../utils/auth";

const LogoutButton = ({ className, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout(dispatch, navigate);
  };

  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        className || ""
      }`}
      onClick={onLogout}
      {...props}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
