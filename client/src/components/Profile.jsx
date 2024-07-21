import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="mt-3 w-[90%] mx-auto ">
      <h1 className="text-3xl text-center">Profile</h1>
      <img
        src={user.profilePicture}
        alt="User Profile picture"
        className="w-[6rem] h-[6rem] rounded-full border-4 border-gray-400 overflow-hidden self-center p-1 shadow-md mx-auto my-3"
      />
      <form className="flex flex-col gap-3 mt-4">
        <TextInput type="text" id="userName" defaultValue={user.userName} />
        <TextInput type="email" id="email" defaultValue={user.email} />
        <TextInput type="password" id="userName" placeholder="******" />
        <Button type="submit">Update</Button>
      </form>
      <div className="text-red-500 flex justify-between mt-3">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
