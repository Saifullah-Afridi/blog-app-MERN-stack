import { Button } from "flowbite-react";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createGoogleUser } from "../store/slices/userSlices";
const OAuth = () => {
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      dispatch(
        createGoogleUser({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button type="button" outline gradientDuoTone="pinkToOrange">
      <div
        className="flex gap-1 align-middle justify-center"
        onClick={handleClick}
      >
        <FaGoogle className="h-5" />
        <span>Continue with Google</span>
      </div>
    </Button>
  );
};

export default OAuth;
