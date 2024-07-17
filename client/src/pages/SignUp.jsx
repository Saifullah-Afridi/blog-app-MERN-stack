import { Button, ButtonGroup, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessaage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      userName,
      email,
      password,
      confirmPassword,
    };

    axios
      .post("http://localhost:3000/api/v1/auth/sign-up", user, {
        withCredentials: true,
      })
      .then((res) => {
        setSuccessMessage(res.data.message);
        navigate("/sign-in");
        setEmail("");
        setUserName("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        setErrorMessaage(error.response.data.message);
        console.log(errorMessage);
      });
  };
  return (
    <div className="mt-[2rem] px-4 min-h-screen">
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
                <Label htmlFor="username">Your Username</Label>
              </div>
              <TextInput
                type="text"
                id="username"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                placeholder="User name...."
              />
            </div>
            <div>
              <div className="mb-1">
                <Label htmlFor="email">Your Email</Label>
              </div>
              <TextInput
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                placeholder="Email...."
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
            <div>
              <div className="mb-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
              </div>
              <TextInput
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password...."
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <Button type="submit">Sign up</Button>
            <OAuth />
            <div className="flex gap-3">
              <p>Have an account?</p>
              <Link to="/sign-in" className=" text-blue-500">
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
