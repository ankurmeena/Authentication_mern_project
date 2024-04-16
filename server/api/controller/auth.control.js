import User from "../models/users.js";
import bcryptjs from "bcryptjs";
import { errorhandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (typeof password !== "string" || password.length === 0) {
    throw new Error("Invalid password");
  }
  const salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(errorhandler(500, "something getting wrong with the credentials"));
    // next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorhandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorhandler(401, "Invalid credentials "));
    }

    const expiryDate = new Date(Date.now() + 3600000);

    const { password: hashpassword, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("success_token", token, {
        httpOnly: true,
        expires: expiryDate,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, photo } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (validUser) {
      const expiryDate = new Date(Date.now() + 3600000);
      const { password: hashpassword, ...rest } = validUser._doc;
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      res
        .cookie("success_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }else{
      const generatedPassword= Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, salt);
      const newUser = new User({ username:name.split(" ").join("").toLowerCase()+Math.floor(Math.random()*10000).toString(), email, password: hashedPassword,profilePicture:photo });
      await newUser.save();
      const expiryDate = new Date(Date.now() + 3600000);
      const { password: hashpassword, ...rest } = newUser._doc;
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      res
        .cookie("success_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    next(error);
  }
};
