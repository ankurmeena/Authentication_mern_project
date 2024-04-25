import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user.user);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(imagePercent);
  // console.log(formData);

  useEffect(() => {
    if (image !== undefined) {
      setImageError(false);
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "_" + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.floor(progress));
      },
      (error) => {
        setImageError(true);
        console.error("upload error:", error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData({ ...formData, profilePicture: downloadURL });
        } catch (error) {
          setImageError(true);
          console.error("Download URL error:", error);
        }
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          hidden
          accept="image/*"
          ref={fileRef}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture||currentUser.profilePicture}
          alt=""
          onClick={() => fileRef.current.click()}
          className="h-24 w-24 rounded-full self-center cursor-pointer object-cover"
        />
         {imageError ? (
          <p className="text-sm self-center text-red-700">
            Error in uploading image (Imagefile must be less than 10 MB)
          </p>
        ) : imagePercent > 0 && imagePercent < 100 ? (
          <p className="text-sm self-center text-slate-700">
            Uploading: {imagePercent} %
          </p>
        ) : imagePercent === 100 ? (
          <p className="text-sm self-center text-green-700">
            Image uploaded successfully
          </p>
        ) : null}
        <input
          type="text"
          className="bg-slate-100 rounded-lg p-3"
          placeholder="username"
          value={currentUser.username}
        />
        <input
          type="email"
          className="bg-slate-100 rounded-lg p-3"
          placeholder="email"
          value={currentUser.email}
        />
        <input
          type="password"
          className="bg-slate-100 rounded-lg p-3"
          placeholder="password"
          value=""
        />
        <button className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80">
          UPDATE
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <div className="text-red-700 curser-pointer ">Delete Account</div>
        <div className="text-red-700 curser-pointer ">Sign out</div>
      </div>
    </div>
  );
};

export default Profile;
