// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  onAuthStateChanged,
  getRedirectResult,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxeXpDvvoF1CC9G5irF-VT7T9CZ_22XoQ",
  authDomain: "studiu-df3a3.firebaseapp.com",
  projectId: "studiu-df3a3",
  storageBucket: "studiu-df3a3.appspot.com",
  messagingSenderId: "930310933878",
  appId: "1:930310933878:web:94e5872fb6665fba197e57",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export { firebase };
