// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "authentication-mern-project.firebaseapp.com",
  projectId: "authentication-mern-project",
  storageBucket: "authentication-mern-project.appspot.com",
  messagingSenderId: "40312020282",
  appId: "1:40312020282:web:4f922bfa0ca6ea73b4c403"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);