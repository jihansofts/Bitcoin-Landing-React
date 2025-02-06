// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0SG03n6MsX_1edNWWjTbUTya4mBs7mFo",
  authDomain: "fiveminutebitcoin-ace54.firebaseapp.com",
  projectId: "fiveminutebitcoin-ace54",
  storageBucket: "fiveminutebitcoin-ace54.firebasestorage.app",
  messagingSenderId: "815781000855",
  appId: "1:815781000855:web:fd0c02ea0b17015a9b9bd2",
  measurementId: "G-8PZGV1WPC5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider, signOut, onAuthStateChanged, signInWithPopup };
