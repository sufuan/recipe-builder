/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrcBS2KdGlSaed48VayhLiIqCVzsF76Bc",
  authDomain: "stride-task-1-receipe.firebaseapp.com",
  projectId: "stride-task-1-receipe",
  storageBucket: "stride-task-1-receipe.appspot.com",
  messagingSenderId: "130957972741",
  appId: "1:130957972741:web:8375ab58f819367ba3d36c",
};
console.log(import.meta.env.API_KEY);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
