import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateComponent = () => {
  const { user } = useSelector((state) => state.user);
  return user.role === "admin" ? <Outlet /> : <Navigate to="/log-in" />;
};

export default AdminPrivateComponent;
