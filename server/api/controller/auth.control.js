import User from "../models/users.js";
import bcryptjs from "bcryptjs"
import { errorhandler } from "../utils/error.js";
export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;
  if (typeof password !== 'string' || password.length === 0) {
    throw new Error('Invalid password');
  }
  const salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(password,salt);
  const newUser = new User({ username, email, password:hashedPassword});
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(errorhandler(500,'something getting wrong with the credentials'));
    // next(error);
  }
};
