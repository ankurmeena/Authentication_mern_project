import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading,setLaoding] = useState(false);
  const [error,setError]=useState(false);

  const handleDataChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // console.log(formData);
  };
  const handlereset = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };
  const handleFormData = async (e) => {
    setLaoding(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData
      );
      const data = await res.data;
      console.log(data);
      handlereset();
      setLaoding(false);
      setError(false);
    } catch (error) {
      console.log(error);
      setLaoding(false);
      setError(true);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign-up</h1>
      <form onSubmit={handleFormData} className="flex flex-col gap-5">
        <input
          value={formData.username}
          type="text"
          placeholder="username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleDataChanges}
          required
        />
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
          {loading ? "loading..."  : "Sign Up"}
        </button>
        {/* <button className="bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-90 ">
          CONTINUE WITH GOOGLE
        </button> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an acoount?</p>
        <Link to="/sign-in">
          <span className="text-blue-500"> Sign in</span>
        </Link>
      </div>
      <p className="text-red-500 text-xl mt-5">{error && "Something Went Wrong"}</p>
    </div>
  );
};

export default SignUp;
