import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbIotzYQQ6jCEVnWwpM1ZxNyw7Ah05eiE",
  authDomain: "eda2-parcial3.firebaseapp.com",
  projectId: "eda2-parcial3",
  storageBucket: "eda2-parcial3.firebasestorage.app",
  messagingSenderId: "1004402002998",
  appId: "1:1004402002998:web:f551e9bf8f39148b6c9c97"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
