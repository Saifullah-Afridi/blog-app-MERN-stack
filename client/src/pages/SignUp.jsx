import { Button, ButtonGroup, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="mt-6 px-4">
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
        <form className="flex-1">
          <div className="flex flex-col gap-4 ">
            <div>
              <div className="mb-1">
                <Label htmlFor="username">User Name</Label>
              </div>
              <TextInput
                type="text"
                id="username"
                placeholder="User name...."
              />
            </div>
            <div>
              <div className="mb-1">
                <Label htmlFor="email">Email</Label>
              </div>
              <TextInput type="email" id="email" placeholder="Email...." />
            </div>
            <div>
              <div className="mb-1">
                <Label htmlFor="password">Password</Label>
              </div>
              <TextInput
                type="password"
                id="password"
                placeholder="Password..."
              />
            </div>
            <div>
              <div className="mb-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
              </div>
              <TextInput
                type="text"
                id="confirmPassword"
                placeholder="Confirm Password...."
              />
            </div>
            <Button>Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
