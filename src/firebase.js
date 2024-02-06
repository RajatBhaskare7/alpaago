// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbF9BOYHR41h8VFkQYSlVYPLx4oAh8EVA",
  authDomain: "alaago-a8278.firebaseapp.com",
  projectId: "alaago-a8278",
  storageBucket: "alaago-a8278.appspot.com",
  messagingSenderId: "677468308765",
  appId: "1:677468308765:web:b52ff54ed54b5a6d5bcdf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export const firestore = getFirestore(app);



