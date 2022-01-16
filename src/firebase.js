import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxeXpDvvoF1CC9G5irF-VT7T9CZ_22XoQ",
  authDomain: "studiu-df3a3.firebaseapp.com",
  projectId: "studiu-df3a3",
  storageBucket: "studiu-df3a3.appspot.com",
  messagingSenderId: "930310933878",
  appId: "1:930310933878:web:94e5872fb6665fba197e57",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { firebase, db };
