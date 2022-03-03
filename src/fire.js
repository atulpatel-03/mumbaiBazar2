 import firebase from "firebase";

 const firebaseConfig = {
   apiKey: "AIzaSyCaxBwyjaaOx6fVt701-quLuVEJt-DCwSc",
   authDomain: "sattamatka-b68ff.firebaseapp.com",
   projectId: "sattamatka-b68ff",
   storageBucket: "sattamatka-b68ff.appspot.com",
   messagingSenderId: "997001722161",
   appId: "1:997001722161:web:f5dc601f703a5769829810"
 };

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
