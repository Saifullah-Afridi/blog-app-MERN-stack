import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex gap-2 pt-3 md:px-10 mx-auto">
        <div className="px-2">
          <Link to="/" className="font-bold text-3xl">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg py-1 px-2">
              Saifullah's
            </span>
            Blog
          </Link>
          <p className="mt-4 text-sm font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sunt
            assumenda, odio sit vel quae.
          </p>
        </div>
        <div className="flex flex-row gap-2"></div>
      </div>
    </div>
  );
};

export default SignUp;
