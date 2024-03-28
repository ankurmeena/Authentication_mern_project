import express from "express";
import { userControl } from "../controller/user.control.js";
const router = express.Router();
console.log("df");
router.get("/", userControl);

export default router;
