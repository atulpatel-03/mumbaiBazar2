 import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDWEZRtu6skWygqitCk27AApBV28GJrsEw",
  authDomain: "mainmumbaibaazar.firebaseapp.com",
  projectId: "mainmumbaibaazar",
  storageBucket: "mainmumbaibaazar.appspot.com",
  messagingSenderId: "357178634748",
  appId: "1:357178634748:web:bf25bb9bac9cacfcb5c279",
  measurementId: "G-8JG53E06ZY"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
