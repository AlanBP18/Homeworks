// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ3tHLVKXkI5BRoVw2bH1BEq_Al-gUQhc",
  authDomain: "estructurados-690bc.firebaseapp.com",
  projectId: "estructurados-690bc",
  storageBucket: "estructurados-690bc.firebasestorage.app",
  messagingSenderId: "851483005221",
  appId: "1:851483005221:web:c3e6300fc3251644dacacc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);