// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB62_OVuo3HBu19rJyUUQ1FUG6pgx6DQi0",
    authDomain: "reactdemo-4f413.firebaseapp.com",
    projectId: "reactdemo-4f413",
    storageBucket: "reactdemo-4f413.appspot.com",
    messagingSenderId: "1022647892226",
    appId: "1:1022647892226:web:7f6851b7366b8e1e086a1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);