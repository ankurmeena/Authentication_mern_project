import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
app.use("/api/user", userRoute);
app.listen(3000 || process.env.PORT, () => {
  console.log("Server listening on port ", process.env.PORT);
});
