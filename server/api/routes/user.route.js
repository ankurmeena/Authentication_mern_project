import express from "express";
import { usercontrol } from "../controller/user.control.js";
const router = express.Router();
console.log("df");
router.get("/", usercontrol);

export default router;
