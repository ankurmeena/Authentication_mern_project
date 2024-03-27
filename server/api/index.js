import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose.connect(
 'mongodb+srv://ankurmeena355:gJPvxTn9drLvPTfS@ankur.ulpu3.mongodb.net/auth-mern?retryWrites=true&w=majority&appName=ankur'
).then(()=>{
    console.log('connected to MongoDB');
})

// Define a simple route handler for GET request
app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
app.listen(3000, () => {
  console.log("server listening on port 3000 !");
});
