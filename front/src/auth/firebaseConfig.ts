// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB-5CxfIJVZoB4CYv42gzLw0BUAeDEnXrE",
    authDomain: "devi-68dd1.firebaseapp.com",
    projectId: "devi-68dd1",
    storageBucket: "devi-68dd1.appspot.com",
    messagingSenderId: "615876138752",
    appId: "1:615876138752:web:bed5e1609ea703e5c2c5e5",
    measurementId: "G-011897WG00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const myauth = getAuth(app);

export { app, myauth };
