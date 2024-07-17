// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-blog-app-4caca.firebaseapp.com",
  projectId: "mern-blog-app-4caca",
  storageBucket: "mern-blog-app-4caca.appspot.com",
  messagingSenderId: "223344097805",
  appId: "1:223344097805:web:f174965b91ecfa8d42b344",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
