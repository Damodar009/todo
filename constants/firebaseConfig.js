
import { getAuth } from "firebase/auth";
import {initializeApp} from "firebase/app" ;
import {getFirestore} from "firebase/firestore/lite";



const firebaseConfig = {
    apiKey: "AIzaSyB3VCSwFDIektyCeGOeEdD31T-STnJ7omQ",
    authDomain: "todo-22aa8.firebaseapp.com",
    projectId: "todo-22aa8",
    storageBucket: "todo-22aa8.appspot.com",
    messagingSenderId: "713327129484",
    appId: "1:713327129484:web:0d461230518ded3a8d1ca9",
    measurementId: "G-FW4JGX9KX9"
  };
  
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
