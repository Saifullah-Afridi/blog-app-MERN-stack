import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "./../store/slices/userSlices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    //asynchronous nature of create async thunk
    await dispatch(logout()).unwrap();
    toast.success("Sign out successfully");
    navigate("/sign-in");
  };
  return (
    <span onClick={handleSignOut} className="cursor-pointer">
      Sign Out
    </span>
  );
};

export default Signout;
