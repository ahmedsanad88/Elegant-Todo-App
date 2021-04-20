//jshint esversion:6
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "todo-app-38e69.firebaseapp.com",
  projectId: "todo-app-38e69",
  storageBucket: "todo-app-38e69.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGE_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASURE_ID
});

const db = firebaseApp.firestore();
// auth process.
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export {auth, provider};

export default db;