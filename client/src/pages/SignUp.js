import React from "react";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign-up</h1>
      <form action="" className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="username"
          className="bg-slate-100 p-3 rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="email"
          className="bg-slate-100 p-3 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="password"
          className="bg-slate-100 p-3 rounded-lg"
          required
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
          Sign Up
        </button>
        <button className="bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-90 ">
          CONTINUE WITH GOOGLE
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an acoount?</p>
        <Link to="/sign-in">
          <span className="text-blue-500"> Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
