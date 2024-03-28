import express from "express";
import { userControl } from "../controller/user.control.js";
const router = express.Router();

router.get("/", userControl);

export default router;
