import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "./../store/slices/userSlices";

const Signout = () => {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logout());
  };
  return (
    <span onClick={handleSignOut} className="cursor-pointer">
      Sign Out
    </span>
  );
};

export default Signout;
