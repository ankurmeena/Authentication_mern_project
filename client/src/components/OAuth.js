import React from "react";
import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth";
import { app } from "../Firebase";
import { signInFalse, signInSuccess } from "../Redux/User/UserSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const OAuth = () => {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth,provider)
      //console.log(result);
      const profile = {
        name:result.user.displayName,
        email:result.user.email,
        photo:result.user.photoURL,
      }
      const res = await axios.post("http://localhost:3000/api/auth/google",profile);
      const data = await res.data;
      console.log(data);
      dispatch(signInSuccess(data));
    } catch (error) {
      dispatch(signInFalse(error.message));
      console.log("could not login with google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-600 text-white rounded-lg p-3 uppercase hover:opacity-85"
    >
      Continue with google
    </button>
  );
};

export default OAuth;
