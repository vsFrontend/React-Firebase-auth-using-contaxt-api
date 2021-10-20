// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyDlWShmjwLBLgJwM6gJ0NaAgnHwz_SRrBg",
  // authDomain: "userauth-c5750.firebaseapp.com",
  // projectId: "userauth-c5750",
  // storageBucket: "userauth-c5750.appspot.com",
  // messagingSenderId: "499959172368",
  // appId: "1:499959172368:web:af0d4bfc18117cd8e8a995"
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);