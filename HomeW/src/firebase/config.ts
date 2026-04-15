import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-owP31G1jI6IXmr0uRWP35qi2gp1UM-Q",
  authDomain: "parci-6166b.firebaseapp.com",
  projectId: "parci-6166b",
  storageBucket: "parci-6166b.firebasestorage.app",
  messagingSenderId: "862903665968",
  appId: "1:862903665968:web:5100b30940c831721134f5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
