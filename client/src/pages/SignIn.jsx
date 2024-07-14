import { Button, ButtonGroup, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessaage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      userName,
      password,
    };

    axios
      .post("http://localhost:3000/api/v1/auth/log-in", user, {
        withCredentials: true,
        credentials: true,
      })
      .then((res) => {
        setSuccessMessage(res.data.message);
        setUserName("");
        setPassword("");
        navigate("/");
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
