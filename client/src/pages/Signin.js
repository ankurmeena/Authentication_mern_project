import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart,signInSuccess,signInFalse } from "../Redux/User/UserSlice";
import OAuth from "../components/OAuth";
const SignIn = () => {
  const [formData, setFormData] = useState({});
 const {loading, error}=useSelector((state)=>state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const handleDataChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // console.log(formData);
  };
  const handlereset = () => {
    setFormData({
      email: "",
      password: "",
    });
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        formData
      );
      const data = await res.data;
     
      handlereset();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log(error);
      dispatch(signInFalse(error.response.data.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleFormData} className="flex flex-col gap-5">
        <input
          value={formData.email}
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleDataChanges}
          required
        />
        <input
          value={formData.password}
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleDataChanges}
          required
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
          disabled={loading} 
          type="submit"
        >
          {loading ? "loading..."  : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't Have an acoount?</p>
        <Link to="/sign-up">
          <span className="text-blue-500"> Sign up</span>
        </Link>
      </div>
      <p className="text-red-500 text-xl mt-5">{error ? error.response.data.message || "Something Went Wrong" : ""}</p>
    </div>
  );
};

export default SignIn;
