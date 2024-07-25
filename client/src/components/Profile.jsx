import { Alert, Button, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/slices/userSlices";
import { HiInformationCircle } from "react-icons/hi";
import { useState } from "react";
import DeleteAccount from "./DeleteAccount";
import Signout from "./Signout";
import { Link } from "react-router-dom";
const Profile = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => {
    return state.user;
  });
  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState("");
  const [showsucessMessage, setShowSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateFields = {};
    if (userName !== user.userName && userName !== undefined) {
      updateFields.userName = userName;
    }
    if (email !== user.email && email !== undefined) {
      updateFields.email = email;
    }
    if (password !== "" && password !== undefined) {
      updateFields.password = password;
    }
    if (confirmPassword !== "" && confirmPassword !== undefined) {
      updateFields.confirmPassword = confirmPassword;
    }
    if (password !== confirmPassword) {
      setShowError("password does not match");
      return;
    }

    if (Object.keys(updateFields).length === 0) {
      return;
    }
    setShowError("");
    dispatch(updateUser({ userId: user._id, updateFields }));
    setShowSuccessMessage("User has been Updated Successfully");
  };
  return (
    <div className="mt-3 w-[90%] mx-auto ">
      <h1 className="text-3xl text-center">Profile</h1>
      <img
        src={user.profilePicture}
        alt="User Profile picture"
        className="w-[6rem] h-[6rem] rounded-full border-4 border-gray-400 overflow-hidden self-center p-1 shadow-md mx-auto my-3"
      />
      <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit">Update</Button>
        {user.role === "admin" ? (
          <Link to="/create-post">
            <Button
              className="w-full"
              type="button"
              gradientDuoTone="purpleToBlue"
              outline
            >
              Create Post
            </Button>
          </Link>
        ) : null}
      </form>
      {showError && (
        <Alert
          color="failure"
          icon={HiInformationCircle}
          className="font-medium mt-4"
        >
          {showError}
        </Alert>
      )}
      {error && (
        <Alert
          color="failure"
          icon={HiInformationCircle}
          className="font-medium mt-4"
        >
          {error}
        </Alert>
      )}
      {showsucessMessage && (
        <Alert color="success" className="font-medium mt-4">
          {showsucessMessage}
        </Alert>
      )}

      <div className="text-red-500 flex justify-between mt-3">
        <DeleteAccount />
        <Signout />
      </div>
    </div>
  );
};
export default Profile;
