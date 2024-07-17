import { Button, ButtonGroup, Label, TextInput, Alert } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/slices/userSlices";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const errorMessage = useSelector((state) => state.user.error);
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && isAuthenticated) {
      toast.success("Login Successfull");
      console.log("hello");
      navigate("/");
    }
  }, [user, isAuthenticated]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      userName,
      password,
    };
    dispatch(userLogin(user));
  };
  return (
    <div className="mt-[2rem] px-4 min-h-screen">
      <Alert color="info" className="mb-5">
        <span className="font-medium">Info alert!</span> Change a few things up
        and try submitting again.
      </Alert>
      <div className="flex md:flex-row  flex-col gap-3">
        <div className="flex-1 md:self-center">
          <Link to="/" className="text-4xl font-semibold">
            <span className=" px-1 rounded-lg   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Saifullah's
            </span>{" "}
            Blog
          </Link>
          <p className=" mt-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi,
            neque mollitia inventore totam odio omnis?
          </p>
        </div>
        <form className="flex-1" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 ">
            <div>
              <div className="mb-1">
                <Label htmlFor="username">Your Username or Email</Label>
              </div>
              <TextInput
                type="text"
                id="username"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                placeholder="User name or email...."
              />
            </div>

            <div>
              <div className="mb-1">
                <Label htmlFor="password">Password</Label>
              </div>
              <TextInput
                type="password"
                id="password"
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <Button type="submit">Sign in</Button>
            <OAuth />
            <div className="flex gap-3">
              <p>Does not have an account?</p>
              <Link to="/sign-up" className=" text-blue-500">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
