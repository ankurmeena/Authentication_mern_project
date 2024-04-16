import React from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePicture}
          alt=""
          className="h-24 w-24 rounded-full self-center cursor-pointer object-cover"
        />
        <input type="text" className="bg-slate-100 rounded-lg p-3" placeholder="username" value={currentUser.username}/>
        <input type="email" className="bg-slate-100 rounded-lg p-3" placeholder="email" value={currentUser.email}/>
        <input type="password" className="bg-slate-100 rounded-lg p-3" placeholder="password" value=""/>
        <button className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80">UPDATE</button>
      </form>
      <div className="flex justify-between mt-5">
        <div className="text-red-700 curser-pointer ">Delete Account</div>
        <div className="text-red-700 curser-pointer ">Sign out</div>
      </div>
    </div>
  );
};

export default Profile;
