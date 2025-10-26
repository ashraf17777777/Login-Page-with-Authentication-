import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9j_WkgMjc7dtb-h5VMv6rlAinx5v7cX0",
  authDomain: "fir-auth-895bc.firebaseapp.com",
  projectId: "fir-auth-895bc",
  storageBucket: "fir-auth-895bc.appspot.com", // ✅ Corrected
  messagingSenderId: "747405020959",
  appId: "1:747405020959:web:c9754cef27cffad788aa2a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
