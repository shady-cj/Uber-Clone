// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMXcGcTXQ1yBS4G4OFNhzDBNd8pxvrEHM",
    authDomain: "uber-clone-react-proj.firebaseapp.com",
    projectId: "uber-clone-react-proj",
    storageBucket: "uber-clone-react-proj.appspot.com",
    messagingSenderId: "780645303327",
    appId: "1:780645303327:web:06093912759aaaf8ca012a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };
